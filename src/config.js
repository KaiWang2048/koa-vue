import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '@config/utils/http'
import vueLogger from '@config/utils/logger/vue-logger'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自定义业务组件
import components from './components'
// 注册插件
Vue.use(http)
Vue.use(vueLogger)
Vue.use(VueRouter)
Vue.use(elementUI)

components.forEach(comp => {
  Vue.component(`ml-${comp.name}`, comp)
})

