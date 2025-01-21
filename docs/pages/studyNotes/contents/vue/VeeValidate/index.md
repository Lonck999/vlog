# VeeValidate

vee-validate 是一個專門為 Vue 設計的表單驗證套件。

它能夠幫助你在開發專案時，透過易讀的語法與靈活的方式，快速又簡單地完成表單驗證的功能。

也是用 Vue 的人比較常用的表單驗證套件之一。

你想得到的他幾乎都有，什麼 必填欄位、驗證文字格式、數值格式、電子信箱、密碼長度、密碼是否相符等等......

用他最重要的好處就是不用再自己寫一堆槽狀 if else 來驗證表單。

我們來看如何使用：

## 安裝

```bash
npm install vee-validate
```

## 創建資料夾

```bash
mkdir -p src/utils/vee-validate/index.js
```

## 引入全局

```js
import { createApp } from "vue";
import veeValidate from "@/utils/vee-validate/index.js";

const app = createApp(App);

app.use(veeValidate);

app.mount("#app");
```

## 開始在 index.js 中寫要用到的驗證規則：

(要用些什麼，我會建議你去看看官網，這邊示範幾個常用的)

```js
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage as VeeErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("VeeErrorMessage", VeeErrorMessage);

    // 定義必填
    defineRule("required", required);
    // 定義必填
    defineRule("tos", required);
    // 定義最小值
    defineRule("min", min);
    // 定義最大值
    defineRule("max", max);
    // 定義字母和空格
    defineRule("alpha_spaces", alphaSpaces);
    // 定義電子郵件
    defineRule("email", email);
    // 定義數字最小值
    defineRule("min_value", minValue);
    // 定義數字最大值
    defineRule("max_value", maxValue);
    // 定義確認密碼
    defineRule("password_mismatch", confirmed);
    // 定義不在列表中
    defineRule("excluded", excluded);
    // 定義不在列表中
    defineRule("country_excluded", excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} must be a valid email`,
          min_value: `The field ${ctx.field} is too low`,
          max_value: `The field ${ctx.field} is too high`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}`,
          country_excluded: `Due to restrictions, we do not accept users from this location`,
          password_mismatch: `The password does not match`,
          tos: `You must accept the Terms of Service`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;
        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
```

components 組件裡面常用的有：

- Form 表單，用來包住整個表單
- Field 欄位，用來包住單一個欄位
- defineRule 定義規則，用來定義規則
- ErrorMessage 錯誤訊息，用來顯示錯誤訊息
- configure 配置，用來配置驗證規則，就是自定義錯誤訊息

Composition API 全部有：

- alpha 驗證字母
- alpha_dash 驗證字母和連字符
- alpha_num 驗證字母和數字
- alpha_spaces 驗證字母和空格
- between 驗證數值範圍
- confirmed 驗證確認密碼
- digits 驗證數字
- dimensions 驗證圖片尺寸
- email 驗證電子郵件
- not_one_of 驗證不在列表中
- ext 驗證文件類型
- image 驗證圖片
- one_of 驗證在列表中
- integer 驗證整數
- is 驗證是否為某值
- is_not 驗證是否不為某值
- length 驗證長度
- max 驗證最大值
- max_value 驗證最大值
- mimes 驗證文件類型
- min 驗證最小值
- min_value 驗證最小值
- numeric 驗證數字
- regex 驗證正則表達式
- required 驗證必填
- size 驗證大小
- url 驗證 URL

所有的用法可以自己上官網看。

之後在下方 export default 裡面，我們可以開始寫我們的驗證規則。

然後要你要用的頁面上，因為我們使用的是全域可以不用再引入，使用我們剛剛寫的驗證規則。

```vue
<script setup>
import { reactive } from "vue";
const schema = reactive({
  name: "required|min:3|max:100|alpha_spaces",
  email: "required|min:3|max:100|email",
  age: "required|min_value:18|max_value:100",
  password: "required|min:9|max:100|excluded:password",
  confirm_password: "password_mismatch:@password",
  country: "required|country_excluded:Antarctica",
  tos: "tos",
});
</script>
<template>
  <vee-form
    v-show="tab === 'register'"
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <VeeErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <VeeErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <VeeErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <VeeErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <VeeErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <VeeErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>
```
