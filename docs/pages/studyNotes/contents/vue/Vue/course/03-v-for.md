# v-for

`v-for` 是 Vue 中用來重複渲染清單(陣列)或物件裡的資料的一個指令。

本質上就是 JavaScript 裡的 for...in...的方式，遍歷每個陣列裡的資料，

渲染在 DOM 上顯示，我們來看以下範例：

```vue
<script setup>
import { ref } from "vue";

const toys = ref([
  {
    id: 1,
    name: "紅色球",
  },
  {
    id: 1,
    name: "藍色球",
  },
  {
    id: 1,
    name: "綠色球",
  },
]);
</script>

<template>
  <div v-for="(toy, index) in toys" :key="toy.id">
    {{ index + 1 }} {{ toy.name }}
  </div>
</template>
```

`v-for`完整方式：

```vue
v-for= "(自己取的名稱, 陣列或物件裡的key, 陣列或物件的index) in values"
:key="找一個獨特不可取代的key"
```

也可以不使用這麼完整，可以省略`陣列或物件裡的key`跟`陣列或物件的index`直接變成這樣

```vue
v-for= "自己取的名稱 in values" :key="找一個獨特不可取代的key"
```
