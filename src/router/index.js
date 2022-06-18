import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/sign_up',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/new_list',
    name: 'ListEditing',
    component: () => import('@/views/ListEditing.vue'),
    children: [
      {
        path: '/list/:id',
        component: () => import('@/views/ListEditing.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
