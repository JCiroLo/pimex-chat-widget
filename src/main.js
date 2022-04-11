import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import App from './App.vue'
import router from './router'
import firebase from '@/lib/firebase'
import tracking from '@/plugins/track'

window.db = firebase.db
window.firestore = firebase.firestore

Vue.config.productionTip = false

Vue.use(tracking)
Vue.use(
  new VueSocketIO({
    connection: SocketIO('https://socket.pimex.services/')
  })
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
