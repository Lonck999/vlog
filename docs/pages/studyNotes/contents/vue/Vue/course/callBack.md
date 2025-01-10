# 回調函數

> 你可能會好奇，`props` 可不可以也傳事件？
>
> 答案是可以的，只是這時候的 `props` 就變成回調函數。
>
> 回調函數就是父層的函數，傳給子層，子層再傳回來。
>
> 其實是可以的，Vue 其實沒有禁止你或是明文跟你說這樣不行。
>
> 我們來看個例子：
>
> 父層
>
> ```vue
> <script setup>
> import ChildComponent from "./ChildComponent.vue";
> import { ref } from "vue";
>
> const count = ref(0);
>
> function incrementCount() {
>   count.value++;
> }
> </script>
> ```

> <template>
>   <ChildComponent :onIncrement="incrementCount" />
>   <p>父元件 count: {{ count }}</p>
> </template>
> ```
>
> 子層
>
> ```vue
> <script setup>
> const props = defineProps({
>   onIncrement: {
>     type: Function,
>     required: true,
>   },
> });
>
> function handleClick() {
>   props.onIncrement();
> }
> </script>
>
> <template>
>   <button @click="handleClick">子層幫你 ＋ 1</button>
> </template>
> ```
>
> 這樣子層就可以透過 `props.onIncrement` 來呼叫父層的 `incrementCount` 函數，並且在父層的 `count` 上增加 1。
>
> 那這樣跟 `emit` 有什麼不同？
>
> `emit` 是子層去通知父層，然後叫父層自己去改資料。
>
> 子層只要靠 emit('父層傳來的事件名稱')，父層監聽到後，就會去改資料，這樣可以明確知道資料是由父層所掌控。
>
> 哪個方式會比較好呢？在`Vue` 的官網中是推薦 `emit` 為比較好的方式。不要嫌麻煩，就乖乖地照寫。
