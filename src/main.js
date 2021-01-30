import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
// axios setup
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}
// create vue instance
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
