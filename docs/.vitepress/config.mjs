import { defineConfig } from "vitepress";
import taskLists from "@hackmd/markdown-it-task-lists";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 🔴 2026-10-20「學習文章」導覽列下拉選單（Lonck 選 B：改回下拉、分開列出八區）。
//    順序＝Lonck 定的八區。**有內容的區才給連結**；0 篇的區是不可點的分組標題，
//    文字後面帶「（還沒寫）」—— 同學習文章頁「顯示名稱、標還沒寫、不可點」的決定。
//    ⚠️ 判斷「有沒有內容」由程式數實際檔案，不寫死 ⇒ 區裡寫了第一篇，下次 build 自動變連結。
const NOTES = path.join(path.dirname(fileURLToPath(import.meta.url)), "../pages/studyNotes/contents");
export const STUDY_AREAS = [
  ["AI", "ai"], ["Python", "python"], ["JavaScript", "javaScript"], ["TypeScript", "typeScript"],
  ["Vue", "vue"], ["股票", "stock"], ["SCSS", "SCSS"], ["TailwindCSS", "tailwindCSS"],
];
function bodyChars(file) {
  const t = readFileSync(file, "utf8").replace(/^---[\s\S]*?^---/m, "").replace(/^#.*$/gm, "");
  return t.replace(/\s/g, "").length;
}
/** 該區有沒有「目錄頁以外、且不是空白」的文章（posts/ 由 sync-posts 產生，也算） */
export function areaHasContent(dir) {
  const root = path.join(NOTES, dir);
  if (!existsSync(root)) return false;
  const walk = (d) => readdirSync(d).some((f) => {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) return walk(p);
    return f.endsWith(".md") && !(d === root && f === "index.md") && bodyChars(p) >= 40;
  });
  return walk(root);
}
const studyNav = STUDY_AREAS.map(([text, dir]) =>
  areaHasContent(dir)
    ? { text, link: `/pages/studyNotes/contents/${dir}/index.md` }
    : { text: `${text}（還沒寫）`, items: [] });
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vlog/",
  // 🔴 2026-10-02：拿掉 `rewrites: { "/pages/(.*)": "/(.*)" }`。
  //
  //   它從一開始就**完全沒有作用**。官方文件（vitepress.dev/guide/routing
  //   § Route Rewrites）的寫法是「**檔案路徑** → 檔案路徑」，而且動態段
  //   用 path-to-regexp 的命名參數：
  //     rewrites: { 'packages/:pkg/src/:slug*': ':pkg/:slug*' }
  //   原本那條三處都錯：① 有開頭斜線 ② 用 regex 的 `(.*)` 而不是 `:slug*`
  //   ③ 沒有 `.md` 副檔名。
  //
  //   實測：321 個 md → 321 個 html，全部仍在 `dist/pages/` 底下，
  //   根目錄只有 `index.html` 與 `404.html`。
  //   ⚠️ 所以它不是「壞掉的功能」，是**從來沒啟動過的死設定**；
  //   留著的唯一效果是讓下一個讀 config 的人以為網址會被改寫。
  //
  //   🔴 不改成正確語法（`pages/:slug*.md` → `:slug*.md`）的理由：
  //   改對會讓全站網址從 `/vlog/pages/xxx` 變成 `/vlog/xxx` ——
  //   321 頁的已收錄連結全部失效，站內 699 個 `](/pages/…)` 連結
  //   也得跟著改（2026-10-02 實測，grep 計數）。
  //   換掉一個沒人要求的網址格式，代價遠大於收益。
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
  // 🔴 2026-10-08：`- [ ]` / `- [x]` 要變成真的 checkbox 必須裝插件。
  //
  //   ⚠️ VitePress 1.5.0 **沒有**內建 task-list（它內建的 markdown-it 插件
  //   只有 anchor / attrs / container / emoji / mathjax）。
  //   實測不裝的話 `- [ ] 未勾` 會原樣輸出字面的 `<li>[ ] 未勾</li>`
  //   —— **不報錯、build 綠**，看起來只是「markdown 寫壞了」。
  //
  //   `@hackmd/markdown-it-task-lists`：ISC、零依賴、2024-03 仍有維護。
  //   （`markdown-it-task-lists` 本尊最後發版是 2018 年。）
  //
  // 🔴 `enabled: false`（預設值）是刻意的：這是靜態站，勾選狀態沒有地方存
  //   ⇒ 讓它可點會變成「點了重新整理就復原」的假互動。
  //   插件會輸出 `<input disabled>`。
  //
  // ⚠️ 這個插件**沒有 `disabled` 選項** —— 我第一版寫 `disabled: true`，
  //   那是我自己編的參數名，**被完全忽略**（輸出仍是 `class="enabled"`
  //   ＋ 可點的 checkbox）。🔴 傳一個不存在的選項不會報錯，只是沒效果。
  markdown: {
    config: (md) => {
      md.use(taskLists, { label: true });
    },
  },
  lastUpdated: true,
  // 🔴 2026-10-20（Lonck 選 A）：產生 /vlog/sitemap.xml，讓 Google 收錄。
  //   ⚠️ hostname 必須含 `/vlog/` —— VitePress 的 sitemap 網址是 hostname ＋ 相對路徑，
  //      不會自動加 base；寫成 `https://lonck999.github.io/` 會產出全站 404 的網址，而且 build 不報錯。
  //   驗證：scripts/test-sitemap.mjs（build 後比對：網址數＝頁面數、抽樣全部 200）。
  sitemap: {
    hostname: "https://lonck999.github.io/vlog/",
  },
  title: "地瓜球工程師",
  head: [["link", { rel: "icon", href: "/vlog/logo.png" }]],
  description: "地瓜球工程師的vlog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/img/logo.png",
    nav: [
      { text: "首頁", link: "/" },
      // 🔴 2026-10-20 改版（Lonck 逐題決定，紀錄在 vault 02-Projects/vlog導覽列改版-2026-10-20.md）：
      //    首頁／學習文章／網站／關於我。
      //    · 「文章」拿掉 —— 發布的文章改成依分類放進學習文章的各區（sync-posts.mjs 讀 category）
      //    · 「學習筆記」改名「學習文章」；🔴 17:56 Lonck 改選「下拉選單分開列八區」（studyNav，見檔頭）
      //    · 「網站」只放 Lonck 指定的，目前 0 個（test-links ⑥ 有豁免，有內容後要拿掉）
      { text: "學習文章", items: studyNav },
      { text: "網站", link: "/pages/websites/index.md" },
      // 🔴 「生活」不在導覽列（Lonck 2026-09-22 選 A）；每日日誌 2026-10-20 起重新記錄。
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
            // 🔴 2026-10-01：v-memo 從側邊欄拿掉 —— `06-v-memo.md` 是 **0 字**。
            //    它掛在側邊欄上，訪客點進去是一片空白（線上 HTTP 200）。
            //    ⚠️ 檔案本身留著（編號連續，而且 v-memo 確實該寫），
            //       但「推薦一個空白頁」比「少一個項目」糟。
            //    寫完內容再加回來 —— `test-links.mjs` 第⑥節會擋住它空著被加回去。
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
