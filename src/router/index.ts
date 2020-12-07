import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home/index.vue'
import Browse from '../views/Browse/index.vue'
import NotFound from '@/views/NotFound.vue'
import GamePage from '@/views/GamePage/index.vue'
import CommonPage from '@/views/CommonPage.vue'
import Login from '@/views/Login/index.vue'
import Signup from '@/views/Signup/index.vue'
import AnnouncementPage from '@/views/AnnouncementPage/index.vue'
import Purchase from '@/views/Purchase/index.vue'
import DevPanel from '@/views/DevPanel/DevPanel.vue'
import DetailPanel from '@/views/DevPanel/DetailPanel.vue'
import PersonalProfile from '@/views/Personal/index.vue'

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
    path: '/developer',
    name: 'Developer Panel',
    component: DevPanel
  },
  {
    path: '/developer/:gameId',
    name: 'Developer Panel Detail',
    component: DetailPanel
  },
  {
    path: '/account/personal',
    name: 'Personal Profile',
    component: PersonalProfile
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
        path: '/game/:gameId/announcement/:title',
        name: 'AnnouncementPage',
        component: AnnouncementPage
      },
      {
        path: '/game/:gameId/purchase',
        name: 'Purchase',
        component: Purchase
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
