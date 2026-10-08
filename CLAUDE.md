# vlog —— 地瓜球小攤（VitePress）

> 個人主站。2026-09-22 起 **blog（Nuxt）併入此站，以後只維護這一個**。
> 線上：https://lonck999.github.io/vlog/

## 這是什麼

VitePress 1.5.0 靜態站，GitHub Actions 自動部署到 GitHub Pages。

🔴 **資料夾結構與每個目錄的用途，看 [`STRUCTURE.md`](./STRUCTURE.md)。**

⚠️ **這裡刻意不再列篇數** —— 原本寫著「studyNotes 75 篇、task 239 篇」，
實際是 **94 / 203**。兩個數字都在這份文件裡躺著過期，
而**過期的數字跟正確的數字長得一模一樣**，讀到的人會拿它當事實。

🔴 **篇數只能有一個來源**：`STRUCTURE.md`，
並由 `scripts/test-structure.mjs`（每日回歸）比對實際檔案。
兩個地方各寫一份必然漂移 —— 上面那兩個數字就是證據。

## 🔴 紅線

### 1. `/pages/legal/` 兩頁不可刪、不可改網址

`privacy.html` 與 `terms.html` 的網址填在 **Google OAuth 的同意畫面**。
它們是 OAuth app 維持「In production」狀態的必要條件。

⚠️ **拿掉會讓 publish 狀態失效，症狀是 7 天後 16 支吃 Google API 的腳本
一起停** —— 延遲發作，幾乎不可能聯想到原因。

同理 `config.mjs` 的 footer 那兩個連結也不能拿掉：
Google 要求「隱私權政策必須從首頁連得到」。

### 2. `docs/pages/posts/` 是產生出來的，不要手寫

來源是 vault `~/Obsidian/05-心得/` 裡標了 `publish: true` 的檔案。

```bash
npm run sync:dry   # 看會同步哪些，不寫檔
npm run sync       # 實際寫入
npm run publish    # sync → commit → push → 等 Actions → 驗線上
```

🔴 `sync` 會**清空重建**那個目錄（讓 vault 取消發布時站上也消失）。
它會逐檔檢查 `generated: true` 標記，遇到手寫檔案／子目錄／非 `.md` 就**停手不刪**。
⚠️ 想在那裡放手寫內容 → 放別的目錄，不要放這裡。

🔴 **那個目錄必須進版控**：Actions 的建置機器上沒有 vault，
不進版控的話雲端會建出**零篇文章而且不報錯**。

### 3. 發布文章一定要有 `slug`

frontmatter 缺 `slug`（小寫英數與連字號）會直接失敗。

⚠️ **理由不是「會壞」** —— VitePress 吃得下中文檔名（站上 233 個中文路徑頁面
正常運作）。理由是**網址要能貼給別人**，中文網址複製貼上會變成一長串
percent-encoding。

⚠️ blog（Nuxt Content）那邊的理由才是「會壞」（slug 被整段吃掉、多篇互相覆蓋
且建置不報錯）。**兩邊理由不同，不要把 Nuxt 的說法搬過來** ——
那會變成一句假話，而讀到的人會拿它當事實。

### 4. `node_modules` 與 `dist` 不進版控

2026-09-22 清掉 3,608 ＋ 305 個檔（總追蹤檔 4,291 → 379）。

⚠️ `.gitignore` 早就寫了兩者，但檔案已被追蹤 ——
**gitignore 對已追蹤的檔案完全無效**。要用 `git rm --cached`。

⚠️ 清中文檔名時要用 `git ls-files -z`：
預設輸出會做**八進位跳脫**，拿那個字串回頭餵 `git rm` 會
`did not match any files`。

### 5. 🔴 站內連結只有一種寫法：`/pages/....md`

```bash
node scripts/normalize-links.mjs --dry-run   # 看會改什麼
node scripts/normalize-links.mjs             # 統一寫法 ＋ 拿掉死連結
node scripts/normalize-links.mjs --check     # 只檢查（CI 用，有問題 exit 1）
```

🔴 **`ignoreDeadLinks` 不可改回 `true`。**

它從 first commit（2024-12-30）就開著 ⇒ VitePress 內建的死連結檢查整整兩年
沒作用，首頁一顆主按鈕 404 掛了 8 個多月。2026-10-01 關掉它時有 **152 個死連結**。

⚠️ **build 因死連結失敗時，最快的「修法」就是把它改回 `true`** ——
那會讓整批工作一次歸零，而且**不會有任何錯誤訊息**。
`scripts/test-links.mjs` 有一條斷言專門擋這件事。

⚠️ **`rewrites: {"/pages/(.*)": "/(.*)"}` 是 no-op**（實測：dist 仍是
`dist/pages/...`、線上 `/vlog/occult/` 回 404 而 `/vlog/pages/occult/` 回 200）
—— 所以連結**一定要帶 `/pages`**，少了就是真的連不到。

⚠️ 相對路徑（`./x.md`）**檔案一搬家就全死且不報錯** ——
統一用絕對路徑的主因就是這個（C-2 要搬 stock 目錄）。

### 6. 🔴 自訂元件不可寫死文字顏色

```bash
node scripts/test-theme.mjs      # 亮/暗兩種模式各量一次真實對比度
```

**踩雷（2026-10-01）**：`Resume.vue`（關於我）在**亮色模式**下
姓名「蕭鼎澄」是**白字白底，對比度 1.0** —— 整個左欄＋工作經歷全部隱形。

根因：那份元件有 38 處寫死顏色、**0 處 CSS 變數、0 個 `.dark` 樣式**，
等於假設「背景永遠是深色」。而 VitePress 預設是亮色。

