// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";
// 自定義元件
import Resume from "../components/Resume.vue";
import Breadcrumb from "../components/Breadcrumb.vue";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 🔴 2026-11-08 麵包屑：doc-before＝正文上方。只有 doc 版型會渲染這個 slot（home／page 不會）。
      "doc-before": () => h(Breadcrumb),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Resume", Resume);
  },
};
