---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

# 🔴 2026-11-27：hero 的兩行標題都是 Canvas 粒子
#    （docs/.vitepress/components/ParticleTitle.vue，掛在 home-hero-info-before）。
#
#    第一行（小字）＝ 下面的 `hero.name`
#    第二行（大字）＝ 這裡的 `particleTitle`
#
#    🔴 字要改就改這兩個地方，各只有一份。`hero.name` 不可刪 ——
#       它同時是頁面 <h1> 的來源（SEO／螢幕閱讀器），
#       由 theme/style.css 視覺上隱藏（不是 display:none）。
#    ⚠️ 不要把 hero.text 加回來：那會變成多出來的第三份標題，而 build 不報錯。
particleTitle: 地瓜球小攤

hero:
  # 🔴 粒子標題的第一行就是這個字串（同時是 <h1> 的文字）
  name: "歡迎來到 (,,・ω・,,)"
  tagline: 裡面記錄著自己的一些學習和自介，也歡迎大家來看看有沒有你需要的東西。
  image:
    src: /img/goImg.png
    alt: 地瓜球
  actions:
    - theme: brand
      text: 學習文章
      link: /pages/studyNotes/
    - theme: alt
      text: 關於我
      link: /pages/aboutMe/

features:
  - title: 軟體技術
    details: 一些前端技能的學習筆記，以Vue3為主，在搭配Pinia、VueRouter、Vitest、Axios。往後會在學習TypeScript、Websocket、在搭配一些遊戲引擎，目前以這方向前進中。
    link: /pages/studyNotes/index.md
  - title: 玄學術數
    details: 小道的術數筆記。有人生迷茫、問事、斷命、論流年也歡迎跟我聊聊。目前寫完的是道傳小六壬——六宮完整解釋、七種盤、排盤法都在裡面。
    link: /pages/occult/index.md
  - title: 作品與自介
    details: 這裡有我的一些作品，以及自介，歡迎大家來看看。
    link: /pages/aboutMe/index.md
---
