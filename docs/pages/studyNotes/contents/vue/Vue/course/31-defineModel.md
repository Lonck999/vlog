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
