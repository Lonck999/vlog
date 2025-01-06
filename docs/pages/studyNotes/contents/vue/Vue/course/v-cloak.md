# v-cloak

`v-cloak`算是一個時代性的指令，

也不是說他現在過時了，只是需要它的地方變少了，而且少蠻多的...

在以前網路速度還沒有像現在這麼快速的年代，要顯示一個網頁，即使是靜態的的網頁，

也是要等一陣子的，大概 2 ~ 5 秒左右，看網頁的圖片大小跟東西的多寡，

那就更不用說一些動態、多互動的網頁，肯定是等到泡麵都可以吃了( ˘･з･)，

到了 3G 之後速度快了很多，但還是要等一下，

這時候`v-cloak`就出場了，

簡單來說`v-cloak`的主要功能就是讓 Vue 還未加載好或未渲染完成之前，

都不要顯示呈現一個白的畫面，而不是顯示一個對用戶無意義的東西，

例如：在還沒加載完成前，就先出現{{ 要出現的字 }}

### 作用：

`v-cloak` 屬性可以配合 CSS 去隱藏還未被 Vue 解析的內容，

當 Vue 完成初始化後，這個屬性會被自動移除，

隱藏效果也就消失，頁面內容才會正常顯示。

### 使用方式：

```vue
<style>
[v-cloak] {
  display: none;
}
</style>

<div id="app">
	<p v-cloak>{{ firstName }}</p>
</div>

<script src="app.js">
Vue.createApp({
	setup() {
	const firstName = "John";

	return {
		firstName,
		};
	},
}).mount("#app");
</script>
```

直接在要使用的元素部分後面寫上`v-cloak` ，在 CSS 的部分加上`display: none;`就搞定了。
