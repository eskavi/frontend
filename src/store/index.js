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
      userLevel: '',
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
    setUserLevel(state, level) {
      state.user.userLevel = level;
    },
    clearUser(state) {
      state.user.email = '';
      state.user.token = '';
      state.user.userLevel = '';
    },
  },
  // asynchrounous modifications
  actions: {
    sendActionResponse(context, payload) {
      context.commit('setSnackbarMsg', payload);
    },
    async registerNewUser({ commit, dispatch }, newUser) {
      return new Promise((resolve, reject) => {
        axios
          .post('user/register', newUser)
          .then((res) => {
            commit('setToken', res.data.jwt);
            commit('setEmailAddress', newUser.email);
            dispatch('updateUserLevel');
            resolve('Registered and logged in!');
          })
          .catch((err) => reject(err));
      });
    },
    loginUser({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        axios
          .post('user/login', user)
          .then((res) => {
            commit('setToken', res.data.jwt);
            commit('setEmailAddress', user.email);
            dispatch('updateUserLevel');
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logoutUser({ commit }) {
      return new Promise((resolve) => {
        commit('clearUser');
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
    updateUserLevel({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('user')
          .then((response) => {
            commit('setUserLevel', response.data.userLevel);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
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
