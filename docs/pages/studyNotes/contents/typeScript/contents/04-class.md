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

## public、private、protected

public：大家都可以使用

private：只有自己能用，外面讀不到也改不到

protected：只有自己跟繼承的能用，外面讀不到也改不到
