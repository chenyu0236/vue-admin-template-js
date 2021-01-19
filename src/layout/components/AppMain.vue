<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <div class="app-container">
          <div class="app-c-main">
            <router-view :key="key" />
          </div>
        </div>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
    isiframe() {
      if (self != top) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

<style lang="scss">
.app-main {
  height: calc(100% - 50px);
}
</style>