# TypeScript

基礎須知：

1. 建議不管是用 class 或是 interface，開頭都要大寫
   例如：

```typescript
class Animal {}
interface Animal {}
```

2. 用 ts 做 class 的話，匯出時建議寫 `export`，

匯出.ts 檔案：

```typescript
export class Animal {}
```

引入.ts 檔案：

```typescript
import { Animal } from "./animal";
```

當然你為了要在框架裡看起來統一，也可以這樣寫：

匯出.ts 檔案：

```typescript
// myModule.ts
export default {
  greet(name: string) {
    console.log(`Hello, ${name}`);
  },
  farewell(name: string) {
    console.log(`Goodbye, ${name}`);
  },
  version: '1.0',
  class Animal {
    name: string;
    age: number;
  }
};
```

引入.ts 檔案：

```typescript
import myModule from "./myModule";

const animal = new myModule.Animal("Dog");
myModule.greet("John");
myModule.farewell("John");
```

這樣要一直打 `myModule.Animal` 很麻煩，到時又解構的話又多此一舉。

## 目錄

- [Day1-TypeScript 示範基礎使用](./contents/01-basic.md)
- [Day2-Type](./contents/02-type.md)
- [Day3-Interface](./contents/03-interface.md)
- [Day4-Class](./contents/04-class.md)
- [Day5-Implements](./contents/05-implements.md)
