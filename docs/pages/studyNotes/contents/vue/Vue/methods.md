`methods` 是 Vue 中用於定義實例方法的選項。它允許你在 Vue 實例中定義可重用的函數，

這些函數可以被 Vue 的模板、計算屬性、鉤子等其他選項使用。

他跟`computed`最大的不同就是，`methods` 不一定最後要返回一個值，可以單純的執行某個動作，

而且`methods` 可以使用異步，但`computed`不行，

`methods` 內的程式碼一般會根據使用者動作觸發：例如，當使用者按下按鈕，我們可以呼叫特定 `methods` 來處理資料或更新狀態，這也是`methods`最常被使用的情境。

我們來看以下範例：

```vue
<script setup>
import { ref } from 'vue' const count = ref(0)
function increment() {count.value = count.value + 1 }
function resetCount() { count.value = 0 }
</script>
<template>
  <div>
    <p>目前的數字是：{{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="resetCount">重置</button>
  </div>
</template>
```

這樣一來，就可以隨著你按按鈕後增加或者是重置

我們再來看一個使用異步的範例：

```vue
<script setup>
import { ref } from "vue";
import axios from "axios";

const userInfo = ref(null);
async function fetchUserData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    userInfo.value = response.data;
  } catch (error) {
    console.error("API 發生錯誤:", error);
  }
}
</script>

<template>
  <div>
    <p>使用者資料：{{ userInfo }}</p>
    <button @click="fetchUserData">用 Axios 取得使用者資料</button>
  </div>
</template>
```
