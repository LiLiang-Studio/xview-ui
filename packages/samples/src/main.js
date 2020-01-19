import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueUI from 'xview-ui'
import 'xview-ui/dist/index.css'
// import VueUI from 'xview-ui/src'
Vue.use(VueUI, { prefix: '' })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')