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
import { readFileSync, existsSync } from "node:fs";
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

console.log(`\n${pass}/${pass + fail} 通過`);
process.exit(fail ? 1 : 0);
