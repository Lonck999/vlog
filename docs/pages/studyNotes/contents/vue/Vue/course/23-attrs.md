# $attrs(祖傳孫)

在 Vue.js 中，$attrs 的傳遞方式其實也很像一層傳一層從父層傳到子層再傳到孫層，

他算是一個比較不常用的傳遞方式，大多這種方式後來都是用 Pinia 去替代這工作方式，

也簡單明確的多，但是他依然還存在著所以還是介紹一下他

父層

```vue
<template>
  <div class="father">
    <h3>這是父組件</h3>
    <h4>a:{{ a }}</h4>
    <h4>b:{{ b }}</h4>
    <h4>c:{{ c }}</h4>
    <h4>d:{{ d }}</h4>
    <Child :a="a" :b="b" :c="c" :d="d" />
  </div>
</template>

<script setup>
import Child from "./Child.vue";
import { ref } from "vue";

const a = ref("爸爸的1");
const b = ref("爸爸的2");
const c = ref("爸爸的3");
const d = ref("爸爸的4");
</script>

<style scoped></style>
```

我們先在這層準備要傳遞的東西

子層

```vue
<template>
  <div class="child">
    <h3>子組件</h3>
    <GrandChild v-bind="$attrs" />
  </div>
</template>

<script setup>
import GrandChild from "./GrandChild.vue";
</script>

<style scoped></style>
```

這時這個中間層負責接然後轉手就把他交出去，這時候我們只要在孫層寫上 v-bine="$attrs"就可以了

孫層

```vue
<template>
  <div class="grand-child">
    <h3>孫組件</h3>
    <h4>孫子的財產：</h4>
    <h4>a:{{ a }}</h4>
    <h4>b:{{ b }}</h4>
    <h4>c:{{ c }}</h4>
    <h4>d:{{ d }}</h4>
  </div>
</template>

<script setup>
defineProps(["a", "b", "c", "d"]);
</script>

<style scoped></style>
```

這裡的接手方式依樣也是用 definProps 去承接，

如果是要直接使用的話，直接照圖上這樣使用就可以了，

如果是還要做其他更變的話建議還是要有一個變數去承接他。

這樣一來到孫曾上面就可以顯示拉，這方式知道就好，畢竟有學有好無壞的麻～～
