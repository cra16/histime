// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
 
const VueSession = require('vue-session');
const VueCookies = require('vue-cookies')

Vue.use(VueSession)
Vue.use(VueCookies)
Vue.use(VueClipboard)
Vue.use(Notifications)


Vue.prototype.$http = axios
Vue.prototype.$EventBus = new Vue();
Vue.config.productionTip = false
Vue.config.keyCodes.f5 = 116
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
