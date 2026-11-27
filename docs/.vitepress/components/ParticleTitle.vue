<script setup>
/**
 * ParticleTitle.vue —— 首頁 hero 的文字粒子化（2026-11-27）
 *
 * 原本的 `hero.text`（一行純文字）改成 Canvas 2D 粒子：文字先畫在離屏畫布上，
 * 每隔數個像素取樣不透明的點當「目標位置」，粒子從畫面各處飛來聚合成字，
 * 游標靠近時被推開、放開後以彈簧力＋阻尼回位。
 *
 * 🔴 零新依賴（不用 GSAP）—— 這個效果只需要 rAF ＋ fillRect。
 *
 * ── 幾個刻意的決定（改之前先看完）────────────────────────────
 *
 * ① 文字來源是 frontmatter 的 `particleTitle`，**不是 `hero.text`**。
 *    ⚠️ 兩個都寫 ⇒ 站上會同時出現「粒子標題」與「VitePress 畫的純文字標題」兩份。
 *
 * ② 真實文字留在 DOM 裡（`<p class="pt-label">`，視覺上隱藏但螢幕閱讀器與
 *    爬蟲讀得到），canvas 是 `aria-hidden="true"` 的純裝飾。
 *    🔴 用 `<p>` 而不是 `<h2>`：原本的 hero.text 就是 `<p class="text">`，
 *       而 hero 名稱是 `<h1>` —— 插一個 h2 在 h1 之前會把標題階層弄反。
 *
 * ③ 顏色一律從主題讀，**不指定任何新顏色**（CLAUDE.md §6）：
 *    一般點＝hero 名稱的漸層（`--vp-home-hero-name-background`，依 x 內插），
 *    被推離原位的點＝`--vp-c-brand-1`（讓瀏覽器解析 var() 後讀回來，不寫死）。
 *    切換深／亮色模式時由 MutationObserver 重新讀。
 *
 * ④ 所有 canvas／window 操作都在 onMounted 之後 —— VitePress build 是 SSR，
 *    那時候沒有 window、沒有 canvas、沒有 document.fonts。
 *    🔴 onBeforeUnmount 一定要收乾淨：VitePress 是 SPA，換頁時元件卸載而
 *       rAF 迴圈不會自己停 ⇒ 會留下一個看不見又在燒電的幽靈迴圈。
 *
 * ⑤ 頁面不可見（document.hidden）或畫布滾出視窗（IntersectionObserver）就停 rAF。
 *
 * ⑥ `prefers-reduced-motion: reduce` ⇒ 不做進場、不綁游標，直接把點畫在目標位置。
 */
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";

const { frontmatter } = useData();
const title = computed(() => frontmatter.value.particleTitle || "");

const root = ref(null);
const cv = ref(null);

/* ── 可調參數（單位都是 CSS px）────────────────────────────── */
const PUSH_R = 90; // 游標排斥半徑
const PUSH_F = 2.4; // 排斥力（半徑邊緣 0 → 中心最大）
const SPRING = 0.075; // 回位彈簧係數（每顆再乘 0.7～1.3 讓動作不整齊）
const DAMP = 0.86; // 阻尼，沒有它會一直彈
const OFF_MIN = 3; // 離原位超過這個距離開始轉強調色
const OFF_MAX = 26; // 到這個距離完全是強調色
const STOPS = 24; // 漸層切成幾段（粒子存段號，不存顏色字串）
const LEVELS = 6; // 原色→強調色的過渡階數
const ALPHA = 140; // 離屏取樣的 alpha 門檻（反鋸齒的半透明邊不算）

/**
 * 粒子數上限：桌機約上千，手機降到 1/4 以下。
 * 🔴 真正的數量由「取樣間距」決定（見 sample()）—— 這裡只定上限，
 *    字數或字級變了也不會突然暴增。
 */
function budget(w) {
  // 🔴 2026-11-27 實測：上限 1400／字級 56px 時「攤」這種筆畫多的字只取得到 ~14 點寬，
  //    整排糊成一片讀不出來 ⇒ 字級放大到撐滿容器、上限一起拉高（每幀 2000 點的物理運算仍很輕）
  if (w < 480) return 900; // 手機
  if (w < 768) return 1400;
  return 2400;
}

