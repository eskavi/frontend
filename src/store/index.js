import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    dataTypes: '',
    snackbarMsg: 'Hello world',
    user: {
      email: '',
      token: '',
    },
  },
  plugins: [createPersistedState()],
  mutations: {
    // synchronous modifications
    setDataTypes(state, payload) {
      state.dataTypes = payload;
    },
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
        console.log(newUser);
        axios
          .post('user/register', newUser)
          .then((res) => {
            this.commit('setToken', res.data.jwt);
            this.commit('setEmailAddress', newUser.email);
            console.log(res);
            resolve('Registered and logged in!');
          })
          .catch((err) => reject(err));
      });
    },
    loginUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        console.log(user);
        axios
          .post('user/login', user)
          .then((res) => {
            commit('setToken', res.data.jwt);
            commit('setEmailAddress', user.email);
            resolve(res);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    logoutUser({ commit }) {
      return new Promise((resolve) => {
        commit('setToken', '');
        commit('setEmailAddress', '');
        resolve();
      });
    },
    fetchDataTypes() {
      return new Promise((resolve, reject) => {
        // TODO implement state check for less backend calls
        axios
          .get('imp/config/data_types')
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
        // else {
        //  resolve({ data: { data_types: this.data_types } });
        // }
      });
    },
  },
  modules: {},
  getters: {
    getDataTypes(state) {
      return state.dataTypes;
    },
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
