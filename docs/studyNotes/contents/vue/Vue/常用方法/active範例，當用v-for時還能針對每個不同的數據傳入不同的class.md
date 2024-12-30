舉例來說，如果我們有一個陣列內容要做各自的`style`時，就可使用這個方式ＸＤＤ
不用懷疑我真的有遇過老闆覺得五顏六色的比較好看ＸＤＤＤ

例如：
```js
const colors = ['red','blue','orang']
```

你可以直接用
```vue
<script setup>
import { ref } from "vue";

const colors = ref(['red','blue','green'])
</script>

<template>
<div v-for="(color, index) in colors" :key="index" :class="color">
	<p> {{ color }} </p>
</div>
</template>

<style scoped>
.red {
	color: red;
	}

.blue {
	color: blue;
	}

.green {
	color: green;
	}
</style>
```

這邊順便介紹常用的active
```vue
<script setup>
import { ref } from "vue";

const list = ref(["標題一", "標題二", "標題三"]);
const isActive = ref(0);

function changeClass(i) {
	isActive.value = i;
}
</script>

<template>
<div>
	<ul>
		<li
			v-for="(item, index) of list"
			:key="index"
			:class="{ active: isActive === index }"
			@click="changeClass(index)"
		>						
			{{ item }}
		</li>
	</ul>
</div>
</template>
<style scoped>
.active {
	color: red;
}
</style>
```