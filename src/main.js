import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

//跨域携带cookie
axios.defaults.withCredentials = true

// axios拦截器，在发起请求之前执行
// nodejs跨域请求，post参数必须进行序列化，否则即使在后台允许跨域，后台无法接收请求
// axios.interceptors.request.use(config => {
//   // 处理post请求参数, 进行参数序列化
//   if (config.method == 'post') {

//     // 序列化post请求参数
//     let paramsString = ''
//     for (let key in config.data) {
//       paramsString += `${key}=${config.data[key]}&`
//     }

//     // 重新赋值config.data
//     config.data = paramsString.slice(0, -1)

//   }

//   // 必须返回config
//   return config
// })

//挂载原型属性
// Vue.prototype.baseUrl = 'http://127.0.0.1:10001'
// Vue.prototype.baseUrl = ''

// 阿里云服务器请求地址
// Vue.prototype.baseUrl = 'http://8.129.215.103:3000'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
