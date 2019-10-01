import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
