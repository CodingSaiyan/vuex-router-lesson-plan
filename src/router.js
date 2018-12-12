import Vue from 'vue'
import Router from 'vue-router'
import Profile from './views/Profile.vue'
import User from './views/User.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'profile',
      component: Profile
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
