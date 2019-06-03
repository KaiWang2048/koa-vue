import home from '../views/home/index'
import Router from 'vue-router'

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    meta: {
      title: '商家列表',
    },
  }]
})
