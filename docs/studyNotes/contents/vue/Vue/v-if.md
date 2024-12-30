# v-if

`v-if`也是一個常見的指令，他的用法其實也就是 js 的 if...else...一樣，

就是如果 怎樣怎樣 就 怎樣怎樣 的判斷方式在執行的。

只是現在是使用在 HTML 做渲染執行。

我們直接來看範例：

```vue
<template>
  <div>
    <button @click="toggle">切換顯示</button>
    <p v-if="isVisible">這是一段可見的文字！</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 定義一個響應式變量來控制顯示與否
const isVisible = ref(false);

// 定義一個方法來切換變量的值
const toggle = () => {
  isVisible.value = !isVisible.value;
};
</script>
```

個人最常使用的方式就是拿來做一些轉場，

在尚未讀取到呼叫的數據時，就顯示 讀取中～～請稍候～～

抓到數據之後顯示，就顯示拿到的數據內容。
