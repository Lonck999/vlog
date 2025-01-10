# var、let、const 聲明變數

## 聲明變數用法

> 在 ES6 版本之後已經很少很少真的很少在用 var 了，
>
> 各位新手村的初心者們也切忌不要再使用 var，
>
> 以下會跟大家說明這三種的差別。

### var

> var 是 JavaScript 中最早引入的變數宣告方式，具有以下特性：
>
> #### 函數作用域 (Function Scope)：
>
> - var 變數在函數內部具有函數作用域，在整個函數內都可以訪問。
> - var 不支援區塊作用域。
>
> ```js
> function example() {
>   var x = 1;
>   x = 2;
>   if (true) {
>     var x = 3; // 同樣的變數 x，被重新賦值
>     console.log(x); // 3
>   }
>   console.log(x); // 3
> }
> example();
> ```

### let

> let 是在 ES6（ECMAScript 2015）中引入的，具有以下特性：
>
> #### 區塊作用域 (Block Scope)：
>
> - let 變數在區塊內部具有區塊作用域，在區塊內部可以訪問。
> - let 支援區塊作用域。
>
> ```js
> function example() {
>   let x = 1;
>   x = 2;
>   if (true) {
>     let x = 3; // 不同的變數 x，僅在 if 塊內有效
>     console.log(x); // 3
>   }
>   console.log(x); // 2
> }
> example();
> ```
