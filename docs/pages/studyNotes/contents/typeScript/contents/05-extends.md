# extends

在 TypeScript 中，「extends」這個關鍵字的含義就是「繼承」或「延伸」。

簡單來說就跟現實社會的繼承一樣，父親原有財產是房子、車子，兒子原有財產是玩具，兩個不同的個體。

但兒子繼承父親的東西，兒子可以擁有房子、車子，所以兒子現在就有房子、車子、玩具。

它可以出現在不同情況下，扮演不同的角色。常見的四種情境：

- 類別繼承 (Class Extends)
- 介面繼承 (Interface Extends)
- 泛型約束 (Generic Constraints)
- 條件型別 (Conditional Types)

下面我們依序來看看這四種情境。

## 類別繼承 (Class Extends)

透過 class A extends B 這種寫法，代表「類別 A 繼承了類別 B」。

```typescript
class Father {
  house(): void {
    console.log("this is house");
  }

  car(): void {
    console.log("this is car");
  }
}

class Son extends Father {
  toy(): void {
    console.log("this is toy");
  }
}

const son = new Son();
son.house(); // this is house
son.car(); // this is car
son.toy(); // this is toy
```

## 介面繼承 (Interface Extends)

透過 interface A extends B 這種寫法，代表「介面 A 繼承了介面 B」。

```typescript
interface Father {
  name: string;
  age: number;
}

interface Son extends Father {
  hobby: string;
}

const son: Son = {
  name: "John",
  age: 20,
  hobby: "play game",
};
```

## 泛型約束 (Generic Constraints)

泛型約束是指在泛型中，對泛型進行約束，使其必須滿足某些條件。
