<script setup>
import { ref, reactive } from "vue";
const mainSkills = reactive([
  {
    id: 1,
    icon: "/vlog/img/vue-icon.svg",
    name: "Vue.js",
    class: "vue",
  },
  {
    id: 2,
    icon: "/vlog/img/pinia-icon.svg",
    name: "Pinia",
    class: "pinia",
  },
  {
    id: 3,
    icon: "/vlog/img/axios-icon.png",
    name: "Axios",
    class: "axios",
  },
  {
    id: 4,
    icon: "/vlog/img/vueRouter-icon.png",
    name: "Vue-Router",
    class: "vueRouter",
  },
  {
    id: 5,
    icon: "/vlog/img/vite-icon.svg",
    name: "Vite",
    class: "vite",
  },

  {
    id: 6,
    icon: "/vlog/img/typescript-icon.svg",
    name: "TypeScript",
    class: "typescript",
  },
  {
    id: 7,
    icon: "/vlog/img/javascript-icon.svg",
    name: "JavaScript",
    class: "javascript",
  },
]);
const uiSkills = reactive([
  {
    id: 1,
    icon: "/vlog/img/quasar-icon.svg",
    name: "Quasar",
    class: "quasar",
  },
  {
    id: 2,
    icon: "/vlog/img/vuetify-icon.svg",
    name: "Vuetify",
    class: "vuetify",
  },
  {
    id: 3,
    icon: "/vlog/img/element-icon.png",
    name: "Element Plus",
    class: "element",
  },
  {
    id: 4,
    icon: "/vlog/img/bootstrap-icon.svg",
    name: "Bootstrap",
    class: "bootstrap",
  },
]);
const cssSkills = reactive([
  {
    id: 1,
    icon: "/vlog/img/tailwind-icon.svg",
    name: "Tailwind",
    class: "tailwind",
  },
  {
    id: 2,
    icon: "/vlog/img/scss-icon.svg",
    name: "SCSS",
    class: "scss",
  },
  {
    id: 3,
    icon: "/vlog/img/css-icon.svg",
    name: "CSS",
    class: "css",
  },
]);
const otherSkills = reactive([
  {
    id: 1,
    icon: "/vlog/img/jquery-icon.svg",
    name: "jQuery",
    class: "jquery",
  },
  {
    id: 2,
    icon: "/vlog/img/git-icon.svg",
    name: "Git",
    class: "git",
  },
  {
    id: 3,
    icon: "/vlog/img/selenium-icon.svg",
    name: "Selenium",
    class: "selenium",
  },
  {
    id: 4,
    icon: "/vlog/img/node-icon.svg",
    name: "Node.js",
    class: "node",
  },
  {
    id: 5,
    icon: "/vlog/img/html-icon.svg",
    name: "HTML",
    class: "html",
  },
]);
const contacts = reactive([
  {
    id: 1,
    name: "Github:",
    line: "https://github.com/Lonck999",
  },
  {
    id: 2,
    name: "Linkedin:",
    line: "https://pse.is/6y3nsj",
  },
  {
    id: 3,
    name: "Email:",
    line: "joe22053814@gmail.com",
  },
  {
    id: 4,
    name: "Phone:",
    line: "0989204737",
  },
]);
const works = reactive([
  {
    id: 1,
    // 🔴 爾升官網是 SPA 外殼，favicon 只有 16×16 放大後模糊
    //    ⇒ 用文字方塊（textIcon）取代圖片，與無品牌 logo 的技能同一套做法
    textIcon: "爾升",
    job: "前端工程師（管理 4 人以下）",
    company: "爾升資訊股份有限公司",
    time: "2025-06 ~ 在職中",
    content: [
      "1. 惠加 QMS 品質管理暨進銷存系統前端主要開發者：97 頁、9 大模組、35 個 API 模組，個人提交佔 72%（276/385）。",
      "2. 雙鴻 ESS 員工自助入口共同開發：出勤請假、薪資獎金、會議室預約，支援六語系。",
      "3. 集團零用金申請審核系統全端獨立開發（Express + PostgreSQL）。",
      "4. 彰化銀行投資人關係官網與 CMS：前台 36 頁、後台 119 頁／171 元件，符合金融資安與政府無障礙規範。",
      "5. 凱基 ePass、華南銀行 App、金融 FIDO 合庫／兆豐版 UI 切版與 API 串接。",
      "6. 撰寫團隊 coding style 與 AI Agent 協作規範，統一組員間的寫作方式。",
      "7. 與甲方專案負責人開需求會議、擬定前端流程與技術棧，依功能頁面分工給組員並參與開發。",
    ],
    contribute: [
      "1. 〔QMS〕設計全站權限層：usePermission 統一控制增／讀／改／刪／匯出／審核六種權限，useVisibleTabs 依權限動態顯示頁籤。",
      "2. 〔QMS〕抽出 useReviewStatus 與 ReviewStatusBlock 統一十餘個表單的多階段簽核，依狀態鎖定表單並杜絕權限繞過。",
      "3. 〔QMS〕以軟刪除旗標解決 vee-validate 動態 FieldArray 刪除時索引位移造成的資料錯亂；退貨批號改用複合 key 根治跨單別 ID 衝突。",
      "4. 〔ESS〕導入 vue-i18n 六語系（繁中／簡中／英／泰／越／緬），Yup schema 改為 computed 讓驗證訊息隨語系同步更新。",
      "5. 〔ESS〕維護模式子系統的訊號模組刻意零相依 —— axios 攔截器偵測 503 是最關鍵路徑，不能因 Pinia 未初始化或循環相依而整條靜默失效；並加 TTL 自動過期避免單次錯誤永久鎖死。",
      "6. 〔ESS〕全域錯誤對話框佇列以訊息 key 去重，一頁多支平行請求失敗只彈一次，並傳 i18n key 而非翻譯結果使切換語系即時更新。",
      "7. 〔零用金〕routes → controller → service → repository 四層架構、17 支 migration；狀態轉移以 version + CAS 更新包在交易內，衝突回 409，防止多人審核覆蓋。",
      "8. 〔零用金〕append-only 稽核軌跡記錄狀態與欄位差異；修補未登入可下載附件漏洞，補上 PDF magic bytes 驗證、SVG 過濾與角色授權矩陣；node:test 端對端測試 9 檔 94 案例（真實 DB 與 HTTP）。",
      "9. 〔零用金〕Ubuntu + nginx + systemd 部署與每日備份，撰寫冪等安裝腳本與離線安裝包供無網路機房使用。",
      "10. 〔彰銀 IR〕SSO 與 AD 雙軌登入以 runtime 設定檔切換免重新編譯；實作無障礙 accesskey 跳轉錨點，配合 IIS CSP／HSTS 等資安標頭。",
    ],
  },
  {
    id: 2,
    icon: "/vlog/img/shinsoft-icon.png",
    job: "前端工程師",
    company: "新誼整合科技",
    time: "2022-07 ~ 2025-06",
    content: [
      "1. 協助新平台大型專案前台架構規劃與開發，多部門協作、API、後台功能及資料庫架構規劃。",
      "2. 新平台的前、後台，前端功能、特效、動畫撰寫。",
      "3. 舊平台運營維護與重構，技術迭代，邏輯、效能優化。",
      "4. 定期行銷活動、節慶活動頁面製作。",
      "5. 新光醫院後台管理維護、新功能開發。",
      "6. 其他新光集團專案開發、新增舊專案功能開發。",
      "7. 協助設定使用者測驗角色跟檢測方式與大量下單測試。",
    ],
    contribute: [
      "1. 導入 Vite、Nuxt，提高開發效率、降低維護成本。",
      "2. 使用 Vue3 Composition API 開發應用，提升了應用的加載速度和性能。",
      "3. 使用 Vue Router 構建動態和嵌套路由。",
      "4. 採用 Pinia 進行全域狀態管理，簡化了資料流，提高了程式碼的可維護性。",
      "5. 使用 SCSS 預處理器編寫 CSS 代碼，以提高開發效率和維護性。",
      "6. 導入 Swiper、Vuetify、Vee-Validate 等元件庫封裝，對齊專案技術，降低專案維護門檻。",
      "7. 在 Node 用 Mocha、Selenium 編寫自動化程式模擬測試。",
      "8. 以 three.js 建置產品展示：GLTFLoader 搭配 Draco 壓縮載入模型、EXR 環境貼圖打光，並在元件卸載時遍歷釋放 geometry 與 material 避免記憶體洩漏。",
      "9. 以 GSAP ScrollTrigger 實作捲動驅動的產品拆解、鏡頭移動與段落轉場。",
      "10. 大型 3D 資產（glb／exr 逾 100MB）不進版控改以 NAS 管理，並壓縮模型與光照貼圖優化首屏載入。",
    ],
  },
  {
    id: 3,
    icon: "/vlog/img/dlin-icon.png",
    job: "軟體工程師",
    company: "德霖科技有限公司",
    time: "2020-11 ~ 2022-06",
    content: [
      "1. 可在線上觀看現場看診的即時進度。",
      "2. 患者線上預約指定的科別、醫生、時間。",
      "3. 患者可查詢自己所有的預約、提醒患者同時段不可重複預約看診。",
      "4. 醫生、護士、管理者權限角色的衛生福利部工作法規、排班規則、後台架設心智圖建立。",
      "5. 舊專案重構，專案開發，前端特效撰寫，多人協作、前後端分離串接 API。",
      "6. 後臺功能製作及技術迭代，邏輯、效能優化。",
      "7. ERP／人資系統：多公司租戶的內部 HR 與行政系統，44 個模組、139 個頁面。",
      "8. 接手維護舊架構站台：Gulp + Pug + Sass 靜態站、jQuery 純 HTML（60+ 頁）、ant-design-vue + Vuex 後台。",
    ],
    contribute: [
      "1. 導入 Javascript(ES6)、Vue、SCSS 等現代前端技術。",
      "2. 導入 Vue.Draggable 統一拖曳套件，更容易實現拖曳移動到其他時間，提高排班協作效率。",
      "3. 導入 SCSS 預處理器與 Seven One Pattern 的 CSS 管理方式並使用共用參數，提高切版及維護效率。",
      "4. 以 flex、grid 等更具效率的現代切版方式實現複雜排版；RWD 規劃依各尺寸畫面顯示符合視窗寬度的內容。",
      "5. 在專案中建議使用 Swagger，使前、後端分離更好管理；整合 Git 版控與工作 SOP，降低維護工時。",
      "6. 〔ERP〕開發簽核流程引擎前端：流程定義、簽核角色、待簽核事項與撤銷，並套用至請假、派車、出差等各式單據。",
      "7. 〔ERP〕實作 GPS 定位打卡（座標比對允許地點）、差勤與請假加班出差的撤銷流程、組織圖、薪資表列印、車輛派遣與會議室預約、經銷商子系統。",
      "8. 〔ERP〕以獨立 axios instance 串接 QMS 系統 API，達成兩套系統的資料整合。",
      "9. 維護 Gulp 建置管線：以參數切換開發／正式模式，並自動產出 sitemap。",
    ],
  },
]);
const projects = reactive([
  {
    id: 1,
    icon: "/vlog/img/t-icon.png",
    job: "前端工程師",
    company:
      "團隊接案：(第三期)機器學習⾞牌辨識、車牌標記-處理⼤量前端滑鼠操作以及鍵盤快速鍵",
    time: "2024-03 ~ 2024-06",
    content: [
      "1. 大型專案開發，前端功能撰寫，多人協作、後台功能架構規劃製作。",
      "2. 串接後端開發的API，串websocket。",
      "3. 配合監視器，做即時監控與分析系統，用於提供即時數據展示與分析。",
      "4. 利用滑鼠框列範圍辨識車牌上的字母、數字。",
      "5. 部分網頁開發案，其他與甲方溝通、要素材、資料等...其他行政事宜。",
    ],
    skills:
      "Vue3、Element-plus、TypeScript、JavaScript、TailwindCSS、RESTful API、Websocket。",
    contribute: [
      "1. Vue3 的 Composition API，打造模組化、可維護的前端架構。",
      "2. 使用 Element Plus 作為 UI 組件庫，快速構建高效、易用的介面，例如表單、表格和彈窗設計，縮短 30% 開發時間。",
      "3. 使用 TailwindCSS 編寫代碼，有系統的維護設計樣式標準，確保跨頁面視覺一致性，提高切版及維護效率20%。",
      "4. 導入 TypeScript，透過型別系統，有效降低潛在 Bug 並提升程式可讀性，將程式維護成本降低 25%。",
      "5. 透過 Websocket 雙向通訊機制，實現車輛數據及 AI 判定結果的即時結果。",
      "6. 串接後端提供的 RESTful API，完成資料的讀取、更新及操作功能。",
      "7. 使用 Swagger 文檔進行 API 的溝通與測試，確保前後端協作效率和準確性。",
      "8. 利用 MQTT 通訊協議，實現高效能、低延遲的資料傳輸，適合處理物聯網設備數據",
      "9. 使用Git版本控制系統，製作新功能時開啟新分支，完成後發PR給技術長，測試完成進行合併，進行程式碼管理和協作。",
      "10. 與設計師和後端工程師進行溝通，確保前端設計符合設計規格並且可以與後端整合。",
    ],
  },
  {
    id: 2,
    icon: "/vlog/img/i-icon.png",
    job: "前端工程師",
    company: "個人接案：團購群電商平台開發(身心保健)",
    time: "2024-10 ~ 2024-11",
    content: [
      "1. 製作一個新的電商平台前台。",
      "2. 實踐前台功能、各頁面切版、RWD部分。",
    ],
    skills: "HTML、SCSS、Bootstrap、JavaScript",
    contribute: [
      "1. 使用 SCSS 編寫高效的樣式表，利用變數、Mixin 和函數提升樣式的重用性與一致性。",
      "2. 使用 Seven One Pattern 樣式結構，將樣式拆分為多個文件，便於專案的維護與團隊協作。",
      "3. 使用Bootstrap內建的元件（如導航欄、按鈕等），縮短 UI 開發時間並保持設計一致性。",
      "4. 使用 JavaScript 處理頁面交互邏輯，例如按鈕事件、表單驗證和動畫效果。",
      "5. 使用原生 DOM 操作和事件監聽，實現即時數據渲染與用戶交互功能。",
    ],
  },
  {
    id: 3,
    icon: "/vlog/img/t-icon.png",
    job: "前端工程師",
    company: "團隊接案：(第二期)攝影機即時識別顏色與車牌系統",
    time: "2023-11 ~ 2024-01",
    content: [
      "1. 協作影像辨識相關軟體開發。",
      "2. 配合監視器，做即時數據監控與分析系統，用於提供即時數據展示與分析。",
      "3. 大型專案開發，前端功能撰寫，多人協作、後台功能架構規劃製作。",
      "4. 串接後端開發的API，串websocket。",
      "5. 部分網頁開發案，其他與甲方溝通、要素材、資料等...其他行政事宜。",
    ],
    skills:
      "Vue3、Element-plus、TypeScript、JavaScript、TailwindCSS、RESTful API、Websocket。",
    contribute: [
      "1. 使用 Vue 3 作為核心框架，實現前端動態 UI 組件和頁面邏輯。",
      "2. 使用 Element Plus 作為 UI 組件庫，快速構建高效、易用的介面，例如表單、表格和彈窗設計。",
      "3. 導入 TypeScript，透過型別系統，有效降低潛在 Bug 並提升程式可讀性，將程式維護成本降低 25%。",
      "4. 使用 TailwindCSS 實現快速樣式設計，有系統的維護設計樣式標準，確保跨頁面視覺一致性，提高切版及維護效率20%。",
      "5. 串接後端提供的 RESTful API，完成資料的讀取、更新及操作功能。",
      "6. 使用 Swagger 文檔進行 API 的溝通與測試，確保前後端協作效率和準確性。",
      "7. 使用 WebSocket 提供即時資料推送功能，提升用戶互動體驗。",
      "8. 利用 MQTT 通訊協議，實現高效能、低延遲的資料傳輸，適合處理物聯網設備數據。",
    ],
  },
  {
    id: 4,
    icon: "/vlog/img/t-icon.png",
    job: "前端工程師",
    company: "作品：德美診所網路預約、即時看診進度平台",
    time: "2023/2 ~ 2023/6",
    content: [
      "1. 提供病患在線預約與即時看診資訊，提升診所運營效率及病患就醫體驗。",
      "2. 提供病患可在家即時預約想要的日期、時段，並統一管理醫生每日可預約人數，減少人力。",
      "3. 提供病患查詢本身預約的日期與時段，也主動幫患者避開預約到同一個時段。",
      "4. 設置簡訊提醒患者自己的預約時間與科別。",
      "5. 方便病患可直接在手機上預約。",
    ],
    skills: "HTML、SCSS、JavaScript、jQuery",
    contribute: [
      "1. 與產品經理及後端工程師協作，釐清診所端與診所端需求，制定前端開發流程。",
      "2. 製作前端架構心智圖建立、與產品經理確定技術選型。",
      "3. 使用 Seven One Pattern 的 CSS 管理方式，並且使用共用參數，提高切版及維護效率80%。",
      "4. 使用 RWD 響應式設計原則，確保跨裝置介面一致且順暢，行動端訪客滿意度提高 25%。",
      "5. jQuery 與 AJAX 串接後端 API，即時更新看診進度，縮短病患等待時間並強化使用者體驗。",
      "6. 使用 SCSS 結構化管理樣式，優化維護效率，並提高前端程式碼的可讀性與可維護性。",
      "7. 有效串接預約資訊與後台系統，將預約處理效率提升 30%，大幅縮短醫療人員的行政負擔。",
      "8. 與後端人員討論在專案中建議使用swagger，使前、後端分離更好管理。",
    ],
  },
  {
    id: 5,
    icon: "/vlog/img/t-icon.png",
    job: "前端工程師",
    company: "團隊接案：(第一期)道路車輛即時畫面與ＡＩ輪軸速度判定",
    time: "2023-01 ~ 2023-03",
    content: [
      "1. 協作影像辨識相關軟體開發。",
      "2. 大型專案開發，前端功能撰寫，多人協作、後台功能架構規劃製作。",
      "3. 串接後端開發的API，串websocket。",
      "4. 部分網頁開發案，其他與甲方溝通、要素材、資料等...其他行政事宜。",
    ],
    skills:
      "Vue3、Element-plus、TypeScript、JavaScript、TailwindCSS、RESTful API、Websocket。",
    contribute: [
      "1. Vue3 的 Composition API，打造模組化、可維護的前端架構。",
      "2. 使用 Element-Plus 快速建構一致且專業的介面，縮短 30% 開發時間。",
      "3. 使用 TailwindCSS 編寫代碼，有系統的維護設計樣式標準，確保跨頁面視覺一致性，提高切版及維護效率20%。",
      "4. 導入 TypeScript，透過型別系統，有效降低潛在 Bug 並提升程式可讀性，將程式維護成本降低 25%。",
      "5. 透過 Websocket 雙向通訊機制，實現車輛數據及 AI 判定結果的即時結果。",
      "6. 實作前端功能，如表單驗證、資料綁定、數據判斷等。",
      "7. 使用Git版本控制系統，製作新功能時開啟新分支，完成後發PR給技術長，測試完成進行合併，進行程式碼管理和協作。",
      "8. 與設計師和後端工程師進行溝通，確保前端設計符合設計規格並且可以與後端整合。",
    ],
  },
  {
    id: 6,
    icon: "/vlog/img/i-icon.png",
    job: "前端工程師",
    company: "個人接案：蘋果莊園手工香皂品牌網站",
    time: "2022-08 ~ 2022-09",
    content: [
      "1. 官網更新，UIUX實現、製作動畫效果、網頁切版、RWD規劃。",
      "2. SEO調整，符合google搜尋引擎最佳化。",
    ],
    skills: "HTML、SCSS、JavaScript。",
    contribute: [
      "1. 使用 HTML 語言開發前端網頁，確保網頁結構和內容符合標準和最佳實踐。",
      "2. 實作語意化的 HTML 標籤，以提高網頁的可訪問性和 SEO。",
      "3. 使用 SCSS 預處理器編寫 CSS 代碼，提高開發效率和維護性100%。",
      "4. 開發模組化和可重用的 SCSS 代碼，減少代碼重複和冗餘40%。",
      "5. 實作規範化的 CSS，以確保網頁樣式的一致性和可維護性。",
      "6. 使用 CSS RWD 技術，實現不同裝置的樣式設定。",
      "7. 實作彈性圖片、彈性文字、彈性佈局等技術，以提高網頁的彈性和適應性。",
      "8. RWD製作，以支援不同大小的螢幕和裝置。",
    ],
  },
]);

