import { createRouter, createWebHistory } from 'vue-router'
import HomeIndex from '@/components/Home/HomeUnit.vue'
import FriendUnit from '@/components/Friend/FriendUnit.vue'
import User from '@/components/User/UserUnit.vue'
import LoginUnit from '@/components/Login/LoginUnit.vue'
import IndexUnit from '@/components/IndexUnit.vue'
import ToolUnit from '@/components/Tool/ToolUnit.vue'
import ResourceUnit from '@/components/Resource/ResourceUnit.vue'
import MemoryUnit from '@/components/Memory/MemoryUnit.vue'

const routes = [
  {
    path:'/',
    name:'Login',
    component:LoginUnit,
    props: true,
    meta:{
        title: 'Login'
    },
    keepAlive: false,
    useTransition: true
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeIndex,
    props: true,
    meta: {
      title: 'Home Page'
    },
    keepAlive: false,
    useTransition: true,
    children:
      [
      {
        path:'',
        name:'Index',
        component: IndexUnit,
        props: true,
        meta:{
            title: 'Chat Index'
        },
        keepAlive: false,
        useTransition: true
      },
      {
        path: 'friend',
        name: 'Frinde',
        component: FriendUnit,
        props: true,
        meta:{
            title: 'Friend Page'
        },
        keepAlive: true,
        useTransition: true
      },
      {
        path: 'user',
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
        keepAlive: false,
        useTransition: true
      },
      {
        path:'tool',
        name:'Tool',
        component: ToolUnit,
        props: true,
        meta:{
            title: 'Online Tool'
        },
        keepAlive: false,
        useTransition: true
      },
      {
        path:'memory',
        name:'Memory',
        component: MemoryUnit,
        props: true,
        meta:{
            title: 'Online Memory'
        },
        keepAlive: false,
        useTransition: true
      },
      {
        path:'resource',
        name:'Resource',
        component: ResourceUnit,
        props: true,
        meta:{
            title: 'Online Resource'
        },
        keepAlive: false,
        useTransition: true
      },

        ]
  }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
