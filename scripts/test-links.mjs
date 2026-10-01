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
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "node:fs";
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

console.log(`\n${pass}/${pass + fail} 通過`);
process.exit(fail ? 1 : 0);
