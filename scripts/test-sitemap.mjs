#!/usr/bin/env node
/**
 * test-sitemap.mjs —— sitemap.xml 的回歸測試（每日自動跑）。
 *
 * 🔴 這支在防什麼（2026-10-20，Lonck 選 A 加 sitemap）
 *
 * VitePress 的 sitemap 網址是「hostname ＋ 相對路徑」，**不會自動加 base（/vlog/）**。
 * hostname 寫成 `https://lonck999.github.io/` 時，build 照樣成功、sitemap 照樣產生，
 * 但裡面 322 個網址**全部 404** —— 交給 Google 的是一份全錯的清單，而且沒有任何錯誤訊息。
 *
 * 所以不只測「檔案存在」，要測：
 *   ① 每一個 <loc> 都以 https://lonck999.github.io/vlog/ 開頭
 *   ② <loc> 數量 ＝ dist 裡的 html 頁數（扣 404.html）—— 漏頁或多頁都紅
 *   ③ 每個 <loc> 對得上 dist 裡真的有的檔案（不連網，離線也能跑）
 *
 * 會先跑一次 build（約 5 秒）。跑法：node scripts/test-sitemap.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "docs/.vitepress/dist");
const PREFIX = "https://lonck999.github.io/vlog/";
let pass = 0, fail = 0;
function ck(name, ok, detail = "") {
  if (ok) { pass++; console.log(`  ✅ ${name}`); }
  else { fail++; console.log(`  🔴 FAIL ${name}${detail ? "  " + detail : ""}`); }
}

execFileSync("npx", ["vitepress", "build", "docs"], { cwd: ROOT, stdio: "pipe" });
const file = path.join(DIST, "sitemap.xml");
ck("sitemap.xml 有產生", existsSync(file));
if (!existsSync(file)) process.exit(1);

const locs = [...readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const bad = locs.filter((u) => !u.startsWith(PREFIX));
ck(`每個網址都以 ${PREFIX} 開頭（${locs.length} 個）`, locs.length > 0 && bad.length === 0, bad.slice(0, 3).join(" "));

const htmls = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = path.join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n.endsWith(".html") && n !== "404.html") htmls.push(p);
  }
})(DIST);
ck(`網址數 ＝ 頁面數（${locs.length} vs ${htmls.length}）`, locs.length === htmls.length);

const missing = locs.filter((u) => {
  let rel = decodeURIComponent(u.slice(PREFIX.length).replace(/&amp;/g, "&"));  // XML 跳脫要先還原
  if (rel === "" || rel.endsWith("/")) rel += "index.html";
  return !existsSync(path.join(DIST, rel));
});
ck("每個網址都對得上真的檔案", missing.length === 0, missing.slice(0, 3).join(" "));

console.log(`\n${fail ? "🔴" : "✅"} ${pass} 通過、${fail} 失敗`);
process.exit(fail ? 1 : 0);
