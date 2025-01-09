# 如何讓字體隨著區塊寬度放大縮小？

一般工程師都知道其實字體大小是固定的，而且有些依使用的瀏覽器也會有限制最小字體，

那如何突破最小字體，又或是隨著你的視窗寬度自由去調整減少你寫 RWD 的工作量呢？

這裡有個小方是你可以學起來。

首先！！這裡請先記著兩個東西，一個是 CSS 冷門的屬性 container-type ，另一個就是單位 cqw，

在 CSS 中，container-type 是一個相對較新的概念，用於指定一個元素作為容器的類型。

這個屬性是容器查詢功能的一部分，容器查詢是一種允許開發者根據容器本身的尺寸（而不是整個視窗的尺寸）來應用樣式的技術。

這意味著，使用容器查詢，開發者可以創建更加靈活和響應式的布局，這些布局可以根據父容器的尺寸改變而自動調整內部元素的樣式。

container-type

要使用容器查詢，首先需要在父容器上指定 container-type 屬性。

這個屬性告訴瀏覽器該元素是一個容器，並且它可以定義容器的行為模式，比如是基於尺寸還是基於其他類型的查詢。

cqw 單位

cqw 表示容器查詢寬度占比，1cqw 等於容器寬度的 1%

使用方法

```css
<style>
      div {
        width: 500px;
        height: 600px;
        resize: both;
        overflow: hidden;
        padding: 15px;
        background-color: aquamarine;
        container-type: inline-size;
      }

      div p{
          font-size: 5cqw;
      }
</style>
```
