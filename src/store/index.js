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
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common.Authorization = null;
      }
    },
    setEmailAddress(state, email) {
      state.user.email = email;
    },
  },
  // asynchrounous modifications
  actions: {
    sendActionResponse(context, payload) {
      context.commit('setSnackbarMsg', payload);
    },
    async registerNewUser(commit, newUser) {
      return new Promise((resolve, reject) => {
        axios
          .post('user/register', newUser)
          .then((res) => {
            this.commit('setToken', res.data.jwt);
            resolve('Registered and logged in!');
          })
          .catch((err) => reject(err));
      });
    },
    loginUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios
          .post('user/login', user)
          .then((res) => {
            console.log(res.data.jwt);
            commit('setToken', res.data.jwt);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    logoutUser({ commit }) {
      return new Promise((resolve) => {
        commit('setToken', '');
        commit('setEmailAddress', '');
        resolve();
      });
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
    isAuthenticated(state) {
      return state.user.token && state.user.email;
    },
  },
});
