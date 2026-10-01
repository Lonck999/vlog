#!/usr/bin/env node
/**
 * test-links.mjs —— 站內連結的回歸測試（每日自動跑）。
 *
 * 🔴 這支在防什麼（2026-10-01）
 *
 * 首頁「接案、發案聯絡我」那顆按鈕連到一個 2025-01-13 就被刪掉的檔案，
 * **404 掛了 8 個多月沒人發現**。
 *
 * 根因不是「沒有檢查工具」—— VitePress 內建就有死連結檢查，
 * 但 `ignoreDeadLinks: true` 從 first commit（2024-12-30）就開著。
 * 🔴 **工具一直都在，是被關掉的。**
 *
 * 所以這支測的是兩件事：
 *   ① 連結寫法統一（`normalize-links.mjs --check` 通過）
 *   ② 🔴 **那道防線還開著** —— `ignoreDeadLinks` 不可被改回 `true`
 *
 * ⚠️ ② 特別重要：build 失敗時最快的「修法」就是把它改回 `true`，
 *    而那會讓這整個階段的工作一次歸零，**且不會有任何錯誤訊息**。
 *
 * 跑法：node scripts/test-links.mjs
 */
import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, fail = 0;

function ck(name, ok, detail = "") {
  if (ok) { pass++; console.log(`  ✅ ${name}`); }
  else { fail++; console.log(`  🔴 FAIL ${name}${detail ? "  " + detail : ""}`); }
}

// ── ① 連結寫法統一且無死連結 ─────────────────────────────
console.log("【①】站內連結寫法統一、無死連結");
let checkOut = "", checkRc = 0;
try {
  checkOut = execFileSync("node", [path.join(ROOT, "scripts/normalize-links.mjs"), "--check"],
                          { cwd: ROOT, encoding: "utf8" });
} catch (e) {
  checkRc = e.status ?? 1;
  checkOut = (e.stdout || "") + (e.stderr || "");
}
ck("normalize-links --check 通過", checkRc === 0,
   checkOut.split("\n").filter((l) => l.includes("🔴")).slice(0, 3).join(" | "));

const m = checkOut.match(/(\d+)\s+已經是正規形式/);
const total = m ? Number(m[1]) : 0;
// 🔴 negative control：若 total 是 0，上面那條會因為「根本沒掃到東西」而通過。
//    實測基準 705 條 —— 低於 600 代表掃描範圍壞了，不是連結變少了。
ck(`掃到足量連結（${total} 條，門檻 600）`, total >= 600,
   "掃描範圍可能壞了 —— 0 條也會讓 --check 通過");

// ── ② 🔴 死連結防線不可被關掉 ────────────────────────────
console.log("\n【②】🔴 ignoreDeadLinks 不可被改回 true（防線被關掉就白做了）");
const cfgPath = path.join(ROOT, "docs/.vitepress/config.mjs");
ck("config.mjs 存在", existsSync(cfgPath), cfgPath);
if (existsSync(cfgPath)) {
  const cfg = readFileSync(cfgPath, "utf8");
  // ⚠️ 只看有沒有 "ignoreDeadLinks" 不夠 —— 註解裡也有這個字。
  //    要抓的是**實際的設定值**（第一個非註解的賦值）。
  const assign = cfg
    .split("\n")
    .filter((l) => !l.trim().startsWith("//"))
    .map((l) => l.match(/ignoreDeadLinks\s*:\s*(.+?),?\s*$/))
    .find(Boolean);
  ck("找得到 ignoreDeadLinks 設定", !!assign, "設定不見了 ⇒ 預設值可能變動");
  if (assign) {
    const val = assign[1].trim().replace(/,$/, "");
    ck(`ignoreDeadLinks 不是 true（實際：${val}）`, val !== "true",
       "🔴 改回 true 等於把整個階段 C 的工作歸零，而且不會有任何錯誤訊息");
  }
}

