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
  
  }
  ,
  {
    path:'/index',
    name:'Index',
    component: IndexUnit,
    meta:{
        title: 'Chat Index'
    },
    children:[

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
  },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
