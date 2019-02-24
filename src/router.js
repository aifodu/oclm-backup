import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/backup',
      name: 'backup',
      component: () => import( /* webpackChunkName: "about" */ './views/Backup.vue')
    },
    {
      path: '/restore',
      name: 'restore',
      component: () => import( /* webpackChunkName: "about" */ './views/Restore.vue')
    },
  ]
})