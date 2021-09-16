import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'greeting',
    component: () =>
      import(/* webpackChunkName: "greeting" */ '@/components/Greeting.vue')
  },
  {
    path: '/:userId/:chatId/:boardId/:boardToken',
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
