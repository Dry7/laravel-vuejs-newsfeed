import Vue from 'vue';
import VueRx from 'vue-rx';
import vueDebounce from 'vue-debounce';
import VueVirtualScroller from 'vue-virtual-scroller';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.config.productionTip = false;

Vue.use(VueRx);
Vue.use(vueDebounce);
Vue.use(VueVirtualScroller);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
