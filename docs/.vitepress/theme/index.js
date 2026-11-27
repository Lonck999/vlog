// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";
// 自定義元件
import Resume from "../components/Resume.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import ParticleTitle from "../components/ParticleTitle.vue";
import FeatureSpotlight from "../components/FeatureSpotlight.vue";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 🔴 2026-11-08 麵包屑：doc-before＝正文上方。只有 doc 版型會渲染這個 slot（home／page 不會）。
      "doc-before": () => h(Breadcrumb),
      // 🔴 2026-11-27 首頁 hero 的粒子標題：一張 canvas 畫兩行
      //    （第一行＝frontmatter 的 hero.name，第二行＝frontmatter 的 particleTitle）。
      //    這個 slot 只有 layout: home 的 VPHero 會渲染，其他頁面不會被插入任何東西；
      //    元件自己判斷那兩個 frontmatter 有沒有字，都沒有就什麼都不畫。
      //    ⚠️ slot 的位置在 hero 名稱「之前」 —— VitePress 畫的那個 <h1 class="name">
      //       由 theme/style.css 視覺上隱藏（留在 DOM 供 SEO／讀屏），
      //       流排順序則是 粒子標題 → tagline → actions。
      "home-hero-info-before": () => h(ParticleTitle),
      // 🔴 2026-11-27 features 卡片的邊框聚光：元件只負責寫 --x/--y，光暈在 theme/style.css。
      //    slot 只有 layout: home 會渲染 ⇒ 其他頁面不會掛上監聽。
      "home-features-before": () => h(FeatureSpotlight),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Resume", Resume);
  },
};
