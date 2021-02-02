import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    snackbarMsg: 'Hello world',
    user: {
      email: '',
      token: '',
    },
  },
  mutations: {
    // synchronous modifications
    setSnackbarMsg(state, payload) {
      state.snackbarMsg = payload;
    },
    setToken(state, token) {
      state.user.token = token;
    },
    setEmailAddress(state, email) {
      state.user.email = email;
    },
  },
  // asynchrounous modifications
  actions: {
    //
    sendActionResponse(context, payload) {
      context.commit('setSnackbarMsg', payload);
    },
    async loginUser({ dispatch }, user) {
      const response = await axios.post('user/login', user);

      dispatch('attemptAuthentication', response.data.jwt);
    },
    // should check whether the provided token is valid as well and sets email
    async attemptAuthentication({ commit }, token) {
      commit('setToken', token);
      try {
        const response = await axios.get('user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit('setEmailAddress', response.data.user.email);
      } catch (e) {
        console.log('Failed.');
      }
    },
  },
  modules: {},
  getters: {
    getSnackbarMsg(state) {
      return state.snackbarMsg;
    },
    getUserToken(state) {
      return state.user.token;
    },
  },
});
