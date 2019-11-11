import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './common/style/index.scss'
import 'animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  data:{
	  eventHub:new Vue()
  }
}).$mount('#app')
