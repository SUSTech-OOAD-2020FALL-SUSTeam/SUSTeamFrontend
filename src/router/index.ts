import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home/index.vue'
import Help from '@/views/Help/index.vue'
import Browse from '@/views/Browse/index.vue'
import NotFound from '@/views/NotFound.vue'
import GamePage from '@/views/GamePage/index.vue'
import CommonPage from '@/views/CommonPage.vue'
import Login from '@/views/Login/index.vue'
import Signup from '@/views/Signup/index.vue'
import AnnouncementPage from '@/views/AnnouncementPage/index.vue'
import Purchase from '@/views/Purchase/index.vue'
import DevPanel from '@/views_dev/DevPanel.vue'
import DevHome from '@/views_dev/Home/index.vue'
import DevNoFound from '@/views_dev/DevNoFound.vue'
import DevGames from '@/views_dev/Games/index.vue'
import DevGameEdit from '@/views_dev/GameEdit/index.vue'
import PersonalProfile from '@/views/Personal/index.vue'
import DevGameNew from '@/views_dev/GameNew/index.vue'

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
    path: '/dev',
    name: 'DevPanel',
    component: DevPanel,
    children: [
      {
        path: '/',
        name: 'DevHome',
        component: DevHome
      },
      {
        path: '/dev/games',
        name: 'DevGames',
        component: DevGames
      },
      {
        path: '/dev/game/:gameId',
        name: 'DevGameEdit',
        component: DevGameEdit
      },
      {
        path: '/dev/games/create',
        name: 'DevGameNew',
        component: DevGameNew
      },
      {
        path: '*',
        name: 'DevNoFound',
        component: DevNoFound
      }
    ]
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
        path: '/account/personal',
        name: 'Personal Profile',
        component: PersonalProfile
      },
      {
        path: '/help',
        name: 'Help',
        component: Help
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
