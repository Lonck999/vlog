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
        path: "user",
        component: {
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
