import Vue from 'vue';
import VueRx from 'vue-rx';
import vueDebounce from 'vue-debounce';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueRx);
Vue.use(vueDebounce);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
