# Pinia 和 Vuex 的差異

主要就是 Pinia 是 Vuex 簡化流程的版本，

在 Vuex 中有四個區塊概念，分別是 State、Getters、Mutations、Actions，

- State：狀態，對應 vue 中的 ref()
- Getters：計算屬性，對應 vue 中的 computed
- Mutations：同步操作，只能進行「同步」的狀態（state）修改。
- Actions：能執行「非同步」邏輯，結束後再呼叫 mutation 來改變 state。

在 Pinia 中，只有三個區塊概念，分別是 State、Actions、Getters，

- State：狀態，對應 vue 中的 ref()
- Actions：非同步操作，對應 vue 中的 methods
- Getters：計算屬性，對應 vue 中的 computed

在後來 Vue3 開始提倡 Composition API 後，大部分都使用 Pinia 來取代 Vuex，沒有像 Vuex 那樣嚴格區分「同步、非同步」更新。
