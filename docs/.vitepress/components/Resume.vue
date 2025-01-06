<script setup>
import { ref } from "vue";

const test = ref("test");
</script>

<template>
  <div class="resume">
    <div>大頭照</div>
    <div>文字自介</div>
  </div>
</template>

<style scoped>
.resume {
  background-color: #815656;
  display: flex;
}
</style>
