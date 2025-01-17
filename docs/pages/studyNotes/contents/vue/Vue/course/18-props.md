# props

## 什麼是 Props？

`props` 是父組件傳遞給子組件的數據，子組件使用 `props` 接收的一種工具，

我們可以想像成我們(父層)把自己的愛車(數據)借給兒子(子層)去把妹，允許兒子(子層)使用我們的愛車(數據)。

兒子(子層)只能原樣的使用(讀取)這台愛車，不能隨便改它的形狀。

在`<script setup>` 裡，我們可以直接使用 `defineProps` 來宣告。

重點就是：

- 父層傳遞數據給子層
- 子層使用 props 接收數據
- 子層不能直接修改 props 的值

我們來看以下的範例

父層

```vue
<script setup>
import Greeting from "./components/Greenting.vue";
import User from "./components/User.vue";
import { ref } from "vue";

const hi = ref("哈囉～你好嗎？");
</script>

<template>
  <h1>Hey!</h1>
  <Greeting :hi="hi" />
</template>
```

子層

```vue
<script setup>
import { ref } from "vue";

const msg = ref("Hello World");
const props = defineProps({
  hi: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <p v-if="props.hi">{{ msg }}</p>
  <p v-else>衷心感謝</p>
</template>
```

Props 的詳細設定項

- type: 限定資料類型，例如 String, Number, Boolean, Array, Object...
- required: 是否必填，預設是 false。若設成 true，父元件一定要傳。
- default: 預設值，如果父元件沒給，就用此值。
- validator: 自訂驗證規則，若不通過會在 console 警告。

```vue
<script setup>
const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 18,
  },
  hobbies: {
    type: Array,
    default: () => [],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    validator: (value) => value >= 0 && value <= 100,
  },
});
</script>
```
