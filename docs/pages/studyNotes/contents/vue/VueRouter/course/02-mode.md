# Vue Router 有幾種模式？

Vue Router 有兩種模式：

- Hash 模式
- History 模式

以下來分別介紹這兩種模式。

## Hash 模式

原理：Hash 模式利用 URL 中的 # 來標識客戶端路由。當 URL 發生變化時，瀏覽器不會向服務器發送新的請求，因為 # 後面的部分僅在客戶端使用。

使用情況：適合不想或無法在服務器端做特殊配置（例如：404 頁面配置）的情況，因為它不需要服務器處理 URL 的重定向。

看以下範例：

```js
// router.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式
  routes,
});

export default router;
```
