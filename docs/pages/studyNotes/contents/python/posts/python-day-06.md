---
title: "Python-Day-06：while 迴圈與函式"
date: "2026-11-24"
tags: ["Python", "自學筆記", "心得"]
generated: true
---

# Python-Day-06：while 迴圈與函式
今天學了兩個東西：`while` 和函式。

- **while**：跟 Day-05 的 `for` 一樣是重複做事，差別在 `for` 是「**跑完一個範圍**」，`while` 是「**條件成立就一直做，直到條件不成立才停**」。不知道要跑幾次的時候用它。
- **函式**：把一段常用的程式包起來、取個名字，之後叫名字就能重複使用。對應 JS 的 `function`。

## while 迴圈

```javascript
// JS
let x = 1
while (x <= 3) {
  console.log(x)
  x++
}
```

```python
# Python
x = 1
while x <= 3:
    print(x)
    x += 1
# 1
# 2
# 3
```

### while 的寫法：冒號＋縮排

跟 `if`、`for` 一樣，條件不用括號，靠**冒號**和**縮排**分出要重複的範圍。

⚠️ 漏了冒號：

```python
x = 0
while x < 3
    print(x)
# SyntaxError: expected ':'
```

⚠️ 忘了縮排：

```python
x = 0
while x < 3:
print(x)
# IndentationError: expected an indented block after 'while' statement on line 2
```

### Python 沒有 `x++`

JS 習慣寫 `x++`，Python 不能這樣寫，要寫 `x += 1`：

```python
x = 0
x++
# SyntaxError: invalid syntax
```

### 🔴 忘了改變數：無限迴圈

`while` 最常踩的雷。條件裡的變數在迴圈裡**沒有被改到**，條件就永遠成立，程式會一直跑、不會停，也不會報錯：

```python
x = 1
while x <= 3:
    print(x)
    # 忘了寫 x += 1 → 一直印 1，停不下來
```

卡住的時候按 `Ctrl + C` 強制停止，會看到：

```
KeyboardInterrupt
```

記法：寫 `while` 時先問自己「**哪一行會讓條件變成不成立？**」找不到那一行，就是無限迴圈。

⚠️ 不會報錯但結果錯的陷阱：`x += 1` 縮排錯了、寫在迴圈外面，一樣是無限迴圈：

```python
x = 1
while x <= 3:
    print(x)
x += 1      # 沒縮排 → 不在迴圈裡，永遠輪不到它
```

### break：中途跳出

`while True:` 是「永遠成立」，一定要搭配 `break` 才出得來。適合「**做到某件事成功才停**」，例如一直問密碼直到答對：

```python
while True:
    pw = input("密碼：")
    if pw == "1234":
        print("登入成功")
        break
    print("錯了，再試一次")
```

```
密碼：0000
錯了，再試一次
密碼：1234
登入成功
```

`break` 在 `for` 裡也能用，用法跟 JS 一樣。

### continue：跳過這一圈

`continue` 是「這一圈後面的不做了，直接進下一圈」。印 1～10 的奇數：

```python
x = 0
while x < 10:
    x += 1
    if x % 2 == 0:
        continue
    print(x, end=" ")
# 1 3 5 7 9
```

⚠️ 不會報錯但結果錯的陷阱：`continue` 會跳過它**後面**的程式。如果 `x += 1` 放在 `continue` 後面，遇到偶數就再也加不到 → 無限迴圈：

```python
x = 0
while x < 10:
    if x % 2 == 0:
        continue    # x 是 0 → 跳回去 → x 還是 0 → 永遠停在這裡
    print(x)
    x += 1
```

所以用 `continue` 時，**改變數的那行要放在 `continue` 前面**。

### Python 沒有 do...while

JS 的 `do { ... } while (條件)` 是「先做一次再判斷」，Python 沒有這個寫法：

```python
do {
} while (x < 3)
# SyntaxError: invalid syntax
```

要先做一次再判斷，就用上面的 `while True:` ＋ `break`（問密碼那個例子就是：一定先問一次）。

### for 和 while 怎麼選

- **知道要跑幾次、或要跑完一個 list／range** → `for`
- **不知道要跑幾次，要等某個條件發生** → `while`

1 加到 100 兩種都寫得出來，但 `for` 比較不會出錯（不用自己記得 `+1`）：

```python
total = 0
for x in range(1, 101):
    total += x
print(total)    # 5050

total = 0
x = 1
while x <= 100:
    total += x
    x += 1
print(total)    # 5050
```

### while 小整理

- 寫法：`while 條件:`，下一行要縮排
- 條件成立就一直做，**一定要有一行讓條件變成不成立**，不然是無限迴圈（`Ctrl + C` 停止）
- 沒有 `x++`，要寫 `x += 1`
- `while True:` 一定要搭配 `break`
- `continue` 跳過後面的程式，改變數的那行要放在它前面
- 沒有 `do...while`，用 `while True:` ＋ `break` 代替

