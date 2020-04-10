import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Admin from '../views/Admin.vue'
import Recipes from '../views/Recipes.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'About',
    component: About
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
