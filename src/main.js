import Vue from 'vue'
import App from './App.vue'
import { createRouter } from '@/router'
import { createStore } from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/iview.js'
import { config } from './config'

axios.defaults.baseURL = `${config.baseUrl}/manage`

Vue.use(VueAxios, axios)

export function createApp() {
  const router = createRouter()
  const store = createStore() // +
  const app = new Vue({
    router,
    store, // +
    render: h => h(App)
  })

  return { app, router, store }
}
