# storeToRefs

storeToRefs 是 Pinia 提供的一個實用工具，用於將 Pinia store 中的狀態和 getters 轉換為 ref。

這樣可以更方便地在組件中使用 Composition API。

以下是 storeToRefs 的詳細用法和適用情境。

在 Setup Store 中：

- `ref()` 就是 state 属性
- `function()` 就是 actions
- `computed()` 就是 getters

## 基本概念

簡單的說就是 vue3 的 toRefs 拉～～～寫個範例給你看看

首先配置好你的 Pinia，創建好 Store 之後再開始示範

count.js

```js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCountStore = defineStore("count", () => {
  const sum = ref(1);
  const n = ref(1);

  function add() {
    sum.value += n.value;
  }

  function minus() {
    sum.value -= n.value;
  }

  function increment(value) {
    sum.value += value;
    if (sum.value > 10) {
      sum.value = 0;
    }
  }

  const bigSum = computed(() => sum.value * 10);

  return { sum, n, add, minus, increment, bigSum };
});
```

在 `<setup>` 模式中，Pinia 的 Store 裡寫法跟對 vue3 來說相當的直覺簡便，

就跟你寫在該頁的`<script srtup>`是一樣的只是要記好上面的說的哪一個對應哪個就好，然後把他們 return 出去。

```js
<template>
  <div class="count">
    <h2>當前求和爲:{{ sum }}</h2>
    <h2>大和爲:{{ bigSum }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button @click="add">+++</button>
    <button @click="minus">---</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCountStore } from "@/store/count.js";

const store = useCountStore();
const { sum, n, bigSum } = storeToRefs(store);
// 解構add、minus方法
const { add, minus } = store;
</script>

<style scoped>
.count {
  background: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

select,
button {
  margin: 0 10px;
  height: 30px;
}
</style>
```

如上面所示，能用 storeToRefs() 解構的就只有傳出來的參數，但他無法解構用 function，

但是，function 可以直接解構。解構完的之後就可以直接使用。
