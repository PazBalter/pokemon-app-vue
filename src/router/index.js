import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/About.vue'
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
  {
    path: '/about',
    name: 'about',
    component: About
  },

]

const router = new VueRouter({
  routes
})

export default router
