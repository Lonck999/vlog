# 配置 404 頁面

## 404 頁面

- 404 頁面是當用戶訪問一個不存在的路由時，顯示的頁面。
- 404 頁面可以自定義，也可以使用 VueRouter 提供的 404 頁面。

## 配置 404 頁面

- 在 VueRouter 中，可以使用 `/:pathMatch(.*)*` 來配置 404 頁面。

- `/:pathMatch(.*)*` 是指它可以用於捕獲任意未定義的路徑並進行路由重定向。

```javascript
const router = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
```

- 在 VueRouter 中，可以使用 `/:catchAll(.*)*` 來配置 404 頁面。

- `:catchAll(.*)*` 是 VueRouter 提供的參數，表示匹配所有路徑。

```javascript
const router = [
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
```
