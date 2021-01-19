import router from './router'
import store from '@/store'

import 'nprogress/nprogress.css' // progress bar style
import NProgress from 'nprogress' // progress bar
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const title = 'vue'

router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? to.meta.title + '-' + title : title;

  NProgress.start()
  next();
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})