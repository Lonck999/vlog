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

優點

- 配置簡單：不需要後端特殊處理，直接使用即可。
- 兼容性好：所有瀏覽器都支持，因為 URL 的 hash 部分從來不會被發送到服務器。

缺點

- URL 不美觀：URL 中會包含 #，例如 http://example.com/#/about （這是缺點，但可以透過後端配置來解決）。
- SEO 友好度較低：搜索引擎對 # 後的內容處理可能不如 HTML5 History 模式那樣理想。

## History 模式

原理：History 模式利用 HTML5 History API（pushState 和 replaceState）來操作瀏覽器歷史紀錄，使得 URL 看起來更加乾淨（無 #）。

使用情況：適合希望 URL 結構更自然、對 SEO 更友好的應用，但需要服務器支持將所有路由都指向應用的入口頁面（通常是 index.html）。

看以下範例：

```js
// router.js
import { createRouter, createWebHistory } from "vue-router";
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
  history: createWebHistory(), // 使用 History 模式
  routes,
});

export default router;
```

優點

- URL 結構乾淨：沒有 #，例如 http://example.com/about ，更符合一般網站的慣例。
- SEO 友好：更自然的 URL 有助於搜索引擎更好地索引頁面。

缺點

- 需要服務器配置：當用戶直接訪問非根路徑（如 /about）時，如果服務器沒有正確配置重定向，會返回 404 錯誤。通常需要在服務器端設置“回退”（fallback），將所有路徑都指向應用入口。
- 兼容性問題：雖然現代瀏覽器均支持 HTML5 History API，但對於一些極少數的舊版瀏覽器可能存在兼容性問題。
