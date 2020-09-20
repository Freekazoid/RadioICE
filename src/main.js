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


const  PROTOCOL = window.location.protocol,
  PORT = (PROTOCOL === 'http:')? process.env.VUE_APP_SERVER_PORT : process.env.VUE_APP_SERVER_PORT_SSL,
  HOST = process.env.VUE_APP_CLIENT_HOST,
  URL = `${PROTOCOL}//${HOST}:${PORT}`

Vue.use(new VueSocketIO({
    debug: false,
    connection: SocketIO(URL),
    vuex: {
      store,
      // actionsPrefix: "socket_",
      // gettersPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: { path: "/" }
  })
)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  //error: 'dist/error.png',
  loading: 'dist/img/load.gif',
  attempt: 1
})
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Vuex)

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false///////////////////////////////

new Vue({
  store,
  router,
  methods: {
    ...mapMutations({
      _response: 'SOCKET_response',
    })
  },
  created() {
    this._response
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Radio ICE'
    }
  },
  render: h => h(App)
}).$mount('#app')