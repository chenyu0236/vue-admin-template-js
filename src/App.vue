<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { newRouterList } from '@/router/index'
export default {
  name: 'App',
  created() {
    console.log(this.$router)
    let language = sessionStorage.getItem('language')
    if (!language) {
      language = (navigator.language || navigator.browserLanguage).toLowerCase()
      if (language == 'zh-cn') {
        language = 'zh'
      }
    }
    this.$store.dispatch('settings/toggleLanguage', language)
  },
  mounted() {
    let routerData = JSON.parse(sessionStorage.getItem('menu'))
    if (routerData && routerData.Childrens) {
      var routers = newRouterList(routerData.Childrens)
      this.$router.addRoutes(routers)
      routers.forEach(route => {
        this.$router.options.routes.push(route)
      })
    }
  }
}
</script>
