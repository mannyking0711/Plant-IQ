/** Vue main script */
import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Highcharts from 'highcharts';
import HighchartsStockModule from 'highcharts/modules/stock';
import HighchartsVue from 'highcharts-vue';
import Notifications from 'vue-notification'

import router from '@/router';
import teleport from '@logue/vue2-helpers/teleport';

import '@/assets/tailwindcss.css';
import '@/assets/scss/main.scss';
import '@/assets/main.css';

import App from '@/App.vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

Vue.config.productionTip = false;
Vue.component('Teleport', teleport);
Vue.filter('date_format', (value: Date) => {
  const year = value.getFullYear();
  const month = value.getMonth();
  const day = value.getDay();
  return `${year}/${month}/${day}`;
});
Vue.filter('time_format', (value: Date) => {
  const hour = value.getHours();
  const min = value.getMinutes();
  const sec = value.getSeconds();
  return `${hour}:${min}:${sec}`;
});

// Bootstrap Config
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
// Notification Config
Vue.use(Notifications);

// Chart Config
HighchartsStockModule(Highcharts);
Vue.use(HighchartsVue);

// Pinia Config - Vuex Alternative
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

const vue = new Vue({
  router,
  render: h => h(App),
  pinia,
});

// Run!
router
  .isReady()
  .then(() => {
    vue.$mount('#app');
  })
  .catch(e => console.error(e));
