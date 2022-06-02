import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

Vue.config.productionTip = false



new Vue({
  components: {
    PulseLoader
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
