import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vlog/",
  rewrites: {
    "/pages/(.*)": "/(.*)",
  },
  ignoreDeadLinks: true,
  title: "地瓜球工程師",
  head: [["link", { rel: "icon", href: "/pages/img/logo.png" }]],
  description: "地瓜球工程師的vlog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/pages/img/logo.png",
    nav: [
      { text: "首頁", link: "/" },
      {
        text: "學習筆記",
        items: [
          { text: "Vue", link: "/pages/studyNotes/contents/vue/Vue/index.md" },
          {
            text: "TypeScript",
            link: "/pages/studyNotes/contents/typeScript/index.md",
          },
          {
            text: "JavaScript",
            link: "/pages/studyNotes/contents/javaScript/index.md",
          },
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
              link: "/pages/studyNotes/contents/vue/Vue/v-bind.md",
            },
            {
              text: "v-cloak",
              link: "/pages/studyNotes/contents/vue/Vue/v-cloak.md",
            },
            {
              text: "v-for",
              link: "/pages/studyNotes/contents/vue/Vue/v-for.md",
            },
            {
              text: "v-html",
              link: "/pages/studyNotes/contents/vue/Vue/v-html.md",
            },
            {
              text: "v-if",
              link: "/pages/studyNotes/contents/vue/Vue/v-if.md",
            },
            {
              text: "v-memo",
              link: "/pages/studyNotes/contents/vue/Vue/v-memo.md",
            },
            {
              text: "v-model",
              link: "/pages/studyNotes/contents/vue/Vue/v-model.md",
            },
            {
              text: "v-on",
              link: "/pages/studyNotes/contents/vue/Vue/v-on.md",
            },
            {
              text: "v-once",
              link: "/pages/studyNotes/contents/vue/Vue/v-once.md",
            },
            {
              text: "v-show",
              link: "/pages/studyNotes/contents/vue/Vue/v-show.md",
            },
            {
              text: "v-slot",
              link: "/pages/studyNotes/contents/vue/Vue/v-slot.md",
            },
            {
              text: "v-text",
              link: "/pages/studyNotes/contents/vue/Vue/v-text.md",
            },
            {
              text: "computed",
              link: "/pages/studyNotes/contents/vue/Vue/computed.md",
            },
            {
              text: "watch",
              link: "/pages/studyNotes/contents/vue/Vue/watch.md",
            },
            {
              text: "lifecycleHooks",
              link: "/pages/studyNotes/contents/vue/Vue/lifecycleHooks.md",
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
    ],
  },
});
