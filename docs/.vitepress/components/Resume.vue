<script setup>
import { ref, reactive } from "vue";

const headImg = ref("/vlog/img/logo.png");
const name = ref("蕭鼎澄");
const job = ref("Front-End Developer");
const skills = reactive([
  {
    id: 1,
    icon: "../../public/img/vue-icon.svg",
    name: "Vue.js",
    class: "vue",
  },
  {
    id: 2,
    icon: "../../public/img/pinia-icon.svg",
    name: "Pinia",
    class: "pinia",
  },
  {
    id: 3,
    icon: "../../public/img/vueRouter-icon.png",
    name: "Vue-Router",
    class: "vueRouter",
  },
  {
    id: 4,
    icon: "../../public/img/vite-icon.svg",
    name: "Vite",
    class: "vite",
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
        <ul>
          <li v-for="skill in skills" :key="skill.id">
            <div :class="skill.class">
              <img :src="skill.icon" :alt="skill.name" />
              <p>{{ skill.name }}</p>
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

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;

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

        .vueRouter {
          border: 0.2rem solid #328a63;
        }

        .vite {
          border: 0.2rem solid #9b5ffc;
        }
      }
    }
  }
}
</style>
