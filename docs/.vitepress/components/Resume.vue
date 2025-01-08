<script setup>
import { ref, reactive } from "vue";

const headImg = ref("/vlog/img/head.jpg");
const name = ref("蕭鼎澄");
const job = ref("Front-End Developer");
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
    icon: "/vlog/img/bootstrap-icon.svg",
    name: "Bootstrap",
    class: "bootstrap",
  },
  {
    id: 4,
    icon: "/vlog/img/element-icon.png",
    name: "Element Plus",
    class: "element",
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
    name: "CSS 3",
    class: "css",
  },
]);
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
        <p class="skills-title">Front-End Skills</p>
        <p class="skills-main">前端主要：</p>
        <ul>
          <li v-for="mainSkill in mainSkills" :key="mainSkill.id">
            <div :class="mainSkill.class">
              <img :src="mainSkill.icon" :alt="mainSkill.name" />
              <p>{{ mainSkill.name }}</p>
            </div>
          </li>
        </ul>
        <p class="skills-ui">UI Framework：</p>
        <ul>
          <li v-for="uiSkill in uiSkills" :key="uiSkill.id">
            <div :class="uiSkill.class">
              <img :src="uiSkill.icon" :alt="uiSkill.name" />
              <p>{{ uiSkill.name }}</p>
            </div>
          </li>
        </ul>
        <p class="skills-css">CSS類：</p>
        <ul>
          <li v-for="cssSkill in cssSkills" :key="cssSkill.id">
            <div :class="cssSkill.class">
              <img :src="cssSkill.icon" :alt="cssSkill.name" />
              <p>{{ cssSkill.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">文字自介</div>
  </div>
</template>

<style scoped>
.resume {
  display: flex;

  .head {
    width: 20rem;

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
      padding-top: 0.5rem;

      .skills-title {
        font-size: 2.2rem;
        color: #fff;
        font-weight: 700;
        margin: 1rem 0 0 0;
      }

      .skills-main,
      .skills-ui,
      .skills-css {
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
            padding-right: 0.15rem;

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
          border: 0.2rem solid #563d7c;
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
      }
    }
  }
}
</style>
