import Vue from 'vue'
import Vuex from 'vuex'

import {mapMutations} from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'

import VueLazyload from 'vue-lazyload'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'
import vueHeadful from 'vue-headful'

import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

import axios from 'axios'
import VueAxios from 'vue-axios'

import PerfectScrollbar from "vue2-perfect-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

const  PROTOCOL = window.location.protocol,
  PORT = (PROTOCOL === 'http:')? process.env.VUE_APP_SERVER_PORT : process.env.VUE_APP_SERVER_PORT_SSL,
  HOST = process.env.VUE_APP_CLIENT_HOST_NAME,
  URL = `${PROTOCOL}//${HOST}:${PORT}`// :${PORT}


Vue.config.productionTip =true/////////////////////////////////////////
Vue.config.devtools = true/////////////////////////////////////////
Vue.config.debug = true/////////////////////////////////////////
Vue.config.silent = true/////////////////////////////////////////

Vue.use(VueAxios, axios)  
Vue.use(PerfectScrollbar)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
Vue.use(new VueSocketIO({
  // debug: falses,
  connection: SocketIO(URL),
  vuex: {
    store,
    // actionsPrefix: "socket_",
    // gettersPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  },
  // transports: ['polling', 'websocket'],
  options: { path: "/" }
}))
Vue.component('vue-headful', vueHeadful);

new Vue({
  store,
  router,
  methods: {
    ...mapMutations({
      _response: 'SOCKET_response',
    }),
  },
  created() {
    this._response
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Radio\u00A0ICE\u00A0'
    }
  },
  render: h => h(App)
}).$mount('#app')

// Vue.prototype.$eventBus = new Vue(); // 1способ