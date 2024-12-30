# v-once

v-once 是 Vue 的一個指令，用於指示 Vue 不要動態渲染元素或組件。

v-once 指令會將元素或組件的內容渲染一次，並將其視為靜態內容，不會在元件更新時重新渲染。

v-once 指令通常用於需要提高渲染性能的場景，例如在列表渲染中，如果列表中的元素不會發生變化，可以使用 v-once 來避免不必要的重新渲染。

老實說我很少使用到他，

但有時候我們會需要一些靜態的內容，例如：

- 標題
- 文字

這時候我們就可以使用 v-once 來避免不必要的重新渲染。但我覺得很雞肋ＸＤＤＤ

我們來看以下範例

```vue
<template>
  <div>
    <!-- 使用 v-once，這段內容只渲染一次 -->
    <h1 v-once>歡迎來到我們的商店！</h1>

    <!-- 靜態的促銷標語，後端傳來的內容只渲染一次 -->
    <p v-once>{{ slogan }}</p>

    <!-- 一些會變動的內容，不使用 v-once -->
    <p>現在的時間：{{ currentTime }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 促銷標語，假設是後端傳來的靜態資料
const slogan = "全館折扣高達 50%，限時優惠！";

// 當前時間，模擬會變動的資料
const currentTime = ref(new Date().toLocaleTimeString());

// 每秒更新時間
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString();
}, 1000);
</script>
```
