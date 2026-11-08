---
title: "Python-Day-03：if 條件判斷"
date: "2026-11-08"
tags: ["Python", "自學筆記", "心得"]
generated: true
---

# Python-Day-03：if 條件判斷
今天學 `if`。觀念跟 JS 一樣，就是「**如果……那……**」。說白話一點：**如果成績不及格，那就會被當。**

```python
score = 55
if score < 60:
    print("被當")      # 被當
```

觀念相同，只是寫法不同，有幾個要注意的小地方。

## 冒號與縮排：Python 沒有 `( )` 和 `{ }`

JS 的條件要用 `( )` 包起來，要執行的內容用 `{ }` 包起來。Python 兩個都不用：

- 條件後面加**冒號 `:`**
- 要執行的內容**往內縮排**（通常是 4 個空格），縮排的那幾行就是同一塊

```javascript
// JS
if (score >= 60) {
  console.log("及格")
  console.log("恭喜")
}
console.log("結束")
```

```python
# Python
score = 50
if score >= 60:
    print("及格")      # 有縮排 → 屬於 if
    print("恭喜")      # 有縮排 → 屬於 if
print("結束")          # 沒縮排 → 不管條件成不成立都會執行
# 結束
```

⚠️ 漏了冒號或忘了縮排，都會報錯：

```python
if score < 60          # SyntaxError: expected ':'
    print("被當")
```

```python
if score < 60:
print("被當")          # IndentationError: expected an indented block after 'if' statement on line 1
```

🔴 在 JS 裡縮排只是為了好看，**在 Python 裡縮排決定哪幾行屬於 `if`**。縮錯位置不一定會報錯，可能只是結果不對。

## if / elif / else

JS 是 `if`、`else if`、`else`，Python 是 `if`、**`elif`**、`else`：

```javascript
// JS
let score = 75
if (score >= 90) {
  console.log("優秀")
} else if (score >= 60) {
  console.log("及格")
} else {
  console.log("被當")
}
// 及格
```

```python
# Python
score = 75
if score >= 90:
    print("優秀")
elif score >= 60:
    print("及格")
else:
    print("被當")
# 及格
```

⚠️ 照 JS 的習慣寫成 `else if` 會報錯：

```python
elif score >= 60:      # ✅
else if score >= 60:   # SyntaxError
```

## if 裡面還有 if（巢狀）

判斷完一個條件，裡面還要再判斷一次，就把 `if` 寫在 `if` 裡面。例如：成績及格之後，還要看缺席有沒有超過 3 次。

JS 是 `{ }` 裡面再包一層 `{ }`：

```javascript
// JS
let score = 85
let absent = 5
if (score >= 60) {
  if (absent <= 3) {
    console.log("過了")
  } else {
    console.log("成績有到，但缺席太多，還是被當")
  }
} else {
  console.log("被當")
}
// 成績有到，但缺席太多，還是被當
```

Python 是**再往內縮一層**，裡面那個 `if` 的內容縮 8 個空格：

```python
# Python
score = 85
absent = 5
if score >= 60:
    if absent <= 3:
        print("過了")
    else:
        print("成績有到，但缺席太多，還是被當")
else:
    print("被當")
# 成績有到，但缺席太多，還是被當
```

🔴 **`else` 屬於哪一個 `if`，看它跟誰對齊。** JS 靠 `{ }` 分，Python 只看縮排。上面那段如果少了裡面的 `else`，外面的 `else` 只會跟外層的 `if` 對齊：

```python
score = 85
absent = 5
if score >= 60:
    if absent <= 3:
        print("過了")
else:              # 跟外層 if 對齊 → 只有不及格才會進來
    print("被當")
# （什麼都沒印）
```

及格但缺席太多，兩個 `print` 都不會執行，**不會報錯，就是什麼都沒印**。

## 和、或、不：and / or / not

JS 用符號 `&&`、`||`、`!`，Python 直接用白話的英文單字：

- **和**（兩個都要成立）：JS `&&` → Python `and`
- **或**（其中一個成立就好）：JS `||` → Python `or`
- **不**（反過來）：JS `!` → Python `not`

```python
score = 85
absent = 2
if score >= 60 and absent <= 3:
    print("過了")            # 過了

is_member = False
total = 1200
if is_member or total >= 1000:
    print("免運")            # 免運

if not is_member:
    print("尚未加入會員")      # 尚未加入會員
```

⚠️ 在 Python 裡寫 JS 的符號，三個都會報錯：

```python
if score >= 60 && absent <= 3:   # SyntaxError: invalid syntax
if is_member || total >= 1000:   # SyntaxError: invalid syntax
if !is_member:                   # SyntaxError: invalid syntax
```
