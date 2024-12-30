---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "歡迎來到 (,,・ω・,,)"
  text: "地瓜球小攤"
  tagline: 裡面記錄著自己的一些學習和自介，也歡迎大家來看看有沒有你需要的東西。
  image:
    src: /assets/logo.png
    alt: 地瓜球
  actions:
    - theme: brand
      text: 最新文章
      link: /studyNotes/contents/vue/Vue/v-for.md
    - theme: alt
      text: 接案、發案聯絡我
      link: /aboutMe/contents/contactMe.md

features:
  - title: 軟體技術
    details: 一些前端技能的學習筆記，以Vue3為主，在搭配Pinia、VueRouter、Vitest、Axios。往後會在學習TypeScript、Websocket、在搭配一些遊戲引擎，目前以這方向前進中。
    link: /studyNotes/index.md
  - title: 玄學術數
    details: 小道的術數技能，對於人生有何迷茫、問事、斷命、論流年也歡迎跟我聊聊，裡面也有放一些經驗、問術筆記，有想要學習的可以來看看。
    link: /occult/index.md
  - title: 生活
    details: 目前正在學習粵語，之後可能會再多花點時間點一下生活技能，例如：開車、游泳、做菜、等等......
    link: /life/index.md
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>