/* ── 以下都不是 reactive state：只在瀏覽器裡、onMounted 之後用 ── */
let ctx = null; // 畫面上的 canvas
let off = null; // 離屏畫布（只為了取樣文字形狀）
let octx = null;
let parts = [];
let pal = []; // pal[漸層段][過渡階] → "rgb(r,g,b)"
let W = 0;
let H = 0;
let dpr = 1;
let dot = 2; // 方點邊長
let raf = 0;
let running = false;
let inView = true;
let alive = false;
let still = false; // reduced-motion：靜態
const ptr = { x: 0, y: 0, on: false };
let ro = null;
let io = null;
let mo = null;
let tResize = 0;

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── 顏色 ──────────────────────────────────────────────────── */
function toRGB(str) {
  const s = (str || "").trim();
  const hex = s.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4)
      h = h
        .slice(0, 3)
        .split("")
        .map((c) => c + c)
        .join("");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }
  const n = s.match(/-?[\d.]+/g); // rgb() / rgba()
  return n && n.length >= 3 ? [+n[0], +n[1], +n[2]] : null;
}
const lerp = (a, b, t) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
const str = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;

function buildPalette() {
  // 強調色：canvas 自己的 CSS 是 color: var(--vp-c-brand-1)，
  // 讓瀏覽器把 var 鏈解析完，再從 computed style 讀回來 ⇒ 不寫死、跟著主題變。
  const accent = toRGB(getComputedStyle(cv.value).color) || [100, 108, 255];
  // 一般點：hero 名稱的漸層（theme/style.css 的 --vp-home-hero-name-background）
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--vp-home-hero-name-background"
  );
  const found = raw.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/gi) || [];
  // 讀不到才用備援值（＝style.css 現在那兩個色），不是另外指定新顏色
  const c0 = (found.length >= 2 && toRGB(found[0])) || [189, 52, 254]; // #bd34fe
  const c1 =
    (found.length >= 2 && toRGB(found[found.length - 1])) || [65, 209, 255]; // #41d1ff
  pal = [];
  for (let i = 0; i < STOPS; i++) {
    const base = lerp(c0, c1, STOPS === 1 ? 0 : i / (STOPS - 1));
    const col = [];
    for (let l = 0; l < LEVELS; l++)
      col.push(str(lerp(base, accent, l / (LEVELS - 1))));
    pal.push(col);
  }
}

/* ── 取樣 ──────────────────────────────────────────────────── */
function setFont(c, weight, family, size) {
  c.font = `${weight} ${size}px ${family}`;
  // 🔴 font 是字串塞進去的，寫壞不會報錯，只會保留上一個值 ⇒ 要確認真的吃進去了
  if (!c.font.includes(`${size}px`)) c.font = `${weight} ${size}px sans-serif`;
}

