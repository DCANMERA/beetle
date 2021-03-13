export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/Register.vue')
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: () => import('@/views/forgot/Forgot.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/main/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/main/home/Home.vue')
      },
      {
        path: '/category/:type_id?',
        name: 'Category',
        component: () => import('@/views/main/category/Category.vue')
      },
      {
        path: '/posttrade',
        name: 'PostTrade',
        component: () => import('@/views/main/posttrade/PostTrade.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/main/profile/Profile.vue')
      },
      {
        path: '/detail/:pid',
        name: 'Detail',
        component: () => import('@/views/main/detail/Detail.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/',
    redirect: 'login',
    component: () => import('@/views/login/Login.vue'),
  }
]
