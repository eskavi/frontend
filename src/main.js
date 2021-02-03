import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
// axios setup
Vue.prototype.$http = axios;
/* TODO, find out where to set the token properly
const token = this.$store.getters.getUserToken;
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
} */
// setting axios base URL
// TO-DO insert our HTML/ link to config
axios.defaults.baseURL = 'http://localhost:5000/api';

// create vue instance
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
