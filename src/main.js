import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
// 这样引入的好处是，在各个组件中只要通过this.axios就可以直接引用了
import axios from 'axios'
Vue.prototype.axios = axios

// 全局对照片w h过滤器 对url字段中的w.h进行替换，这边用/ /， 当转换实际.用 \
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
