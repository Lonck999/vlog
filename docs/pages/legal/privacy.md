---
title: 隱私權政策
---

<!--
🔴 這一頁是 Google OAuth 發布（Publishing status: In production）的必要條件之一。
   Google 的要求（官方文件 "Privacy Policy Requirements"）：
     · 必須與首頁同網域
     · 必須從首頁連得到
     · 必須揭露「如何存取、使用、儲存、分享 Google 使用者資料」
   ⚠️ 內容是事實陳述，不是行銷文案 —— 改動前先確認事實真的變了。
   2026-09-18 建立於 blog（Nuxt），經 Lonck 確認「照實寫，包含資料會經過 AI 模型」。
   2026-09-22 隨站台合併搬到 vlog（VitePress），
   🔴 同時把「託管在 Vercel」改成 GitHub Pages —— 搬家之後那句話就不是事實了。
-->

# 隱私權政策

最後更新：2026-09-22

## 這個網站

這是一個靜態網站，**沒有帳號系統、沒有留言、沒有表單**，
也沒有安裝任何分析或廣告追蹤工具。你在這裡讀文章時，我不會收到任何關於你的資料。

網站託管在 GitHub Pages，由它產生的伺服器存取紀錄（IP、瀏覽器種類等）
屬於 GitHub 的標準基礎設施紀錄，適用
[GitHub 的隱私權政策](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement)。

## 個人自動化工具（「小笨狗」）

我另外維護一套**只有我自己使用**的個人自動化工具，
在 Google Cloud 上註冊的名稱是「小笨狗」。
它會請求 Google 帳號的授權，用來處理我自己的信件、行事曆與檔案。
**它沒有其他使用者，也不提供給任何人使用。**

### 存取哪些資料

- **Gmail**（讀取、寄送、修改標籤）—— 自動整理信件分類、擷取銀行與券商寄來的帳單通知
- **Google 日曆**（讀寫）—— 把我的待辦清單與日曆雙向同步
- **Google 雲端硬碟、試算表、文件**（讀寫）—— 讀寫我自己的檔案
- **聯絡人**（唯讀）

### 資料存在哪裡

- OAuth token 存在我個人電腦的 `~/.hermes/`，檔案權限 `0600`，**沒有上傳到任何地方**
- 從信件擷取出來的帳單、對帳單資料存在我個人電腦，以及我自己的**私有** GitHub 儲存庫
- 沒有任何伺服器、資料庫或第三方服務保存這些內容

### 會不會經過第三方

會，這點我照實說明：這套工具由 AI 模型驅動，
**被處理的內容（例如信件內文、帳單金額）會經由 API 傳送給模型供應商（Anthropic）進行處理**，
適用 [Anthropic 的隱私權政策](https://www.anthropic.com/legal/privacy)。

除此之外，我**不會**把這些資料販售、交換，或分享給任何其他個人、公司或服務。

### Google 使用者資料的使用限制

這套工具對 Google 使用者資料的使用，遵守
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)，
包含其中的「限定使用（Limited Use）」要求。
資料只用於上面列出的用途，不用於廣告、不用於訓練模型。

### 要怎麼撤銷

授權隨時可以在
[Google 帳戶的第三方應用程式頁面](https://myaccount.google.com/permissions)
移除。移除之後這套工具就再也讀不到任何資料。

## 聯絡

有任何問題可以寄信到 [joe22053814@gmail.com](mailto:joe22053814@gmail.com)。
