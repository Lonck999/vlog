import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vlog/",
  rewrites: {
    "/pages/(.*)": "/(.*)",
  },
  ignoreDeadLinks: true,
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
        items: [
          { text: "Vue", link: "/pages/studyNotes/contents/vue/Vue/index.md" },
          {
            items: [
              {
                text: "TypeScript",
                link: "/pages/studyNotes/contents/typeScript/index.md",
              },
              {
                text: "JavaScript",
                link: "/pages/studyNotes/contents/javaScript/index.md",
              },
            ],
          },
          {
            items: [
              {
                text: "SCSS",
                link: "/pages/studyNotes/contents/SCSS/index.md",
              },
              {
                text: "TailwindCSS",
                link: "/pages/studyNotes/contents/tailwindCSS/index.md",
              },
            ],
          },
        ],
      },
      { text: "生活", link: "/pages/life/index.md" },
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
