import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home/index.vue'
import About from '@/components/About/index.vue'
import User from '@/components/User/index.vue'
import LoginUnit from '@/components/Login/loginunit.vue'


const routes = [
  {
    path:'/',
    name:'Login',
    component:LoginUnit,
    meta:{
        title: 'Login'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta:{
        title: 'About Page'
    }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: true,
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter:', to, from)
      next()
    },
    meta: {
      title: 'User Detail'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: {
        default:Home,

    },
    meta: {
      title: 'Home Page'
    }
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
