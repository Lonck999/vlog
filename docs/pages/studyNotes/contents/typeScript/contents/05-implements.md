# Implements

意思是，interface 只會事先定義類別所有可能會擁有的方法和屬性型別(即 class 表面上應該長什麼樣子)，

如下的介面；而 class 則是能用 implements 關鍵字實際寫出方法的內容。

簡單來說就是要你用 implements 去符合 interface 訂下的規範，然後 class 實際寫出方法的內容。

```typescript
interface Mappable {
  width: number;
  height: number;
  getArea(): number;
}

class Rectangle implements Mappable {
  width: number;
  height: number;
  getArea(): number {
    return this.width * this.height;
  }
}
```

這樣的話，Rectangle 就會擁有 Mappable 的所有方法和屬性型別。