⚠️ **為什麼拖著沒被發現：作者自己開暗色模式，暗色下它完全正常。**
🔴 **預設狀態（第一次來的訪客看到的）才是要驗的那個。**

⚠️ **為什麼 build 綠、連結檢查也綠**：那些只檢查「連得到嗎」，
不檢查「看得見嗎」。頁面 200 ＋ 文字在 DOM 裡 ＋ build 零錯誤，
**而人類什麼都看不到**。

規則：
- 文字 → `var(--vp-c-text-1)`、分隔線 → `var(--vp-c-divider)`、
  強調 → `var(--vp-c-brand-1)`
- 品牌識別色（Vue 綠、JS 黃）**保持原色**，但要加
  `var(--vp-c-bg-soft)` 襯底 —— 它們單靠自己撐不住兩種模式
  （JS 亮底 1.35、Vite 暗底 1.95，門檻 3.0，**兩個方向都會壞**）

🔴 **「用了 CSS 變數」不等於「看得見」** —— 把顏色改成
`var(--vp-c-bg)` 時靜態檢查照樣說「✅ 沒寫死」，只有量運算後的
對比度才抓得到。所以 `test-theme.mjs` 一定要有行為層那一節。

### 7. 🔴 `- [ ]` 要變 checkbox 必須裝插件（VitePress 沒內建）

```bash
node scripts/test-links.mjs   # 第⑧節守這件事（49 項裡 5 項）
```

VitePress 1.5.0 內建的 markdown-it 插件只有
**anchor / attrs / container / emoji / mathjax** —— **沒有 task-list**。

⚠️ 沒裝插件時 `- [ ] 未勾` 會原樣輸出 `<li>[ ] 未勾</li>` ——
**build 綠、不報錯**，看起來只像「markdown 寫壞了」。
🔴 拿掉 `config.mjs` 那段 `md.use(taskLists)` 或移除依賴，
既有測試原本**全部仍綠**而站上的清單全變成字面文字。

用 `@hackmd/markdown-it-task-lists`（ISC、零依賴、2024-03 仍有維護；
`markdown-it-task-lists` 本尊停在 2018）。

🔴 **checkbox 刻意 `disabled`**（不傳 `enabled`）：這是靜態站，
勾選狀態沒有地方存 ⇒ 可點會變成「點了重新整理就復原」的假互動。

🔴 **CSS 要把 task-list 的 bullet 拿掉，但選擇器只能收 `.task-list-item`**
—— 插件只產生 `<input>`，**完全不動列表樣式**，
不加 CSS 會顯示成「• ☑ 未勾」（一個項目兩個符號）；
而收整個 `ul` 會讓**一般項目**失去 bullet。

**踩雷（2026-10-08）**：我傳了 `disabled: true` —— **那個選項不存在**，
是我自己編的參數名，**被完全忽略**（輸出仍是可點的 `class="enabled"`）。
🔴 **傳一個不存在的選項不會報錯，只是沒效果。**

### 🔴 兩個假綠燈（寫測試時最該記的部分）

第⑧節的斷言我連錯兩次，兩次都是**雙向驗證才抓到**：

1. 原本在 **HTML** 裡驗 `<li>一般項目</li>` 還在 —— 但 **CSS 不會改 HTML**
   ⇒ 把選擇器放寬成 `.vp-doc ul li` 時 bullet 真的消失，而測試 **48/48 全綠**。
   🔴 **斷言測的層級必須跟它要防的東西同一層。**
2. 改成檢查選擇器後**仍然全綠**：`([^{}]*)\{…\}` 會把規則上方
   **整段 `/* */` 註解**當成選擇器，而那段註解裡正好寫著
   「只收 `.task-list-item`」⇒ **自己的註解騙過自己的斷言**。
   🔴 **掃原始碼的斷言必須先剝註解** —— `test-theme.mjs` 已經記過這個坑，
   CSS 這邊又踩一次。

⚠️ 驗這件事要**三層**（依賴在 / config 真的 `use` / **build 產物真的有 `<input>`**）
—— 只驗前兩層的話「裝了但沒生效」會通過，上面那個 `disabled: true`
就是那個形狀。行為層用臨時探針檔驗完就刪，**不可依賴站上既有頁面**
（目前一個 checkbox 都還沒用，依賴既有頁面會讓斷言「因為沒人用」而永遠綠）。

## 測試

```bash
npm test          # test-sync-posts.mjs，26 項
```

已納入每日回歸（`~/.hermes/scripts/run_all_regressions.py`）。
⚠️ **支數不寫死** —— 它用 glob 自動發現，寫死的數字每次新增測試就過期。
vlog 組目前三支：`test-sync-posts.mjs`（26 項）、`test-links.mjs`（49 項）、
`test-theme.mjs`（4 項，含 headless Chrome 行為層）。

🔴 改 `sync-posts.mjs` 之後**要植入反向案例確認測試真的會紅** ——
全綠本身沒有意義。特別是第 ⑧ 組「手寫檔案不可被刪」：
一個「什麼都刪」的版本會讓其他 25 項全綠。

## 部署

push 到 `main` → Actions 自動 build＋部署。

🔴 **Actions 說 success 不等於站上更新了。**
`npm run publish` 會等 Actions 跑完再打線上網址驗證；
手動 push 的話自己 `curl` 確認。

## 相關

- 合併計畫與待辦：`~/Obsidian/02-Projects/vlog合併計畫-2026-09.md`
- 🔴 Step 3（OAuth 網址切換）與 Step 5（關 Vercel）**順序不可顛倒**
