# vlog 資料夾結構導覽

> 📅 盤點於 2026-10-01。**322 篇 markdown。**
>
> 🔴 **這份是「每個資料夾在幹嘛」的唯一說明。** 動任何目錄之前先讀它。
> ⚠️ 數字會變，但**每個目錄的「用途」不該變** —— 用途要改就改這份文件。

---

## 一句話總覽

```
VitePress 靜態網站 → GitHub Actions → GitHub Pages
線上位置：https://lonck999.github.io/vlog/
🔴 網址一律帶 /pages 前綴（rewrites 實測是 no-op，見 CLAUDE.md 第 5 條）
```

---

## 根目錄

| 項目 | 在幹嘛 | 🔴 注意 |
|---|---|---|
| `docs/` | **整個網站的內容**（323 md）| VitePress 的 root |
| `scripts/` | 6 支 `.mjs`：同步、發布、正規化、3 支測試 | 詳見下方 |
| `.vitepress/` | ⬜ **未追蹤的建置快取** | 不是設定檔！設定在 `docs/.vitepress/` |
| `.github/workflows/deploy.yml` | push 到 main 就 build＋部署 Pages | |
| `.claude/` | 7 份 hookify 規則（本機紅線，給 Claude Code 讀）| 有進版控 |
| `.vscode/settings.json` | 編輯器設定 | |
| `CLAUDE.md` | **專案紅線**（6 條）| 🔴 動手前必讀 |
| `package.json` | 唯一依賴：`vitepress` | |

⚠️ **根目錄的 `.vitepress/` 與 `docs/.vitepress/` 是兩個不同的東西。**
前者是 vite 的暫存快取（已進 `.gitignore`），後者才是網站設定。
我 2026-10-01 一度把前者當成設定目錄。

---

## `docs/` ── 網站內容

```
docs/
├── index.md                首頁（hero 2 顆按鈕 ＋ 3 張 features 卡）
├── .vitepress/
│   ├── config.mjs          導覽列、側邊欄、ignoreDeadLinks、rewrites
│   ├── components/
│   │   └── Resume.vue      「關於我」整頁就是這支元件（約 800 行）
│   ├── theme/              index.js（註冊 Resume）＋ style.css
│   └── dist/ cache/        ⬜ 建置產物，不進版控
├── public/
│   ├── img/                36 張圖（頭像、技術 logo、專案截圖）
│   └── logo.png
└── pages/                  322 md ← 所有文章都在這層底下
```

🔴 **`public/` 的檔案在網址上沒有 `public` 這一段** ——
`public/img/goImg.png` → `/vlog/img/goImg.png`。
寫圖片路徑時用 `/img/...`，不要寫 `/public/img/...`。

---

## `docs/pages/` ── 六個區塊

| 目錄 | 篇數 | 用途 | 導覽列 | 真實最後更新 |
|---|---|---|---|---|
| `posts/` | 1 | **自動產生**，別手寫 | ✅ 首頁按鈕 | 2026-09-22 |
| `studyNotes/` | 94 | 技術學習筆記 | ✅ | 2025-04-10 |
| `life/` | 220 | 生活技能＋每日日誌 | 🔴 **無入口** | 2025-06-19 |
| `occult/` | 3 | 玄學術數 | 🔴 **無入口** | 2025-02-06 |
| `aboutMe/` | 2 | 履歷＋作品 | ✅ | 2025-01-18 |
| `legal/` | 2 | 隱私權＋服務條款 | 刻意不露出 | 2026-09-22 |

⚠️ **「真實最後更新」已排除 2026-10-01 那 6 個批次改連結的 commit** ——
不排除的話全部會顯示 2026-10-01，看起來像天天在更新。
🔴 判斷活躍度時務必排除批次操作的 commit，否則數字會騙人。

---

### `posts/` ── 1 篇｜🔴 自動產生，不要手寫

來源是 Obsidian vault `~/Obsidian/05-心得/` 裡標了 `publish: true` 的檔案，
由 `scripts/sync-posts.mjs` 同步進來。

🔴 **手寫的內容下次同步會被蓋掉。** 要發新文章是去 vault 標 `publish: true`。

### `studyNotes/contents/` ── 94 篇｜技術筆記

| 子目錄 | 篇數 | 空殼 | 真實最後更新 | 導覽列 |
|---|---|---|---|---|
| `vue/` | 62 | 4 | 2025-04-10 | ✅ |
| `stock/` | 19 | 2 | 2025-03-10 | ✅（2026-10-01 從 life 搬來）|
| `typeScript/` | 6 | 0 | 2025-04-02 | ✅ |
| `javaScript/` | 3 | 1 | 2025-01-10 | ❌ |
| `SCSS/` | 2 | 1 | 2025-01-09 | ❌ |
| `tailwindCSS/` | 1 | **1** | 2024-12-30 | ❌ |

🔴 `tailwindCSS/` **唯一那一篇就是空的** —— 整個目錄等於沒有內容。

`vue/` 的內部分層（62 篇裡最大的一塊）：

```
vue/
├── Vue/          38 篇  ├── course/ 31（v-bind…watch、lifecycle、props、emit）
│                        ├── interview/ 5
│                        └── method/ 1
├── VueRouter/    12 篇  course/01-base … 11-props-params
├── Pinia/         4
├── VeeValidate/   2
└── Nuxt/ Vite/ Vitest/ VueQuery/ Vuex/   各 1
```

