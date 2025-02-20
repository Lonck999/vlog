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

ProductDetail.vue 方法一

```vue
<template>
  <div>
    <h1>產品列表</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <!-- 使用 <router-link> 帶 params 的方法 -->
        <router-link
          :to="{ name: 'ProductDetail', params: { id: product.id } }"
        >
          {{ product.name }}
        </router-link>
      </li>
    </ul>

    <!-- 亦可使用程式導向的方式 -->
    <button @click="goToProduct(3)">查看產品 #3</button>
  </div>
</template>

<script setup>
// 模擬資料
const products = [
  { id: 1, name: "產品 A" },
  { id: 2, name: "產品 B" },
  { id: 3, name: "產品 C" },
];

import { useRouter } from "vue-router";
const router = useRouter();

function goToProduct(productId) {
  router.push({ name: "ProductDetail", params: { id: productId } });
}
</script>
```

ProductDetail.vue 方法二

```vue
<template>
  <div>
    <h1>產品列表</h1>
    <ul>
      <li v-for="product in products" :key="product.id"></li>
    </ul>

    <!-- 亦可使用程式導向的方式 -->
    <button @click="goToProduct(3)">查看產品 #3</button>
  </div>
</template>

<script setup>
// 模擬資料
const products = [
  { id: 1, name: "產品 A" },
  { id: 2, name: "產品 B" },
  { id: 3, name: "產品 C" },
];

import { useRouter } from "vue-router";
const router = useRouter();

function goToProduct(productId) {
  router.push({ name: "ProductDetail", params: { id: productId } });
}
</script>
```

## 3. 可以選擇可傳可不傳嗎？

可以，只需要在 path: "/products/:id" 的 id 後面加上 `?` 即可。

```js
path: "/products/:id?",
```
