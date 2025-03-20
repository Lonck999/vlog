# 介面

Interface 在 TypeScript 中就像是在描述「某個東西應該要有什麼樣的形狀（屬性結構）」的規定書。

可以想像成「規定」：如果你的物件（object）要符合這份 Interface，就需要擁有裡面宣告的屬性或方法，而且型別也要對得上。

先寫好你要求的規定，然後 TypeScript 會幫你檢查，確保你的程式碼符合這些規定，沒有符合或少符合的話，TypeScript 就會跳錯誤。

## 介面定義

```ts
interface Person {
  name: string;
  age: number;
}

const student: Person = {
  name: "Jack",
  age: 10,
};
```

當然他也可以做選擇的，如果有些屬性是沒這麼重要有寫 object 是沒有的話，可以這樣寫：

```ts
interface Person {
  name: string;
  age: number;
  favoriteColor?: string; // 在屬性後面加上問號，表示這個屬性是可選的
}

const studentA: Person = {
  name: "Jack",
  age: 10,
  favoriteColor: "Blue",
};

const studentB: Person = {
  name: "Jack",
  age: 10,
};
```

## 介面裡的函式

```ts
interface Animal {
  name: string;
  // 這個方法沒實作細節，只規定輸入、輸出型別
  makeSound(): void;
}

const dog: Animal = {
  name: "Buddy",
  makeSound() {
    console.log("Woof!");
  },
};
```

當然也有別種寫法，像是這樣：

```ts
interface Animal {
  name: string;
  // 這個方法沒實作細節，只規定輸入、輸出型別
  makeSound(): void;
}

const dog = {
  name: "Buddy",
  age: 3,
  makeSound() {
    console.log("Woof!");
  },
};

const woof = (woofs: Animal) => {
  console.log(woofs.name);
  woofs.makeSound();
};

woof(dog);
```

大意上就是，先定義了一個 Animal 介面，然後函式用了 Animal 介面檢查帶進去的值有沒有符合 Animal 介面規定，函式裡只要必備的屬性都有就能通過檢查，額外的屬性不會造成問題，就算是函式多要屬性也不會報錯。
