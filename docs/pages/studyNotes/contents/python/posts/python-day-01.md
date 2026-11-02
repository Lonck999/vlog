---
title: "Python-Day-01：print、input 與變數"
date: "2026-11-01"
tags: ["Python", "自學筆記", "心得"]
generated: true
---

# Python-Day-01：print、input 與變數
第一天學三件事：把東西印出來、讀使用者輸入、宣告變數。因為我原本寫 JS，下面都拿 JS 對照。

## print()：把東西印出來

`print()` 相當於 JS 的 `console.log()`，Debug 時用來看值。

```python
print("Hello" + "World")   # HelloWorld
print("年齡", 30)           # 年齡 30
```

字串可以用 `+` 接起來，但**字串 + 數字會報錯**：

```python
print("年齡" + 30)
# TypeError: can only concatenate str (not "int") to str
```

這點跟 JS 不一樣：JS 的 `"年齡" + 30` 會自動把數字轉成字串，得到 `"年齡30"`；Python 不會自動轉型，直接報錯。

要把文字和數字印在一起，可以用**半形逗號 `,`** 隔開。`print()` 會把每個值分別印出來，中間自動補一個空格，所以上面印出的是 `年齡 30`。

⚠️ 一定要用半形 `,`。打成全形的 `，` 會出現 `SyntaxError: invalid character '，'`。

組合文字還有其他寫法，之後學到再寫。

## input()：讀取使用者輸入

`input()` 相當於 JS 的 `prompt()`，差別是**不會跳出視窗**：程式會停在終端機那一行，等你打字、按 Enter。括號裡可以放提示文字。

```python
name = input("請輸入名字：")   # 終端機顯示「請輸入名字：」，輸入 小明
print("你好", name)            # 你好 小明
```

🔴 **`input()` 拿到的一定是字串**，就算輸入的是數字也一樣：

```python
age = input("請輸入年齡：")   # 輸入 30
print(type(age))              # <class 'str'>
print(age + 1)                # TypeError: can only concatenate str (not "int") to str
```

所以拿到之後要當數字算，得先轉型，例如 `int(age) + 1` 會得到 `31`。

## 變數宣告：直接命名

Python 宣告變數不需要 `var`、`let`、`const`，直接寫名字和值就好：

```javascript
let num = 10   // JS
```

```python
num = 10       # Python
```

至於變數的值很容易被改掉這件事，目前還沒學到，之後的學習日誌再寫。