`stock/contents/` 18 篇是編號教材（`01-什麼是0050` … `17-左側右側交易` ＋ `個人心得`）。
🔴 **目錄頁列了 18~25（量化分析、金字塔買法、海龜交易…）但從沒寫** ——
2026-10-01 已把那 8 個死連結拿掉只留文字。

### `life/` ── 220 篇｜整站 68%，但沒有導覽入口

| 子目錄 | 篇數 | 用途 | 空殼 |
|---|---|---|---|
| `life/task/` | **203** | **每日日誌** | 9 |
| `專案/` | 9 | 專案發想（想做還沒做的）| **6** |
| `讀物清單/` | 4 | 書／影片／網路文章 | 3 |
| `cooking/` | 2 | 食譜 | 1 |
| `language/Cantonese/` | 1 | 粵語 | 0 |

🔴 **`task/` 203 篇 = 整站的 63%**，結構是 `task/2025/6月/2025-06-19-週四.md`。
2024-12 連續寫到 2025-06（每月 22~31 篇，幾乎天天），然後**停更 469 天**。

⚠️ 今天 152 個死連結裡 **135 個（89%）在這裡** ——
日誌互相連結、檔案搬動後沒更新。
🔴 它們是**歷史紀錄**，不是門面；修死連結的優先度遠低於導覽列與首頁。

### `occult/` ── 3 篇｜首頁推薦它，但入口指到空殼

```
index.md                  100 字   只有一行連結
小六壬/道傳小六壬.md      5,696 字  ← 唯一有料的
紫微斗數/欽天四化….md         0 字  ← 空的
```

🔴 **首頁 features 用一整張卡片推薦，點進去是一行連結 ＋ 一篇空白。**
⚠️ 但那篇小六壬是真貨 —— 問題不是「該不該留玄學」，是**入口指錯地方**。

### `aboutMe/` ── 2 篇｜履歷

`index.md` 只有 `<Resume />` 一行，**真正的內容在 `components/Resume.vue`**。
⚠️ 這份文件刻意不寫它的精確行數 —— 改一次註解就過期，而「它是整頁的來源」才是要知道的事。
🔴 找「關於我」的文字要去那支 `.vue`，不是 markdown。

### `legal/` ── 2 篇｜🔴 不可刪、不可改網址

`privacy.md`、`terms.md` 填在 **Google OAuth 同意畫面**上。
拿掉＝publish 失效＝**7 天後 16 支 Google API 腳本一起停**（延遲發作）。
footer 連結同理（Google 要求從首頁連得到）。

---

## `scripts/` ── 7 支

| 檔案 | 在幹嘛 | 怎麼跑 |
|---|---|---|
| `sync-posts.mjs` | vault `05-心得/` → `pages/posts/` | `npm run sync` |
| `publish.mjs` | 同步→commit→push→**等 Actions 部署完並驗線上** | `npm run publish` |
| `normalize-links.mjs` | 統一站內連結寫法；含 `MOVED` 搬家對應表 | `node scripts/normalize-links.mjs` |
| `test-sync-posts.mjs` | 同步的回歸（26 項）| `npm test` |
| `test-links.mjs` | 死連結＋導覽列＋MOVED（23 項）| 每日回歸 |
| `test-theme.mjs` | 亮/暗模式對比度（5 項，含 headless Chrome）| 每日回歸 |
| `test-structure.mjs` | 🔴 **這份文件的數字**對不對（19 項）| 每日回歸 |

🔴 **`npm test` 只跑 `test-sync-posts.mjs`。**
另兩支只有 `~/.hermes/scripts/run_all_regressions.py`（glob `test-*.mjs`）會撿到。
⚠️ 所以**本機手動 `npm test` 綠不代表全部測過** —— 要全驗就跑每日回歸。

---

## 🔴 四個「現在就壞著」的地方

這些是 2026-10-01 盤點查到的，不是推測：

1. **首頁「玄學術數」卡片指向 100 字的空目錄頁**，而有料的小六壬 5,696 字被埋在底下
2. **`life/` 220 篇無任何導覽入口** —— 包含有內容的粵語、做菜、讀物清單
3. **空殼篇**：`life/專案` 6/9 空（兩篇 0 字）、`vue` 4 篇（`06-v-memo.md` 完全空白**而它在導覽列上**）、`occult` 1 篇 0 字、`tailwindCSS` 唯一那篇就是空的
4. **`studyNotes/index.md` 文案**：「目前先隨便寫寫」、JavaScript 那節寫「一個字都還沒動」而它有 3 篇

---

## 判斷「一個目錄還活著嗎」的方法

```bash
# 🔴 排除批次操作的 commit，否則全部看起來像今天更新的
TODAY=$(git log --since="2026-10-01 00:00" --format=%H)
git log --format="%H %ad" --date=short -- <路徑> | grep -vF "$TODAY" | head -1
```

⚠️ 搬過家的目錄要加 `--follow`，否則只看得到搬家後的歷史
（`stock/` 不加 `--follow` 會顯示「只有今天」，加了才看到 2025-03-10）。
