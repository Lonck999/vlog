#!/usr/bin/env node
/**
 * normalize-links.mjs —— 把站內連結統一成同一種寫法，並拿掉指向不存在檔案的連結。
 *
 * 🔴 為什麼需要（2026-10-01 實測）
 *
 * `ignoreDeadLinks: true` 從 first commit（2024-12-30）就開著 ⇒ 關掉後
 * build 直接失敗，**152 個死連結**。而根因不是「有人打錯 152 次」，
 * 是站內連結有**四種寫法混用**，其中兩種本來就到不了：
 *
 *   /pages/occult/x.md   ✅ 234 條   ← 正確
 *   /occult/x.md         🔴  78 條   ← 少了 /pages，一律 404
 *   ./x.md               ⚠️ 512 條   ← 檔案一搬家就全死
 *   /pages/x（無副檔名）   ⚠️  16 條
 *
 * ⚠️ `config.mjs` 裡的 `rewrites: { "/pages/(.*)": "/(.*)" }` **是 no-op** ——
 *    實測：build 產物仍是 `dist/pages/...`，線上 `/vlog/occult/index.html`
 *    回 404 而 `/vlog/pages/occult/index.html` 回 200。
 *    🔴 所以「少 /pages」那 78 條不是風格問題，是真的連不到。
 *
 * ## 正規形式（唯一一種）
 *
 *     /pages/<相對於 docs/pages 的路徑>.md[#錨點]
 *
 * 選絕對路徑而不是相對路徑的理由：**C-2 馬上要搬 stock 目錄**，
 * 而相對連結一搬家就整批失效且不報錯。絕對路徑的規則也容易機器檢查。
 *
 * ## 指向不存在的檔案 → 拿掉連結，保留文字（Lonck 2026-10-01 選 A）
 *
 * 理由：目錄上列出不存在的文章，對訪客是假承諾。
 * 例：`- [18-什麼是量化分析](./contents/18-...)` → `- 18-什麼是量化分析`
 *
 * ## 用法
 *
 *     node scripts/normalize-links.mjs --dry-run   # 只看會改什麼
 *     node scripts/normalize-links.mjs             # 實際改寫
 *     node scripts/normalize-links.mjs --check     # 只檢查，有問題 exit 1（給 CI）
 */
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "docs");
const PAGES = path.join(DOCS, "pages");

const DRY = process.argv.includes("--dry-run");
const CHECK = process.argv.includes("--check");

/** 遞迴列出所有 .md（跳過建置產物與套件） */
function allMarkdown(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".vitepress" || name === ".git") continue;
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) allMarkdown(p, out);
    else if (name.endsWith(".md")) out.push(p);
  }
  return out;
}

/**
 * 🔴 檔案搬家後的對應表 —— 讓舊連結自動指到新位置，而不是被當成死連結砍掉。
 *
 * ⚠️ 為什麼必須有這個（2026-10-01 C-2 實測）：
 *    把 `life/stock/` 搬到 `studyNotes/contents/stock/` 之後，
 *    **115 條指向舊位置的連結全部變成「目標不存在」** ——
 *    而這支腳本對「目標不存在」的處理是**拿掉連結**。
 *    🔴 直接跑的話會把 196 個檔案裡的 stock 連結一次砍光，
 *    而那些頁面其實都還在，只是換了位置。
 *
 * 🔴 判準：**搬家 ≠ 刪除。** 檔案還在就要改指向，不是拿掉連結。
 *    （「拿掉連結」只保留給真的從沒寫過的東西。）
 *
 * 🔴 寫在這裡而不是寫成一次性 sed 的理由：
 *    舊連結散在 196 個檔案（其中 194 個是停更的日誌），
 *    日後再搬一次目錄時同樣會發生，而這張表是累積的紀錄。
 *
 * 格式：[舊前綴, 新前綴]。比對在「解析不到檔案」之後才做，
 * 所以不會影響正常連結，也不會因為表過期而誤改。
 */
const MOVED = [
  // 2026-10-01 C-2：股票筆記從「生活」移進「學習筆記」
  // ⚠️ 順序重要：長的在前 —— `stock/stock.md` 必須先於 `stock/` 被比對到，
  //    否則前者會被後者改成 `.../stock/stock.md`（而檔名已改成 index.md）。
  ["/pages/life/stock/stock.md", "/pages/studyNotes/contents/stock/index.md"],
  ["/pages/life/stock/", "/pages/studyNotes/contents/stock/"],
];

/** 舊路徑 → 新路徑（搬家對應）；沒有對應回 null。 */
function applyMoved(url) {
  for (const [from, to] of MOVED) {
    if (url.startsWith(from)) return to + url.slice(from.length);
  }
  return null;
}

/**
 * 🔴 把一個連結解析成實際檔案路徑，試遍所有合理的寫法。
 *
 * ⚠️ 順序重要：先試「原樣」再試「補 /pages」——
 *    反過來的話，`/pages/x` 這種正確寫法會先被當成要補成 `/pages/pages/x`。
 *
 * 回傳絕對檔案路徑，或 null。
 */
