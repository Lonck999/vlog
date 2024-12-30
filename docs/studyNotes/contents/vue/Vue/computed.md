# computed

`computed`(計算屬性)與`methods`(方法)相似，

但是最大的不同是`computed`必須回傳一個值，並起會把這個值暫存起來，

當函式裡面依賴、在用得值有所改變的時候，他就會馬上更新拿改變後的值計算一個新的值給你。

由於他有暫存的特性，所以很適合拿來做一些反覆性高的計算，提高效率。
例如：購物車小計、總金額、等等......。
`computed`還有一個比較大的特性就是不能使用異步。

但是`methods`不同，`methods`不一定需要回傳一個值，
他也可能只需執行動作就好，他沒有暫存的特性，
所以拿`methods`做計算時是每次都會需要重新呼叫的，所以你計算了五次他就會呼叫五次。
`methods`能使用異步。

接下來我們來看範例：

```vue
<template>
  <div>
    <input v-model="firstName" placeholder="輸入你的名字" />
    <input v-model="lastName" placeholder="輸入你的姓氏" />
    <p>歡迎，{{ fullName }}！</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 定義兩個響應式變量
const firstName = ref("");
const lastName = ref("");

// 定義計算屬性來合併名字和姓氏
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`.trim();
});
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
}
</style>
```

定義了一個計算屬性 `fullName`，它會自動根據 `firstName` 和 `lastName` 的變化來更新。這樣，我們不需要手動監聽這些變量的變化，只要使用 `fullName`，它會始終保持最新。

## `computed` 的 `get` 和 `set`

`computed` 不僅可以讀取數據（使用 `get`），還可以設置數據（使用 `set`）。這讓計算屬性不僅僅是顯示數據，還能夠修改數據，這兩個是獨立的。

- **`get`**：只在讀取 `computed` 屬性時被調用，用來返回計算後的值。
- **`set`**：只在設置 `computed` 屬性時被調用，用來處理新值，通常是更新其他數據。

舉例：

```vue
<template>
  <div>
    <h1>用戶信息</h1>
    <label> 名字: <input v-model="firstName" placeholder="輸入名字" /> </label>
    <br />
    <label> 姓氏: <input v-model="lastName" placeholder="輸入姓氏" /> </label>
    <br />
    <label> 全名: <input v-model="fullName" placeholder="全名" /> </label>
    <p>全名是: {{ fullName }}</p>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const firstName = ref('小明')
const lastName = ref('王')
const fullName = computed({
	get() { return `${firstName.value} ${lastName.value}` },
	set(newValue) { const names = newValue.split(' ')
	if (names.length === 2) {
		firstName.value = names[0] lastName.value = names[1]
		}
	}
})
</script>
```
