# 過渡效果

在 Vue 中，過渡效果可以通過使用 `<transition>` 元件來實現過渡。

使用 `<transition>` 的好處就是，可以讓過渡效果更平滑，

更自然也不用反覆的使用 `v-show` 或 `v-if` 來切換，也讓元素的 class 更乾淨。

這個元件可以包裹任何需要過渡效果的元素，並提供多種過渡效果的選項。

但使用 `<transition>` 也是要配合使用 `<style>` 來實現過渡效果，

需要在 `<style>` 中使用 `v-enter-active` 、 `v-leave-active` 來控制動畫時間跟是否重複，

使用 `v-enter-from` 、 `v-leave-to` 來控制動畫的開始跟結束，

使用 `v-enter-to` 、 `v-leave-from` 來控制動畫的結束跟開始。

## 基本用法

```vue
<template>
  <transition>
    <button @click="visible = !visible">Toggle</button>
    <p>嗨，我會出現或消失！</p>
  </transition>
</template>

<script>
import { ref } from "vue";

const visible = ref(true);
</script>

<style scoped>
/* 對應 Vue 進出場時提供的 class */
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

當然，也可以使用自定義的 `name` 屬性來指定過渡效果的名稱，

這樣可以讓過渡效果更具有可讀性。

```vue
<template>
  <transition name="fade">
    <button @click="visible = !visible">Toggle</button>
    <p>嗨，我會出現或消失！</p>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```
