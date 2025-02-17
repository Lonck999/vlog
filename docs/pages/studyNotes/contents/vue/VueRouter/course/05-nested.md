# 嵌套路由

## 什麼是嵌套路由？

嵌套路由是指在路由中包含子路由。

也就是說，當我們正在顯示`router-view`的頁面時，顯示的這個頁面又需要再顯示一個`router-view`。

我們直接來看個例子：

```js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    name: "home",
  },
  {
    path: "/about",
    component: () => import("@/views/About.vue"),
    name: "about",
  },
  {
    path: "/manage",
    component: () => import("@/views/Manage.vue"),
    name: "manage",
    meta: {
      requiresAuth: true, // requiresAuth 是指這個路由需要經過認證
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/User.vue"),
        name: "user",
      },
    ],
  },
  {
    path: "/:catchAll(.*)*", // 這是為了讓我們的 router 可以匹配到所有的路徑，如果沒有匹配到任何的路徑，就會顯示 404 的頁面
    component: () => import("@/views/NotFound.vue"),
    name: "404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
```

以上面的例子來說，當我們在`/manage`這個路由時，會顯示`Manage.vue`這個頁面，

這個頁面又需要再顯示一個頁面，這個頁面中又包含了一個`user`的路由，當我們在`/manage/user`這個路由時，會顯示`User.vue`這個頁面。
