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

const car = new Car("red");
car.startDrivingProcess();
car.drive(); // 這裡會報錯，因為 drive 是 private 的

const vehicle = new Vehicle("red");
vehicle.honk(); // 這裡會報錯，因為 honk 是 protected 的
console.log(vehicle.color); // 這裡會直接顯示 red
```