// ── ③ 首頁按鈕的目標真的存在 ─────────────────────────────
console.log("\n【③】首頁按鈕（8 個月 404 就是從這裡開始的）");
const home = readFileSync(path.join(ROOT, "docs/index.md"), "utf8");
const links = [...home.matchAll(/^\s*link:\s*(\S+)\s*$/gm)].map((x) => x[1]);
ck(`首頁有連結可驗（${links.length} 條）`, links.length >= 3, String(links));
for (const l of links) {
  if (!l.startsWith("/")) continue;
  const bare = decodeURIComponent(l.replace(/\.(md|html)$/, "")).replace(/\/$/, "");
  const rel = bare.replace(/^\//, "");
  const ok = existsSync(path.join(ROOT, "docs", rel + ".md"))
          || existsSync(path.join(ROOT, "docs", rel, "index.md"));
  ck(`  ${l}`, ok, "目標檔案不存在 ⇒ 線上會是 404");
}

// ── ④ 導覽列每一項都點得進去 ─────────────────────────────
console.log("\n【④】導覽列（C-3：子選單重排後每項都要有內容）");
// 🔴 導覽列是訪客的主要入口 —— 它壞掉跟首頁按鈕壞掉一樣嚴重，
//    而 `ignoreDeadLinks` 擋不到它（config.mjs 不是 markdown，
//    VitePress 的死連結檢查**不掃它**）。
//    ⚠️ 這正是「內建檢查有它的邊界」—— 不可假設 build 綠就代表全站可達。
const cfgSrc = existsSync(cfgPath) ? readFileSync(cfgPath, "utf8") : "";
const navBlock = cfgSrc.slice(cfgSrc.indexOf("nav:"), cfgSrc.indexOf("sidebar:"));
const navLinks = [...navBlock.matchAll(/link:\s*"([^"]+)"/g)].map((x) => x[1]);
ck(`導覽列有連結可驗（${navLinks.length} 條）`, navLinks.length >= 3, String(navLinks));
for (const l of navLinks) {
  if (!l.startsWith("/") || l === "/") continue;
  const rel = decodeURIComponent(l.replace(/\.(md|html)$/, "")).replace(/^\//, "").replace(/\/$/, "");
  const ok = existsSync(path.join(ROOT, "docs", rel + ".md"))
          || existsSync(path.join(ROOT, "docs", rel, "index.md"));
  ck(`  ${l}`, ok, "導覽列指向不存在的頁 ⇒ 點了就是 404");
}

// ── ⑤ 🔴 搬家對應表：直接測函式本身 ──────────────────────
console.log("\n【⑤】🔴 搬家對應表（MOVED）—— 搬家 ≠ 刪除");
// 🔴 為什麼要單獨測（2026-10-01 植入驗證發現的）：
//    MOVED 只在「搬家當下」用得到，連結改完後拿掉它**所有測試照樣全綠** ——
//    等於這個機制完全沒有測試守著，下次搬目錄時才發現它不見了。
//    ⚠️ 而那一次的代價是：115 條連結被當成死連結**直接砍掉**
//       （196 個檔案裡的 stock 連結一次消失），而頁面其實都還在。
//
// 🔴 判準：搬家 ≠ 刪除。檔案還在就要改指向，「拿掉連結」只給真的不存在的。
const normSrc = readFileSync(path.join(ROOT, "scripts/normalize-links.mjs"), "utf8");
// ⚠️ 掃原始碼時**必須先剝掉註解** —— 第一版寫 `/applyMoved\(/.test(src)`，
//    而停用那段之後註解裡仍有 `applyMoved` 三個字 ⇒ 植入後照樣全綠。
//    🔴 「這個識別字出現過」與「這段程式真的在跑」是兩件事。
const normCode = normSrc
  .split("\n")
  .filter((l) => !l.trim().startsWith("//") && !l.trim().startsWith("*"))
  .join("\n");
ck("MOVED 對應表還在", /const MOVED\s*=/.test(normCode),
   "沒有它的話，下次搬目錄會把舊連結整批砍掉而不是改指向");
ck("🔴 失敗時真的會呼叫 applyMoved（剝掉註解後仍在）",
   /applyMoved\(/.test(normCode) && /if\s*\(!target\)/.test(normCode),
   "宣告了 MOVED 卻沒接進判定 ⇒ 等於沒做");

// 🔴 行為層：真的跑一次 normalize，驗它會把舊路徑**改指向**而不是砍掉。
//    ⚠️ 只掃原始碼不夠 —— 上面兩條在「函式還在但邏輯被改壞」時仍會過。
const probe = path.join(ROOT, "docs/pages/posts/_tmp-moved-probe.md");
try {
  const old = movedOldPath(normSrc);
  if (old) {
    writeFileSync(probe, `# probe\n\n[舊連結](${old})\n`, "utf8");
    let rc = 0, out = "";
    try {
      out = execFileSync("node", [path.join(ROOT, "scripts/normalize-links.mjs"), "--dry-run"],
                         { cwd: ROOT, encoding: "utf8" });
    } catch (e) { rc = e.status ?? 1; out = (e.stdout || "") + (e.stderr || ""); }
    const unlinked = Number((out.match(/(\d+)\s+🔴 目標不存在/) || [0, 0])[1]);
    ck(`🔴 舊路徑被改指向而不是砍掉（${old}）`, unlinked === 0,
       `有 ${unlinked} 筆被判成「目標不存在」⇒ 搬家對應沒生效，連結會被砍`);
  } else {
    ck("MOVED 裡取得到一筆舊路徑可測", false, "正規表示式沒抓到");
  }
} finally {
  if (existsSync(probe)) unlinkSync(probe);
}

function movedOldPath(src) {
  const m = src.match(/\["(\/pages\/[^"]+\.md)",\s*"\/pages\/[^"]+"\]/);
  return m ? m[1] : null;
}

const movedPairs = [...normSrc.matchAll(/\["(\/pages\/[^"]+)",\s*"(\/pages\/[^"]+)"\]/g)];
ck(`MOVED 裡有對應規則（${movedPairs.length} 條）`, movedPairs.length >= 1);
for (const [, from, to] of movedPairs) {
  const rel = to.replace(/^\//, "").replace(/\/$/, "");
  const ok = existsSync(path.join(ROOT, "docs", rel))
          || existsSync(path.join(ROOT, "docs", rel + ".md"))
          || existsSync(path.join(ROOT, "docs", rel, "index.md"));
  ck(`  ${from} → ${to}`, ok, "🔴 對應表指向的新位置不存在 ⇒ 舊連結會被誤砍");
}

// ── ⑥ 🔴 導覽列與首頁推薦的頁面，內容不可是空的 ──────────
console.log("\n【⑥】🔴 門面上的頁面不可是空白頁");
// 🔴 為什麼（2026-10-01）：
//    首頁 features「玄學術數」卡片指向的 index.md 只有一行連結（100 字），
//    而它底下還有一個 0 bytes 的檔案 —— 線上 HTTP 200、build 零錯誤、
//    連結檢查全綠，**而訪客點進去看到一片空白**。
//
//    ⚠️ 全站當時有 20 頁這種「200 的空白頁」。
//    🔴 但判準不是「全站不准有空白頁」—— `life/task/` 的日誌有幾天
//       沒寫是歷史事實，改它等於篡改紀錄。
//    ✅ 判準是**「門面上的」不可空** ——
//       首頁按鈕、首頁 features 卡片、導覽列指到的頁面。
//       那些是我主動推薦給訪客的，推薦一個空白頁才是問題。
function bodyChars(file) {
  if (!existsSync(file)) return -1;
  let t = readFileSync(file, "utf8");
  t = t.replace(/^---[\s\S]*?^---/m, "");    // frontmatter
  t = t.replace(/^#.*$/gm, "");              // 🔴 標題不算內容（只有標題＝空白頁）
  t = t.replace(/```[\s\S]*?```/g, "");
  return t.replace(/\s/g, "").length;
}
const facade = new Set();
// 首頁 hero 按鈕 ＋ features 卡片
for (const m of readFileSync(path.join(ROOT, "docs/index.md"), "utf8")
                  .matchAll(/link:\s*(\/pages\/\S+)/g)) facade.add(m[1].trim());
// 導覽列
for (const m of readFileSync(path.join(ROOT, "docs/.vitepress/config.mjs"), "utf8")
                  .matchAll(/link:\s*"(\/pages\/[^"]+)"/g)) facade.add(m[1]);
ck(`抓到門面頁面（${facade.size} 個）`, facade.size >= 4,
   "抓不到就代表首頁/config 格式變了，斷言已失效");
let empties = [];
// ⚠️ 兩類例外，不是放水 —— 它們的內容確實不在 .md 裡：
//    · `posts/index.md`  由 sync-posts.mjs 產生的文章清單，內容是 frontmatter 的資料
//    · `aboutMe/index.md` 只有 `<Resume />` 一行，真正的內容在 Resume.vue（約 800 行）
//    🔴 判準不是「檔案很短就放過」，是**「內容是不是真的存在於別處」** ——
//       所以要去驗那個別處，不是直接豁免。
const EXEMPT = {
  "/pages/posts/": () => existsSync(path.join(ROOT, "scripts/sync-posts.mjs")),
  "/pages/posts/index.md": () => existsSync(path.join(ROOT, "scripts/sync-posts.mjs")),
  "/pages/aboutMe/": () => bodyChars(path.join(ROOT, "docs/.vitepress/components/Resume.vue")) > 500,
  "/pages/aboutMe/index.md": () => bodyChars(path.join(ROOT, "docs/.vitepress/components/Resume.vue")) > 500,
};
for (const url of facade) {
  if (EXEMPT[url]) {
    // 🔴 豁免要自己驗 —— 「內容在別處」如果那個別處也空了，就不該豁免
    ck(`  ${url} 的內容在別處且仍存在`, EXEMPT[url](),
       "豁免的前提不成立了 ⇒ 這頁真的變成空白頁");
    continue;
  }
  let f = path.join(ROOT, "docs", url.replace(/^\//, ""));
  if (!f.endsWith(".md")) f = path.join(f, "index.md");
  const n = bodyChars(f);
  if (n >= 0 && n < 40) empties.push(`${url}（${n} 字）`);
}
ck("🔴 門面頁面都有實際內容", empties.length === 0,
   empties.length ? `空白頁：${empties.join(", ")}` : "");

console.log("\n【⑦】🔴 目錄頁宣稱的篇數 vs 實際檔案");
// 🔴 2026-10-01 C-5：改寫 studyNotes/index.md 時我在文案裡寫了篇數
//    （「Vue 38 篇」「股票 19 篇」…）—— 那就是**第二個來源**，必然漂移。
//
//    ⚠️ 跟 STRUCTURE.md 的處理不同：那份是內部文件，可以要求它別寫；
//    這是**給訪客看的頁面**，寫出「19 篇」對讀者有用（判斷值不值得點）。
//    🔴 所以不是禁止它寫，是**驗它寫的是對的**。
//
// ⚠️ 第一版用 `/Vue[^\n]{0,40}?(\d+)\s*篇/` 去猜，四條紅燈全是 regex 問題
//    不是文案錯：「Vue」先撞到「31 篇指令與 API」、「股票」跟「19 篇」
//    中間字數超過 40。
//    🔴 **靠 regex 猜文案必然脆** —— 文案本來就該能自由改寫。
//    ✅ 改成在文案裡放明確標記 `<!-- count:<路徑> -->`，
//       測試只認那個標記。標記不見了報 FAIL（斷言失效 ≠ 通過）。
const COUNT_MARK = /<!--\s*count:(\S+?)\s+(\d+)\s*-->/g;
const pagesToCheck = [
  "docs/pages/studyNotes/index.md",
  "docs/pages/studyNotes/contents/vue/index.md",
];
function countMdIn(rel) {
  const dir = path.join(ROOT, rel);
  if (!existsSync(dir)) return -1;
  let n = 0;
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (["dist", "cache"].includes(e.name)) continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) n++;
    }
  };
  walk(dir);
  return n;
}
let marks = 0;
for (const rel of pagesToCheck) {
  const src = readFileSync(path.join(ROOT, rel), "utf8");
  for (const m of src.matchAll(COUNT_MARK)) {
    marks++;
    const real = countMdIn(m[1]);
    ck(`${path.basename(rel)} 宣稱 ${m[1]} = ${m[2]} 篇（實際 ${real}）`,
       Number(m[2]) === real,
       real < 0 ? "🔴 標記指向不存在的目錄" : "給訪客看的數字過期了");
  }
}
// 🔴 一個標記都沒找到 ⇒ 標記被改掉了，這整節形同沒跑
ck(`找得到 count 標記（${marks} 個）`, marks >= 6,
   "標記不見了 ⇒ 這節的斷言全部失效，不是通過");

// 🔴 這兩頁不可再出現與事實不符的自嘲
const sn = readFileSync(path.join(ROOT, "docs/pages/studyNotes/index.md"), "utf8");
const vueIdx = readFileSync(path.join(ROOT, "docs/pages/studyNotes/contents/vue/index.md"), "utf8");
for (const bad of ["隨便寫寫", "一個字都還沒動"]) {
  ck(`目錄頁沒有「${bad}」`, !sn.includes(bad),
     "94 篇筆記說自己是隨便寫的，或說沒寫而實際有寫 —— 兩種都在誤導訪客");
}
ck("TypeScript 沒有拼成 TpyeScript",
   !sn.includes("TpyeScript") && !vueIdx.includes("TpyeScript"));

console.log(`\n${pass}/${pass + fail} 通過`);
process.exit(fail ? 1 : 0);
