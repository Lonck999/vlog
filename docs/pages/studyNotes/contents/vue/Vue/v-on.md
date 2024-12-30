# v-on

## 使用方法

在 Vue 的世界中，要對要對 DOM 加入事件的話，會使用==v-on==來作為加入事件的指令，

寫法是==v-on:click="你取的事件名字"==

```vue=
<div v-on:click="你取的事件名稱">按鈕</div>
```

簡寫的話會是==@click="你取的事件名字"==

```vue
<div @click="你取的事件名稱;">按鈕:現在點了{{sum}}下</div>

<script setup>
const sum = 0;

你取的事件名稱() {
	sum.value++;
}
</script>
```

## 事件

所以你看到這兩種都是對的，他的使用方式就跟原生 Javascript 差不多，

只是 Javascript 會需要先拿到元素在加入事件，在 Vue 只要寫在元素裡呼叫要執行的函式就可以了。

幾乎所有瀏覽器原生支援的事件，我們來看幾個常用的舉例：

|   HTML   |   Vue   |                     用法                     |
| :------: | :-----: | :------------------------------------------: |
| onclick  | @click  |                當元素被點擊時                |
| onchange | @change | 當元素(通常是表單選項)裡面的值改變後失去焦點 |
|  onblur  |  @blur  |        當元素(通常是輸入框)失去焦點時        |
| onfocus  | @focus  |        當元素(通常是輸入框)獲得焦點時        |
| onsubmit | @submit |              當使用者提交表單時              |
| onreset  | @reset  |               當表單需要重置時               |
| onscroll | @scroll | 當使用者在視窗或某個可以滾動的區域滾動時觸發 |
|          |         |                                              |

## 修飾符

再來我們看一下==v-on==的修飾符，常用的有幾種在這跟大家說一下：

### 使用方式

在要使用的事件後面加上==.修飾符==就可以了。

```vue
<div @submir.prevent="你取的事件名稱;">按鈕</div>
```

這樣就可以阻止預設行為發生。

下面分種類介紹幾個常用的修飾符

- **事件行為控制類**：

  - **`.stop`**：呼叫 `event.stopPropagation()`，防止事件繼續向父層元素冒泡。
  - **`.prevent`**：呼叫 `event.preventDefault()`，阻止事件的預設行為發生（例如按鈕預設提交表單的行為）。
  - **`.capture`**：以捕獲模式 (capture mode) 綁定事件監聽器。事件會先在此元素上被攔截，再往下傳遞到子元素。
  - **`.once`**：事件只會觸發一次，之後監聽器會自動移除。
  - **`.passive`**：告訴瀏覽器此事件處理函式不會呼叫 `preventDefault()`，提升像是 `touchstart`、`scroll` 等事件的效能表現。

- **鍵盤與滑鼠按鍵限定類**（適用於鍵盤事件和部分滑鼠事件）：
  - **`.enter`**、`.tab`、`.delete`、`.esc`、`.space`、`.up`、`.down`、`.left`、`.right`：  
     針對特定按鍵監聽事件。例如 `@keyup.enter` 只在使用者按下 Enter 鍵後觸發。
  - **`.ctrl`、`.alt`、`.shift`、`.meta`**：  
     在事件觸發時要求同時按下對應的修飾鍵（Ctrl、Alt、Shift、Meta）。  
     例如：`@click.ctrl="..."` 只有在使用者按住 Ctrl 再點擊時觸發。
  - **`.exact`**：嚴格匹配修飾鍵組合。例如 `@keyup.ctrl.exact="..."` 只有在使用者只按 Ctrl（而非 Ctrl+Shift 或其他組合）時才觸發。
