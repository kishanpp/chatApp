import Vue from 'vue'
import VueSession from 'vue-session'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import VueSessionStorage from 'vue-sessionstorage'
import VueCookies from 'vue-cookies'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VuejsDialog from 'vuejs-dialog';
import Vue2TouchEvents from 'vue2-touch-events'
import Vuelidate from 'vuelidate'
//import VSwitch from 'v-switch-case'



//import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
 
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';


//import VueSocketio from 'vue-socket.io-extended';
//import openSocket from 'socket.io-client';
//import VueSocketIO from 'vue-socket.io';


// Tell Vue to install the plugin.
Vue.use(VuejsDialog);
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.use(VueSession, {persist : true})
//Vue.use(VueSessionStorage)
Vue.use(Vue2TouchEvents)
Vue.use(Vuelidate)
//Vue.use(VSwitch)

// global
//Vue.use(window.vuelidate.default)

import App from './App.vue'
import store from './store'
import router from './router'


Vue.config.productionTip = false

//window.$ = window.jQuery = require('jquery');

//Vue.use(openSocket)
//export const socket = openSocket(store.state.apiBaseUrl);

//Vue.use(VueSocketIO, socket)
//require ('./assets/vendor/bootstrap/js/bootstrap.min.js')
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';


// Vue.config.errorHandler = function (err, vm, info) {
//   // handle error
//   // `info` is a Vue-specific error info, e.g. which lifecycle hook
//   // the error was found in. Only available in 2.2.0+
//   console.log(`Error: ${err.toString()}\nInfo: ${info}`);
//   console.log(err);
//   console.log(vm);
//   console.log(info);
// }

// Vue.config.warnHandler = function (msg, vm, trace) {
//   // `trace` is the component hierarchy trace
//   console.log(`Warn: ${msg}\nTrace: ${trace}`);
//   console.log(msg);
//   console.log(vm);
//   console.log(trace);
// }



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
