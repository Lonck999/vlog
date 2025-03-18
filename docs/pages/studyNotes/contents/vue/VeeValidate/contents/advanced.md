# 更全面的驗證

## 安裝

```bash
npm install vee-validate
```

安裝完 VeeValidate 後，雖然，我們已經有許多驗證規則可以使用，但有時候我們可能需要更多的驗證規則，這時候我們就需要安裝 `vee-validate/rules` 來擴充驗證規則。

```bash
npm install vee-validate/rules
```

如果你還有語言驗證的需求，可以安裝 `vee-validate/i18n` 來擴充語言驗證。

```bash
npm install vee-validate/i18n
```

安裝完之後，我們就可以開始使用 VeeValidate 的驗證規則了，有兩種引入方式：

1. 全域引入

main.js

```js
import { createApp } from "vue";
// 這是 VeeValidate 的基礎功能
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
// 這是 VeeValidate 的擴充功能
import AllRules from "@vee-validate/rules";
// 這是 VeeValidate 的語言擴充功能
import { localize, setLocale } from "@vee-validate/i18n";
// 如果需要擴充語言，可以引入
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

import App from "./App.vue";

// 使用 Object.keys 加入全部規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 指欄位輸入內容時，會立即進行驗證（即邊寫邊判斷）
});

// *設定預設語系
setLocale("zh_TW");

const app = createApp(App);

app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
```

App.vue

```vue
<script setup></script>

<template>
  <div>
    <VForm>
      <!-- 表單欄位 rules 屬性，可以傳入多個驗證規則，用 | 分隔，required 是必填，email 是 email 格式 -->
      <VField name="email" type="email" rules="required|email" />
      <!-- 錯誤訊息 -->
      <ErrorMessage name="email" />
    </VForm>
  </div>
</template>

<style scoped></style>
```

2. 局部引入

```js
<script setup>
import {
  Field as VField, Form as VForm, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');
</script>

<template>
  <VForm>
    <VField
      name="email"
      type="email"
      rules="required|email"
    />
    <ErrorMessage name="email"/>
  </VForm>
</template>

<style scoped>

</style>

```
