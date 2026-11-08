#!/usr/bin/env node
/**
 * test-breadcrumb.mjs —— 麵包屑的回歸測試（每日自動跑，run_all_regressions glob 撿 test-*.mjs）。
 *
 * 🔴 這支在防什麼（2026-11-08，Lonck 選 A 加麵包屑）
 *
 * 麵包屑是 build 時依網址自動產生的。會壞的方式全部都**不報錯、build 綠**：
 *   · 某一層給了連結但那層沒有目錄頁 ⇒ 點下去 404（`contents/`、`posts/` 就沒有 index.md）
 *   · 漏了 base（/vlog/）⇒ 每個連結都 404
 *   · slot 名稱打錯／元件沒掛上 ⇒ 全站一個都沒有，頁面照常 200
 *
 * 所以測 build 產物（HTML），不是測元件原始碼：
 *   ① 指定頁的麵包屑文字完全等於預期（Python-Day-03、Python 目錄、Vue 子頁、生活子頁）
 *   ② 全站每個 doc 頁都有麵包屑；首頁（home）、關於我（page 版型）沒有
 *   ③ 全站每個麵包屑連結都以 /vlog/ 開頭、且對得上 dist 裡真的檔案
 *   ④ 元件不寫死文字顏色（CLAUDE.md §6）
 *
 * 會先跑一次 build（約 5 秒）。跑法：node scripts/test-breadcrumb.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "docs/.vitepress/dist");
const BASE = "/vlog/";
let pass = 0, fail = 0;
function ck(name, ok, detail = "") {
  if (ok) { pass++; console.log(`  ✅ ${name}`); }
  else { fail++; console.log(`  🔴 FAIL ${name}${detail ? "  " + detail : ""}`); }
}

execFileSync("npx", ["vitepress", "build", "docs"], { cwd: ROOT, stdio: "pipe" });

const strip = (s) => s.replace(/<[^>]+>/g, "").trim();
function crumbsOf(file) {
  const t = readFileSync(path.join(DIST, file), "utf8");
  const nav = t.match(/<nav class="breadcrumb"[\s\S]*?<\/nav>/);
  if (!nav) return null;
  const items = [...nav[0].matchAll(/<(a|span) class="crumb[^"]*"[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => strip(m[2]));
  const links = [...nav[0].matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  return { text: items.join(" › "), links };
}

// ① 指定頁
const EXPECT = {
  "pages/studyNotes/contents/python/posts/python-day-03.html": "首頁 › 學習文章 › Python › Python-Day-03：if 條件判斷",
  "pages/studyNotes/contents/python/index.html": "首頁 › 學習文章 › Python",
  "pages/studyNotes/index.html": "首頁 › 學習文章",
  "pages/studyNotes/contents/vue/Vue/course/01-v-bind.html": "首頁 › 學習文章 › Vue › Vue › v-bind",
  "pages/life/讀物清單/書/index.html": "首頁 › 生活技能 › 讀物清單 › 書籍待讀清單",
  "pages/aboutMe/contents/works.html": null, // 只驗第二層是「關於我」，見下方
};
for (const [f, want] of Object.entries(EXPECT)) {
  const c = existsSync(path.join(DIST, f)) ? crumbsOf(f) : null;
  if (want === null) {
    ck(`${f} 第二層＝「關於我」`, c && c.text.split(" › ")[1] === "關於我", c ? `實際「${c.text}」` : "沒有麵包屑或沒有這頁");
    continue;
  }
  ck(`${f} ＝「${want}」`, c && c.text === want, c ? `實際「${c.text}」` : "沒有麵包屑或沒有這頁");
}

// ② 有／沒有
ck("首頁（home 版型）沒有麵包屑", crumbsOf("index.html") === null);
ck("關於我（page 版型）沒有麵包屑", crumbsOf("pages/aboutMe/index.html") === null);
const docs = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = path.join(d, n);
    if (statSync(p).isDirectory()) { if (n !== "assets") walk(p); }
    else if (n.endsWith(".html") && p.includes(`${path.sep}pages${path.sep}`)) docs.push(path.relative(DIST, p));
  }
})(DIST);
const without = docs.filter((f) => f !== "pages/aboutMe/index.html" && crumbsOf(f) === null);
ck(`pages/ 底下 doc 頁都有麵包屑（${docs.length - 1} 頁）`, docs.length > 100 && without.length === 0, without.slice(0, 3).join(" "));

// ③ 連結
const allLinks = new Set();
for (const f of docs) for (const l of crumbsOf(f)?.links || []) allLinks.add(l);
const badBase = [...allLinks].filter((l) => !l.startsWith(BASE));
ck(`麵包屑連結都帶 ${BASE}（${allLinks.size} 種）`, allLinks.size > 5 && badBase.length === 0, badBase.slice(0, 3).join(" "));
const dead = [...allLinks].filter((l) => {
  let rel = decodeURIComponent(l.slice(BASE.length));
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  return !existsSync(path.join(DIST, rel));
});
ck("麵包屑連結都對得上真的檔案", dead.length === 0, dead.slice(0, 3).join(" "));

// ④ 不寫死顏色（剝註解再掃）
const vue = readFileSync(path.join(ROOT, "docs/.vitepress/components/Breadcrumb.vue"), "utf8");
const css = (vue.match(/<style[\s\S]*?<\/style>/)?.[0] || "").replace(/\/\*[\s\S]*?\*\//g, "");
const hard = css.match(/color:\s*(#[0-9a-f]{3,8}|rgb|hsl|white|black)/i);
ck("Breadcrumb.vue 文字色只用 CSS 變數", css.length > 0 && !hard, hard?.[0] || "");

console.log(`\n${fail ? "🔴" : "✅"} ${pass} 通過、${fail} 失敗`);
process.exit(fail ? 1 : 0);
