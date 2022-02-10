import Vue from 'vue'
import VueRouter from 'vue-router'
import Project from '../views/Project.vue'
import Library from '../views/Library.vue'
import ProjectEdit from '../views/ProjectEdit.vue'
import ProjectCreate from '../views/ProjectCreate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Project',
    component: Project
  },
  {
    path: '/library',
    name: 'Libraries',
    component: Library
  },
  {
    path: '/project/create',
    name: 'ProjectCreate',
    component: ProjectCreate
  },
  {
    path: '/project/:id',
    name: 'ProjectEdit',
    component: ProjectEdit,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
