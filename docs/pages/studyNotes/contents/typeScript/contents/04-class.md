# 類別

## 類別的定義

```typescript
class Vehicle {
  drive(): void {
    console.log("chugga chugga");
  }

  honk(): void {
    console.log("beep beep");
  }
}

const vehicle = new Vehicle();
vehicle.drive();
vehicle.honk();
```

在這邊示範了類別的定義，基礎的使用，以及類別的實例化。

上面範例大意就是，我們定義了一個 `Vehicle` 的 class，讓它有 `drive` 和 `honk` 兩個方法。

這裡的寫法會很像 interface 的寫法，就是在 function 的寫上輸出之後會是什麼型別，不過這裡的 `class` 是定義了一個類別，而 `interface` 是定義了一個型別。

在後續如果聲明一個 `vehicle` 的變數，它就會有 `drive` 和 `honk` 這兩個方法。

## 存取修飾子 (Access Modifiers)

在 TypeScript 中，存取修飾子有以下三種：

- public：大家都可以使用
- private：只有自己能用，外面讀不到也改不到
- protected：只有自己跟繼承的能用，外面讀不到也改不到

```typescript
class Vehicle {
  // 詳細的寫法
  // public color: string;
  // 建構子：new 的時候會被呼叫
  // constructor(public color: string) {
  //   this.color = color; // 將傳進來的參數 color 指派給 this.color
  // }

  // 簡單的寫法
  constructor(public color: string) {}

  // public 的話，外面可以讀也可以改
  public drive(): void {
    console.log("chugga chugga");
  }

  // protected 的話，外面不能讀也不能改，但繼承的可以
  protected honk(): void {
    console.log("beep beep");
  }
}

class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color);
  }
  // private 的話，外面不能讀也不能改，連繼承的也不能用
  private drive(): void {
    // 在繼承的 class 中，可以覆蓋類別的方法
    console.log("vroom vroom");
  }

  public startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car(4, "red");
car.startDrivingProcess();
car.drive(); // 這裡會報錯，因為 drive 是 private 的

const vehicle = new Vehicle("red");
vehicle.honk(); // 這裡會報錯，因為 honk 是 protected 的
console.log(vehicle.color); // 這裡會直接顯示 red
```

## Constructor（建構子）

在 TypeScript 中，建構子是 class 的 constructor 方法，用來初始化 class 的屬性。

```typescript
class Person {
  // 在 TypeScript 中可先宣告屬性或在 constructor 的參數中直接給型別
  public name: string;
  public age: number;

  // constructor: 當 new Person(...) 時就會自動被呼叫
  constructor(name: string, age: number) {
    // 把傳進來的參數賦值給類別內部屬性
    this.name = name;
    this.age = age;
  }

  // 一個普通的方法
  public sayHello() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

// 使用方式
const p1 = new Person("Alice", 20); // 這裡會自動呼叫上面 constructor
p1.sayHello(); // Hi, I'm Alice and I'm 20 years old.
```

簡寫

```typescript
class Person {
  // 直接在 constructor 裡宣告屬性並賦值
  constructor(public name: string, private age: number) {}

  sayHello() {
    console.log(`Hi, I'm ${this.name}.`);
    // console.log(`Age: ${this.age}`); // 可以存取，但外部無法直接讀取 age
  }
}

const p2 = new Person("Bob", 25);
// p2.name; // "Bob"
// p2.age;  // ❌ 無法在外部存取，因為是 private
p2.sayHello(); // Hi, I'm Bob.
```

## 什麼是 super

super 通常會出現在「繼承 (Inheritance)」的情境，也就是一個類別 extends 另一個類別的時候。

在 TypeScript 中，如果子類別（child）自己宣告了 constructor，多加東西，它就必須在建構子裡呼叫 super()，目的是先執行父類別的建構子來初始化「父類別的那一塊」。

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move() {
    console.log(`${this.name} is moving`);
  }
}

// Dog 繼承 Animal
class Dog extends Animal {
  breed: string;

  // 若子類別有自己的 constructor，就必須呼叫 super(...)
  constructor(name: string, breed: string) {
    // 把 name 先交給父類別 (Animal) 的 constructor 處理
    super(name);
    // 再來處理 Dog 自己新增的屬性
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} is barking`);
  }
}

const dog = new Dog("Spike", "Bulldog");
// 這時候整個流程：
// 1. new Dog(...) -> 進入 Dog 的 constructor
// 2. super(name) -> 先跑 Animal 的 constructor -> this.name = name
// 3. 回到 Dog constructor -> this.breed = breed
dog.move(); // Spike is moving
dog.bark(); // Spike is barking
```

## 與 interface 的搭配

主要會與 class 搭配使用，是因為可能有很多的 class 都有一些共同的屬性或方法，這時候就可以使用 interface 來定義這些共同的屬性或方法，然後讓 class 去實作這個 interface。

User.ts

```typescript
import { faker } from "@faker-js/faker";

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.fullName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `User Name: ${this.name}`;
  }
}
```

Company.ts

```typescript
import { faker } from "@faker-js/faker";

export class Company {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.companyName = faker.company.name();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `
    <div>
      <h1>Company Name: ${this.companyName}</h1>
      <h3>Catchphrase: ${this.catchPhrase}</h3>
    </div>
    `;
  }
}
```

Map.ts

```typescript
import { User } from "./User";
import { Company } from "./Company";

interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map; // private 代表這個屬性只能在這個 class 裡面使用

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(divId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
      }
    );
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng,
      },
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
```
