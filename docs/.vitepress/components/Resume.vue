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
    icon: "/vlog/img/veutify-icon.svg",
    name: "Veutify",
    class: "veutify",
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
    icon: "/vlog/img/shinsoft-icon.png",
    job: "前端工程師",
    company: "新誼整合科技",
    time: "2023-07 ~ 在職中",
    content: [
      "1. 協助新平台大型專案前台架構規劃與開發，多部門協作、API、後台功能及資料庫架構規劃。",
      "2. 新平台的前、後台，前端功能、特效、動畫撰寫。",
      "3. 舊平台運營維護與重構，技術迭代，邏輯、效能優化。",
      "4. 定期行銷活動、節慶活動頁面製作。",
      "5. 新光醫院後台管理維護、新功能開發。",
      "6. 其他新光集團專案開發、新增舊專案功能開發。",
      "7. 幫忙設定使用者測驗角色跟檢測方式與大量下單測試",
    ],
    contribute: [
      "1. 導入 Vite、Nuxt，提高開發效率、降低維護成本。",
      "2. 使用 Vue3 Composition API 開發應用，提升了應用的加載速度和性能。",
      "3. 使用 Vue Router 構建動態和嵌套路由。",
      "4. 採用Pinia 進行全域狀態管理，簡化了資料流，提高了程式碼的可維護性。",
      "5. 使用 SCSS 預處理器編寫 CSS 代碼，以提高開發效率和維護性。",
      "6. 導入Swiper、Vuetify、Vee-Validate 等元件庫封裝，對齊專案技術，降低專案維護門檻。",
      "7. 在 Node 用Mocha、selenium編寫自動化程式模擬測試。",
    ],
  },
  {
    id: 2,
    icon: "/vlog/img/dlin-icon.png",
    job: "前端工程師",
    company: "德霖科技有限公司",
    time: "2022-11 ~ 2023-06",
    content: [
      "1. 可在線上觀看現場看診的即時進度。",
      "2. 患者線上預約指定的科別、醫生、時間。",
      "3. 患者可查詢自己所有的預約、提醒患者同時段不可重複預約看診。",
      "4. 醫生、護士、管理者權限角色的衛生福利部工作法規、排班規則、後台架設心智圖建立。",
      "5. 舊專案重構，專案開發，前端特效撰寫，多人協作、前後端分離串接API。",
      "6. 後臺功能製作及技術迭代，邏輯、效能優化。",
    ],
    contribute: [
      "1. 導入 Javascript(ES6)、Vue、SCSS 等現代前端技術。",
      "2. 導入 Vue.Draggable 統一拖曳套件，更容易實現拖曳移動到其他時間，提高協作效率80%。",
      "3. 導入 SCSS 預處理器技術，提高切版及維護效率200%。",
      "4. 導入 Seven One Pattern 的 CSS 管理方式，並且使用共用參數，提高切版及維護效率80%。",
      "5. flex、grid 等更具效率，邏輯的現代切版方式，實現更復雜的排版,提高切版效率。",
      "6. RWD規劃，依據各個大、小畫面顯示符合視窗寬度的內容，使用者好使用增加使用者體驗。",
      "7. 在專案中建議使用swagger，使前、後端分離更好管理。",
      "8. Git版控系統，整合工作SOP，降低維護工時 180%。",
      "9. 使用 jQuery 函式庫進行前端開發，包括操作 DOM、事件處理、Ajax 請求等。",
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
  我是一名擁有一年多快兩年經驗的前端工程師，<br>
  擅長 Vue 2、Vue 3、Vue Router 和 Pinia 等前端框架技術。<br>
  在職期間，參與多個專案開發與維護，熟練運用這些技術框架，提升了應用的性能和用戶體驗。<br>
  <br>
  例如：<br>
  1. 在德霖科技時的線上預約掛號、線上看診進度、排班後台。<br>
  2. 在新誼整合科技的攝影機後台控制系統、設備短路系統、對內電商平台、行銷活動頁、ＥＤＭ、分類頁面、購物車、Selenium整合測試。<br>
  <br>
  在假日期間，我積極與團隊合作承接外部專案，主要使用 Vue 3、Element plus、Vue Router、Pinia 、TypeScript 進行開發。<br>
  這些經驗讓我更加熟悉團隊協作流程，並提升了實戰技能，能夠高效地解決專案中遇到的各種技術挑戰。<br>
  <br>
  知道自己還不夠想做的更好。因此，平時我利用平日空閒時間持續進修，目前也有自己安排一些讀書計畫，不斷完善自己的知識體系，力求在專業領域保持領先。<br>
  我的目標是成為一名具備有技術力的前端工程師，為公司和團隊和自己創造更大的價值。
  `
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
            <img :src="work.icon" :alt="work.company" class="work-img" />
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
.resume {
  display: flex;

  .head {
    width: 18.75rem;

    .head-img {
      width: 18rem;
      height: 18rem;
      border-radius: 50%;
      border: 0.4rem solid #efe9aa;
      padding: 0.6rem;
      object-fit: cover;
    }

    .name-job {
      border-bottom: 0.2rem solid #fff;
      margin: 0 0.8rem;
      padding-bottom: 0.5rem;

      .name {
        font-size: 2.5rem;
        color: #fff;
        font-weight: 700;
        margin: 1rem 0 0 0;
      }

      .job {
        font-size: 1.2rem;
        color: #fff;
        margin: 0.5rem 0 0 0;
      }
    }

    .skills {
      margin: 0 0.8rem;
      padding: 0.5rem 0 0.8rem 0;
      border-bottom: 0.2rem solid #fff;

      .skills-title {
        font-size: 2.2rem;
        color: #fff;
        font-weight: 700;
        margin: 1rem 0 0 0;
      }

      .skills-main,
      .skills-ui,
      .skills-css,
      .skills-other {
        font-size: 1.2rem;
        color: #fff;
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

            img {
              width: 1.8rem;
              height: 1.8rem;
            }

            p {
              font-size: 1.4rem;
              color: #fff;
            }
          }
        }
      }
    }

    .contact {
      margin: 0 0.8rem;
      padding: 0.5rem 0 0.8rem 0;
      border-bottom: 0.2rem solid #fff;

      .contact-title {
        font-size: 2.2rem;
        color: #fff;
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
              color: #f6bb62;
            }
          }
        }
      }
    }
  }

  .content {
    width: 54rem;
    border-left: 0.2rem solid #fff;
    padding-left: 0.6rem;

    .work {
      .work-item {
        h3 {
          font-size: 1.75rem;
          color: #fff;
          font-weight: 700;
          margin: 2.5rem 0;
        }

        .work-introduce {
          display: flex;
          gap: 2rem;
          border-bottom: 0.1rem solid #fff;
          margin: 1.7rem 0;

          .work-img {
            width: 6rem;
            height: 6rem;
          }

          .work-content {
            line-height: 1.2;
            margin-bottom: 1.5rem;

            .work-company {
              font-size: 1.5rem;
              color: #fff;
              font-weight: 700;
            }

            .work-job,
            .work-time {
              font-size: 1.25rem;
              color: #fff;
            }

            .work-text {
              font-size: 1.2rem;
              color: #fff;
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
      color: #fff;
      font-weight: 700;
      margin: 1rem 0 0 0;
    }

    .content-text {
      font-size: 1.2rem;
      line-height: 1.5;
      color: #fff;
      margin: 2rem 0;
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

.veutify {
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
