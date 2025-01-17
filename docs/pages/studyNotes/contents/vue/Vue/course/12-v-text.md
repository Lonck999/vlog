# v-text

v-text 是 Vue 的指令，他就沒有什麼好說的，就是用來設定元素的文字內容。

v-text 和 {{}} 的差別在於，v-text 會覆蓋掉元素原有的文字內容，而 {{}} 則是會將元素原有的文字內容和 v-text 的內容合併。

和 v-html 的差別在於，v-text 不會解析 HTML 標籤，而 v-html 則會解析 HTML 標籤。

```vue
<template>
  <div id="app">
    <p v-text="msg">Hello World</p>
  </div>
</template>
```
