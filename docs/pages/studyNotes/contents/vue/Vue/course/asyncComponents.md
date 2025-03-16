# 非同步元件

非同步元件就是當你進入到這個頁面時，有些元件不需要你馬上載入，可以等到你需要的時候再載入。

專案很大，可能會有許多頁面或功能並不是使用者立即會用到的 (例如，只有某些使用者才會進去的設定頁面)。

若所有檔案在開網頁的時候都載入，會變得很「笨重」，載入速度變慢，使用者體驗不佳。

非同步載入可以讓那些「不一定馬上用到」的元件，等到用到的時候才去下載、載入。如此可加快網站初始加載速度。

很常用在只有特定人物才會用到的頁面，例如：管理者圖表、後台管理頁面。

## 非同步元件的寫法

```vue
<template>
  <h1>後台儀表板</h1>

  <!-- 使用者列表元件 (同步載入) -->
  <UserList />

  <!-- 加一個按鈕，當使用者點擊後才顯示統計圖表 -->
  <button @click="showChart = !showChart">
    {{ showChart ? "隱藏統計圖表" : "顯示統計圖表" }}
  </button>

  <!-- 如果 showChart 為 true，就顯示統計圖表 -->
  <div v-if="showChart">
    <AsyncAnalyticsChart />
  </div>
</template>

<script setup>
import UserList from "@/components/UserList.vue";
import { ref, defineAsyncComponent } from "vue";

// 用 ref 建立一個 reactive 變數來控制統計圖表要不要顯示
const showChart = ref(false);

// 定義我們的非同步元件
// 這裡指定一個基礎的 loadingComponent 顯示讀取文字
// 也可以改成你自己的 Spinner 或骨架屏 (skeleton) 元件
const AsyncAnalyticsChart = defineAsyncComponent({
  loader: () => import("@/components/AnalyticsChart.vue"),
  loadingComponent: {
    template: "<p>載入中，請稍候...</p>",
  },
  delay: 200,
  timeout: 3000,
  errorComponent: {
    template: `
      <div style="color: red;">
        載入失敗，請稍後再試。
      </div>
    `,
  },
});
</script>
```

- loader：指定要動態載入的元件 (即原本我們放在箭頭函式裡 import('./HelloWorld.vue') 的地方)。
- loadingComponent：指定載入時的元件。
- delay：指定載入時間，如果超過這個時間就會顯示錯誤元件。
- timeout：指定載入時間，如果超過這個時間就會顯示錯誤元件。
- errorComponent：指定載入失敗時的元件。
