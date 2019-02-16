import Vue from 'vue';
import './plugins/vuetify';
import Wrapper from './layouts/Wrapper.vue';
import store from './store';
import AlertChime from './plugins/alert_chime.js';

import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(AlertChime);

new Vue({
  store,
  router,
  render: h => h(Wrapper)
}).$mount('#app');
