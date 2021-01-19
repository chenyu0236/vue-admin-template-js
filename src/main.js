import Vue from 'vue'
Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示。

import 'normalize.css' // Normalize.css是一种CSS reset的替代方案。它在默认的HTML元素样式上提供了跨浏览器的高度一致性。
import '@/assets/style' // 主题色彩
import '@/assets/common.scss' // 公共自定义样式

import App from './App.vue'
import router from '@/router/index' // 引入路由
import store from '@/store' // 引入store
import '@/icons' // 引入svg图标文件
import '@/utils/filters.js' // 自定义过滤器
import '@/permission' // 路由监听

import { i18n } from '@/lang' // 设置自定义国际化
import Element from 'element-ui' // element组件包
Vue.use(Element, i18n) // element组件包

import moment from 'moment' // moment
moment.locale('zh-cn'); // 需要汉化
Vue.prototype.$moment = moment;

import util from '@/utils/factories' // 自定义函数
Vue.prototype.$util = util;

import axiosAPI from '@/utils/axios' // axios包装
Vue.use(axiosAPI)




new Vue({
  el: '#app',
  router,
  store,
  i18n: i18n,
  render: h => h(App)
})
