import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import './plugins/electron'
import './plugins/vuetify'
import './stylus/main.styl'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')