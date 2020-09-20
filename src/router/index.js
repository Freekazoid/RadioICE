import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
  const dot = '...'
  const routes = [
  {
    path: " * ",
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue'),
    meta: {
      auth: false,
      title: '404 - Страница не найдена' + dot
    }
  },
  {
    path: '/',
    name: 'Radio',
    component: () => import('../views/Radio.vue'),
    
    meta: {
      auth: false,
      title: 'Radio ICE - Радио' + dot
    }
  },
  {
    path: '/newItems',
    name: 'NewItems',
    component: () => import('../views/NewItems.vue'),
    meta: {
      auth: false,
      title: 'Radio ICE - Новинки' + dot
    }
  },
  {
    path: '/programs',
    name: 'Programs',
    component: () => import('../views/Programs.vue'),
    meta: {
      auth: false,
      title: 'Radio ICE - Программы' + dot
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/Team.vue'),
    meta: {
      auth: false,
      title: 'Radio ICE - Команда' + dot
    }
  },
  {
    path: '/life',
    name: 'Life',
    component: () => import('../views/Life.vue'),
    meta: {
      auth: false,
      title: 'Radio ICE - Жизнь' + dot
    }
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('../views/PlayList.vue'),
    meta: {
      auth: false,
      title: 'Radio ICE - Плейлист' + dot
    }
  },
  {
    path: '/ice-hot',
    name: 'IceHot',
    component: () => import('../views/IceHot.vue'),
    meta: {
      auth: false,
      title: 'Radio ICE - Ice-Hot 30' + dot
    }
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video.vue'),
    meta: {
      auth: false,
      title: 'Radio ICE - Все видео' + dot
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { 
      requiresAuth: true,
      is_admin : true,
      auth: true,
      title: 'Radio ICE - {админ панель}' + dot
    }
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else
    next()
})

export default router
