import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbarMsg: 'Hello world',
  },
  mutations: {
    // synchronous modifications
    setSnackbarMessage(state, payload) {
      state.snackbarMsg = payload;
    },
  },
  actions: {
    // asynchrounous modifications
  },
  modules: {},
  getters: {
    getSnackbarMsg(state) {
      return state.snackbarMsg;
    },
  },
});
