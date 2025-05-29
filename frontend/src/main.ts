import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import TodoView from './views/TodoView.vue'

const pinia = createPinia()

const routes = [
  { path: '/', component: LoginView },
  { path: '/todo', component: TodoView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
