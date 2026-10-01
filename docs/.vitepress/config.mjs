import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vlog/",
  rewrites: {
    "/pages/(.*)": "/(.*)",
  },
  // 🔴 2026-10-01：從 `true` 改成 `false`。
  //
  //   它從 first commit（2024-12-30）就開著 ⇒ VitePress 內建的死連結檢查
  //   整整兩年沒作用。首頁兩顆主按鈕其中一顆 404 掛了 8 個多月沒人發現，
  //   根因不是「沒有檢查工具」，是**檢查被關掉了**。
  //
  //   關掉它的當下有 152 個死連結，而那不是 152 次手誤 ——
  //   是站內連結四種寫法混用（詳見 scripts/normalize-links.mjs 的註解）。
  //   已用 `node scripts/normalize-links.mjs` 統一成 `/pages/....md` 一種。
  //
  // ⚠️ 從今以後：**新增死連結會讓 build 失敗**，Actions 會紅。
  //    這是刻意的 —— 那正是過去兩年缺的那道防線。
  //    真的需要暫時放行某個 url，用陣列而不是 `true`：
  //      ignoreDeadLinks: [/^\/some\/known-missing/]
  ignoreDeadLinks: false,
  lastUpdated: true,
  title: "地瓜球工程師",
  head: [["link", { rel: "icon", href: "/vlog/logo.png" }]],
  description: "地瓜球工程師的vlog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/img/logo.png",
    nav: [
      { text: "首頁", link: "/" },
      // 🔴 文章索引由 scripts/sync-posts.mjs 產生（來源：vault 05-心得/ 標了
      //    publish: true 的檔案）。沒有這個 nav 入口的話，文章發了也沒人找得到 ——
      //    「同步成功」與「讀者看得到」是兩件事。
      { text: "文章", link: "/pages/posts/" },
      {
        text: "學習筆記",
        // 🔴 2026-10-01（階段 C-2／C-3，Lonck 2026-09-22 決定）：
        //    子選單砍到 Vue／TypeScript／股票三項。
        //    理由：TailwindCSS 1 篇、SCSS 2 篇、JS 3 篇掛在導覽列反而顯空，
        //    留在內頁即可；股票 19 篇份量紮實，且與 stock 專案同一件事。
        //    ⚠️ 被拿掉的三項**內容仍在、網址仍可進**，只是不佔導覽列。
        items: [
          { text: "Vue", link: "/pages/studyNotes/contents/vue/Vue/index.md" },
          {
            text: "TypeScript",
            link: "/pages/studyNotes/contents/typeScript/index.md",
          },
          {
            text: "股票",
            link: "/pages/studyNotes/contents/stock/index.md",
          },
        ],
      },
      // 🔴 「生活」移出導覽列（Lonck 2026-09-22 選 A）：
      //    239 篇裡 203 篇是停了 400 多天的每日待辦，不是技術站門面。
      //    ⚠️ 網址仍可進、Google 仍收得到 —— 只是不放在導覽列。
      {
        text: "關於我",
        link: "/pages/aboutMe/index.md",
      },
    ],

    sidebar: {
      "/pages/studyNotes/contents/vue/Vue/": [
        {
          text: "Vue",
          items: [
            {
              text: "目錄",
              link: "/pages/studyNotes/contents/vue/Vue/index.md",
            },
            {
              text: "v-bind",
              link: "/pages/studyNotes/contents/vue/Vue/course/01-v-bind.md",
            },
            {
              text: "v-cloak",
              link: "/pages/studyNotes/contents/vue/Vue/course/02-v-cloak.md",
            },
            {
              text: "v-for",
              link: "/pages/studyNotes/contents/vue/Vue/course/03-v-for.md",
            },
            {
              text: "v-html",
              link: "/pages/studyNotes/contents/vue/Vue/course/04-v-html.md",
            },
            {
              text: "v-if",
              link: "/pages/studyNotes/contents/vue/Vue/course/05-v-if.md",
            },
            {
              text: "v-memo",
              link: "/pages/studyNotes/contents/vue/Vue/course/06-v-memo.md",
            },
            {
              text: "v-model",
              link: "/pages/studyNotes/contents/vue/Vue/course/07-v-model.md",
            },
            {
              text: "v-on",
              link: "/pages/studyNotes/contents/vue/Vue/course/08-v-on.md",
            },
            {
              text: "v-once",
              link: "/pages/studyNotes/contents/vue/Vue/course/09-v-once.md",
            },
            {
              text: "v-show",
              link: "/pages/studyNotes/contents/vue/Vue/course/10-v-show.md",
            },
            {
              text: "v-slot",
              link: "/pages/studyNotes/contents/vue/Vue/course/11-v-slot.md",
            },
            {
              text: "v-text",
              link: "/pages/studyNotes/contents/vue/Vue/course/12-v-text.md",
            },
            {
              text: "computed",
              link: "/pages/studyNotes/contents/vue/Vue/course/13-computed.md",
            },
            {
              text: "methods",
              link: "/pages/studyNotes/contents/vue/Vue/course/14-methods.md",
            },
            {
              text: "watch",
              link: "/pages/studyNotes/contents/vue/Vue/course/15-watch.md",
            },
            {
              text: "lifecycleHooks",
              link: "/pages/studyNotes/contents/vue/Vue/course/16-lifecycleHooks.md",
            },
            {
              text: "reviewingTheFiles",
              link: "/pages/studyNotes/contents/vue/Vue/course/17-reviewingTheFiles.md",
            },
            {
              text: "props",
              link: "/pages/studyNotes/contents/vue/Vue/course/18-props.md",
            },
            {
              text: "emit",
              link: "/pages/studyNotes/contents/vue/Vue/course/19-emit.md",
            },
            {
              text: "callBack",
              link: "/pages/studyNotes/contents/vue/Vue/course/20-callBack.md",
            },
            {
              text: "component",
              link: "/pages/studyNotes/contents/vue/Vue/course/21-component.md",
            },
            {
              text: "transitions",
              link: "/pages/studyNotes/contents/vue/Vue/course/22-transitions.md",
            },
            {
              text: "attrs",
              link: "/pages/studyNotes/contents/vue/Vue/course/23-attrs.md",
            },
          ],
        },
      ],
      "/pages/aboutMe/": [
        {
          text: "作品與自介",
          items: [
            { text: "自介", link: "/pages/aboutMe/index.md" },
            { text: "作品", link: "/pages/aboutMe/contents/works.md" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Lonck999" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/lonck999/" },
      {
        icon: "task",
        link: "https://lonck999.github.io/vlog/pages/life/task/",
      },
    ],
    footer: {
      // 🔴 隱私權政策與使用條款必須從首頁連得到 —— 這是 Google OAuth
      //    發布（In production）的硬性要求，不是裝飾。
      //    移除這兩個連結會讓 OAuth publish 狀態失效，
      //    症狀是 7 天後 16 支吃 Google API 的腳本一起停（延遲發作，很難聯想）。
      //    2026-09-22 從 blog 搬過來時一併加上。
      message:
        'Released under the MIT License. · <a href="/vlog/pages/legal/privacy.html">隱私權政策</a> · <a href="/vlog/pages/legal/terms.html">使用條款</a>',
      copyright: "Copyright © 2024-present Lonck999",
    },
  },
});
