# 修改數據的三種方式

在這次的部分我們要介紹，Pinia 在使用時的修改數據的方式。

首先你要先創建好你的倉庫

```js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountStore = defineStore("count", () => {
  const sum = ref(1);
  const n = ref(1);

  function increment(value) {
    sum.value += value;
    if (sum.value > 10) {
      sum.value = 0;
    }
  }

  return { sum, n, increment };
});
```

## 第一種 單一修改：

```js
<template>
  <div class="count">
    <h2>當前求和爲:{{ store.sum }}</h2>
    <select v-model.number="store.n">
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
import { useCountStore } from "@/store/count.js";
const store = useCountStore();

function add() {
  // 第一種方式
  store.sum += 1;
  // 第二種方式
  // store.$patch({ sum: 888, n: 999 });
  // 第三種方式
  // store.increment(store.n);
}
</script>
```

就是你只是想改變一個東西就可以這樣修改，先引入你寫好的 Pinia，然後直接在你該頁的 function 直接使用改變。

## 第二種 批量修改：

```js
<template>
  <div class="count">
    <h2>當前求和爲:{{ store.sum }}</h2>
    <select v-model.number="store.n">
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
import { useCountStore } from "@/store/count.js";
const store = useCountStore();

function add() {
  // 第一種方式
  // store.sum += 1;
  // 第二種方式
  store.$patch({ sum: 888, n: 999 });
  // 第三種方式
  // store.increment(store.n);
}
</script>
```

就是在該頁進行大量修改時可以使用，$patch() 他可以直接改變原本的值，又或者是直接變成對象賦予多值。

## 第三種 使用 function 修改：

```js
<template>
  <div class="count">
    <h2>當前求和爲:{{ store.sum }}</h2>
    <select v-model.number="store.n">
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
import { useCountStore } from "@/store/count.js";
const store = useCountStore();

function add() {
  // 第一種方式
  // store.sum += 1;
  // 第二種方式
  // store.$patch({ sum: 888, n: 999 });
  // 第三種方式
  store.increment(store.n);
}
</script>
```

在該頁獲得的參數，傳回去 Pinia 寫好的倉庫裡，到時在 Pinia 倉庫寫好的 function 就會幫你執行運算，再把算好的值回傳回來。
