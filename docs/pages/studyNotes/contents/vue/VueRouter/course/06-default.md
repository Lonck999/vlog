# 預設路由、重定向

## 什麼是預設、重定向路由？

預設路由是指當我們在訪問一個路由時，如果沒有匹配到任何的路由，就會顯示預設的路由，又或是我們在打開網頁時，就會顯示預設的路由。

重定向路由是指當我們在訪問一個路由時，會被重定向到另一個路由。

## 如何設置預設、重定向路由？

我們可以在`router`中設置預設路由，如下：

```js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    redirect: "/home", // 這裡我們設置了預設路由，當我們在訪問根路由時，就會重定向到`/home`這個路由
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
```
