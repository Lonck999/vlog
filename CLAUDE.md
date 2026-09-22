# vlog —— 地瓜球小攤（VitePress）

> 個人主站。2026-09-22 起 **blog（Nuxt）併入此站，以後只維護這一個**。
> 線上：https://lonck999.github.io/vlog/

## 這是什麼

VitePress 1.5.0 靜態站，GitHub Actions 自動部署到 GitHub Pages。

```
docs/pages/studyNotes/   75 篇   Vue / JS / SCSS / TailwindCSS 學習筆記
docs/pages/life/task/   239 篇   2024-12 ~ 2025-06 每日進度清單
docs/pages/occult/        3 篇   小六壬
docs/pages/aboutMe/             自介、作品、接案聯絡
docs/pages/posts/               🔄 由 vault 同步產生（見下）
docs/pages/legal/               隱私權政策、使用條款
```

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

## 測試

```bash
npm test          # test-sync-posts.mjs，26 項
```

已納入每日回歸（`~/.hermes/scripts/run_all_regressions.py`，39 支）。

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
