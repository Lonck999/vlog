# v-html

`v-html`的特性就是可以，讓文串中帶有 HTML 元素的文字轉化為動態真實的 HTML 的元素，

來看以下範例：

```vue
<script setup>
import { ref } from "vue";
const xd = ref("<h1 style='color: red'>123</h1>");
const xd2 = ref("<h1 class='xd'>123</h1>");
</script>

<template>
  <div v-html="xd"></div>
  <div v-html="xd2"></div>
</template>

<style scoped>
.xd {
  color: red;
}
</style>
```

這樣一來就可以看到`<template>`裡面，

每一個`<div>`裡面都會帶有一個`<h1>`元素的 123 了，

但這裡也有地方要注意，

那就是如果你的.vue 檔裡的`<style>`有使用 Scoped 機制的話呢，

就無法使用 class 還使用 CSS，

Scoped CSS 是通過在元素上添加獨特的屬性（例如 `data-v-xxxx`）來實現樣式範圍限制的，

而 `v-html` 插入的 HTML 元素不會自動包含這些屬性，

因此 Scoped CSS 中的類選擇器無法匹配到它們。

## 注意事項：

- 安全性：
  - 使用 `v-html` 時，務必確保插入的內容是安全的。避免插入來自不可信來源的 HTML，防止 XSS（跨站腳本）攻擊，所以盡量避免使用`v-html`。
- Scoped CSS 不適用於 `v-html`
- `v-html` 是單向的，僅將資料流向視圖，無法從視圖更新資料。
