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
      { text: "作品與自介", link: "/pages/aboutMe/index.md" },
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
              link: "/pages/studyNotes/contents/vue/Vue/course/v-bind.md",
            },
            {
              text: "v-cloak",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-cloak.md",
            },
            {
              text: "v-for",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-for.md",
            },
            {
              text: "v-html",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-html.md",
            },
            {
              text: "v-if",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-if.md",
            },
            {
              text: "v-memo",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-memo.md",
            },
            {
              text: "v-model",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-model.md",
            },
            {
              text: "v-on",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-on.md",
            },
            {
              text: "v-once",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-once.md",
            },
            {
              text: "v-show",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-show.md",
            },
            {
              text: "v-slot",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-slot.md",
            },
            {
              text: "v-text",
              link: "/pages/studyNotes/contents/vue/Vue/course/v-text.md",
            },
            {
              text: "computed",
              link: "/pages/studyNotes/contents/vue/Vue/course/computed.md",
            },
            {
              text: "methods",
              link: "/pages/studyNotes/contents/vue/Vue/course/methods.md",
            },
            {
              text: "watch",
              link: "/pages/studyNotes/contents/vue/Vue/course/watch.md",
            },
            {
              text: "lifecycleHooks",
              link: "/pages/studyNotes/contents/vue/Vue/course/lifecycleHooks.md",
            },
            {
              text: "reviewingTheFiles",
              link: "/pages/studyNotes/contents/vue/Vue/course/reviewingTheFiles.md",
            },
            {
              text: "props",
              link: "/pages/studyNotes/contents/vue/Vue/course/props.md",
            },
            {
              text: "emit",
              link: "/pages/studyNotes/contents/vue/Vue/course/emit.md",
            },
            {
              text: "callBack",
              link: "/pages/studyNotes/contents/vue/Vue/course/callBack.md",
            },
            {
              text: "component",
              link: "/pages/studyNotes/contents/vue/Vue/course/component.md",
            },
          ],
        },
      ],
      "/pages/aboutMe/": [
        {
          text: "作品與自介",
          items: [
            { text: "自介", link: "/pages/aboutMe/index.md" },
            {
              text: "專案經歷",
              link: "/pages/aboutMe/contents/projectExperience.md",
            },
            { text: "作品", link: "/pages/aboutMe/contents/works.md" },
            { text: "聯絡我", link: "/pages/aboutMe/contents/contactMe.md" },
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
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Lonck999",
    },
  },
});