const headImg = ref("/vlog/img/head.jpg");
const name = ref("蕭鼎澄");
const job = ref("Front-End Developer");
const skillsTitle = ref("Front-End Skills");
const skillsMain = ref("前端主要：");
const skillsUi = ref("UI Framework：");
const skillsCss = ref("CSS類：");
const skillsOther = ref("其他：");
const contactTitle = ref("Contact");
const mySelf = ref(
  `
  我是一名前端工程師，擅長 Vue 3 Composition API、Vue Router、Pinia、Nuxt 等前端技術，<br>
  也能獨立完成 Node.js / Express + PostgreSQL 的後端與 Ubuntu 部署。<br>
  <br>
  近期主要負責的專案：<br>
  1. 惠加 QMS 品質管理暨進銷存系統 —— 97 頁、9 大模組，個人提交佔 72%，從權限層、多階段簽核到匯出審核流程。<br>
  2. 雙鴻 ESS 員工自助入口 —— 六語系（繁簡英泰越緬）、維護模式子系統、全域錯誤佇列。<br>
  3. 集團零用金申請審核系統 —— 全端獨立開發，四層架構、CAS 防併發覆蓋、append-only 稽核軌跡。<br>
  4. 彰化銀行投資人關係官網與 CMS —— 符合金融資安與政府無障礙規範。<br>
  <br>
  比較在意的事：<br>
  1. 錯誤不要靜默。例如 ESS 的維護訊號模組刻意零相依，因為 axios 攔截 503 是最關鍵路徑，不能因為 Pinia 未初始化就整條失效。<br>
  2. 用機制取代約定。團隊的 coding style 與 AI Agent 協作規範寫成文件，不靠口頭提醒。<br>
  3. 交付標準是「能用」。寫在註解裡的方案、切不動的功能都算沒做完。<br>
  <br>
  平時持續進修並安排讀書計畫，目標是成為具備技術判斷力的前端工程師，為團隊創造更大的價值。
  `,
);
</script>