function resolveTarget(url, fromFile) {
  const clean = decodeURIComponent(url.replace(/[?#].*$/, ""));
  if (!clean) return null;
  const bare = clean.replace(/\.(md|html)$/, "");
  const cands = [];
  if (clean.startsWith("/")) {
    // 絕對：以 docs/ 為根；另外試補 /pages（78 條就是漏了它）
    cands.push(path.join(DOCS, bare), path.join(DOCS, bare, "index"));
    if (!bare.startsWith("/pages/")) {
      cands.push(path.join(PAGES, bare), path.join(PAGES, bare, "index"));
    }
  } else {
    const dir = path.dirname(fromFile);
    cands.push(path.join(dir, bare), path.join(dir, bare, "index"));
  }
  for (const c of cands) {
    if (existsSync(c + ".md")) return c + ".md";
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return null;
}

/** 檔案絕對路徑 → 正規連結 `/pages/....md` */
function canonical(absFile) {
  const rel = path.relative(PAGES, absFile);
  if (rel.startsWith("..")) {
    // docs/ 底下但不在 pages/（例如 docs/index.md）
    return "/" + path.relative(DOCS, absFile).split(path.sep).join("/");
  }
  return "/pages/" + rel.split(path.sep).join("/");
}

/**
 * 🔴 把 fenced code block 的範圍標出來 —— 裡面的連結不可改寫。
 *    （範例程式碼裡的 markdown 連結改掉會讓教學內容變錯。）
 */
function codeRanges(text) {
  const out = [];
  const re = /^( {0,3})(`{3,}|~{3,})[^\n]*$/gm;
  let open = null, m;
  while ((m = re.exec(text))) {
    if (open === null) open = m.index;
    else { out.push([open, m.index + m[0].length]); open = null; }
  }
  if (open !== null) out.push([open, text.length]);
  return out;
}
const inRanges = (i, rs) => rs.some(([a, b]) => i >= a && i < b);

const stats = { normalized: 0, unlinked: 0, untouched: 0, skippedInCode: 0 };
const changes = [];
const removed = [];

for (const file of allMarkdown(DOCS)) {
  const src = readFileSync(file, "utf8");
  const code = codeRanges(src);
  // ⚠️ 前面帶 `!` 的是圖片，不可碰（它們指向 /img，不是頁面）
  // 🔴 `([^)\s]*)` 用 `*` 不是 `+`：**空連結 `[文字]()` 也要抓**。
  //    實測踩到：10 處 `[Vue3.4]()`、`[VitePress]()` ——
  //    VitePress 把空 url 解析成「當前目錄的 index」而判成死連結，
  //    我第一版用 `+` 直接跳過它們 ⇒ 正規化說「0 筆待修」而 build 仍失敗。
  //    ⚠️ 這正是「自己寫的 parser 跟真正的消費端不一致」的實例。
  const re = /(!?)\[([^\]]*)\]\(([^)\s]*)\)/g;
  let out = "", last = 0, m;
  while ((m = re.exec(src))) {
    const [full, bang, text, url] = m;
    if (bang || inRanges(m.index, code)) {
      if (!bang && inRanges(m.index, code)) stats.skippedInCode++;
      continue;
    }
    if (/^(https?:|mailto:|tel:)/.test(url) || url.startsWith("#")) continue;

    const hash = (url.match(/#.*$/) || [""])[0];
    // 🔴 空連結 `[文字]()` 一律拿掉連結外殼 —— resolveTarget 對空字串回 null，
    //    下面的 else 分支會處理，這裡不需要特判（但要確保 `continue` 沒跳過它）。
    let target = resolveTarget(url, file);
    // 🔴 解析不到時，先問「是不是搬家了」再判它死 ——
    //    搬家 ≠ 刪除，檔案還在就要改指向而不是拿掉連結。
    if (!target) {
      const moved = applyMoved(url.replace(/[?#].*$/, ""));
      if (moved) target = resolveTarget(moved, file);
    }
    let replacement = null;

    if (target) {
      const want = canonical(target) + hash;
      if (want !== url) {
        replacement = `[${text}](${want})`;
        stats.normalized++;
        changes.push([path.relative(DOCS, file), url, want]);
      } else stats.untouched++;
    } else {
      // 🔴 指向不存在的檔案 → 拿掉連結只留文字（Lonck 選 A）
      replacement = text;
      stats.unlinked++;
      removed.push([path.relative(DOCS, file), url, text]);
    }
    if (replacement !== null) {
      out += src.slice(last, m.index) + replacement;
      last = m.index + full.length;
    }
  }
  out += src.slice(last);
  if (out !== src && !DRY && !CHECK) writeFileSync(file, out, "utf8");
}

const pad = (n) => String(n).padStart(5);
console.log(`${pad(stats.normalized)}  改寫成正規形式 /pages/....md`);
console.log(`${pad(stats.unlinked)}  🔴 目標不存在 → 拿掉連結保留文字`);
console.log(`${pad(stats.untouched)}  已經是正規形式`);
console.log(`${pad(stats.skippedInCode)}  在程式碼區塊內（不碰）`);

if (DRY || CHECK) {
  const show = (title, rows, fmt) => {
    if (!rows.length) return;
    console.log(`\n${title}（前 15）`);
    for (const r of rows.slice(0, 15)) console.log("   " + fmt(r));
    if (rows.length > 15) console.log(`   …另外 ${rows.length - 15} 筆`);
  };
  show("改寫", changes, ([f, a, b]) => `${a}\n       → ${b}\n       （${f}）`);
  show("🔴 拿掉連結", removed, ([f, u, t]) => `[${t}](${u})\n       （${f}）`);
}

if (CHECK && (stats.normalized || stats.unlinked)) {
  console.log("\n🔴 連結寫法不統一或有死連結 —— 跑 `node scripts/normalize-links.mjs` 修正");
  process.exit(1);
}
