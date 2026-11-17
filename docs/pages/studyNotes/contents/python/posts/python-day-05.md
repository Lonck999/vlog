---
title: "Python-Day-05：for 迴圈與 range"
date: "2026-11-17"
tags: ["Python", "自學筆記", "心得"]
generated: true
---

# Python-Day-05：for 迴圈與 range
今天學的是 Python 的 `for`。用法其實跟 JS 的 `for` 差不多，就是**把一個範圍裡的東西從頭跑到尾，每一個都做一次同樣的動作**，只是寫法更簡潔。

例如要跑 1 到 10，JS 要寫 `x = 1; x < 11; x++` 三段，Python 直接寫一個 `range()` 就好：

```javascript
// JS：起點、條件、每次加多少，三段都要自己寫
for (let x = 1; x < 11; x++) {
  console.log(x)
}
```

```python
# Python：直接講「從 1 跑到 11 之前」
for x in range(1, 11):
    print(x)
# 1
# 2
# ...
# 10
```

## for 的寫法：冒號＋縮排

跟 Day-03 的 `if` 一樣，Python 不用 `( )` 和 `{ }`，靠**冒號**和**縮排**分出要重複做的範圍：

```python
for x in range(3):
    print("要重複的")    # 有縮排 → 在迴圈裡，跑 3 次
print("跑完了")          # 沒縮排 → 迴圈結束後才跑，只跑 1 次
```

⚠️ 漏了冒號：

```python
for x in range(3)
    print(x)
# SyntaxError: expected ':'
```

⚠️ 忘了縮排：

```python
for x in range(3):
print(x)
# IndentationError: expected an indented block after 'for' statement on line 1
```

⚠️ 照 JS 的習慣寫三段式，Python 看不懂：

```python
for (x = 1; x < 11; x++):
    print(x)
# SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?
```

## range 的三種寫法

`range` 最多放三個數字：**開始、結束、每次跳多少**，對應 JS 的三段。

- `range(結束)`：從 0 開始
- `range(開始, 結束)`
- `range(開始, 結束, 間隔)`

```python
for x in range(5):
    print(x, end=" ")      # 0 1 2 3 4

for x in range(1, 11):
    print(x, end=" ")      # 1 2 3 4 5 6 7 8 9 10

for x in range(0, 11, 2):
    print(x, end=" ")      # 0 2 4 6 8 10
```

（`end=" "` 是讓 `print` 不換行、用空白隔開，這樣結果排成一行比較好看。）

對照 JS：

- `range(5)` ＝ `for (let x = 0; x < 5; x++)`
- `range(1, 11)` ＝ `for (let x = 1; x < 11; x++)`
- `range(0, 11, 2)` ＝ `for (let x = 0; x < 11; x += 2)`

## 包頭不包尾

🔴 `range` 跟 Day-04 的切片、`randrange` 一樣，**包含開始、不包含結束**。所以要跑到 10，結束要寫 **11**。

⚠️ 不會報錯但結果錯的陷阱：想跑 1 到 10 卻寫成 `range(1, 10)`，**10 永遠跑不到**，程式照跑、只是少一次：

```python
for x in range(1, 10):
    print(x, end=" ")      # 1 2 3 4 5 6 7 8 9  ← 沒有 10
```

記法：JS 寫的是 `x < 11`，`range` 的結束就是那個 `<` 後面的數字。

## 倒著數

JS 的 `x--`，在 Python 是把間隔寫成**負數**：

```javascript
// JS
for (let x = 10; x > 0; x--) {
  console.log(x)
}
```

```python
# Python
for x in range(10, 0, -1):
    print(x, end=" ")      # 10 9 8 7 6 5 4 3 2 1
```

結束一樣不包含，所以要數到 1，結束寫 `0`。

⚠️ 不會報錯但結果錯的陷阱：開始比結束大、卻忘了寫 `-1`，**迴圈一次都不跑**，也不會有任何提示：

```python
for x in range(5, 1):
    print(x)
print("跑完了")
# 跑完了      ← 上面的 print(x) 一次都沒執行
```

## range 不能放小數、間隔不能是 0

JS 可以寫 `x += 0.1`，Python 的 `range` 只吃整數：

