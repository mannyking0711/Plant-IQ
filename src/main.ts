/** Vue main script */
import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';

import router from '@/router';
import store from '@/store';
import teleport from '@logue/vue2-helpers/teleport';

import '@/assets/tailwindcss.css';
import '@/assets/scss/main.scss';
import '@/assets/main.css';

import App from '@/App.vue';

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

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

const vue = new Vue({
  router,
  store,
  render: h => h(App),
});

// Run!
router
  .isReady()
  .then(() => {
    vue.$mount('#app');
  })
  .catch(e => console.error(e));
