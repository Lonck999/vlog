# nextTick

為什麼會有 nextTick 這個方法？

因為 Vue 的更新是異步的，偵測到資料（data、props 或 reactive 變量）改變時，不會立刻馬上更新畫面 (DOM)，

而是會將這些變更記錄到一個隊列中，在下一個事件循環中，Vue 會將這些變更應用到 DOM 上。

這樣做可以大幅提高效能，避免在很短時間內重複多次更新 DOM。

nextTick 就像告訴 Vue：「嘿，等你下一次完成 DOM 更新後，再幫我做某件事。」

也就是說，當我們呼叫 nextTick 裡的 callback function（回呼函式）時，可以確保：

「DOM 已經被更新了」，你可以放心地去抓更新後的元素狀態，或是做一些需要依賴最新畫面結果的操作。

簡單來說，只要你有「在資料改變之後，想要立刻讀取或操作最新的 DOM 狀態」的需求，你就需要使用 nextTick。

## 寫法

nextTick 的寫法有兩種：

- 回呼函式 (callback) 的寫法

```vue
<script setup>
import { nextTick } from "vue";

nextTick(() => {
  // 這裡可以安全地操作已更新的 DOM
  console.log("DOM 已經更新了");
});
</script>
```

個人比較常用這個，也比較直覺，就直接把你「想在 DOM 更新完之後做的事」放到 nextTick(() => {...}) 的函式裡。

當 Vue 的畫面更新完後，就會自動執行這個函式裡的內容。

- Promise 的寫法

```js
import { nextTick } from "vue";

async function doSomething() {
  // 先做一些改變 data 的操作
  // ...

  // 透過 await 等待 DOM 更新
  await nextTick();
  // 這裡開始 DOM 已經更新了
  console.log("DOM 已經更新了，這裡可以安心取得最新狀態");
}
```
