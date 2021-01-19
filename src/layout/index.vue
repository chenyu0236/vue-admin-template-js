<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" :collapse="classObj.hideSidebar" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="occupyingClass"></div>
      <div :class="{ 'fixed-navbar': isiframe }">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Sidebar, Navbar, TagsView } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Navbar,
    TagsView
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.settings.sidebar,
      device: (state) => state.settings.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    occupyingClass() {
      return {
        occupying: this.isiframe,
        navbarisfixed: this.isiframe
      }
    },
    isiframe() {
      if (self !== top) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/mixin.scss';
@import '~@/assets/style/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  .occupying {
    height: 50px;
  }
}

.hasTagsView {
  .occupying {
    height: 84px;
  }
}

.fixed-navbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-navbar {
  width: calc(100% - 54px);
}

.mobile .fixed-navbar {
  width: 100%;
}
</style>
