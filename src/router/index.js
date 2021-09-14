import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:userId/:chatId',
    name: 'chat',
    component: () =>
      import(/* webpackChunkName: "chat" */ '@/components/ChatWidget.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
