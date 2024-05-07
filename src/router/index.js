import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import BlogView from '../views/BlogView.vue';
import LoginView from '../views/LoginView.vue';
import BlogDetailView from '../views/BlogDetailView.vue';
import BlogEditView from '../views/BlogEditView.vue';


const routes = [
  {
    path: '/index',
    name: 'Index',
    redirect: '/blogs'
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    meta:{
      requiresAuth: true
    },
    component: BlogEditView
  },
  {
    path: '/blog/:id',
    name: 'BlogDetail',
    component: BlogDetailView
  },
  {
    path: '/blog/:id/edit',
    name: 'BlogEdit',
    meta:{
      requiresAuth: true
    },
    component: BlogEditView
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: BlogView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
