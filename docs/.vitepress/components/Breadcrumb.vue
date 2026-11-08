<script setup>
// 🔴 2026-11-08 麵包屑（Lonck 選 A）。插在 `doc-before`，所有 doc 頁自動有，新文章不用設定。
//
//   路徑上每一層「有 index.md 的資料夾」才算一層（沒有目錄頁的 contents/、posts/ 跳過 ——
//   給連結就是死連結）。各層名稱由 config.mjs 的 `breadcrumbTitles` 提供（build 時掃檔產生，不寫死）。
//   驗證：scripts/test-breadcrumb.mjs（掃 build 產物：每個麵包屑連結都對得上真的檔案）。
import { computed } from "vue";
import { useData, withBase } from "vitepress";

const { page, theme, frontmatter } = useData();

const crumbs = computed(() => {
  const rel = page.value.relativePath; // 例：pages/studyNotes/contents/python/posts/python-day-03.md
  if (!rel || rel === "index.md") return [];
  const layout = frontmatter.value.layout;
  if (layout && layout !== "doc") return [];

  const titles = theme.value.breadcrumbTitles || {};
  const segs = rel.split("/");
  const isIndex = segs[segs.length - 1] === "index.md";
  // 自己這一頁所在的資料夾：index.md 的話那個資料夾就是自己，不列成上一層
  const dirCount = segs.length - 1 - (isIndex ? 1 : 0);

  const list = [{ text: "首頁", link: withBase("/") }];
  for (let i = 1; i <= dirCount; i++) {
    const key = "/" + segs.slice(0, i).join("/") + "/";
    if (titles[key]) list.push({ text: titles[key], link: withBase(key) });
  }
  const selfKey = "/" + segs.slice(0, segs.length - 1).join("/") + "/";
  const selfText =
    (isIndex && titles[selfKey]) ||
    page.value.title ||
    (isIndex ? segs[segs.length - 2] : segs[segs.length - 1].replace(/\.md$/, ""));
  list.push({ text: selfText, link: null });
  return list;
});
</script>

<template>
  <nav v-if="crumbs.length > 1" class="breadcrumb" aria-label="麵包屑">
    <template v-for="(c, i) in crumbs" :key="i">
      <span v-if="i > 0" class="sep" aria-hidden="true">›</span>
      <a v-if="c.link" class="crumb" :href="c.link">{{ c.text }}</a>
      <span v-else class="crumb current" aria-current="page">{{ c.text }}</span>
    </template>
  </nav>
</template>

<style scoped>
/* 🔴 CLAUDE.md §6：不可寫死文字顏色，一律 CSS 變數（亮/暗兩種模式都要看得見） */
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;
  margin-bottom: 16px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.crumb {
  color: var(--vp-c-text-2);
  text-decoration: none;
}
a.crumb:hover {
  color: var(--vp-c-brand-1);
}
.current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}
.sep {
  color: var(--vp-c-text-3);
}
</style>
