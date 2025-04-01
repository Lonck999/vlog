# Vue 的 生命週期

Vue 的生命週期現在主要是兩個版本，Vue2 和 Vue3。

## Vue2

創建前：beforeCreate

創建後：created

掛載前：beforeMount

掛載後：mounted

更新前：beforeUpdate

更新後：updated

卸載前：beforeDestroy

卸載後：destroyed

錯誤處理：errorCaptured

```vue
<script>
export default {
  name: "Vue2",
  data() {
    return {
      message: "Hello, Vue2!",
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  errorCaptured() {
    console.log("errorCaptured");
  },
};
</script>

<style scoped></style>
```

## Vue3(Options API)

創建前：beforeCreate

創建後：created

掛載前：beforeMount

掛載後：mounted

更新前：beforeUpdate

更新後：updated

卸載前：beforeUnmount

卸載後：unmounted

錯誤處理：errorCaptured

```vue
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  // =======================================
  // Options API
  // =======================================
  data() {
    return {
      message: "Hello Vue 3 Options API",
    };
  },
  // 生命週期 hooks
  beforeCreate() {
    console.log("beforeCreate: 初始化還沒完成，拿不到 this 中的資料");
  },
  created() {
    console.log("created: 可以使用 this.data =>", this.message);
  },
  beforeMount() {
    console.log("beforeMount: 即將掛載到 DOM");
  },
  mounted() {
    console.log("mounted: 已掛載到 DOM，可以操作 DOM 或使用 $refs");
  },
  beforeUpdate() {
    console.log("beforeUpdate: data 改變，DOM 即將更新");
  },
  updated() {
    console.log("updated: DOM 已完成更新");
  },
  beforeUnmount() {
    console.log("beforeUnmount: 元件即將被卸載");
  },
  unmounted() {
    console.log("unmounted: 元件已經被卸載");
  },
};
</script>

<style scoped></style>
```

## Vue3(Composition API)

創建：setup

掛載前：onBeforeMount

掛載後：onMounted

更新前：onBeforeUpdate

更新後：onUpdated

卸載前：onBeforeUnmount

卸載後：onUnmounted

錯誤處理：onErrorCaptured

```vue
<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
} from "vue";

const count = ref(0);

onBeforeMount(() => {
  console.log("beforeMount");
});

onMounted(() => {
  console.log("mounted");
});

onBeforeUpdate(() => {
  console.log("beforeUpdate");
});

onUpdated(() => {
  console.log("updated");
});

onBeforeUnmount(() => {
  console.log("beforeUnmount");
});

onUnmounted(() => {
  console.log("unmounted");
});

onErrorCaptured(() => {
  console.log("errorCaptured");
});
</script>
```

vue2 和 vue3 的差異

- 創建的簡化，vue3 的創建只需要 setup 即可，vue2 需要 beforeCreate 和 created
- 卸載的差異，vue3 的卸載是 onBeforeUnmount 和 onUnmounted，vue2 是 beforeDestroy 和 destroyed，功能是一樣的只是取名不同
- 錯誤處理的差異，vue3 的錯誤處理是 onErrorCaptured，vue2 是 errorCaptured，功能是一樣的只是取名不同
