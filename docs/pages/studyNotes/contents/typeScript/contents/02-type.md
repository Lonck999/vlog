# TypeScript 型別

型別分成兩種：

- 基本型別
- 複合型別

## 基本型別

這邊要特別注意一個就是 any 型別，這個型別可以讓你任意賦值，如果都用 any 型別，這樣就失去了型別檢查的意義(就跟寫 js 一樣)，所以盡量不要使用。

- any

```ts
let anyValue: any = "Hello";
anyValue = 123;
anyValue = true;
```

- void，表示這個變數沒有型別，通常用在函式沒有回傳值的時候

```ts
let voidValue: void = undefined;
```

- 字串

```ts
let name: string = "John";
```

- 數字

```ts
let age: number = 20;
```

- 布林值

```ts
let isStudent: boolean = true;
```

- 陣列

陣列也可以分成兩種：

- 數字陣列

```ts
let numbers: number[] = [1, 2, 3];
```

- 字串陣列

```ts
let names: string[] = ["John", "Jane", "Jim"];
```

如果混合使用有字串、數字、布林值、對象，會變成聯合型別 (Union Type)

```ts
let mixed: (string | number | boolean | object)[] = [
  1,
  "two",
  true,
  { name: "John" },
];
```

- 物件

```ts
let person: { name: string; age: number } = { name: "John", age: 20 };
```

- 函式

```ts
let myFunction: (a: number, b: number) => number = function (a, b) {
  return a + b;
};
```

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

這邊可能看起來有點複雜，我們來拆解一下：

- 第一個 `let myFunction` 是宣告一個變數 `myFunction`
- 第二個 `: (a: number, b: number) => number` 是型別註解，表示 `myFunction` 是一個接受兩個數字參數並返回一個數字的函式，
- 第三個 `= function (a, b) { return a + b; }` 是函式的實作

如果是混合型別，可以這樣寫：

```ts
let myFunction: (a: number | string, b: number | string) => number | string =
  function (a, b) {
    return a + b;
  };
```

箭頭函式可以這樣寫：

```ts
let myFunction: (a: number | string, b: number | string) => number | string = (
  a,
  b
) => a + b;
```

## 複合型別
