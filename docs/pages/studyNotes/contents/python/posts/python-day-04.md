---
title: "Python-Day-04：random 隨機與 list 陣列"
date: "2026-11-12"
tags: ["Python", "自學筆記", "心得"]
generated: true
---

# Python-Day-04：random 隨機與 list 陣列
今天學兩個東西：`random` 和陣列（Python 叫 **list**）。

## random 隨機

`random` 說白話一點，就是**讓程式幫我擲骰子、抽籤、洗牌**。

JS 只有一個 `Math.random()`，要擲骰子得自己算；Python 把常用的做法都包好了，直接叫名字就能用。

```javascript
// JS：擲一顆 1~6 的骰子，要自己乘、自己取整數、自己加 1
console.log(Math.floor(Math.random() * 6) + 1)
```

```python
# Python：直接講「1 到 6 之間給我一個整數」
import random
print(random.randint(1, 6))
```

## 先 import 才能用

`random` 不是一開始就能用的，要先把它**匯入**進來。JS 的 `Math` 隨時都在，Python 的 `random` 要自己叫：

```python
import random          # 寫在檔案最上面
print(random.randint(1, 6))
```

⚠️ 忘了 `import` 會報錯：

```python
print(random.randint(1, 6))
# NameError: name 'random' is not defined
```

⚠️ **檔名不要取成 `random.py`。** Python 會先找到你自己的檔案，以為那就是 `random`，結果找不到 `randint`：

```
AttributeError: partially initialized module 'random' has no attribute 'randint' (most likely due to a circular import)
```

錯誤訊息完全沒提到檔名，很難猜到原因。練習檔取成 `random_test.py` 這類名字就好。

## 隨機數字

### randint：整數，頭尾都包含

```python
import random
print(random.randint(1, 6))      # 1、2、3、4、5、6 其中一個
```

🔴 `randint(1, 6)` **會出現 6**。這點跟下面的 `randrange` 不一樣。

### randrange：整數，不包含結尾

跟 `range()` 一樣「**包頭不包尾**」，還可以設定間隔：

```python
print(random.randrange(1, 3))        # 只會是 1 或 2，不會出現 3
print(random.randrange(0, 10, 2))    # 0、2、4、6、8 其中一個（偶數）
```

⚠️ 不會報錯但結果錯的陷阱：想要 1~3 卻寫成 `randrange(1, 3)`，**永遠抽不到 3**。程式照跑，只是少了一個可能。

### random：0 到 1 之間的小數

```python
print(random.random())    # 例如 0.13436424411240122，會 ≥ 0、< 1
```

這個就是 JS 的 `Math.random()`。

### uniform：指定範圍的小數

```python
print(random.uniform(1, 10))    # 例如 3.2956212316547955
```

⚠️ `randint` 只能放整數，放小數會報錯：

```python
random.randint(1.5, 6)
# ValueError: non-integer arg 1 for randrange()
```

要小數就改用 `uniform`。

## 從一堆東西裡挑

### choice：抽一個

```python
fruits = ["蘋果", "香蕉", "芭樂"]
print(random.choice(fruits))    # 例如 香蕉
```

JS 要自己算 index：

```javascript
const fruits = ["蘋果", "香蕉", "芭樂"]
console.log(fruits[Math.floor(Math.random() * fruits.length)])
```

⚠️ 空的清單抽不出東西：

```python
random.choice([])
# IndexError: Cannot choose from an empty sequence
```

### choices 和 sample：抽好幾個，差在會不會重複

- `choices`：**抽完放回去**，同一個可能被抽到好幾次（像擲骰子）
- `sample`：**抽完不放回**，不會重複（像抽獎）

```python
fruits = ["蘋果", "香蕉", "芭樂"]
print(random.choices(fruits, k=5))   # 例如 ['香蕉', '香蕉', '蘋果', '香蕉', '芭樂']
print(random.sample(fruits, k=2))    # 例如 ['香蕉', '芭樂']，兩個一定不一樣
```

⚠️ `sample` 抽的數量不能比總數多，不放回去就不夠抽：

```python
random.sample(["蘋果", "香蕉", "芭樂"], k=5)
# ValueError: Sample larger than population or is negative
```

`choices` 抽 5 個沒問題，因為會放回去。

### shuffle：洗牌

```python
cards = [1, 2, 3, 4, 5]
random.shuffle(cards)
print(cards)      # 例如 [4, 2, 3, 1, 5]
```

🔴 `shuffle` **直接把原本的清單打亂，不會回傳新的清單**。寫成下面這樣不會報錯，但拿到的是 `None`：

```python
cards = [1, 2, 3, 4, 5]
new_cards = random.shuffle(cards)
print(new_cards)    # None
print(cards)        # [4, 2, 3, 1, 5]  ← 被打亂的是原本這個
```

## seed：讓隨機每次都一樣

先給一個 `seed`（種子），之後抽出來的順序就固定了。測試程式、或想重現同一個結果時會用到：

