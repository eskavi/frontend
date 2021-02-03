import axios from 'axios';
import { reject } from 'core-js/fn/promise';
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
    loginUser({ commit }, user) {
      return new Promise((resolve, rej) => {
        axios
          .post('user/login', user)
          .then((res) => {
            commit('setToken', res.data.jwt);
            resolve('Login successful');
          })
          .catch((err) => rej(err));
      });
    },
    // should check whether the provided token is valid as well and sets email
    // TODO Functionality that ensures that handed token is valid, use with actual API
    async attemptAuthentication({ commit }, token) {
      try {
        const response = await axios.get('user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit('setEmailAddress', response.data.user.email);
      } catch (e) {
        console.log('Failed.');
        commit('setToken', null);
        commit('setEmailAddress', null);
      }
    },
    async registerNewUser(context, newUser) {
      const response = await axios.post('user/register', newUser);
      console.log(response);
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
