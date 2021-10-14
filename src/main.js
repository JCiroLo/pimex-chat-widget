import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from '@/lib/firebase'
import tracking from '@/plugins/track'

window.db = firebase.db
window.firestore = firebase.firestore

Vue.config.productionTip = false

Vue.use(tracking)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