```python
random.seed(42)
print([random.randint(1, 100) for _ in range(3)])   # [82, 15, 4]

random.seed(42)
print([random.randint(1, 100) for _ in range(3)])   # [82, 15, 4]  ← 一模一樣
```

不設 `seed` 的話，每次跑結果都不一樣。JS 的 `Math.random()` 沒辦法設定種子。

⚠️ `random` 的結果是**算出來的**，猜得到規律，不能拿來做密碼或驗證碼。那種要用 `secrets` 模組。

## random 小整理

- 要整數：`randint(頭, 尾)` 頭尾都包含；`randrange(頭, 尾)` 不包含尾
- 要小數：`random()` 是 0~1；`uniform(頭, 尾)` 指定範圍
- 抽一個：`choice`
- 抽好幾個：會重複用 `choices`，不重複用 `sample`
- 洗牌：`shuffle`，直接改原本的清單，回傳 `None`
- 要固定結果：先 `seed`


## list 陣列

JS 叫陣列（array），Python 叫 **list**（串列）。說白話一點，就是**把好幾個東西排成一排，用號碼去拿**。寫法跟 JS 幾乎一樣，都是中括號 `[ ]`：

```python
fruits = ["蘋果", "香蕉", "芭樂"]
print(fruits)        # ['蘋果', '香蕉', '芭樂']
```

裡面可以混放不同型別，跟 JS 一樣：

```python
mix = [1, "a", True, 3.5]
print(mix)           # [1, 'a', True, 3.5]
```

## 用號碼拿：索引從 0 開始

```python
fruits = ["蘋果", "香蕉", "芭樂"]
print(fruits[0])     # 蘋果
print(fruits[-1])    # 芭樂  ← 負數從後面數，-1 是最後一個
print(len(fruits))   # 3
```

和 JS 不一樣的地方：

- **長度**：JS 是 `fruits.length`，Python 是 `len(fruits)`
- **最後一個**：JS 要寫 `fruits[fruits.length - 1]` 或 `fruits.at(-1)`，Python 直接 `fruits[-1]`

⚠️ 照 JS 的習慣寫 `.length` 會報錯：

```python
fruits = ["蘋果", "香蕉", "芭樂"]
print(fruits.length)
# AttributeError: 'list' object has no attribute 'length'
```

🔴 **超出範圍：JS 給 `undefined`，Python 直接報錯。**

```javascript
// JS
const fruits = ["蘋果", "香蕉", "芭樂"]
console.log(fruits[3])    // undefined（不會報錯）
```

```python
# Python
fruits = ["蘋果", "香蕉", "芭樂"]
print(fruits[3])
# IndexError: list index out of range
```

JS 拿到 `undefined` 會繼續往下跑，錯誤要到後面才發現；Python 當場就停下來告訴你。

## 改值

```python
fruits = ["蘋果", "香蕉", "芭樂"]
fruits[1] = "葡萄"
print(fruits)        # ['蘋果', '葡萄', '芭樂']
```

## 切片：一次拿一段

用 `[開始:結束]`，跟 `range` 一樣**包頭不包尾**。JS 要用 `slice()`，Python 直接寫在中括號裡：

```python
fruits = ["蘋果", "香蕉", "芭樂"]
print(fruits[0:2])   # ['蘋果', '香蕉']  ← 0、1，不含 2
print(fruits[1:])    # ['香蕉', '芭樂']  ← 省略結尾 = 拿到最後
print(fruits[:2])    # ['蘋果', '香蕉']  ← 省略開頭 = 從頭開始
```

## 新增

- `append`：加在最後面（JS 的 `push`）
- `insert`：插在指定位置
- `extend`：把另一個 list 的東西一個一個接上去

```python
fruits = ["蘋果", "香蕉"]
fruits.append("西瓜")
print(fruits)        # ['蘋果', '香蕉', '西瓜']

fruits.insert(1, "芒果")
print(fruits)        # ['蘋果', '芒果', '香蕉', '西瓜']

fruits.extend(["奇異果", "鳳梨"])
print(fruits)        # ['蘋果', '芒果', '香蕉', '西瓜', '奇異果', '鳳梨']
```

⚠️ 照 JS 寫 `push` 會報錯：

```python
fruits = ["蘋果"]
fruits.push("香蕉")
# AttributeError: 'list' object has no attribute 'push'
```

⚠️ 不會報錯但結果錯的陷阱：想加兩個東西卻用 `append`，會把**整個 list 當成一個東西**塞進去：

```python
fruits = ["蘋果", "香蕉"]
fruits.append(["西瓜", "芭樂"])
print(fruits)        # ['蘋果', '香蕉', ['西瓜', '芭樂']]  ← 變成 list 裡面有 list
```

要一個一個加就用 `extend`。

## 刪除

