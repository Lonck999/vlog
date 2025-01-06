# v-slot

我們前面介紹了幾個父傳子、子傳父的用法，都是在傳遞資料，你說有沒有那種可以傳遞元件的用法，v-slot 就是這樣的用法。

v-slot 是 Vue 3 中引入的一個新特性，用於在元件之間傳遞和接收元件。它允許你在父元件中定義一個插槽，然後在子元件中使用這個插槽。

v-slot 的語法是 `v-slot:slotName`，其中 `slotName` 是你定義的插槽名稱。

我們先來看一個簡單的例子。

父層

```vue
<script setup>
import Child from "./Child.vue";
import { ref } from "vue";

const header = ref("這是放入 Child 預設插槽的內容");
const content = ref("這是放入 Child 預設插槽的內容");
const footer = ref("這是放入 Child footer 插槽的內容");
</script>

<template>
  <Child>
    <template v-slot:header>
      <h1>{{ header }}</h1>
    </template>

    <template v-slot:content>
      <p>{{ content }}</p>
    </template>

    <template v-slot:footer>
      <small>這是放入 Child footer 插槽的內容</small>
    </template>
  </Child>
</template>
```

子層

```vue
<template>
  <div>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

那如果不想要一直一寫 `v-slot:slotName` 的話，也可以使用 `v-slot` 的縮寫，也就是 `#`。

父層

```vue
<template>
  <Child>
    <template #header>
      <h1>{{ header }}</h1>
    </template>
    <template #content>
      <p>{{ content }}</p>
    </template>
    <template #footer>
      <small>{{ footer }}</small>
    </template>
  </Child>
</template>
```

子層，用法一樣。

```vue
<template>
  <div>
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

`v-slot` 也有一個酷酷的用法，就是可以傳遞屬於子元件的變數或資料，透過插槽的方式，提供給父元件使用。

子層

```vue
<script setup>
import { reactive } from "vue";
const userData = reactive({ name: "兒子", age: 7 });
</script>

<template>
  <div>
    <slot :user="userData"></slot>
  </div>
</template>
```

父層

```vue
<script setup>
import Child from "./Child.vue";
</script>

<template>
  <Child>
    <template v-slot:default="{ user }">
      <h2>這裡是父元件拿到的使用者：{{ user.name }}，年齡：{{ user.age }}</h2>
    </template>
  </Child>
</template>
```

當然，也是可以簡寫。

```vue
<script setup>
import Child from "./Child.vue";
</script>

<template>
  <Child>
    <template #default="{ user }">
      <p>{{ user.name }}</p>
      <p>{{ user.age }}</p>
    </template>
  </Child>
</template>
```

這個的概念很像是先把子層數據傳遞到父層，然後父層再透過插槽的方式放入對應位置，全部在父層渲染。
