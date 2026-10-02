#!/usr/bin/env node
/**
 * test-structure.mjs —— `STRUCTURE.md` 裡的數字必須跟實際檔案一致。
 *
 * 🔴 這支在防什麼（2026-10-01）
 *
 * 結構文件最大的風險不是「寫錯」，是**寫對之後慢慢過期** ——
 * 而過期的文件跟正確的文件**長得一模一樣**，讀的人沒有訊號分辨。
 *
 * 實際發生：盤點當天我寫下「Resume.vue 764 行」，而同一天我已經
 * 加過註解，實際是 805 行。**文件在寫下的那一刻就已經錯了。**
 *
 * ⚠️ 教訓：精確行數這類「改一次就變」的數字根本不該寫進文件
 *    （已改成概數）。但篇數會變得慢，值得寫 —— 所以要有東西盯著。
 *
 * 🔴 判準：文件裡宣稱的每個篇數，都要能從檔案系統算出同一個值。
 *    算不出來就是文件過期，不是測試壞了。
 *
 * ⚠️ 本測試刻意**只驗「文件有寫的」**，不要求「所有目錄都要寫進文件」——
 *    後者會讓每次新增目錄都紅，變成噪音而被忽略。
 *
 * 跑法：node scripts/test-structure.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOC = path.join(ROOT, "STRUCTURE.md");
let pass = 0, fail = 0;
const ck = (name, ok, hint = "") => {
  if (ok) { pass++; console.log(`  ✅ ${name}`); }
  else { fail++; console.log(`  🔴 FAIL ${name}${hint ? "  " + hint : ""}`); }
};

// 遞迴數 .md（排除建置產物）
function countMd(dir) {
  if (!existsSync(dir)) return -1;
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (["dist", "cache", "node_modules"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) n += countMd(p);
    else if (e.name.endsWith(".md")) n++;
  }
  return n;
}

console.log("【①】STRUCTURE.md 存在且不會被發布成網頁");
ck("STRUCTURE.md 在 repo 根目錄", existsSync(DOC));
// 🔴 放進 docs/ 會被 VitePress 當成一頁發布出去 —— 盤點當天差點犯
ck("🔴 不在 docs/ 底下（否則會變成公開網頁）",
   !existsSync(path.join(ROOT, "docs/STRUCTURE.md")),
   "docs/ 裡的 .md 會被 build 成網頁，內部筆記不該公開");

const doc = existsSync(DOC) ? readFileSync(DOC, "utf8") : "";

console.log("\n【②】🔴 文件宣稱的篇數 vs 實際檔案");
// 文件裡的表格欄位：| `posts/` | 1 | ... 以及 | `vue/` | 62 | ...
const DIRS = {
  "docs/pages": null,                                  // 從「322 篇」那句抓
  "docs/pages/posts": "posts",
  "docs/pages/studyNotes": "studyNotes",
  "docs/pages/life": "life",
  "docs/pages/occult": "occult",
  "docs/pages/aboutMe": "aboutMe",
  "docs/pages/legal": "legal",
  "docs/pages/life/task": "life/task",
  "docs/pages/studyNotes/contents/vue": "vue",
  "docs/pages/studyNotes/contents/stock": "stock",
  "docs/pages/studyNotes/contents/typeScript": "typeScript",
  "docs/pages/studyNotes/contents/javaScript": "javaScript",
};

// 總篇數：文件開頭寫「**322 篇 markdown。**」
const totalClaim = Number((doc.match(/\*\*(\d+)\s*篇 markdown/) || [0, 0])[1]);
const totalReal = countMd(path.join(ROOT, "docs/pages"));
ck(`總篇數 ${totalClaim} = 實際 ${totalReal}`, totalClaim === totalReal,
   totalClaim === 0 ? "文件裡找不到「N 篇 markdown」這句 ⇒ 格式被改過，斷言失效"
                    : "文件過期，重新盤點");

for (const [rel, label] of Object.entries(DIRS)) {
  if (!label) continue;
  const real = countMd(path.join(ROOT, rel));
  // 在表格列裡找：| `label/` | N |   或   | `label` | N |
  const esc = label.replace(/[/]/g, "\\/");
  const m = doc.match(new RegExp("\\|\\s*`" + esc + "\\/?`\\s*\\|\\s*\\*{0,2}(\\d+)\\*{0,2}\\s*\\|"));
  if (!m) { ck(`${label}：文件裡找得到這一列`, false, "表格格式變了 ⇒ 這條斷言已失效，不是通過"); continue; }
  const claim = Number(m[1]);
  ck(`${label}  文件 ${claim} = 實際 ${real}`, claim === real, "文件過期");
}

console.log("\n【③】文件描述的事實還成立嗎");
// 🔴 這些是「寫死的結論」，最容易活得比它的證據還久
const facts = [
  ["posts/ 由腳本產生", existsSync(path.join(ROOT, "scripts/sync-posts.mjs"))],
  ["legal/ 兩頁都還在（OAuth 紅線）",
   existsSync(path.join(ROOT, "docs/pages/legal/privacy.md")) &&
   existsSync(path.join(ROOT, "docs/pages/legal/terms.md"))],
  ["Resume.vue 還是「關於我」的內容來源",
   readFileSync(path.join(ROOT, "docs/pages/aboutMe/index.md"), "utf8").includes("<Resume />")],
  ["scripts/ 支數與文件表格一致",
   readdirSync(path.join(ROOT, "scripts")).filter((f) => f.endsWith(".mjs")).length ===
   (doc.match(/`(sync-posts|publish|normalize-links|test-sync-posts|test-links|test-theme|test-structure)\.mjs`\s*\|/g) || []).length],
];
for (const [name, ok] of facts) ck(name, ok);

// ── 🔴 config.mjs 不可有「看起來在做事但實際沒作用」的設定 ──
//
//   2026-10-02 拿掉 `rewrites: { "/pages/(.*)": "/(.*)" }`。
//   它從一開始就完全沒作用：官方（vitepress.dev/guide/routing）的
//   rewrites 是「**檔案路徑** → 檔案路徑」，動態段用 path-to-regexp
//   的 `:slug*`，不是 regex 的 `(.*)`；且 key 不帶開頭斜線、要含 `.md`。
//   實證：拿掉前後 323 個 html 的 md5 **逐檔完全相同**。
//
//   ⚠️ 這條擋的不是「rewrites 這個功能」，是**無效的 regex 寫法**——
//   真的要用 rewrites 就照官方語法寫，那樣這條不會誤殺。
//   🔴 要先剝註解再找，否則上面這段說明文字本身會被當成設定。
const cfgSrc = readFileSync(path.join(ROOT, "docs/.vitepress/config.mjs"), "utf8");
const cfgNoComment = cfgSrc
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .split("\n").map((l) => l.replace(/\/\/.*$/, "")).join("\n");
ck("🔴 config 沒有 regex 寫法的 rewrites（那種寫法完全不生效）",
   !/rewrites\s*:/.test(cfgNoComment) ||
   !/["'][^"']*\(\.\*\)[^"']*["']/.test(cfgNoComment),
   "`(.*)` 是 regex，VitePress 要的是 path-to-regexp 的 `:slug*`；"
   + "寫錯不會報錯，只會安靜地什麼都不做");

// 🔴 產物一定要在 pages/ 底下 —— 這是 699 個站內連結與已收錄網址的前提。
//    若有人把 rewrites 改「對」，這條會紅，提醒他那會讓全站網址改變。
if (existsSync(path.join(ROOT, "docs/.vitepress/dist"))) {
  ck("🔴 build 產物仍在 dist/pages/（網址格式沒被改掉）",
     existsSync(path.join(ROOT, "docs/.vitepress/dist/pages")),
     "pages/ 不見了 ⇒ 網址從 /vlog/pages/xxx 變成 /vlog/xxx，"
     + "321 頁已收錄連結與 699 個站內連結全部失效");
}

// 🔴 文件不該寫精確行數 —— 改一次註解就過期
ck("🔴 文件沒有寫 .vue 的精確行數", !/Resume\.vue[^\n]*（\d{3,} 行）/.test(doc),
   "精確行數每改一次註解就過期；用概數或不寫");

console.log("\n【④】🔴 篇數只能有一個來源");
// 踩雷：CLAUDE.md 原本自己列了「studyNotes 75 篇、task 239 篇」，
// 實際是 94 / 203 —— 兩個數字躺在那裡過期，而讀到的人會拿它當事實。
// 🔴 修法是「移除第二份」，不是「把第二份也改對」——
//    後者只撐到下次新增檔案。
const claudeMd = readFileSync(path.join(ROOT, "CLAUDE.md"), "utf8");
const dup = [...claudeMd.matchAll(/^.*docs\/pages\/\S+\s+\d+\s*篇.*$/gm)].map((m) => m[0].trim());
ck("🔴 CLAUDE.md 沒有自己列篇數", dup.length === 0,
   dup.length ? `重複的來源必然漂移：${dup.slice(0, 2).join(" / ")}` : "");

console.log(`\n${pass}/${pass + fail} 通過`);
process.exit(fail ? 1 : 0);
