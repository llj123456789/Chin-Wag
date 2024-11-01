import { createStore } from 'vuex';
import createPersistedState from './plugins/persist';

export default  createStore({
  state: {

    account:'',
    headUrl:'',
    mem:'',
    isRoot:'',
    temp:'',
  },
  mutations: {
    setUser(state, data) {
      state.account=data.account;
      state.headUrl=data.headUrl;
      state.mem=data.mem;
      state.isRoot=data.isRoot;
      state.temp=data.temp;
      
    },
    setHistory(state, data) {
      state.messages=data.messages;
    },
    clearUser(state) {
        state.account='';
        state.headUrl='';
        state.mem='';
        state.isRoot='';
        state.temp='';
        
    }
  },
  actions: {
    login({ commit }, data) {
      commit('setUser', data);
    },
    history({ commit }, data) {
      commit('setHistory', data);
    },
    logout({ commit }) {
      commit('clearUser');
    }
  },
  plugins: [createPersistedState()],
});

