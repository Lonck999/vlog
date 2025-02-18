# 11-VueRouter 的 props 參數

## 1. 什麼是 props 參數？

props 參數是 Vue Router 中用於將路由參數傳遞給組件的一種方式，簡單來說他就是不透過單頁面傳遞參數，直接在 router/index.js 中定義並傳值但其實也是 params 的傳遞方式。

props 有三種傳遞方式：

props: true
直接把 :params 當作同名的 props 傳入。

props: Object
直接傳遞一個固定物件，所有內容都是固定的值。

props: Function
以函式回傳一個物件，可以根據路由參數動態處理，然後再傳到元件的 props。

方式一：

```js
// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import UserView from "@/views/UserView.vue";

const routes = [
  {
    path: "/user/:id",
    name: "User",
    component: UserView,
    props: true, // 直接把所有 params 當作 props 傳進去
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

User.vue

```vue
<script setup>
import UserView from "./UserView.vue";
</script>

<template>
  <UserView :id="123" />
</template>
```

UserView.vue

```vue
<template>
  <div>
    <h2>使用 props 取得的 id: {{ id }}</h2>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 注意：在 <script setup> 中，透過 defineProps 來定義接收哪些 props
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
```

- 這樣一來，我們就可以在 UserView.vue 中使用 id 這個 props 了。

方式二：

```js
// router/index.js
const routes = [
  {
    path: "/aboutView",
    name: "AboutView",
    component: () => import("@/views/AboutView.vue"),
    props: { msg: "Hello, I am a static message" },
  },
];
```
