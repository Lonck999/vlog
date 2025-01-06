# v-model

`v-model`是一種很常在選項、表單間常看到的一種指令，

用於 Vue 實例與數據之間一個即時溝通改變的指令，

你只要準備好輸入框的實例中，

加入`v-model`，只要在輸入框裡輸入你要改變的字時，

他就會在你顯示結果的實例中，馬上做出改變並顯示在上面了，

這麼說有點繞口，我們舉個簡單的例子：就像是車子的油門和儀表板之間的關係，`v-model`就像是這之間的感測器，當油門只要踩重一點，感測器只要感測到時就會傳給儀表板顯示相應的速度。

接下來我們來看一下程式碼範例

```vue
<div id="app">
	<p>顯示：{{firstName}}</p>
	<label for="firstName">姓氏更改處</label>
	<input type="text" v-model="firstName" />
</div>

<script>
const { ref, createApp } = Vue;
createApp({
  setup() {
    const firstName = ref("123");
    return {
      firstName,
    };
  },
}).mount("#app");
</script>
```

#### 修飾符

`v-model`中也是有一寫修飾符可以使用，接下來我們來看一下，

- `lazy`：避免持續性觸發，可以在編輯完後才觸發資料更新（使用 change 的形式進行同步）
- `number`：限制只有數值型別的資料才能寫入，以下範例中的 number 資料會是以 `number` 型別傳入，無法透過該 input 套用其它資料型別。
- `trim`：修飾掉首尾的空白
