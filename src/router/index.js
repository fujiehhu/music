import Vue from 'vue'
import Router from 'vue-router'

import Comment from '@/components/Comment'
import Home from '@/components/Home'
import Nav from '@/components/Nav'
import Play from '@/components/Play'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',

      component: resolve => require(['../components/Play.vue'], resolve)
    },
    {
      path: '/home',

      component: resolve => require(['../components/Home.vue'], resolve)
    },
  
    {
      path: '/nav',

      component: resolve => require(['../components/Nav.vue'], resolve)
    },
    {
      path: '/play',

      component: resolve => require(['../components/Play.vue'], resolve)
    },
  ]
})
