# 路由守衛

路由守衛是一種機制，可以讓我們在路由跳轉的過程中，進行一些攔截，例如：

- 在路由跳轉前，進行一些驗證，例如：是否登入、是否授權、是否滿足條件
- 在路由跳轉後，進行一些處理，例如：記錄路由、進行埋點
- 在路由跳轉時，進行一些動畫，例如：淡入淡出、滑動、旋轉
- 在路由跳轉時，進行一些滾動行為，例如：回到頂部、回到指定位置

接下來我們來看一下所有的介紹

## 全域守衛

全域顧名思義就是在全域中都會執行的守衛，所以會直接寫在 router/index.js 的實例上。

全域守衛分為三種：

- 全域前置守衛 beforeEach
- 全域前置守衛 beforeResolve
- 全域後置守衛 afterEach
- 全域錯誤守衛 onError

### 全域前置守衛 beforeEach 範例：

```js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

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

router.beforeEach((to, from, next) => {
  console.log("全域前置守衛");
  next();
});
```

> 我們可以看到 beforeEach 的參數有 to、from、next，其中 to 是要前往的路由之前，from 是從哪個路由來的，next 是下一個要執行的函。式。

> to 是一個對象，對象中包含了路徑、參數、查詢參數、路徑名稱、路徑別名等資訊，詳細可以用 console.log 印出來看看。
>
> 例如你打算驗證是否登入，可以這樣寫：
>
> ```js
> router.beforeEach((to, from, next) ={
>   // 假設某些路由定義中含有 meta 屬性 requiresAuth
>   if (to.meta.requiresAuth) {
>     // 根據要求進行驗證邏輯
>   }
>   next();
> });
> ```

> from 是從哪個路由來的，跟 to 一樣，也是一個對象，對象中包含了路徑、參數、查詢參數、路徑名稱、路徑別名等資訊，詳細可以用 console.log 印出來看看。
>
> 如果你希望在導航時記錄從哪個頁面來，可以利用 from 來做日誌記錄：
>
> ```js
> router.beforeEach((to, from, next) => {
>   console.log(`從 ${from.fullPath} 導航到 ${to.fullPath}`);
>   next();
> });
> ```

> next 是下一個要執行的函式，如果沒有執行 next，則路由不會跳轉，所以要靠 next 來讓路由繼續跳轉。
>
> 我們來看範例：
>
> ```js
> router.beforeEach((to, from, next) => {
>   // 假設我們要求訪問 /dashboard 需用戶已登入
>   const isLoggedIn = false; // 例如，這裡模擬用戶尚未登入
>   if (to.path === "/dashboard" && !isLoggedIn) {
>     next({ path: "/login" }); // 重定向到登入頁
>   } else {
>     next(); // 放行導航
>   }
> });
> ```

### 全域前置守衛 beforeResolve 範例：

beforeResolve 跟 beforeEach 的用法一樣，差別在於 beforeResolve 是在所有全域守衛執行完後，才會執行。

用於在所有守衛執行完後，進行一些處理，例如：記錄路由、進行埋點。

我個人目前是比較少使用 beforeResolve，因為我們在 beforeEach 就可以處理完所有的事情了。

```js
router.beforeResolve((to, from, next) => {
  console.log("全域前置守衛");
  next();
});
```

### 全域後置守衛 afterEach 範例：

afterEach 是在所有全域守衛執行完後，才會執行。

```js
router.afterEach((to, from) => {
  console.log("全域後置守衛");
});
```

### 全域錯誤守衛 onError 範例：

onError 是在全域守衛執行過程中，如果發生錯誤，就會執行 onError。

```js
router.onError((error) => {
  console.log("全域錯誤守衛");
});
```

全域守衛的執行順序：

- beforeEach > beforeResolve > afterEach > onError

## 路由守衛

路由守衛是針對某個路由的守衛，所以會寫在路由的配置上，也是寫在 router/index.js 的實例上。

路由守衛只有一種：

### 路由前置守衛 beforeEnter

```js
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

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
    beforeEnter: (to, from, next) => {
      console.log("路由前置守衛");
      next();
    },
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
```

裡面有個 beforeEnter 的守衛，這個守衛的用法跟 beforeEach 一樣，差別在於 beforeEnter 是針對某個路由的守衛，而 beforeEach 是全域的守衛。

beforeEnter 的參數有 to、from、next，用法跟 beforeEach 一樣，差別在於 beforeEnter 是針對某個路由的守衛，所以不會有全域的守衛。

## 組件守衛

定義在 Vue 組件內部，能夠根據組件的狀態和數據來決定路由的切換行為。

它們的主要特點是與組件緊密耦合，可以直接訪問組件內的 data、methods 以及其他響應式狀態。常見的組件內守衛主要有三種。

組件守衛分為三種：

- 組件前置守衛 beforeRouteEnter
- 組件前置守衛 beforeRouteUpdate(onBeforeRouteUpdate)
- 組件前置守衛 beforeRouteLeave(onBeforeRouteLeave)

### 組件前置守衛 beforeRouteEnter 範例：

beforeRouteEnter 是組件前置守衛，在進入組件之前執行。

作用有點像是 路由守衛的 beforeEnter，但是是針對組件的守衛。

beforeRouteEnter 在 setup 中不可以使用。

```js
export default {
  name: "MyComponent",
  data() {
    return {
      message: "Hello Vue!",
    };
  },
  // 在路由進入前調用
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter 被調用");
    // 組件實例尚未創建，無法使用 this
    // next 回調中的 vm 參數代表組件實例
    next((vm) => {
      console.log("組件實例已創建，可以訪問 vm.message:", vm.message);
    });
  },
};
```

### 組件前置守衛 beforeRouteUpdate(onBeforeRouteUpdate) 範例：

beforeRouteUpdate(onBeforeRouteUpdate) 是組件前置守衛，在更新組件之前執行。

```js
<script setup>
import { onBeforeRouteUpdate } from "vue-router";
  onBeforeRouteUpdate((to, from, next) => {
    console.log("組件前置守衛");
  },
</script>
```

### 組件前置守衛 beforeRouteLeave(onBeforeRouteLeave) 範例：

beforeRouteLeave(onBeforeRouteLeave) 是組件前置守衛，在離開組件之前執行。

```js
<script setup>
import { onBeforeRouteLeave } from "vue-router";
  onBeforeRouteLeave((to, from, next) => {
    console.log("組件前置守衛");
  },
</script>
```

```js
export default {
  beforeRouteLeave(to, from, next) {
    console.log("組件前置守衛");
  },
};
```

## 路由過渡動畫

## 滾動行為

```

```
