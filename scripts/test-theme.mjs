#!/usr/bin/env node
/**
 * test-theme.mjs —— 自訂元件必須在亮/暗兩種模式下都可讀。
 *
 * 🔴 這支在防什麼（2026-10-01）
 *
 * `Resume.vue`（關於我那頁）在**亮色模式**下，姓名「蕭鼎澄」是
 * **白字白底，對比度 1.0** —— 整個左欄＋工作經歷全部隱形。
 *
 * 根因：那份元件有 38 處寫死的顏色、**0 處 CSS 變數、0 個 .dark 樣式**，
 *       等於它假設「背景永遠是深色」。而 VitePress 預設是亮色。
 *
 * ⚠️ 為什麼拖著沒被發現：作者自己開暗色模式，暗色下它完全正常。
 *    🔴 **預設狀態（第一次來的訪客看到的）才是要驗的那個。**
 *
 * ⚠️ 為什麼 `ignoreDeadLinks`／build 擋不到：
 *    那些只檢查「連得到嗎」，不檢查「看得見嗎」。
 *    🔴 頁面 200 ＋ build 綠 ＋ 文字在 DOM 裡，**而人類什麼都看不到**。
 *
 * ── 這支怎麼驗 ──────────────────────────────────
 *
 * ① 靜態：掃 components/*.vue 的 <style>，寫死顏色當文字色 ⇒ 擋。
 * ② 🔴 行為：啟 preview server ＋ headless Chrome，
 *    **兩種模式各量一次運算後的對比度**（WCAG 公式）。
 *    靜態掃不夠 —— 寫死顏色不一定不可讀，CSS 變數也不保證可讀。
 *
 * 跑法：node scripts/test-theme.mjs
 *       （沒有 Chrome 時只跑①並明說跳過②，不會假裝通過）
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { spawn, execFileSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, fail = 0, skip = 0;
const ck = (name, ok, hint = "") => {
  if (ok) { pass++; console.log(`  ✅ ${name}`); }
  else { fail++; console.log(`  🔴 FAIL ${name}${hint ? "  " + hint : ""}`); }
};

// ── ① 靜態：元件不可把「文字顏色」寫死 ────────────────────
console.log("【①】自訂元件的文字顏色必須用主題變數");
const COMP = path.join(ROOT, "docs/.vitepress/components");
const vues = existsSync(COMP) ? readdirSync(COMP).filter((f) => f.endsWith(".vue")) : [];
ck(`找得到元件（${vues.length} 支）`, vues.length > 0);

for (const f of vues) {
  const raw = readFileSync(path.join(COMP, f), "utf8");
  // 🔴 先剝註解 —— 「這個色碼出現過」與「這個色碼在用」是兩件事。
  //    今天踩過：斷言掃到註解裡的字，植入後照樣全綠。
  const code = raw.replace(/\/\*[\s\S]*?\*\//g, "")
                  .split("\n").filter((l) => !l.trim().startsWith("//")).join("\n");
  const styleM = code.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  if (!styleM) continue;
  const css = styleM[1];
  // 只抓「文字色」與「邊框色」—— 背景色寫死通常是刻意的裝飾
  const hard = [...css.matchAll(/(?:^|\s)(color|border(?:-\w+)?)\s*:\s*([^;]*#[0-9a-fA-F]{3,8}[^;]*);/g)];
  const textHard = hard.filter((m) => m[1] === "color");
  ck(`${f}：文字色不寫死（${textHard.length} 處）`, textHard.length === 0,
     textHard.length ? `寫死處：${textHard.slice(0, 3).map((m) => m[0].trim()).join(" / ")}` : "");
}

// ── ② 行為：兩種模式都量真實對比度 ────────────────────────
console.log("\n【②】🔴 兩種模式的實際對比度（WCAG AA：一般文字 ≥ 4.5）");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!existsSync(CHROME)) {
  skip++; console.log("  ⏭️  找不到 Chrome，跳過行為層（🔴 這不算通過）");
} else {
  // 🔴 必須自己現場 build，不可拿磁碟上現成的 dist。
  //
  //    踩雷（2026-10-01，寫完這支測試當天就驗出來）：
  //    原本的寫法是「dist 不存在就跳過，存在就直接量」。
  //    實測三種情況 ——
  //      ① dist 不存在          → 跳過 → exit 0 → 回歸報綠
  //      ② 原始碼壞了沒 rebuild → 行為層量舊 dist → ✅ 綠
  //      ③ ②＋靜態抓不到的壞法（var(--vp-c-bg)）→ **4/4 全綠**
  //         而真實原始碼是壞的、網站是壞的。
  //
  //    🔴 ③ 是完全靜默的失敗：測試說一切正常，使用者看到白字白底。
  //    根因是「量的東西不是這次的產出」—— 與測試邏輯對不對無關。
  //
  //    ✅ build 只要約 5 秒，沒有理由省。
  //    ⚠️ build 失敗要報 FAIL，**不可跳過** —— 編不出來本身就是問題。
  let built = false;
  try {
    execFileSync("npx", ["vitepress", "build", "docs"],
                 { cwd: ROOT, stdio: "ignore", timeout: 300000 });
    built = true;
  } catch (e) {
    ck("🔴 現場 build（行為層的前提）", false,
       `build 失敗 ⇒ 不能拿舊 dist 充當本次產出：${(e.message || "").slice(0, 80)}`);
  }
  if (built) {
    ck("🔴 現場 build 成功（量的是本次產出，不是磁碟舊檔）", true);
    const PORT = 4100 + (process.pid % 400);
    const CPORT = PORT + 1000;
    const preview = spawn("npx", ["vitepress", "preview", "docs", "--port", String(PORT)],
                          { cwd: ROOT, stdio: "ignore", detached: true });
    const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--no-sandbox",
      `--remote-debugging-port=${CPORT}`, `--user-data-dir=/tmp/cdp-theme-${process.pid}`,
      "--no-first-run", "--disable-extensions", "--disable-sync", "--hide-scrollbars",
      "--mute-audio", "--window-size=1440,900", "about:blank"], { stdio: "ignore", detached: true });
    try {
      await sleep(6000);
      const results = await audit(CPORT, `http://127.0.0.1:${PORT}/vlog/pages/aboutMe/`);
      for (const [mode, rows] of Object.entries(results)) {
        const worst = rows.length ? Math.min(...rows.map((r) => r.cr)) : null;
        ck(`${mode}：最低對比度 ${worst} ≥ 4.5（量到 ${rows.length} 組）`,
           rows.length > 0 && worst >= 4.5,
           rows.length === 0 ? "🔴 一組都沒量到 ⇒ 探針壞了，不是通過"
                             : `最差：${rows.filter((r) => r.cr < 4.5).map((r) => `"${r.txt}" ${r.cr}`).join(", ")}`);
      }
    } finally {
      try { process.kill(-preview.pid); } catch {}
      try { process.kill(-chrome.pid); } catch {}
    }
  }
}

console.log(`\n${pass}/${pass + fail} 通過${skip ? `（跳過 ${skip} 項 —— 🔴 跳過不等於通過）` : ""}`);
process.exit(fail ? 1 : 0);

function PROBE() { return `(() => {
  const lum = (c) => { const m = c.match(/[\\d.]+/g); if (!m) return null;
    const a = m.slice(0,3).map(Number).map(v => { v/=255;
      return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); });
    return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2]; };
  const ratio = (f,b) => { const L1=lum(f), L2=lum(b); if (L1===null||L2===null) return null;
    const [x,y] = L1>L2 ? [L1,L2] : [L2,L1]; return +(((x+0.05)/(y+0.05)).toFixed(2)); };
  // 🔴 往上找第一個「真的畫出來」的背景 —— 直接讀 el 的 backgroundColor
  //    多半是 transparent，拿它算會得到一個漂亮但假的數字。
  const bgOf = (el) => { let n = el;
    while (n && n !== document.documentElement) {
      const b = getComputedStyle(n).backgroundColor;
      if (b && !/rgba\\(0, 0, 0, 0\\)|transparent/.test(b)) return b;
      n = n.parentElement; }
    return getComputedStyle(document.body).backgroundColor; };
  const out = [], seen = new Set();
  for (const el of document.querySelectorAll('.VPContent *')) {
    const txt = (el.textContent||'').trim();
    if (!txt || txt.length > 60 || el.children.length > 0) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    const fg = cs.color, bg = bgOf(el), cr = ratio(fg, bg);
    if (cr === null) continue;
    const k = fg + '|' + bg; if (seen.has(k)) continue; seen.add(k);
    out.push({ txt: txt.slice(0,22), cr });
  }
  return out;
})()`; }

// ── CDP ──────────────────────────────────────────────────
async function audit(port, url) {
  const ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  let id = 0; const waiting = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  });
  await new Promise((r) => ws.addEventListener("open", r));
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const i = ++id;
    waiting.set(i, (m) => (m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result)));
    ws.send(JSON.stringify({ id: i, method, params, sessionId }));
    setTimeout(() => rej(new Error("timeout " + method)), 45000);
  });
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S("Page.enable"); await S("Runtime.enable");
  await S("Page.navigate", { url });
  await sleep(4000);
  const EVAL = (e) => S("Runtime.evaluate", { expression: e, returnByValue: true })
                        .then((r) => r.result.value);
  const out = {};
  for (const mode of ["light", "dark"]) {
    await EVAL(`document.documentElement.classList.${mode === "dark" ? "add" : "remove"}('dark')`);
    await sleep(700);
    out[mode] = await EVAL(PROBE());
  }
  ws.close();
  return out;
}
