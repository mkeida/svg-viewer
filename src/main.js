// The Vue build version to load with the 'import' command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'

// Set this to false to prevent the production tip on Vue startup
Vue.config.productionTip = true

// Enables element-ui library with english lanquage mutation
Vue.use(Element, { locale });

// Creates new Vue instance
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
