import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
// axios setup
Vue.prototype.$http = axios;
axios.defaults.baseURL = process.env.API_URL || 'http://localhost:5000/api';

// create vue instance
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
