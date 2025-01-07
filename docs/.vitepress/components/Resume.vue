<script setup>
import { ref } from "vue";

const headImg = ref("../../public/img/logo.png");
</script>

<template>
  <div class="resume">
    <div class="head">
      <img :src="headImg" alt="head" />
    </div>
    <div class="content">文字自介</div>
  </div>
</template>

<style scoped>
.resume {
  background-color: #815656;
  display: flex;

  .head {
    width: 20rem;

    img {
      width: 18rem;
      height: 18rem;
      border-radius: 50%;
      border: 0.4rem solid #efe9aa;
      padding: 0.6rem;
    }
  }
}
</style>
