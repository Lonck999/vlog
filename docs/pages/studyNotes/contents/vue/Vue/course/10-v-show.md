# v-show

`v-show`的使用場景跟`v-if`有點像，你可能會想說那這樣要他幹嘛？

會留著就代表它好是有一定的功能，有些角度比`v-if`還好用所以才留著的

我們先來看`v-show`的範例：

```vue
<template>
  <div>
    <div v-show="showChart">
      <!-- 假設這是一個耗資很高的圖表元件 -->
      <ComplexChart :data="chartData" />
    </div>
    <button @click="toggleChart">切換圖表顯示/隱藏</button>
  </div>
</template>
```

就像我說的，他跟`v-if`真的很像，但是他的使用邏輯是完全不一樣的，

`v-show`的概念比較像是有隱藏斗篷的 DOM 元素，其實他一直都是存在的，

但你不想讓他出現，他就披著好好的躲起來，

你想讓他出現，他就把隱藏斗篷脫下，顯現於大眾視野中。

簡單來說這個元素一直都在，只是他現在是`display: none;`，當條件有到時`display: block;`

但是`v-if`不是，`v-if`是會將達成條件的 DOM 新增，當不需要時或條件改變成未達成後，直接將這個 DOM 卸載掉，要用的時候再重新新增回來，很耗載入成本。

常用的場景，例如：標籤頁、試題答案、範例動畫開關、等等...