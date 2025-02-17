# VueRouter 的動態路由

動態路由是指我們在訪問一個路由時，會根據不同的參數來訪問不同的路由，不用在一個一個設置路由，這是神經病在做的事。

做常見的就是在抓 API 的時候，會把 API 的資料放在路由上，這樣我們就可以根據不同的參數來訪問不同的路由。

我們來看個例子：router/index.js

```js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/user/:id",
    component: () => import("@/views/User.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
```

axios 抓取 API 的資料，並且把資料放在路由上。

```js
import axios from "axios";

export default {
  created() {
    const id = this.$route.params.id;
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        console.log(res.data);
      });
  },
};
```
