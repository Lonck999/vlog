這是第一天，上的課，大概讓你知道 TypeScript 是什麼，以及怎麼使用。

## 什麼是 TypeScript

簡單來說就是把 javascript 變成強語言的內容，讓你在寫程式時，可以更安全，更穩定，接到的 api 內容也可以更明確的知道該需要什麼類型。

## 怎麼使用 TypeScript

第一步安裝，Node.js 需要 16 以上，這個自己上網找啊ＸＤＤ

第二步，安裝 TypeScript

```bash
npm install -g typescript
```

第三步，安裝 ts-node

```bash
npm install -g ts-node
```

要執行檔案的話就直接打，

ts-node 檔名.ts

這樣就可以執行了。

第四步，建立 TypeScript 專案

```bash
tsc --init
```

恭喜你，你已經可以開始使用 TypeScript 了。

我們來看看 TypeScript 裡面會長怎樣，

```ts
import axios from "axios";
const url = "https://jsonplaceholder.typicode.com/todos/1";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios
  .get(url)
  .then((res) => {
    const todo = res.data as Todo;
    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);
  })
  .catch((err) => {
    console.log(err);
  });

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`id: ${id}, title: ${title},  completed: ${completed}`);
};
```
