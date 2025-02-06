# 基礎配置

## Vue Router 是什麼？

Vue Router 是 Vue.js 的官方路由管理器。它允許我們在單頁應用程序中實現無刷新路由。

根據不同的 URL ，我們可以顯示不同的內容，也可以做出更複雜的交互，也無需重新加載頁面，實現單頁應用程式（SPA）的效果。

## 安裝

```bash
npm install vue-router@next
```

## 配置

### 全局配置

main.js

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");
```