function sample() {
  const text = title.value;
  if (!text || !root.value || !cv.value) return;
  still = reduced();

  // 字型：讀 hero 標題實際算出來的 font-family / font-weight（不猜、不寫死）
  const heroName = document.querySelector(".VPHero .name");
  const hs = getComputedStyle(heroName || root.value);
  const family = hs.fontFamily || "sans-serif";
  const weight = hs.fontWeight || "700";
  const boxW = Math.max(160, Math.floor(root.value.clientWidth));

  // 字級：從 hero 標題的字級起跳，量過之後縮到塞得進容器（🔴 不可超出容器）
  // 🔴 這是「大標題」：字級撐滿容器寬，上限是 hero 名稱字級的 2 倍
  //    （照 hero 名稱字級時取樣點太少，筆畫多的字讀不出來 —— 2026-11-27 截圖實證）
  const base = Math.round(parseFloat(hs.fontSize) || 56);
  let size = 100;
  setFont(octx, weight, family, size);
  const w0 = octx.measureText(text).width;
  const inkMax = boxW - 2;
  size = Math.max(12, Math.min(base * 2, Math.floor((size * inkMax) / w0)));

  W = boxW;
  H = Math.round(size * 1.6); // 留一點上下空間給排斥位移

  // 離屏畫布用 1x（取樣間距本來就有好幾 px，放大解析度只是浪費）
  off.width = W;
  off.height = H;
  setFont(octx, weight, family, size); // 🔴 改 canvas 尺寸會重置 context 狀態
  octx.textAlign = /^(left|start)$/.test(getComputedStyle(root.value).textAlign)
    ? "left"
    : "center";
  octx.textBaseline = "middle";
  octx.fillStyle = "#fff"; // 只是遮罩：只有 alpha 會被讀，顏色不會出現在畫面上
  octx.fillText(text, octx.textAlign === "left" ? 1 : W / 2, H / 2);

  const data = octx.getImageData(0, 0, W, H).data;
  const cap = budget(W);
  // 間距由小往大試，第一個「點數在上限內」的就用它 ⇒ 手機自動變少
  let pts = [];
  let step = 2;
  for (; step <= 9; step++) {
    pts = [];
    for (let y = step >> 1; y < H; y += step)
      for (let x = step >> 1; x < W; x += step)
        if (data[(y * W + x) * 4 + 3] > ALPHA) pts.push(x, y);
    if (pts.length / 2 <= cap) break;
  }
  dot = Math.max(1.5, Math.min(3, step * 0.8));

  const total = pts.length / 2;
  const keep = total > cap ? cap / total : 1; // 間距 9 還是太多 ⇒ 隨機抽掉
  const prev = parts;
  const next = [];
  for (let i = 0; i < total; i++) {
    if (keep < 1 && Math.random() > keep) continue;
    const x = pts[i * 2];
    const y = pts[i * 2 + 1];
    const o = prev[next.length]; // resize：沿用現在的位置，只換目標 ⇒ 不會整批閃一下
    next.push({
      tx: x,
      ty: y,
      // 進場：從畫布內外隨機位置飛來（畫布會裁切，所以看起來是從各處飛進來）
      x: still ? x : o ? o.x : W * (Math.random() * 1.6 - 0.3),
      y: still ? y : o ? o.y : H * (Math.random() * 4 - 1.5),
      vx: o && !still ? o.vx : 0,
      vy: o && !still ? o.vy : 0,
      k: SPRING * (0.7 + Math.random() * 0.6),
      gi: Math.min(STOPS - 1, Math.floor((x / W) * STOPS)),
    });
  }
  parts = next;

  dpr = Math.min(2, window.devicePixelRatio || 1); // 上限 2，再高只是燒 GPU
  cv.value.width = Math.round(W * dpr);
  cv.value.height = Math.round(H * dpr);
  cv.value.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 之後一律用 CSS px 思考
}

/* ── 動畫 ──────────────────────────────────────────────────── */
function physics() {
  const r2 = PUSH_R * PUSH_R;
  for (const p of parts) {
    if (ptr.on) {
      const dx = p.x - ptr.x;
      const dy = p.y - ptr.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < r2 && d2 > 0.01) {
        const d = Math.sqrt(d2);
        const f = (1 - d / PUSH_R) * PUSH_F;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
    }
    p.vx = (p.vx + (p.tx - p.x) * p.k) * DAMP;
    p.vy = (p.vy + (p.ty - p.y) * p.k) * DAMP;
    p.x += p.vx;
    p.y += p.vy;
  }
}

function draw() {
  if (!ctx || !pal.length) return;
  ctx.clearRect(0, 0, W, H);
  const span = OFF_MAX - OFF_MIN;
  for (const p of parts) {
    const dx = p.x - p.tx;
    const dy = p.y - p.ty;
    const d = Math.sqrt(dx * dx + dy * dy);
    // 離原位越遠越接近強調色；回位的過程中自己就會漸漸回到原色
    let l = 0;
    if (d > OFF_MIN)
      l = Math.min(
        LEVELS - 1,
        1 + Math.round(((d - OFF_MIN) / span) * (LEVELS - 2))
      );
    ctx.fillStyle = pal[p.gi][l];
    ctx.fillRect(p.x - dot / 2, p.y - dot / 2, dot, dot);
  }
}

function tick() {
  physics();
  draw();
  raf = requestAnimationFrame(tick);
}
function play() {
  if (running || still || !alive) return;
  running = true;
  raf = requestAnimationFrame(tick);
}
function pause() {
  running = false;
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
}
function syncPlay() {
  if (inView && !document.hidden) play();
  else pause();
}

