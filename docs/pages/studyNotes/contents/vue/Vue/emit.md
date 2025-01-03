# emit

`emit` 是 Vue 中用來觸發事件的函數。用來通知父元件，子元件發生了某些事情。就是事件的子傳父。

簡單來說，就是你(子層)跟你爸(父層)在兩個房間，手上都有對講機(事件)，

你(子層)想跟你爸(父層)說什麼，就按下對講機(事件帶有 emit 跟參數)說，你爸(父層)就會聽到，你爸(父層)聽到之後，就會回應你(子層)。

主要做法：

1. 先在父層元件中，定義一個事件處理函數。
2. 在父層元件中，使用 `v-on` 或 `@` 寫在子層上傳給子層。
3. 子層 用 `emit` 函數，拿父層傳過來的事件名稱，發送事件。
4. 在子層定義一個事件名稱，這個事件名稱會被父層的事件處理函數接收。
5. 在子層中，使用 `v-on` 或 `@` 寫在要發送事件的元素上。
6. 父層 在事件處理函數中，接收子層發送的事件，並可以附帶一些參數。

是不是聽完腦有點脹脹的ＸＤＤ

我們來看個範例

1. 先在父層元件中，定義一個事件處理函數。

```vue
<script setup>
import User from "./components/User.vue";
import { ref } from "vue";

const age = ref(20);

// 定義一個事件處理函數
function onAgeChange(newAge) {
  age.value = newAge;
}
</script>

<template>
  <h1>Hey!</h1>
  <User :age="age" />
</template>
```

2. 在父層元件中，使用 `v-on` 或 `@` 寫在子層上傳給子層。

```vue
<script setup>
import User from "./components/User.vue";
import { ref } from "vue";

const age = ref(20);

// 定義一個事件處理函數
function onAgeChange(newAge) {
  age.value = newAge;
}
</script>

<template>
  <h1>Hey!</h1>
  <User :age="age" @onAgeChange="onAgeChange" />
</template>
```

3. 子層 用 `emit` 函數，拿父層傳過來的事件名稱，發送事件。

```vue
<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  age: {
    type: Number,
    required: true,
  },
});

// 用 `emit` 函數，拿父層傳過來的事件名稱
const emit = defineEmits(["onAgeChange"]);
</script>
<template>
  <button>Increase Age</button>
  <p>The user is {{ props.age }} years old</p>
</template>
```

4. 在子層定義一個事件名稱，這個事件名稱會被父層的事件處理函數接收。

```vue
<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  age: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["onAgeChange"]);

// 定義一個事件名稱，這個事件名稱會被父層的事件處理函數接收
function onClickAge() {
  emit("onAgeChange", props.age + 1);
}
</script>
<template>
  <button>Increase Age</button>
  <p>The user is {{ props.age }} years old</p>
</template>
```

5. 在子層中，使用 `v-on` 或 `@` 寫在要發送事件的元素上。
6. 父層 在事件處理函數中，接收子層發送的事件，並可以附帶一些參數。

```vue
<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  age: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["onAgeChange"]);

function onClickAge() {
  emit("onAgeChange", props.age + 1);
}
</script>
<template>
  <!-- 在子層中，使用 `v-on` 或 `@` 寫在要發送事件的元素上 -->
  <button @click="onClickAge">Increase Age</button>
  <p>The user is {{ props.age }} years old</p>
</template>
```
