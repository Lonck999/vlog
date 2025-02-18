# 09-VueRouter 的 query 參數

## 1. 什麼是 query 參數？

query 參數是 URL 中的一部分，用於傳遞數據，通常以 `?` 開頭，以 `&` 分隔你要傳的數據，也不需要先在路由中佔位子定義，一般在網路上很常見到。

## 2. 如何使用 query 參數？

router/index.js

```js
// 假設你有一個 ProductList 的頁面
import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/views/ProductList.vue";

const routes = [
  {
    path: "/products",
    name: "ProductList",
    component: ProductList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

方法一：

ProductList.vue

```vue
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 假設有兩個輸入框，讓使用者輸入要搜尋的關鍵字和品牌
const searchKeyword = ref(route.query.keyword || "");
const searchBrand = ref(route.query.brand || "");

// 點擊搜尋按鈕時，導向目前的頁面，並且帶上新的 query 參數
function onSearch() {
  router.push({
    name: "ProductList",
    query: {
      keyword: searchKeyword.value,
      brand: searchBrand.value,
    },
  });
}
</script>

<template>
  <div>
    <h1>產品列表</h1>
    <div>
      <label>關鍵字：</label>
      <input v-model="searchKeyword" />
    </div>
    <div>
      <label>品牌：</label>
      <input v-model="searchBrand" />
    </div>
    <button @click="onSearch">搜尋</button>
  </div>
</template>
```

方法二：

ProductList.vue

```vue
<script setup>
<router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        :query="{ keyword: 'apple', brand: 'iphone' }"
        >
        Music
</router-link>
```

直接在 router-link 上帶上 query 參數，這樣當使用者點擊連結時，就會自動導向帶有 query 參數的頁面。

但通常都建議使用方法一，盡量在 template 保持乾淨，不要有太多邏輯，這樣比較好維護。
