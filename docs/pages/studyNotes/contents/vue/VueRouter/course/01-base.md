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

### 路由配置

一般來說，我們會將路由配置放在 `src/router/index.js` 中，並在 `main.js` 中引入，

然後把有關路由的元件放在 `src/views/` 中。

```css
my-vue-app/
├─ src/
│  ├─ main.js
│  ├─ router/
│  │  └─ index.js
│  ├─ views/
│  │  ├─ Home.vue
│  │  └─ About.vue
└─ package.json
```

在來看一下 `src/router/index.js` 的內容：

```js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

> createWebHistory 代表使用 HTML5 的 History API，
>
> 也可以使用 createWebHashHistory 來使用 hash 模式（URL 中會有 #）。
>
> 每個路由對象可以定義 path（路徑）、name（名稱）、component（要顯示的組件）等屬性。

### 頁面配置

可以在你要顯示的頁面中使用 `<router-view>` 元件，來顯示不同的路由。

```vue
<template>
  <Header />
  <!-- 這裡就是顯示不同頁面的地方 -->
  <router-view />
  <Footer />
</template>
```

也可以在元件中使用 `<router-link>` 元件，來連結到不同的路由。

```vue
<template>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
</template>
```