/* ── 事件 ──────────────────────────────────────────────────── */
// 滑鼠與觸控統一走 pointer events（手機不設 touch-action，觸控捲動時瀏覽器會發
// pointercancel ⇒ 排斥自動關掉，不會卡住頁面滾動）
function onPointer(e) {
  const r = cv.value.getBoundingClientRect();
  ptr.x = e.clientX - r.left;
  ptr.y = e.clientY - r.top;
  ptr.on = true;
}
function offPointer() {
  ptr.on = false;
}
function onResize() {
  clearTimeout(tResize);
  tResize = setTimeout(() => {
    if (!alive) return;
    sample();
    if (!running) draw(); // 暫停中或靜態模式：補畫一次
  }, 160);
}
function onTheme() {
  if (!alive) return;
  buildPalette();
  if (!running) draw();
}

onMounted(async () => {
  if (!title.value || !cv.value || !root.value) return;
  alive = true;
  ctx = cv.value.getContext("2d");
  off = document.createElement("canvas");
  octx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx || !octx) return;

  // 🔴 字型還沒載完就取樣 ⇒ 量到的是備援字型的形狀，位置會整排歪掉
  try {
    await document.fonts.ready;
  } catch {}
  if (!alive || !cv.value) return; // 等字型的期間可能已經換頁

  buildPalette();
  sample();
  draw();

  ro = new ResizeObserver(onResize);
  ro.observe(root.value);
  mo = new MutationObserver(onTheme); // html.dark 切換
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  if (still) return; // reduced-motion：靜態畫完就結束，不綁游標、不開迴圈

  const c = cv.value;
  c.addEventListener("pointermove", onPointer);
  c.addEventListener("pointerdown", onPointer);
  c.addEventListener("pointerleave", offPointer);
  c.addEventListener("pointercancel", offPointer);
  c.addEventListener("pointerup", offPointer);
  document.addEventListener("visibilitychange", syncPlay);
  io = new IntersectionObserver((es) => {
    inView = es.some((e) => e.isIntersecting);
    syncPlay();
  });
  io.observe(c);
  syncPlay();
});

onBeforeUnmount(() => {
  alive = false;
  pause();
  clearTimeout(tResize);
  ro?.disconnect();
  io?.disconnect();
  mo?.disconnect();
  document.removeEventListener("visibilitychange", syncPlay);
  const c = cv.value;
  if (c) {
    c.removeEventListener("pointermove", onPointer);
    c.removeEventListener("pointerdown", onPointer);
    c.removeEventListener("pointerleave", offPointer);
    c.removeEventListener("pointercancel", offPointer);
    c.removeEventListener("pointerup", offPointer);
  }
  parts = [];
  pal = [];
  ctx = null;
  off = null;
  octx = null;
});
</script>

<template>
  <div v-if="title" ref="root" class="particle-title">
    <!-- 🔴 真實文字（螢幕閱讀器／爬蟲讀得到）；canvas 只是裝飾 -->
    <p class="pt-label">{{ title }}</p>
    <canvas ref="cv" class="pt-canvas" aria-hidden="true"></canvas>
  </div>
</template>

<style scoped>
/* 🔴 CLAUDE.md §6：不可寫死顏色。
   這裡的 color 不是給文字看的 —— canvas 內容是 JS 畫的，
   這個 color 存在的唯一理由是讓 JS 從 computed style 讀回主題的強調色。 */
.particle-title {
  position: relative;
  color: var(--vp-c-brand-1);
  /* 跟著原本 hero.text 的寬度與對齊（.name/.text 是 392 / 576px，有圖時置中） */
  max-width: 392px;
  margin-left: auto;
  margin-right: auto;
  /* 先占住大約的高度，JS 量完字之後才知道精確值 ⇒ 少一次版面跳動 */
  min-height: 90px;
}

.pt-canvas {
  display: block;
  width: 100%;
}

/* 視覺上隱藏但仍可被讀取（不用 display:none —— 那會讓螢幕閱讀器也讀不到） */
.pt-label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (min-width: 640px) {
  .particle-title {
    max-width: 576px;
    min-height: 150px;
  }
}

@media (min-width: 960px) {
  .particle-title {
    /* ≥960px 的 hero 是左右欄、文字靠左 ⇒ 不再置中 */
    margin-left: 0;
    margin-right: 0;
    min-height: 180px;
  }
}
</style>
