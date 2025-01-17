# v-bind

`v-bind`這指令主要是可以傳遞，是可以動態傳遞定義好的變數，值可以是字串、數字、布林值，最常使用在傳遞網址、圖片位置等等......
我們來看一個範例

```vue
<script setup>
const imgSrc = "https://picsum.photos/200/300";
</script>

<template>
  <div id="app">
    <img v-bind:src="imgSrc" />
  </div>
</template>
```

這樣一來，當我們在 `imgSrc` 的值改變時，`img` 的 `src` 屬性也會跟著改變。
而且要一直寫 `v-bind` 很麻煩，所以 Vue 提供了 `:` 的簡寫方式，所以上面的範例可以改寫成

```vue
<script setup>
const imgSrc = "https://picsum.photos/200/300";
</script>

<template>
  <div id="app">
    <img :src="imgSrc" />
  </div>
</template>
```

除了傳值，也可以傳遞屬性，例如 `class`、`style` 等等......
例如傳遞 `class` 屬性

```vue
<script setup>
const isActive = true;
</script>

<template>
  <div id="app">
    <p :class="isActive ? 'active' : 'inactive'">Hello World</p>
  </div>
</template>

<style scoped>
.active {
  color: red;
}
.inactive {
  color: blue;
}
</style>
```

這樣一來，當 `isActive` 的值為 `true` 時，`p` 的 `class` 屬性會是 `active`，當 `isActive` 的值為 `false` 時，`p` 的 `class` 屬性會是 `inactive`。

我們再來看一個範例，傳遞 `style` 屬性

```vue
<script setup>
const fontSize = "20px";
</script>

<template>
  <div id="app">
    <p :style="{ fontSize: fontSize }">Hello World</p>
  </div>
</template>
```

這樣一來，當 `fontSize` 的值改變時，`p` 的 `style` 屬性也會跟著改變。

動態屬性名稱：v-bind:[變數]

```vue
<script setup>
const attr = "class";
const value = "active";
</script>

<template>
  <div id="app">
    <p :[attr]="value">Hello World</p>
  </div>
</template>
```

最後 v-bind 也可以做出父元件傳遞子元件的屬性，例如

父元件

```vue
<script setup>
const msg = "Hello World";
</script>
<template>
  <div id="app">
    <child-component :msg="msg" />
  </div>
</template>
```

子元件

```vue
<script setup>
import { defineProps } from "vue";
defineProps({
  msg: {
    type: String,
    required: true,
    default: "Hello",
  },
  // type: 指的是型別, required: 指的是是否必須, default: 指的是預設值
});
</script>

<template>
  <div id="app">
    <p>{{ msg }}</p>
  </div>
</template>
```

props 針對陣列型別參數傳遞之處理

```vue
<script setup>
import { defineProps } from "vue";
const { msg } = defineProps(["msg"]);
</script>

<template>
  <div id="app">
    <p>{{ msg }}</p>
  </div>
</template>
```
