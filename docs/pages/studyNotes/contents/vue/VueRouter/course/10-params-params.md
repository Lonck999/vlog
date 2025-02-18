# 10. params 參數

## 1. 什麼是 params 參數？

params 參數是 URL 中的一部分，用於傳遞數據，通常以 `/` 分隔你要傳的數據，在 router 中需要先佔位子定義。

## 2. 如何使用 params 參數？

router/index.js

```js
// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/ProductList.vue";
import ProductDetail from "@/views/ProductDetail.vue";

const routes = [
  {
    path: "/products",
    name: "ProductList",
    component: ProductList,
  },
  {
    // 動態路徑，":id" 是參數名稱
    path: "/products/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
  // 你可以加其他路由設定在這裡...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```
