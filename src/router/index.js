import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home/HomeUnit.vue'
import About from '@/components/About/AboutUnit.vue'
import User from '@/components/User/UserUnit.vue'
import LoginUnit from '@/components/Login/LoginUnit.vue'
import IndexUnit from '@/components/IndexUnit.vue'

const routes = [
  {
    path:'/',
    name:'Login',
    component:LoginUnit,
    meta:{
        title: 'Login'
    },
    keepAlive: true,
    useTransition: true
  }
  ,
  {
    path:'/index',
    name:'Index',
    component: IndexUnit,
    meta:{
        title: 'Chat Index'
    },
    keepAlive: true,
    useTransition: true
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta:{
        title: 'About Page'
    },
    keepAlive: true,
    useTransition: true
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    props: true,
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter:', to, from)
      next()
    },
    meta: {
      title: 'User Detail'
    },
    keepAlive: true,
    useTransition: true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home Page'
    },
    keepAlive: true,
    useTransition: true
  },
  {

  }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