<template>
  <div class="resume">
    <div class="head">
      <img class="head-img" :src="headImg" alt="head" />
      <div class="name-job">
        <p class="name">{{ name }}</p>
        <p class="job">{{ job }}</p>
      </div>
      <div class="skills">
        <p class="skills-title">{{ skillsTitle }}</p>
        <p class="skills-main">{{ skillsMain }}</p>
        <ul>
          <li v-for="mainSkill in mainSkills" :key="mainSkill.id">
            <div :class="mainSkill.class">
              <img :src="mainSkill.icon" :alt="mainSkill.name" />
              <p>{{ mainSkill.name }}</p>
            </div>
          </li>
        </ul>
        <p class="skills-ui">{{ skillsUi }}</p>
        <ul>
          <li v-for="uiSkill in uiSkills" :key="uiSkill.id">
            <div :class="uiSkill.class">
              <img :src="uiSkill.icon" :alt="uiSkill.name" />
              <p>{{ uiSkill.name }}</p>
            </div>
          </li>
        </ul>
        <p class="skills-css">{{ skillsCss }}</p>
        <ul>
          <li v-for="cssSkill in cssSkills" :key="cssSkill.id">
            <div :class="cssSkill.class">
              <img :src="cssSkill.icon" :alt="cssSkill.name" />
              <p>{{ cssSkill.name }}</p>
            </div>
          </li>
        </ul>
        <p class="skills-other">{{ skillsOther }}</p>
        <ul>
          <li v-for="otherSkill in otherSkills" :key="otherSkill.id">
            <div :class="otherSkill.class">
              <img :src="otherSkill.icon" :alt="otherSkill.name" />
              <p>{{ otherSkill.name }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="contact">
        <p class="contact-title">{{ contactTitle }}</p>
        <ul>
          <li v-for="contact in contacts" :key="contact.id">
            <p>
              {{ contact.name }}
            </p>
            <a :href="contact.line" target="_blank">{{ contact.line }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="work">
        <h1 class="content-title">工作經驗</h1>
        <div class="work-item">
          <h3>公司經歷：</h3>
          <div v-for="work in works" :key="work.id" class="work-introduce">
            <!-- 🔴 沒有品牌 logo 的公司用文字方塊，不硬配一個無關的圖示 -->
            <div v-if="work.textIcon" class="work-img work-text-icon">
              {{ work.textIcon }}
            </div>
            <img
              v-else
              :src="work.icon"
              :alt="work.company"
              class="work-img"
            />
            <div class="work-content">
              <p class="work-company">{{ work.company }}</p>
              <p class="work-job">{{ work.job }}</p>
              <p class="work-time">{{ work.time }}</p>
              <p class="work-text">工作內容：</p>
              <ul>
                <li v-for="(content, index) in work.content" :key="index">
                  {{ content }}
                </li>
              </ul>
              <p class="work-text">專案貢獻：</p>
              <ul>
                <li v-for="(contribute, index) in work.contribute" :key="index">
                  {{ contribute }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="work-item">
          <h3>接案經歷：</h3>
          <div
            v-for="project in projects"
            :key="project.id"
            class="work-introduce"
          >
            <img :src="project.icon" :alt="project.company" class="work-img" />
            <div class="work-content">
              <p class="work-company">{{ project.company }}</p>
              <p class="work-job">{{ project.job }}</p>
              <p class="work-time">{{ project.time }}</p>
              <p class="work-text">工作內容：</p>
              <ul>
                <li v-for="(content, index) in project.content" :key="index">
                  {{ content }}
                </li>
              </ul>
              <p class="work-text">技術內容：</p>
              <p>{{ project.skills }}</p>
              <p class="work-text">專案貢獻：</p>
              <ul>
                <li
                  v-for="(contribute, index) in project.contribute"
                  :key="index"
                >
                  {{ contribute }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content-title">自我介紹</div>
      <div v-html="mySelf" class="content-text"></div>
    </div>
  </div>
</template>

<style scoped>
/*
 * 🔴 2026-10-01：整份改用 VitePress 主題變數，不可寫死顏色。
 *
 * 症狀：Lonck 回報「兩個區塊顏色不統一，有些字看不到」。
 *
 * 實測（headless Chrome 量運算後的顏色，不是讀 CSS 猜的）：
 *   【亮色】「蕭鼎澄」fg=rgb(255,255,255) bg=rgb(255,255,255) → **對比度 1.0**
 *   【暗色】同一個元素                                        → 對比度 17.17
 *
 * 根因：這份元件有 38 處寫死的顏色、**0 處 CSS 變數、0 個 .dark 樣式** ——
 *       等於它假設「背景永遠是深色」。VitePress 預設是亮色，
 *       所以**白底白字**，整個左欄＋工作經歷在亮色模式下全部隱形。
 *
 * ⚠️ 為什麼拖這麼久沒被發現：作者自己開暗色模式，而暗色下它完全正常。
 *    🔴 **預設狀態（第一次來的訪客看到的）才是要驗的那個。**
 *
 * ✅ 規則：
 *    · 文字 → var(--vp-c-text-1)   （主文字，隨模式切換）
 *    · 分隔線 → var(--vp-c-divider)
 *    · 強調/hover → var(--vp-c-brand-1)
 *    · 技術標籤的品牌色邊框（#42b883 Vue、#f7df1e JS…）**保持原色** ——
 *      那是各家官方識別色，不該隨主題變。
 *      🔴 但它們**單靠自己撐不住兩種模式**（實算：JS 亮底 1.35、
 *      Vite 暗底 1.95，門檻 3.0）⇒ 加一塊 var(--vp-c-bg-soft) 襯底，
 *      讓邊框永遠貼在穩定背景上，而不是去改各家的識別色。
 */
.resume {
  display: flex;

  .head {
    width: 18.75rem;

    .head-img {
      width: 18rem;
      height: 18rem;
      border-radius: 50%;
      /* 🔴 原本 #efe9aa（淡黃）在亮底對比度 **1.24**，等於沒有外框。
         改用主題分隔線色：兩種模式下都看得見。 */
      border: 0.4rem solid var(--vp-c-divider);
      padding: 0.6rem;
      object-fit: cover;
    }

    .name-job {
      border-bottom: 0.2rem solid var(--vp-c-divider);
      margin: 0 0.8rem;
      padding-bottom: 0.5rem;

      .name {
        font-size: 2.5rem;
        color: var(--vp-c-text-1);
        font-weight: 700;
        margin: 1rem 0 0 0;
      }

      .job {
        font-size: 1.2rem;
        color: var(--vp-c-text-1);
        margin: 0.5rem 0 0 0;
      }
    }

    .skills {
      margin: 0 0.8rem;
      padding: 0.5rem 0 0.8rem 0;
      border-bottom: 0.2rem solid var(--vp-c-divider);

      .skills-title {
        font-size: 2.2rem;
        color: var(--vp-c-text-1);
        font-weight: 700;
        margin: 1rem 0 0 0;
      }

      .skills-main,
      .skills-ui,
      .skills-css,
      .skills-other {
        font-size: 1.2rem;
        color: var(--vp-c-text-1);
        margin: 1rem 0;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        li {
          div {
            display: flex;
            align-items: center;
            gap: 0.2rem;
            border-radius: 0.5rem;
            padding: 0.18rem 0.24rem 0.18rem 0.18rem;
            /* 🔴 襯底：讓品牌色邊框在兩種模式下都看得見。
               實算邊框對比度（門檻：非文字 3.0）——
                 JS  #f7df1e  亮底 1.35 ❌ / 暗底 12.70 ✅
                 Pinia #ffd700 亮底 1.40 ❌ / 暗底 12.24 ✅
                 Vite #5c21bb 亮底 8.79 ✅ / 暗底  1.95 ❌   ← 反方向也會壞
               ⚠️ 兩個方向都有問題 ⇒ 不能只「為亮色調一次」。
               ✅ 解法不是改品牌色（那是各家官方識別色），
                  是給一塊中性襯底，讓邊框永遠貼在穩定的背景上。 */
            background-color: var(--vp-c-bg-soft);

            img {
              width: 1.8rem;
              height: 1.8rem;
            }

            p {
              font-size: 1.4rem;
              color: var(--vp-c-text-1);
            }
          }
        }
      }
    }

    .contact {
      margin: 0 0.8rem;
      padding: 0.5rem 0 0.8rem 0;
      border-bottom: 0.2rem solid var(--vp-c-divider);

      .contact-title {
        font-size: 2.2rem;
        color: var(--vp-c-text-1);
        font-weight: 700;
        margin: 1rem 0 0 0;
      }

      ul {
        font-size: 1.25rem;
        margin-top: 1rem;

        li {
          margin-bottom: 0.5rem;

          a {
            font-size: 1rem;

            &:hover {
              /* 🔴 用主題的強調色，不寫死。
                 實算：#f6bb62 在亮底 #fff 上對比度 **1.72**（暗底 9.98）——
                 又是同一個病：只在深色背景下成立的顏色。
                 改用 var(--vp-c-brand-1)：亮 7.08、暗 8.5，兩邊都過 AA。 */
              color: var(--vp-c-brand-1);
            }
          }
        }
      }
    }
  }

  .content {
    width: 54rem;
    border-left: 0.2rem solid var(--vp-c-divider);
    padding-left: 0.6rem;

    .work {
      .work-item {
        h3 {
          font-size: 1.75rem;
          color: var(--vp-c-text-1);
          font-weight: 700;
          margin: 2.5rem 0;
        }

        .work-introduce {
          display: flex;
          gap: 2rem;
          border-bottom: 0.1rem solid var(--vp-c-divider);
          margin: 1.7rem 0;

          .work-img {
            width: 6rem;
            height: 6rem;
          }

          /* 🔴 沒有品牌 logo 的公司：文字方塊取代圖片。
             用 var(--vp-c-*) 不寫死顏色（亮暗模式都要讀得到）。 */
          .work-text-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 1.6rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: var(--vp-c-text-1);
            background: var(--vp-c-bg-soft);
            border: 2px solid var(--vp-c-divider);
            border-radius: 0.6rem;
          }

          .work-content {
            line-height: 1.2;
            margin-bottom: 1.5rem;

            .work-company {
              font-size: 1.5rem;
              color: var(--vp-c-text-1);
              font-weight: 700;
            }

            .work-job,
            .work-time {
              font-size: 1.25rem;
              color: var(--vp-c-text-1);
            }

            .work-text {
              font-size: 1.2rem;
              color: var(--vp-c-text-1);
              margin: 1rem 0 0.5rem 0;
            }

            ul {
              font-size: 1.2rem;
              line-height: 1.4;
              margin-left: 0.5rem;
            }
          }
        }
      }
    }

    .content-title {
      font-size: 2.2rem;
      color: var(--vp-c-text-1);
      font-weight: 700;
      margin: 1rem 0 0 0;
    }

    .content-text {
      font-size: 1.2rem;
      line-height: 1.5;
      color: var(--vp-c-text-1);
      margin: 2rem 0;
    }
  }
}

/* ══════════════════════════════════════════════
   🔴 RWD：這個元件原本**完全沒有 @media**。
   實測 390px 時 .resume 仍是 flex-direction: row ⇒
   左欄被壓到 244px、右欄「工作經驗」擠成直書細縫，完全讀不了。
   ══════════════════════════════════════════════ */

/* 平板：兩欄還放得下，但左欄要縮、字級降一階 */
@media (max-width: 1024px) {
  .resume {
    .head {
      width: 15rem;

      .head-img {
        width: 13rem;
        height: 13rem;
      }
    }
  }
}

/* 🔴 手機：改成單欄直向堆疊（上頭像/技能、下工作經歷） */
@media (max-width: 768px) {
  .resume {
    flex-direction: column;

    .head {
      /* 🔴 固定寬度要一起解掉，否則 column 下仍然只有 18.75rem */
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;

      .head-img {
        width: 12rem;
        height: 12rem;
      }

      .name-job,
      .skills,
      .contact {
        width: 100%;
        max-width: 32rem;
      }
    }

    .content {
      width: 100%;
      /* 🔴 原本靠 flex 分配剩餘空間，column 下要解掉任何左邊距 */
      margin-left: 0;
      padding-left: 0;

      .work {
        .work-item {
          .work-introduce {
            /* 🔴 圖示 + 文字在窄螢幕改成上下排，否則文字欄寬不足 */
            flex-direction: column;

            .work-img {
              margin-bottom: 0.8rem;
            }
          }
        }
      }
    }
  }
}

/* 小手機：字級再降一階，避免長技術名詞撐破 */
@media (max-width: 420px) {
  .resume {
    .content {
      .work .work-item .work-introduce .work-content {
        .work-company {
          font-size: 1.3rem;
        }

        .work-job,
        .work-time {
          font-size: 1.1rem;
        }

        ul,
        .work-text {
          font-size: 1.05rem;
        }
      }
    }

    .content-title {
      font-size: 1.8rem;
    }
  }
}
.vue {
  border: 0.2rem solid #42b883;
}

.pinia {
  border: 0.2rem solid #ffd700;
}

.axios {
  border: 0.2rem solid #5c21bb;
}

.vueRouter {
  border: 0.2rem solid #328a63;
}

.vite {
  border: 0.2rem solid #9b5ffc;
}

.quasar {
  border: 0.2rem solid #2f8aa6;
}

.vuetify {
  border: 0.2rem solid #5f9efc;
}

.bootstrap {
  border: 0.2rem solid #712cf9;
}

.element {
  border: 0.2rem solid #409eff;
}

.tailwind {
  border: 0.2rem solid #3cadd0;
}

.scss {
  border: 0.2rem solid #cd6799;
}

.css {
  border: 0.2rem solid #3cadd0;
}

.typescript {
  border: 0.2rem solid #3178c6;
}

.javascript {
  border: 0.2rem solid #f7df1e;
}

.jquery {
  border: 0.2rem solid #0769ad;
}

.git {
  border: 0.2rem solid #f05032;
}

.selenium {
  border: 0.2rem solid #43b02a;
}

.node {
  border: 0.2rem solid #689f63;
}

.html {
  border: 0.2rem solid #e96228;
}
</style>
