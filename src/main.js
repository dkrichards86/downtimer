import 'promise-polyfill/src/polyfill';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import Wrapper from './layouts/Wrapper.vue';
import store from './store';
import AlertChime from './plugins/alert_chime.js';
import NativeNotification from './plugins/native_notification';

import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(AlertChime);
Vue.use(NativeNotification);
Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#34495E',
  },
});

new Vue({
  store,
  router,
  render: h => h(Wrapper)
}).$mount('#app');
