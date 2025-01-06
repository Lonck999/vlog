# 元件

元件是 Vue 中非常重要的概念，可以讓我們把頁面拆分成更小的部分，並且重複使用。
`component` 還有一個 `is` 屬性，可以動態的指定要顯示的元件。

## 元件的定義

元件可以分為兩種，一種是全域元件，另一種是局部元件。

全域元件：

有些元件是「全域註冊」的，或者你已經在區域元件宣告中用 `components` 宣告過了，這時候你就可以在任何地方使用這個元件。

先創一個範例元件，叫做 `Child.vue`。

```vue
<template>
  <div>
    <h2>我是全域註冊的元件</h2>
    <p>全世界的頁面都可以使用我唷～</p>
  </div>
</template>

<script setup></script>
```

在 `main.js` 中，宣告全域元件。

```js
import { createApp } from "vue";
import App from "./App.vue";

// 1. 先把我們剛才做的全域元件引入進來
import Child from "@/components/Child.vue";

const app = createApp(App);

// 2. 使用 app.component() 方法來做全域註冊
app.component("Child", Child);

// 3. 最後再把整個 App 掛載到畫面上
app.mount("#app");
```

這樣之後在任何地方都可以使用 `Child` 元件了，只要在 `template` 中使用 `<Child />` 就可以。

局部元件：

局部元件是「區域註冊」的，或者你已經在區域元件宣告中用 `components` 宣告過了，這時候你就可以在任何地方使用這個元件。
局部最常看到的使用方法就是「動態切換頁面區塊」，像是當你做「步驟導覽 (Wizard)」功能，使用者點下一步，就會顯示下一個元件。

範例：
先建立三個子元件。

SetpOne.vue

```vue
<template>
  <div>
    <h2>Step 1：請輸入姓名</h2>
    <input v-model="name" placeholder="請輸入姓名" />
    <button @click="goNext">下一步</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 用來儲存在這個步驟輸入的姓名
const name = ref("");

// 我們希望點擊之後能觸發父層的事件，
// 所以透過 emit 來通知
const emit = defineEmits(["go-next"]);

function goNext() {
  emit("go-next", name.value); // 將姓名回傳給父層
}
</script>
```

StepTwo.vue

```vue
<template>
  <div>
    <h2>Step 2：請設定密碼</h2>
    <input v-model="password" type="password" placeholder="請輸入密碼" />
    <button @click="goNext">下一步</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
const emit = defineEmits(["go-next"]);

function goNext() {
  emit("go-next", password.value);
}
</script>
```

StepThree.vue

```vue
<template>
  <div>
    <h2>Step 3：確認資訊</h2>
    <p>姓名：{{ userName }}</p>
    <p>密碼：{{ userPassword }}</p>
    <button @click="submit">送出</button>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: {
    type: String,
    default: "",
  },
  userPassword: {
    type: String,
    default: "",
  },
});

function submit() {
  alert(`送出！使用者姓名：${props.userName}，密碼：${props.userPassword}`);
}
</script>
```

父元件

```vue
<template>
  <div>
    <h1>註冊流程</h1>

    <!-- 使用 keep-alive 讓每個步驟的資料不會因切換而消失 -->
    <keep-alive>
      <component
        :is="currentStep"
        @go-next="handleGoNext"
        :userName="userName"
        :userPassword="userPassword"
      />
    </keep-alive>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 匯入三個步驟元件
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";

// 用來記錄當前顯示的「哪個元件」
const currentStep = ref(StepOne);

// 用來儲存從步驟一傳來的姓名
const userName = ref("");
// 用來儲存從步驟二傳來的密碼
const userPassword = ref("");

// 定義父層需要處理的事件
function handleGoNext(payload) {
  // 如果 currentStep 是 StepOne，就進到 StepTwo，並且存姓名
  if (currentStep.value === StepOne) {
    userName.value = payload;
    currentStep.value = StepTwo;
  }
  // 如果 currentStep 是 StepTwo，就進到 StepThree，並且存密碼
  else if (currentStep.value === StepTwo) {
    userPassword.value = payload;
    currentStep.value = StepThree;
  }
}
</script>
```

`component` 還有一個 超級好朋友。`keep-alive` 元件，可以讓元件在切換時，保留之前的資料。

`keep-alive` 主要用在「切換頁面」時，希望保留之前的資料，例如：

- 使用者切換頁面，希望保留之前的資料
- 使用者切換頁面，希望保留之前的元件狀態

還有一個是在路由切換時，希望保留之前的元件狀態。

我們來看一個綜合案例，來看看 `keep-alive` 怎麼用。

建立路由檔 router.js

```js
import { createRouter, createWebHistory } from "vue-router";
import CatRoom from "@/views/CatRoom.vue";
import DogRoom from "@/views/DogRoom.vue";
//若要在 keep-alive 中使用 include / exclude，需要在匯入的元件中定義元件名稱
CatRoom.name = "CatRoom";
DogRoom.name = "DogRoom";

const routes = [
  { path: "/cat", name: "CatRoom", component: CatRoom },
  { path: "/dog", name: "DogRoom", component: DogRoom },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
```

範例元件 CatRoom.vue / DogRoom.vue

CatRoom.vue

```vue
<template>
  <div>
    <h2>小貓房間</h2>
    <p>喵喵次數：{{ meowCount }}</p>
    <button @click="meowCount++">小貓叫一聲</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const meowCount = ref(0);
</script>
```

DogRoom.vue

```vue
<template>
  <div>
    <h2>小狗房間</h2>
    <p>汪汪次數：{{ woofCount }}</p>
    <button @click="woofCount++">小狗叫一聲</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const woofCount = ref(0);
</script>
```

App.vue

```vue
<template>
  <div>
    <h1>歡迎來到動物世界 (Vue Router + Keep Alive)！</h1>

    <!-- 導覽列：切換路由 -->
    <nav>
      <router-link to="/cat">進入小貓房間</router-link> |
      <router-link to="/dog">進入小狗房間</router-link>
    </nav>

    <!-- 用 keep-alive 包住 <router-view> -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("App 初始化完成");
});
</script>
```

## keep-alive 最常用到的屬性

- include

  - 用來「只」包含特定元件或頁面名字。
  - 格式：可以是字串或是正則表達式，或者陣列形式。

  ```js
  <!-- 只暫存 CatRoom，DogRoom 不會被暫存 -->
  <keep-alive include="CatRoom">
    <router-view />
  </keep-alive>
  ```

- exclude

  - 用來「排除」特定元件或頁面名字。
  - 格式：也可以是字串、正則表達式或陣列。

  ```js
  <!-- 排除 CatRoom，不會被暫存；DogRoom 會被暫存 -->
  <keep-alive exclude="CatRoom">
    <router-view />
  </keep-alive>
  ```

- max

  - 最多可以暫存多少個元件。超過的話，會先把最舊沒用到的元件「丟掉」。

  ```js
  <!-- 只快取 1 個，若切換超過 2 個頁面，最久沒用到的頁面會被丟棄 -->
  <keep-alive :max="1">
    <router-view />
  </keep-alive>

  ```

記得：要使用 include、exclude，我們必須確保元件有 name 屬性（或在路由設定有設定 name），不然 Vue 不知道要 match 誰。
