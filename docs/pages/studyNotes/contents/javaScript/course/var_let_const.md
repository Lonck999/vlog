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

### const

> const 是在 ES6（ECMAScript 2015）中引入的，用於宣告常量，具有以下特性：
>
> #### 區塊作用域 (Block Scope)：
>
> - 與 let 相同，const 變數只在其所在的塊級作用域內有效。
>
> ```js
> function example() {
>   const x = 1;
>   x = 2; // 這邊會不行，直接報錯
>   if (true) {
>     const x = 2; // 不同的變數 x，僅在 if 塊內有效
>     console.log(x); // 2
>   }
>   console.log(x); // 1
> }
> example();
> ```

那這樣很多新手村的初心者可能會有疑問了，你說 var 不能用，那這樣只剩下 let、const 了，我要怎麼去分辨什麼時候要用 let？？什麼時候用 const 呢？？ (\*´･д･)?

這邊可以做簡單的分辨，確定不會變動的可以使用 const，日後有可能變動的用 let，以下舉個簡單的例子：

- 舉例 1：你的出生年月日這種是絕對固定的，你不可能一出生完然後跟你爸媽說：等一下～我覺得的這個時辰、星座不好我換一個再讓我回去蹲一下(╬ ﾟ д ﾟ)，這種的我們就可以用 const。
- 舉例 2：有天，你女友綠了你，跟別人遠走高飛了，不想讓你的個綠光戰警找到，此時她就會想把原本固定的電話號碼換掉，像這種本來就有可能更動的就可以使用 let。

當然，你可能這輩子都不會有女朋友的話，那你就可以對自己的電話使用 const 去申明變數。(ﾉ ∀`\*)
