import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
// 这样引入的好处是，在各个组件中只要通过this.axios就可以直接引用了
import axios from 'axios'
// 引用Scroller组件
import Scroller from '@/components/Scroller'
// 引入Loading组件
import Loading from '@/components/Loading'
Vue.prototype.axios = axios

// 全局对照片w h过滤器 对url字段中的w.h进行替换，这边用/ /， 当转换实际.用 \
Vue.filter('setWH', (url, arg) => {
  if (url) {
    return url.replace(/w\.h/, arg)
  }
})
// 对Scroller组件的全局引用
Vue.component('Scroller', Scroller)
// 对Loading组件全局引入
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
