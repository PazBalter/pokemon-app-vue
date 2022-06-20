import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Arena from '../views/Arena.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/arena',
    name: 'arena',
    component: Arena
  },

]

const router = new VueRouter({
  routes
})

export default router
