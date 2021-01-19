<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="right-menu">
      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'Navbar',

  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      sidebar: state => state.settings.sidebar,
      device: state => state.settings.device
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('settings/toggleSideBar')
    },
    logout() {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.navbar {
  height: 36px;
  overflow: hidden;
  position: relative;
  background: $lightGray;
  border-bottom: 1px solid rgb(205, 205, 231);
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 32px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 36px;

    .breadcrumb-container {
      margin-right: 20px;
    }
  }
}
</style>
