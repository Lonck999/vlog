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
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Lonck999",
    },
  },
});
