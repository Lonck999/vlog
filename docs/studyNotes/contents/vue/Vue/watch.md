# watch

在 vue 中的`watch`是個非常有用的的功能，

可以用他直接監視一個數據的變動(狀態、屬性等等...)，

並且在改變後執行一些動作，對於需要數據變化做出反應的情境特別好用，

`watch`最常使用的情境有，發送 API 請求、更新其他數或計算時，這時候`watch`特別好用。

我們來看看基礎的用法：

```vue
<script setup>
import { ref, watch } from "vue";
const count = ref(0);
watch(count, (newCount) => {
  localStorage.setItem("count", newCount);
});
</script>
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
```

完整會是

watch(監聽的目標, (改變後的新值,原本的值) => { 要執行的動作 })

deep：深度監視

immediate：是否一開始就執行監視

`watch`對於深層監聽`ref`和`reactive`是有稍微不同的方式，用以下範例來看看：

```vue
// reactive,不需做多餘的動作
<script setup>
import { reactive, watch } from "vue";

const state = reactive({
  user: {
    name: "John",
    address: {
      city: "新莊",
      zip: "242",
    },
  },
});

watch(state, (newValue, oldValue) => {
  console.log("觸發watch");
});

state.user.address.city = "Los Angeles";
</script>
```

```vue
// ref
<script setup>
import { ref, watch } from "vue";

const state = ref({
  user: {
    name: "John",
    address: {
      city: "新莊",
      zip: "242",
    },
  },
});

watch(
  state,
  (newValue, oldValue) => {
    console.log("觸發watch");
  },
  { deep: true }
);

state.user.address.city = "Los Angeles";
</script>
```

接下來我們來聊聊`watchEffect`，是 Vue 提供一個進階監聽多個數據來源變化的 API，

提供給開發者另一種選擇，他有幾個好處：

- 不需要特別定義監聽對象，會自動追蹤在回調裡面用的的響應式數據。
- 沒有分這麼細，回調函式沒有地方放參數，只要有任何改變，就會執行改變的動作。
- 東西掛載後就會直接執行不需要再用`immediate`
- 可以輕鬆執行多筆監聽
- 而且可以停止監聽，`watch`則不能被停止

```vue
<script>
import { reactive, watch } from "vue";
const name = reactive({
  initName: "winnie",
  setName: (name.initName = "蓋特一號"),
  fakeName: "Banana",
  setFake: (name.fakeName = "蓋特二號"),
});

watch(
  [() => name.initName, () => name.fakeName],
  ([name, fakeName], [oldName, oldFakeName]) => {
    console.log("Name:" + name, "oldName:" + oldName);
    console.log("fakeName:" + fakeName, "oldName:" + oldFakeName);
  }
);
</script>
```

```vue
<script setup>
import { reactive, watchEffect } from "vue";
const name = reactive({
  initName: "winnie",
  fakeName: "Banana",
  setName() {
    this.initName = "蓋特一號";
  },
  setFake() {
    this.fakeName = "蓋特二號";
  },
});
watchEffect(() => {
  console.log("Name: " + name.initName + ", Fake Name: " + name.fakeName);
});
</script>
```
