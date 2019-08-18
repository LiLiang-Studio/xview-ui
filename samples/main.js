import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueUI from '../dist/index.umd.min'
import VueUI from '../src'
Vue.use(VueUI, { prefix: '' })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')