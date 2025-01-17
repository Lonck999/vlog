# Pinia

Pinia 是 Vue 的狀態管理庫，類似 Vuex，但更輕量、易於使用，

可以把它想像成一個全域的大倉庫，可以放需要共享的數據、函式、方法等。

## 使用 Pinia

我們先來看看，要如何使用 Pinia 來管理狀態。

首先，我們需要先安裝 Pinia，

```bash
npm install pinia
```

安裝完後，我們需要在 main.js 中建立一個 Pinia 實例，

```js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
```

接著，我們在`src`創一個資料夾，叫做`stores`，

然後在這資料夾裡創建我們需要的檔案，以後有關 Pinia 的檔案，都會放在這裡。

在這裡順便了解一下，這裡創建檔案的命名規則，不用像`.vue`檔案一樣開頭是大寫，小寫就可以了。

- 檔案名稱：`counter.js`

```js
// 創建一個 Pinia 的 store
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 創建一個名為 counter 的 store
export const useCounterStore = defineStore("counter", () => {
  // 定義一些狀態
  const count = ref(0);

  // 定義一些計算屬性
  const doubleCount = computed(() => count.value * 2);

  // 定義一些方法
  function increment() {
    count.value++;
  }

  // 返回一些狀態和方法
  return { count, doubleCount, increment };
});
```

這裡的`defineStore`是 Pinia 提供的函式，用來定義一個 store，

第一個參數是 store 的名稱，第二個參數是一個函式，用來定義 store 裏面的狀態和方法。

這裡的`useCountStore`是 store 的名稱，在 Pinia 官網裡也建議使用`use`開頭，`Store`結尾，

這樣可以清楚的知道這是哪一個 store。

這邊用的寫法是官網 Setup 的方式，就跟我們平常使用 setup 函数類似，導出我們想要用的屬性跟方法。

## Pinia 主要有三個管理概念：

- State，就是我們放基本的數據
- Getter，就是我們的計算方法函數
- Action，就是我們的方法函數

上面範例做解釋的話，我們就可以把它當作是

- State ＝ `ref()`
- Getter ＝ `computed()`
- Action ＝ `function` or `methods()`

## 使用 State

State 就是我們的數據，我們可以透過`ref()`來定義我們的數據，

```js
const count = ref(0);
```

## 使用 Getter

Getter 就是我們的計算方法函數，我們可以透過`computed()`來定義我們的計算方法函數，

```js
const doubleCount = computed(() => count.value * 2);
```

## 使用 Action

Action 就是我們的方法函數，我們可以透過`function`來定義我們的方法函數，

```js
function increment() {
  count.value++;
}
```