```python
for x in range(0, 1, 0.1):
    print(x)
# TypeError: 'float' object cannot be interpreted as an integer
```

間隔寫 0 也會報錯（JS 寫 `x += 0` 會變成跑不完的無窮迴圈，Python 直接擋下來）：

```python
for x in range(1, 11, 0):
    print(x)
# ValueError: range() arg 3 must not be zero
```

## range 印出來不是一串數字

`range` 只記住「從哪到哪、跳多少」，不會真的先把數字全部列出來。直接 `print` 看不到內容，要看的話用 `list()` 轉：

```python
print(range(5))          # range(0, 5)
print(list(range(5)))    # [0, 1, 2, 3, 4]
```

## 常見用法：累加

迴圈外面先放一個 0，每跑一次就加進去。算 1 加到 100：

```python
total = 0
for x in range(1, 101):
    total += x
print(total)             # 5050
```

⚠️ `total = 0` 要放在**迴圈外面**。放進迴圈裡的話，每一圈都會被歸零，最後只剩最後一個數字。

## 不只 range：list、字串也能直接跑

`for` 後面不一定要接 `range`，list 和字串都可以直接一個一個拿出來：

```python
for c in "貓咪":
    print(c)
# 貓
# 咪
```

（list 的用法在 Day-04 寫過：`for f in fruits:`，要號碼就用 `enumerate`。）

🔴 **JS 的 `for...in` 跟 Python 的 `for...in` 拿到的東西不一樣：**

```javascript
// JS：for...in 拿到的是「號碼」，而且是字串
const fruits = ["蘋果", "香蕉", "芭樂"]
for (const f in fruits) {
  console.log(f, typeof f)
}
// 0 string
// 1 string
// 2 string
```

```python
# Python：for...in 拿到的是「值」，等於 JS 的 for...of
fruits = ["蘋果", "香蕉", "芭樂"]
for f in fruits:
    print(f)
# 蘋果
# 香蕉
# 芭樂
```

照 JS 的習慣以為拿到的是號碼、拿去寫 `fruits[f]`，Python 會報錯，因為 `f` 已經是「蘋果」了：

```python
fruits = ["蘋果", "香蕉", "芭樂"]
for f in fruits:
    print(fruits[f])
# TypeError: list indices must be integers or slices, not str
```

也可以寫成 `range(len(fruits))` 拿號碼，結果跟 JS 的傳統 for 一樣：

```python
fruits = ["蘋果", "香蕉", "芭樂"]
for i in range(len(fruits)):
    print(i, fruits[i])
# 0 蘋果
# 1 香蕉
# 2 芭樂
```

但同時要號碼跟值的話，用 `enumerate` 比較簡潔。

## 在迴圈裡改 x，不會影響下一圈

⚠️ 不會報錯但結果不一樣的地方：JS 在迴圈裡改 `i`，**會影響下一圈**；Python 每一圈都會從 `range` 重新拿下一個數字，改了也沒用：

```javascript
// JS：改成 100，下一圈 i++ 變 101，不符合 i < 3，直接結束
for (let i = 0; i < 3; i++) {
  console.log(i)
  i = 100
}
// 0
```

```python
# Python：改成 100 也沒用，下一圈照樣拿 1、2
for i in range(3):
    print(i)
    i = 100
# 0
# 1
# 2
```

JS 那種「中途改 i 來控制迴圈」的寫法，在 Python 的 `for` 裡沒有作用。

## 迴圈結束後，x 還在

JS 用 `let` 寫的 `x`，迴圈結束就不見了；Python 的 `x` 會留著最後一圈的值：

```python
for x in range(3):
    pass                 # pass 是「什麼都不做」，佔位用
print(x)                 # 2
```

## for 小整理

- 寫法：`for 變數 in 範圍:`，下一行要縮排
- `range(結束)`：從 0 開始
- `range(開始, 結束)`：包頭不包尾，要到 10 就寫 11
- `range(開始, 結束, 間隔)`：間隔可以是負數（倒著數），不能是 0、不能是小數
- 開始比結束大又沒寫負數間隔 → 一次都不跑，也不會報錯
- `for` 也能直接跑 list、字串；Python 的 `for...in` ＝ JS 的 `for...of`（拿到值，不是號碼）
- 在迴圈裡改變數，不會影響下一圈
