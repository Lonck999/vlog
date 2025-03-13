# teleport

這是一個 vue3 才有的功能，簡單來說就是把元件渲染到你指定的地方裡面，

現在很多都拿來做彈窗，這邊就來簡單介紹一下。

## 範例

```vue
<script setup>
import { ref } from "vue";
const isShow = ref(true);
const handleClick = () => {
  isShow.value = !isShow.value;
};
</script>
<template>
  <div class="thisbox"></div>
  <button @click="handleClick">點我移動</button>
  <teleport to="thisbox" :disabled="isShow">
    <p>這是要被移動的文字</p>
  </teleport>
</template>
```

用法就是把想要被移動的元件包在 `<teleport>` 裡面，

to 屬性就是要移動到哪個元素裡面，

這邊要注意的是，to 屬性是必填的，

disabled 其實就是要不要關閉傳送，true 就是關閉，false 就是開啟。

## to 的選擇

to 屬性可以選擇要傳送到哪個元素裡面，

可以選擇的元素有：

- body
- 元素的 id ，這裡是指要傳的那地方 id
- 元素的 class，這裡是指要傳的那地方 class

以下來示範一個怎樣做成突然顯示的範例（其實是懶得把它顯成彈窗，還要多寫 css 好懶(´◓ ｑ ◔ ｀)，其實上面已經做的十之八九了拉ＸＤＤＤ

```vue
<script setup>
import { ref } from "vue";
const isShow = ref(true);
const handleClick = () => {
  isShow.value = !isShow.value;
};
</script>
<template>
  <div class="thisbox"></div>
  <button @click="handleClick">點我移動</button>
  <teleport to="thisbox" :disabled="isShow" v-if="isShow">
    <p>這是要被移動的文字</p>
  </teleport>
</template>
```

這樣就會在點擊按鈕的時候，把文字移動到 thisbox 裡面，

這樣就做成了一個突然顯示的效果了。
