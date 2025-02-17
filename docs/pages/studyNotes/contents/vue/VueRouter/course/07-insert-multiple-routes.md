# 插入多個路由

插入多個路由是指在同一個路由中，插入多個路由，顯示多個頁面內容。

我們來看個例子：router/index.js

```js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    component: () => import("@/views/About.vue"),
    children: [
      {
        path: "title1",
        components: {
          name1: () => import("@/views/User.vue"),
          name2: () => import("@/views/User2.vue"),
        },
      },
      {
        path: "title2",
        components: {
          name1: () => import("@/views/User.vue"),
          name2: () => import("@/views/User2.vue"),
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
```

views/About.vue

```vue
<template>
  <div>
    <h1>About</h1>
    <router-link to="/about/title1">title1</router-link>
    <router-link to="/about/title2">title2</router-link>
    <router-view name="name1" />
    <router-view name="name2" />
  </div>
</template>
```
