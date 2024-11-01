// src/store/plugins/persist.js
export default function createPersistedState() {
  return store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
      // 每次 mutation 之后调用
      // 将状态存储到 localStorage
      localStorage.setItem('store', JSON.stringify(state));
    });

    // 恢复本地存储中的状态
    const savedState = localStorage.getItem('store');
    if (savedState) {
      store.replaceState(Object.assign(store.state, JSON.parse(savedState)));
    }
  };
}