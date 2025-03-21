# defineModel

## 什麼是 defineModel

在 defineModel 還沒有出來前，我們為了要實現父子元件間的雙向綁定，需要透過 props 和 emit 來實現。

父層

```vue
<script setup>
import child from "./child.vue";
import { ref } from "vue";
const num = ref(0);
</script>
<template>
  <child v-model="num" />
</template>
```

子層

```vue
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <p>{{ modelValue }}</p>
  <button @click="emit('update:modelValue', num + 1)">+</button>
</template>
```

現在不用這麼麻煩了，直接使用 defineModel 來實現。

父層

```vue
<script setup>
import child from "./child.vue";
import { ref } from "vue";
const num = ref(0);
</script>
<template>
  <child v-model="num" />
</template>
```

子層

```vue
<script setup>
const childNum = defineModel("num");
</script>
<template>
  <p>{{ childNum }}</p>
  <button @click="childNum++">+</button>
</template>
```

同樣的 defineModel 也可以定義 type 和 default。

```vue
<script setup>
const childNum = defineModel("num", { type: Number, default: 0 });
</script>
```

也可以實踐多個 model。

父層

```vue
<script setup>
import child from "./child.vue";
import { ref } from "vue";
const model1 = defineModel("model1");
const model2 = defineModel("model2");
</script>
<template>
  <child v-model:model1="model1" v-model:model2="model2" />
</template>
```

子層

```vue
<script setup>
const childModel1 = defineModel("model1");
const childModel2 = defineModel("model2");
</script>
<template>
  <p>{{ childModel1 }}</p>
  <p>{{ childModel2 }}</p>
</template>
```
