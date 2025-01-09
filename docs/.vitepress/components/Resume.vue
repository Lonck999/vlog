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
      <div class="content-title">自我介紹</div>
      <div v-html="mySelf" class="content-text"></div>
    </div>
  </div>
</template>

<style scoped>
.resume {
  display: flex;

  .head {
    width: 30%;

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
    width: 70%;
    border-left: 0.2rem solid #fff;
    padding-left: 0.6rem;

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
