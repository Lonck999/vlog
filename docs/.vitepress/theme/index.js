// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";
// 自定義元件
import Resume from "../components/Resume.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import ParticleTitle from "../components/ParticleTitle.vue";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 🔴 2026-11-08 麵包屑：doc-before＝正文上方。只有 doc 版型會渲染這個 slot（home／page 不會）。
      "doc-before": () => h(Breadcrumb),
      // 🔴 2026-11-27 首頁 hero 的粒子標題（取代原本的 hero.text）。
      //    這個 slot 只有 layout: home 的 VPHero 會渲染，其他頁面不會被插入任何東西；
      //    元件自己判斷 frontmatter 有沒有 `particleTitle`，沒有就什麼都不畫。
      //    ⚠️ slot 的位置在 hero 名稱「之前」 —— 視覺順序由 theme/style.css
      //       那段 flex order 校正回原本 hero.text 的位置（name 之後、tagline 之前）。
      "home-hero-info-before": () => h(ParticleTitle),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Resume", Resume);
  },
};
