# lifecycleHooks

生命週期鉤子，是 Vue 提供的一些鉤子，可以在不同的生命週期中執行一些操作，他的鉤子名稱都是以 on 開頭，例如 onMounted、onUnmounted 等等。

在 Vue 的生命週期中，有這幾個階段可以注意：

- Create 創建階段
- Mount 掛載階段
- Update 更新階段
- Unmount 卸載階段

簡單來說就是一個網頁從最一開始到結束的過程，分成了幾個階段，你可以一你的想法把你要作用的函式放在這幾個階段中執行達到你要的效果。

![lifecycleHooks](/pages/img/lifecycleHooks.png)

## 生命週期鉤子列表

依官網的模式，分成兩個部分，一個是 Options API 另一個是 Composition API。

### Options API

- beforeCreate（創建前），在實例初始化之後，數據觀察和事件和 watcher 配置之前被調用，這時候還沒有 data 和 methods，在 script setup 已經沒有這個鉤子。
  - 範例：

```vue
<script setup>
import { onBeforeCreate } from "vue";
onBeforeCreate(() => {
  console.log("beforeCreate");
});
</script>
<template>
  <div>beforeCreate</div>
</template>
```

- created（創建後），在實例創建完成之後被調用，這時候已經有 data 和 methods。
  - 範例：

```vue
<script setup>
import { onCreated } from "vue";
onCreated(() => {
  console.log("created");
});
</script>
<template>
  <div>created</div>
</template>
```

- beforeMount（掛載前），在掛載開始之前被調用：相關的 render 函數首次被調用。
  - 範例：

```vue
<script setup>
import { onBeforeMount } from "vue";
onBeforeMount(() => {
  console.log("beforeMount");
});
</script>
<template>
  <div>beforeMount</div>
</template>
```

- mounted（掛載後），在掛載完成之後被調用，這時候已經有 DOM。
  - 範例：

```vue
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  console.log("mounted");
});
</script>
<template>
  <div>mounted</div>
</template>
```

- beforeUpdate（更新前），在數據更改導致實例重新渲染之前被調用，這時候還沒有更新 DOM。
  - 範例：

```vue
<script setup>
import { onBeforeUpdate } from "vue";
onBeforeUpdate(() => {
  console.log("beforeUpdate");
});
</script>
<template>
  <div>beforeUpdate</div>
</template>
```

- updated（更新後），在數據更改導致實例重新渲染之後被調用，這時候已經更新 DOM。
  - 範例：

```vue
<script setup>
import { onUpdated } from "vue";
onUpdated(() => {
  console.log("updated");
});
</script>
<template>
  <div>updated</div>
</template>
```

- beforeDestroy（銷毀前），在實例銷毀之前被調用，這時候還可以訪問實例。

  - 範例：

```vue
<script setup>
import { onBeforeDestroy } from "vue";
onBeforeDestroy(() => {
  console.log("beforeDestroy");
});
</script>
<template>
  <div>beforeDestroy</div>
</template>
```

- destroyed（銷毀後），在實例銷毀之後被調用，這時候已經無法訪問實例。

  - 範例：

```vue
<script setup>
import { onDestroyed } from "vue";
onDestroyed(() => {
  console.log("destroyed");
});
</script>
<template>
  <div>destroyed</div>
</template>
```

### Composition API

- script setup (創建前、後)
- onBeforeMount (掛載前)
  - 在「準備把元件掛到畫面之前」呼叫。
  - 可以在這裡做一些初始化的準備動作，但還不能動到畫面上的 DOM，因為還沒真正被「掛載」到畫面上。
- onMounted (掛載後)
  - 在「元件已經被掛載到畫面上」呼叫。
  - 可以在這裡做一些需要 DOM 的操作，例如：動態插入元件、動態插入資料到 DOM 上。
- onBeforeUpdate (更新前)
  - 在「元件的資料即將被更新」呼叫。
  - 可以在這裡做一些資料更新前的準備動作，但還不能動到畫面上的 DOM，因為還沒真正被「更新」。
- onUpdated (更新後)
  - 在「元件的資料已經被更新」呼叫。
  - 可以在這裡做一些資料更新後的動作，例如：動態插入元件、動態插入資料到 DOM 上。
- onBeforeUnmount (銷毀前)
  - 在「元件即將被解除掛載(要離開畫面)」之前呼叫。
  - 很適合在這裡進行任何需要的清理工作，比方說關閉計時器、解除一些事件監聽等。
- onUnmounted (銷毀後)
  - 在「元件被解除掛載(已離開畫面)」之後呼叫。
  - 一般來說，多數清理動作可以在 onBeforeUnmount 或 onUnmounted 執行，差別是你要在「離開前」還是「離開後」執行。

我們來看一下，最基礎的使用

```vue
<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from "vue";

const count = ref(0);

// 元件將要掛載（出生）之前
onBeforeMount(() => {
  console.log("元件即將被掛載到畫面上，我可以先做些準備～");
});

// 元件已經掛載（出生）之後
onMounted(() => {
  console.log("元件已經掛載到畫面上，DOM 都準備好了！");
});

// 在更新（長大）之前
onBeforeUpdate(() => {
  console.log("我們要更新畫面囉，馬上要重新渲染了！");
});

// 在更新（長大）之後
onUpdated(() => {
  console.log("畫面更新完畢，可以檢查畫面的新狀態！");
});
</script>

<template>
  <div>
    <h2>最基礎的範例</h2>
    <p>現在的計數：{{ count }}</p>
    <button @click="count++">點我計數 +1</button>
  </div>
</template>
```

範例 2：清理計時器

- 想像我們有個「聊天室」，進入頁面後會開始一直去伺服器要新訊息，而且每五秒更新一次。如果離開該頁面（元件卸載），我們就要停止這個計時器，不然就會浪費網路資源還可能造成錯誤。

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";

// 模擬聊天室訊息資料
const messages = ref(["Hello！我是第一筆訊息"]);

// 我們會用這個變數來存計時器 ID，好在離開前可以停止它。
let intervalId = null;

// 取得最新的訊息
function fetchMessages() {
  // 模擬向伺服器要新訊息
  messages.value.push(`新訊息：${Math.random().toString(36).slice(2)}`);
}

// 當元件掛載完畢，就開始定時抓訊息
onMounted(() => {
  console.log("聊天室已經被掛載～開始抓取訊息！");

  // 每 5 秒抓一次新訊息
  intervalId = setInterval(() => {
    fetchMessages();
  }, 5000);
});

// 在元件要離開前，可以先做些預備動作
onBeforeUnmount(() => {
  console.log("聊天室即將離開～先做些處理");
});

// 在元件確定離開後，也可以做些收尾工作
onUnmounted(() => {
  console.log("聊天室已經離開～清理計時器!");
  // 清除計時器，避免元件消失後還在抓訊息
  clearInterval(intervalId);
});
</script>

<template>
  <div>
    <h2>聊天室</h2>
    <p v-for="(msg, index) in messages" :key="index">{{ msg }}</p>
  </div>
</template>
```
