import Vue from 'vue';
import store from './store/index';
import { apolloProvider } from './vue-apollo';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import router from './router';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
