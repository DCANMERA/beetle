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
        path: '/posttrade',
        name: 'PostTrade',
        component: () => import('@/views/main/posttrade/PostTrade.vue')
      },
      {
        path: '/products',
        name: 'Products',
        alias: '/',
        component: () => import('@/views/main/products/Products.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }

]
