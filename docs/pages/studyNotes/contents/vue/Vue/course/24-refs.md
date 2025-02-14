# $refs

在 Vue.js 中，$refs 是一個非常有用的指令，它可以用來訪問 DOM 元素或組件實例，就簡單來說，他的作用很像 HTML 的 ID，當然也有其他功能，我們先從最簡單的開始。

例如： `<div id="app"></div>`，只是在 Vue 中，我們寫成 `<div ref="app"></div>`，

## 範例

你可以把它想成是 HTML 的 ID，用法就是類似於 JS 一樣用 ID 取得 DOM 元素一樣，用法也一樣。

但在 setup 中，我們需要先宣告一個變數來存放 DOM 的參考，型別可以先給 null，

在 Options 使用時會用 `this.$refs.取的名字` 來取得，不用在宣告一個變數。

```vue
<script setup>
import { ref, onMounted } from "vue";

// 用來存放 DOM 的參考，型別可以先給 null
const searchInput = ref(null);

function focusInput() {
  // 透過 .value 就能取得真正的 DOM 元素
  if (searchInput.value) {
    searchInput.value.focus();
  }
}

// 也可以在元件掛載完成後就立刻聚焦這個輸入框
onMounted(() => {
  if (searchInput.value) {
    searchInput.value.focus();
    console.log(searchInput.value.value); // 取得 input 輸入的文字
    searchInput.value.style.color = "red"; // 改變字體顏色
  }
});
</script>
<template>
  <div>
    <input ref="searchInput" placeholder="請輸入搜尋關鍵字" />
    <button @click="focusInput">聚焦輸入框</button>
  </div>
</template>
```

## 其他功能

接下來看一個比較複雜的範例，我們會在元件中使用 refs 來取得子元件的東西。

父層

```vue
<script setup>
import { ref } from "vue";
import ChildComponent from "@/components/forTest/test.vue";

const childRef = ref<InstanceType<typeof ChildComponent> | null>(null);

const handleClick = () => {
  if (childRef.value) {
    const childElement = childRef.value.$refs.child as HTMLElement;
    if (childElement) {
      childElement.style.color = 'red' // 改變字體顏色
    }
  }
};
</script>
<template>
  <ChildComponent ref="childRef" />
  <button @click="handleClick">Access Child Ref</button>
</template>
```
