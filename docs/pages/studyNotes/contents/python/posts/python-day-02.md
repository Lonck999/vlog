---
title: "Python-Day-02：四種基本資料型態與轉型"
date: "2026-11-03"
tags: ["Python", "自學筆記", "心得"]
generated: true
---

# Python-Day-02：四種基本資料型態與轉型
第二天學資料型態。Python 最基本的資料型態有四種：

| 型態 | 名稱 | 例子 |
|---|---|---|
| `str` | 字串 | `"Hello"`、`"123"` |
| `int` | 整數 | `30`、`1_000` |
| `float` | 浮點數（小數） | `3.1415962` |
| `bool` | 布林值 | `True`、`False` |

要確認一個值是什麼型態，可以用 `type()` 印出來。

## str：字串

字串就是放在引號裡面的值。**不管裡面是數字還是文字，只要在引號裡就是字串。**

```python
print(type("Hello"))   # <class 'str'>
print(type("123"))     # <class 'str'>  ← 看起來是數字，但它是字串
```

雙引號 `" "` 和單引號 `' '` 都可以，效果一樣：

```python
print(type('abc'))     # <class 'str'>
```

## int：整數

整數就是沒有小數點的數字。為了讓寫程式的人好辨別位數，中間可以加 `_` 底線，Python 會直接忽略它。像最常看到的金額 1,000 就可以寫成 `1_000`：

```python
print(1_000)           # 1000
print(type(1_000))     # <class 'int'>
```

⚠️ **不能照金額的習慣寫成 `1,000`**。不會報錯，但結果完全不是你要的：

```python
x = 1,000
print(x)               # (1, 0)
print(type(x))         # <class 'tuple'>
```

逗號在 Python 裡有別的意思，`1,000` 會被當成「1 和 0 兩個值」包在一起。這種錯不會報錯，比報錯更難發現。

## float：浮點數

簡單來說就是有小數點的數字，看到小數點就很好辨識：

```python
print(type(3.1415962))   # <class 'float'>
```

## bool：布林值

布林值只有兩個值：`True` 和 `False`。

🔴 **第一個字母一定要大寫。** 這點跟 JS 不一樣：JS 寫小寫的 `true`／`false`，Python 寫小寫會報錯：

```python
print(true)
# NameError: name 'true' is not defined
```

## 不同型態不能直接接在一起

就像 Day-01 說的，印出來的時候不能用 `+` 把字串跟數字（或其他型態）接在一起：

```python
print("年齡" + 30)
# TypeError: can only concatenate str (not "int") to str
```

要的話有兩種方式。

**第一種：用逗號隔開**，`print()` 會分別印出來，中間自動補一個空格：

```python
print("年齡", 30)            # 年齡 30
```

**第二種：改變資料型態**，把它轉成同一種再接：

```python
print("年齡" + str(30))      # 年齡30
```

## 轉型的四個函式

| 函式 | 轉成 | 例子 | 結果 |
|---|---|---|---|
| `int()` | 整數 | `int("30")` | `30` |
| `float()` | 浮點數（小數） | `float("3.5")` | `3.5` |
| `str()` | 字串 | `str(30)` | `"30"` |
| `bool()` | 布林值 | `bool(1)` | `True` |

轉型時有幾個要小心的地方：

```python
int(3.9)        # 3   ← 不是四捨五入，是直接把小數去掉
int("3.14")     # ValueError: invalid literal for int() with base 10: '3.14'
bool("False")   # True  ← 只要不是空字串都是 True
bool("")        # False
bool(0)         # False
```

`int("3.14")` 會報錯，是因為 `int()` 只認得「長得像整數」的字串。帶小數點的字串要先用 `float()` 轉。
