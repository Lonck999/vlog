import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "地瓜球工程師",
  head: [["link", { rel: "icon", href: "/assets/logo.png" }]],
  description: "地瓜球工程師的vlog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/assets/logo.png",
    nav: [
      { text: "首頁", link: "/" },
      {
        text: "學習筆記",
        items: [
          { text: "Vue", link: "/studyNotes/contents/vue/Vue/index.md" },
          {
            text: "TypeScript",
            link: "/studyNotes/contents/typeScript/index.md",
          },
          {
            text: "JavaScript",
            link: "/studyNotes/contents/javaScript/index.md",
          },
          {
            text: "SCSS",
            link: "/studyNotes/contents/SCSS/index.md",
          },
          {
            text: "TailwindCSS",
            link: "/studyNotes/contents/tailwindCSS/index.md",
          },
        ],
      },
      { text: "作品與自介", link: "/aboutMe/index.md" },
    ],

    sidebar: {
      "/studyNotes/contents/vue/Vue/": [
        {
          text: "Vue",
          items: [
            {
              text: "目錄",
              link: "/studyNotes/contents/vue/Vue/index.md",
            },
            {
              text: "v-bind",
              link: "/studyNotes/contents/vue/Vue/v-bind.md",
            },
            {
              text: "v-cloak",
              link: "/studyNotes/contents/vue/Vue/v-cloak.md",
            },
            {
              text: "v-for",
              link: "/studyNotes/contents/vue/Vue/v-for.md",
            },
            {
              text: "v-html",
              link: "/studyNotes/contents/vue/Vue/v-html.md",
            },
            { text: "v-if", link: "/studyNotes/contents/vue/Vue/v-if.md" },
            {
              text: "v-memo",
              link: "/studyNotes/contents/vue/Vue/v-memo.md",
            },
            {
              text: "v-model",
              link: "/studyNotes/contents/vue/Vue/v-model.md",
            },
            { text: "v-on", link: "/studyNotes/contents/vue/Vue/v-on.md" },
            {
              text: "v-once",
              link: "/studyNotes/contents/vue/Vue/v-once.md",
            },
            {
              text: "v-show",
              link: "/studyNotes/contents/vue/Vue/v-show.md",
            },
            {
              text: "v-slot",
              link: "/studyNotes/contents/vue/Vue/v-slot.md",
            },
            {
              text: "v-text",
              link: "/studyNotes/contents/vue/Vue/v-text.md",
            },
            {
              text: "computed",
              link: "/studyNotes/contents/vue/Vue/computed.md",
            },
            {
              text: "watch",
              link: "/studyNotes/contents/vue/Vue/watch.md",
            },
            {
              text: "lifecycleHooks",
              link: "/studyNotes/contents/vue/Vue/lifecycleHooks.md",
            },
          ],
        },
      ],
      "/aboutMe/": [
        {
          text: "作品與自介",
          items: [
            { text: "自介", link: "/aboutMe/index.md" },
            {
              text: "專案經歷",
              link: "/aboutMe/contents/projectExperience.md",
            },
            { text: "作品", link: "/aboutMe/contents/works.md" },
            { text: "聯絡我", link: "/aboutMe/contents/contactMe.md" },
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
