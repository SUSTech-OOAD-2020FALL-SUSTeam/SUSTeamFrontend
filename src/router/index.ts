import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/index.vue'
import Browse from '../views/Browse/index.vue'
import NotFound from '@/views/NotFound.vue'
import GamePage from '@/views/GamePage/index.vue'
import CommonPage from '@/views/CommonPage.vue'
import Login from '@/views/Login/index.vue'
import Signup from '@/views/Signup/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '',
    component: CommonPage,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/browse',
        name: 'Browse',
        component: Browse
      },
      {
        path: '/game/:gameId',
        name: 'GamePage',
        component: GamePage
      },
      {
        path: '*',
        name: 'NotFound',
        component: NotFound
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
