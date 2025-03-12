# expose

其實就是一種子傳父的方式，在子層用 `expose` 暴露出去，父層用 `ref` 接收。

我們直接來看例子：

child.vue

```vue
<script setup>
import { ref } from "vue";

const childExpose = ref("來自子層的資料");

defineExpose({
  childExpose,
});
</script>

<template>
  <div>
    <h1>這是子層</h1>
  </div>
</template>
```

father.vue

```vue
<script setup>
import Child from "./child.vue";

const parentRef = ref(null);

onMounted(() => {
  console.log(parentRef.value.childExpose);
});
</script>
<template>
  <div>
    <h1>這是父層</h1>
    <Child ref="parentRef" />
  </div>
</template>
```

父層會先在自己的頁面中宣告一個響應式 ref ，就像是示範中得 `parentRef` ，然後再顯示子層的部分使用 `ref` 來接收子層的資料。

這樣子父層就可以拿到子層暴露出來的資料了。

## 跟 `emit` 的差別

`emit` 是 子層 傳給 父層，而 `expose` 是 父層 呼叫 子層。
而且 `emit` 是 只能傳遞事件跟事件結果，而 `expose` 可以傳遞任何資料。

## 選擇使用 `emit` 還是 `expose`

當需求是「子組件要通知父組件」，由父組件來決定如何處理：就用 emit()。

當需求是「父組件想直接呼叫子組件方法或存取子組件某些內部狀態」：就用 defineExpose()。

兩者其實是互補的關係，幫助我們在 Vue 3 中處理父子元件的「雙向互動」；只是溝通方向不一樣而已。