- `remove(值)`：刪掉第一個符合的值
- `pop()`：拿走最後一個，並回傳它（JS 的 `pop`）；`pop(0)` 拿走第一個（JS 的 `shift`）
- `del list[位置]`：刪掉指定位置

```python
fruits = ["蘋果", "香蕉", "芭樂", "西瓜"]
fruits.remove("香蕉")
print(fruits)        # ['蘋果', '芭樂', '西瓜']

last = fruits.pop()
print(last, fruits)  # 西瓜 ['蘋果', '芭樂']

first = fruits.pop(0)
print(first, fruits) # 蘋果 ['芭樂']

del fruits[0]
print(fruits)        # []
```

⚠️ 刪不存在的東西會報錯：

```python
fruits = ["蘋果"]
fruits.remove("榴槤")
# ValueError: list.remove(x): x not in list
```

```python
fruits = []
fruits.pop()
# IndexError: pop from empty list
```

## 有沒有在裡面：in

JS 用 `includes()`，Python 用 `in`，直接寫成白話：

```python
fruits = ["蘋果", "香蕉", "芭樂"]
print("香蕉" in fruits)       # True
print("榴槤" in fruits)       # False
print("榴槤" not in fruits)   # True

if "香蕉" in fruits:
    print("有香蕉")            # 有香蕉
```

找位置與數數量：

```python
nums = [1, 2, 2, 3]
print(nums.index(2))   # 1  ← 第一個 2 在哪個位置
print(nums.count(2))   # 2  ← 出現幾次
```

## 一個一個拿出來：for

```python
fruits = ["蘋果", "香蕉", "芭樂"]
for f in fruits:
    print(f)
# 蘋果
# 香蕉
# 芭樂
```

同時要號碼的話用 `enumerate`（JS 的 `forEach((f, i) => ...)`）：

```python
fruits = ["蘋果", "香蕉", "芭樂"]
for i, f in enumerate(fruits):
    print(i, f)
# 0 蘋果
# 1 香蕉
# 2 芭樂
```

## 排序：sort 和 sorted

- `sort()`：**直接改原本的 list**，回傳 `None`
- `sorted()`：**產生一個新的 list**，原本的不動

```python
nums = [3, 1, 2]
nums.sort()
print(nums)          # [1, 2, 3]

nums = [3, 1, 2]
new_nums = sorted(nums)
print(new_nums)      # [1, 2, 3]
print(nums)          # [3, 1, 2]  ← 原本的沒變

nums = [3, 1, 2]
nums.sort(reverse=True)
print(nums)          # [3, 2, 1]  ← 由大到小
```

⚠️ 跟上面 `shuffle` 一樣的陷阱：`sort()` 回傳的是 `None`。

```python
nums = [3, 1, 2]
result = nums.sort()
print(result)        # None
```

🔴 **JS 的 `sort()` 預設把數字當文字排，Python 不會：**

```javascript
// JS
const nums = [10, 1, 2]
nums.sort()
console.log(nums)    // [ 1, 10, 2 ]  ← 當成文字比，"10" 排在 "2" 前面
```

```python
# Python
nums = [10, 1, 2]
nums.sort()
print(nums)          # [1, 2, 10]  ← 照數字大小
```

## 相加與重複

```python
print([1, 2] + [3])   # [1, 2, 3]
print([0] * 3)        # [0, 0, 0]
```

JS 的 `[1, 2] + [3]` 會變成字串 `"1,23"`，Python 是真的把兩個 list 接起來。

## 複製：直接 = 不是複製

🔴 跟 JS 一樣，`b = a` **不是複製，是兩個名字指向同一個 list**。改 `b`，`a` 也跟著變：

```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)             # [1, 2, 3, 4]  ← a 也被改了
```

要真的複製一份，用 `copy()`（JS 的 `[...a]`）：

```python
a = [1, 2, 3]
b = a.copy()
b.append(4)
print(a)             # [1, 2, 3]
print(b)             # [1, 2, 3, 4]
```

## random 搭配 list

上面 random 的 `choice`、`sample`、`shuffle` 都是拿 list 來用的。合在一起做一個抽籤：

```python
import random

names = ["小明", "小華", "小美", "阿強"]
random.shuffle(names)
print(names)             # 例如 ['小美', '阿強', '小明', '小華']
print(names[0], "先上台") # 例如 小美 先上台
```

## list 小整理

- 建立：`[ ]`，裡面什麼型別都能放
- 拿值：`[0]` 從頭數、`[-1]` 從後面數；超出範圍會報錯（JS 給 `undefined`）
- 長度：`len(list)`，不是 `.length`
- 切片：`[開始:結束]`，包頭不包尾
- 新增：`append`（一個）、`insert`（指定位置）、`extend`（接一整串）
- 刪除：`remove`（照值）、`pop`（照位置、會回傳）、`del`
- 檢查：`in`／`not in`
- 排序：`sort()` 改原本的、回傳 `None`；`sorted()` 給新的
- 複製：`copy()`，`b = a` 不是複製
