<script setup>
/**
 * FeatureSpotlight.vue —— 首頁 features 卡片的「邊框聚光網格」（2026-11-27）
 *
 * 游標在整個 .VPFeatures 區塊內移動時，對「每一張」卡片寫入游標相對於它的座標
 * （--x / --y）。光暈本身全部是 theme/style.css 的 radial-gradient 畫的 ——
 * 這支元件不渲染任何東西，只負責座標。
 *
 * 🔴 為什麼是每張卡都算、不是只算游標底下那張：
 *    光要能「跨越」相鄰卡片的邊框 —— 游標在兩張卡之間的縫上時，兩張卡都要被照到。
 *
 * ⚠️ 只處理 pointerType === 'mouse'（含觸控板）：手機手指一碰就是點進連結，
 *    沒有「移動中」可言，硬做只會讓光卡在最後一次點的位置。
 * 🔴 onBeforeUnmount 一定要拔監聽（SPA 換頁不會重新整理頁面）。
 */
import { onMounted, onBeforeUnmount } from "vue";

let box = null;
let cards = [];
let raf = 0;
let last = null;

function paint() {
  raf = 0;
  if (!last) return;
  for (const c of cards) {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--x", `${last.x - r.left}px`);
    c.style.setProperty("--y", `${last.y - r.top}px`);
  }
}

function onMove(e) {
  if (e.pointerType && e.pointerType !== "mouse") return;
  last = { x: e.clientX, y: e.clientY };
  if (!raf) raf = requestAnimationFrame(paint); // 一幀最多算一次
}

function onLeave() {
  last = null;
  for (const c of cards) {
    c.style.removeProperty("--x");
    c.style.removeProperty("--y");
  }
}

onMounted(() => {
  box = document.querySelector(".VPFeatures");
  if (!box) return;
  cards = [...box.querySelectorAll(".VPFeature")];
  box.classList.add("has-spotlight"); // CSS 只在 JS 真的接上時才換掉原本的邊框
  box.addEventListener("pointermove", onMove, { passive: true });
  box.addEventListener("pointerleave", onLeave);
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  if (!box) return;
  box.removeEventListener("pointermove", onMove);
  box.removeEventListener("pointerleave", onLeave);
  box.classList.remove("has-spotlight");
  box = null;
  cards = [];
});
</script>

<template>
  <span hidden aria-hidden="true" class="feature-spotlight-anchor"></span>
</template>
