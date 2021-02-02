import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    snackbarMsg: 'Hello world',
  },
  mutations: {
    // synchronous modifications
    setSnackbarMsg(state, payload) {
      state.snackbarMsg = payload;
    },
  },
  actions: {
    // asynchrounous modifications
    sendActionResponse(context, payload) {
      context.setSnackbarMsg(payload);
    },
  },
  modules: {},
  getters: {
    getSnackbarMsg(state) {
      return state.snackbarMsg;
    },
  },
});
