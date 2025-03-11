# Provide & Inject

在 Vue 中，我們可以使用 `provide` 和 `inject` 來實現跨元件的數據傳遞。

簡單來說他可以不是父子元件之間的傳遞，而是祖孫元件之間的傳遞。

Provide（提供者）：定義在上層元件（例如父元件或更外層的祖先元件），用來「提供」資料或方法給需要的子孫元件使用。

Inject（接收者）：定義在任意想要「接收」這份資料的子孫元件中，直接使用注入過來的資料或方法。

## Provide

在父層或更上層的元件中使用 `provide` 來提供資料或方法。

```vue
<script setup>
import { ref, provide } from "vue";

const sharedCount = ref(0);

function increment() {
  sharedCount.value++;
}

// provide('key', value)
provide("mySharedCount", sharedCount);
provide("myIncrement", increment);
</script>

<template>
  <div>
    <h1>這裡是父元件</h1>
    <p>父元件的計數值： {{ sharedCount }}</p>
    <button @click="increment">父元件內部增加</button>
    <ChildComponent />
  </div>
</template>
```

## Inject

在子孫元件中使用 `inject` 來接收父層或更上層元件提供的資料或方法。

```vue
<!-- ChildComponent.vue -->
<script setup>
import { inject } from "vue";

const sharedCount = inject("mySharedCount");
const increment = inject("myIncrement");
</script>

<template>
  <div>
    <h2>這裡是子元件</h2>
    <p>從祖先元件注入的計數值： {{ sharedCount }}</p>
    <button @click="increment">子元件內部增加</button>
  </div>
</template>
```

## 補充

### 使用 `provide` 和 `inject` 的限制

- Provide / Inject 的資料傳遞是單向的，只能從上往下傳遞，不能從下往上傳遞。
- 只能在建立階段使用：也就是說，你必須在 setup（或更上層的 beforeCreate / created）階段把資料 provide 出去，才能在子孫元件的 setup 階段 inject 取得。
- 多層 Provide 覆蓋：如果在祖先 A 元件跟父 B 元件都使用了相同的 key（例如 provide('xxx')），後代元件在注入時，會拿到最近一層（父 B 元件）所提供的值。
