import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)
  const dot = '\u00A0\u00A0\u00A0',
    radio = 'Radio\u00A0ICE\u00A0-\u00A0',
    routes = [
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue'),
    meta: {
      auth: false,
      title: radio + '404\u00A0-\u00A0Страница\u00A0не\u00A0найдена' + dot
    }
  },
  {
    path: '/index.html',
    name: 'Radio',
    component: () => import('../views/Radio.vue'),
    meta: {
      auth: false,
      title: radio + 'Радио' + dot
    }
  },
  {
    path: '/',
    name: 'Radio',
    component: () => import('../views/Radio.vue'),
    meta: {
      auth: false,
      title: radio + 'Радио' + dot
    }
  },
  {
    path: '/newItems',
    name: 'NewItems',
    component: () => import('../views/NewItems.vue'),
    meta: {
      auth: false,
      title: radio + 'Новинки' + dot
    }
  },
  {
    path: '/programs',
    name: 'Programs',
    children: [
      {
        path: '/programs/:name',
        component: () => import('../views/Programs.vue'),
        meta: {
          auth: false,
          title: radio + 'Программы' + dot
        }
      }
    ],
    component: () => import('../views/Programs.vue'),
    meta: {
      auth: false,
      title: radio + 'Программы' + dot
    }
  },
  {
    path: '/team',
    name: 'Team',
    children: [
      {
        path: '/team/:name',
        component: () => import('../views/Team.vue'),
        meta: {
          auth: false,
          title: radio + 'Команда' + dot
        }
      }
    ],
    component: () => import('../views/Team.vue'),
    meta: {
      auth: false,
      title: radio + 'Команда' + dot
    }
  },
  {
    path: '/life',
    name: 'Life',
    children: [
      {
        path: '/life/:name',
        component: () => import('../views/Life.vue'),
        meta: {
          auth: false,
          title: radio + 'Жизнь' + dot
        }
      }
    ],
    component: () => import('../views/Life.vue'),
    meta: {
      auth: false,
      title: radio + 'Жизнь' + dot
    }
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('../views/PlayList.vue'),
    meta: {
      auth: false,
      title: radio + 'Плейлист' + dot
    }
  },
  {
    path: '/ice-hot',
    name: 'IceHot',
    component: () => import('../views/IceHot.vue'),
    meta: {
      auth: false,
      title: radio + 'Ice-Hot\u00A030' + dot
    }
  },
  {
    path: '/video',
    name: 'Video',
    children: [
      {
        path: '/video/:name',
        component: () => import('../views/Video.vue'),
        meta: {
          auth: false,
          title: radio + 'Видео' + dot
        }
      }
    ],
    component: () => import('../views/Video.vue'),
    meta: {
      auth: false,
      title: radio + 'Видео' + dot
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
      title: radio + '{админ\u00A0панель}' + dot
    }
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
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