## 函式

```javascript
// JS
function add(a, b) {
  return a + b
}
console.log(add(3, 5))    // 8
```

```python
# Python
def add(a, b):
    return a + b

print(add(3, 5))    # 8
```

`function` 換成 `def`，大括號換成**冒號＋縮排**。

⚠️ 漏了冒號：

```python
def hi()
    print("hi")
# SyntaxError: expected ':'
```

### 參數和 return

- **參數**：呼叫時丟進去的東西（`a`、`b`）
- **return**：把結果丟回來給呼叫的地方

```python
def area(w, h):
    return w * h

result = area(3, 4)
print(result)    # 12
```

`return` 執行完，函式就結束了，後面的程式不會跑：

```python
def check(score):
    if score >= 60:
        return "及格"
    return "不及格"

print(check(75))    # 及格
print(check(40))    # 不及格
```

### 🔴 沒寫 return，拿到的是 None

不會報錯但結果錯的陷阱：函式裡用 `print` 印出來，跟用 `return` 回傳，**看起來一樣，其實不一樣**。

```python
def add(a, b):
    print(a + b)       # 只是印出來，沒有回傳

result = add(3, 5)     # 這行會印出 8
print(result)          # None
```

`add(3, 5)` 畫面上有印出 8，所以會以為成功了；但 `result` 拿到的是 `None`（等於 JS 的 `undefined`）。之後拿它去算就會出事：

```python
def add(a, b):
    print(a + b)

total = add(3, 5) + 1
# 8（函式裡的 print 先印出來）
# TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'
```

記法：**要拿結果去用，就要 `return`；`print` 只是給人看的。**

### 參數個數要對

JS 少給參數會變成 `undefined`、多給會被忽略，**都不會報錯**。Python 會直接擋下來：

```python
def add(a, b):
    return a + b

add(1)
# TypeError: add() missing 1 required positional argument: 'b'
```

```python
def add(a, b):
    return a + b

add(1, 2, 3)
# TypeError: add() takes 2 positional arguments but 3 were given
```

### 預設值

參數可以給預設值，沒傳的時候就用它（跟 JS 一樣）：

```python
def greet(name="朋友"):
    print(f"嗨，{name}")

greet("小明")    # 嗨，小明
greet()          # 嗨，朋友
```

有好幾個參數時，也可以**指定名字**傳，順序就不重要了：

```python
def intro(name, age):
    print(f"{name} {age} 歲")

intro(age=30, name="小明")    # 小明 30 歲
```

⚠️ 有預設值的參數要放**後面**，放前面會報錯：

```python
def greet(name="朋友", times):
    pass
# SyntaxError: non-default argument follows default argument
```

### 先定義，才能呼叫

JS 的 `function` 寫在下面，上面也叫得到；Python 是**由上往下執行**，還沒跑到 `def` 那行，就不認得這個名字：

```python
hello()

def hello():
    print("hi")
# NameError: name 'hello' is not defined. Did you mean: 'help'?
```

所以 `def` 一律寫在呼叫之前。

### 函式裡的變數，外面拿不到

函式裡建立的變數只在函式裡有效，跟 JS 一樣：

```python
def f():
    y = 1

f()
print(y)
# NameError: name 'y' is not defined
```

### 🔴 函式裡不能直接改外面的變數

這點跟 JS **不一樣**。JS 在函式裡可以直接改外面的 `let count`；Python 照寫會報錯：

```javascript
// JS：可以
let count = 0
function plus() {
  count += 1
}
plus()
console.log(count)    // 1
```

```python
# Python：不行
count = 0

def plus():
    count += 1

plus()
# UnboundLocalError: cannot access local variable 'count' where it is not associated with a value
```

原因：Python 看到函式裡有 `count = ...`（`+=` 也算），就把 `count` 當成**函式自己的新變數**，而這個新變數還沒有值就要拿來加，所以報錯。

正確的寫法是**把值傳進去、用 return 拿回來**：

```python
count = 0

def plus(n):
    return n + 1

count = plus(count)
print(count)    # 1
```

### 函式小整理

- 寫法：`def 名字(參數):`，下一行要縮排
- 要拿結果去用就 `return`；`print` 只是印出來，沒 `return` 會拿到 `None`
- `return` 執行完函式就結束
- 參數給太少或太多都會報錯（JS 不會）
- 預設值：`def greet(name="朋友"):`，有預設值的放後面；呼叫時可以用 `name=` 指定
- 先 `def` 才能呼叫
- 函式裡的變數外面拿不到；函式裡不能直接改外面的變數 → 傳進去、`return` 回來
