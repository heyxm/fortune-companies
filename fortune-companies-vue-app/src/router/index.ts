import { createRouter, createWebHistory } from 'vue-router'
import CompanySearchView from '../views/CompanySearchView.vue'
import CompanyDetailView from '../views/CompanyDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'CompanySearch',
    component: CompanySearchView,
  },
  {
    path: '/company/:id',
    name: 'CompanyDetail',
    component: CompanyDetailView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
