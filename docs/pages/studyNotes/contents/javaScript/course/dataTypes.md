# 數據類型

## 介紹常用類型

### Number 數值

> 包含整數或浮點數都算
>
> NaN(無法顯示)跟 Infinity(無窮大)也算是數值
>
> ```js
> let age = 30;
> console.log("typeof age", typeof age); // number
> console.log("typeof NaN", typeof NaN); // number
> console.log("typeof Infinity", typeof Infinity); // number
> console.log("typeof 0", typeof 0); // number
> ```

### String 字串

> 包含文字、符號、數字、空格、標點符號等，就是文字拉，你數字後面接文字他也會是字串。
>
> 在' ' & " "裡面寫上的文字、數字都算字串
>
> ```js
> let name = "John";
> console.log("typeof name", typeof name); // string
> ```

### Boolean 布林

> 布林值顯示的就只有 true & false 不會同時顯示，只會出現其中一個
>
> ```js
> let isTrue = true;
> console.log("typeof isTrue", typeof isTrue); // boolean
> ```

### Undefined 未定義

> 當一個變數被宣告但未賦值時，值為 undefined
> undefined 不等於 null
>
> ```js
> let lastName;
> console.log("typeof lastName", typeof lastName); // undefined
> console.log("lastName === Undefined", lastName === undefined); // true
> console.log("lastName === null", lastName === null); // false
> console.log("lastName === 0", lastName === 0); // false
> console.log("typeof lastName === 'object'", typeof lastName === "object"); // false
> ```

### Null 空值

> 表示一個空值或不存在的值，目前沒有這個值而已。
> 空值是對象
>
> ```js
> let nothing = null;
> console.log("typeof nothing", typeof nothing); // object
> console.log("nothing === null", nothing === null); // true
> console.log("nothing === undefined", nothing === undefined); // false
> console.log("nothing === 0", nothing === 0); // false
> console.log("typeof nothing === 'object'", typeof nothing === "object"); // true
> ```

### Symbol 符號

> 符號是唯一且不可變的值，通常用於創建唯一的標識符
>
> ```js
> let symbol = Symbol();
> console.log("typeof symbol", typeof symbol); // symbol
> ```

### Object 對象

> 對象是複雜數據類型，需要用{}包起來，然後給予 Key 跟 Value，裡面可以包涵數值、字串、布林、陣列、函式、對象等...
>
> ```js
> let person = {
>   name: "John",
>   age: 30,
>   isMarried: false,
>   hobbies: ["coding", "reading", "traveling"],
>   sayHello: function () {
>     console.log("Hello, world!");
>   },
> };
> console.log("typeof person", typeof person); // object
> ```

### Array 陣列

> 陣列是包含多個值的集合，用[]包起來，裡面可以包涵數值、字串、布林、對象等...
> 陣列是對象的一種，跟對象最大的不同是，對象的 key 是字串，而陣列的 key 是數字
>
> ```js
> let numbers = [1, "2", true, { name: "John" }, [1, 2, 3]];
> console.log("typeof numbers", typeof numbers); // object
> ```
