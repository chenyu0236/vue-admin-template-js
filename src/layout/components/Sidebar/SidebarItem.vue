<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <el-tooltip v-if="!openSidebar && !isNest" class="item" effect="dark" :content="onlyOneChild.meta.title" placement="right">
            <div style="position: absolute; left: 0px; top: 0px; height: 100%; width: 100%; display: inline-block; box-sizing: border-box; padding: 0px 20px">
              <svg-icon v-if="onlyOneChild.meta" :icon-class="onlyOneChild.meta.icon" />
            </div>
          </el-tooltip>
          <template v-else>
            <svg-icon v-if="onlyOneChild.meta" :icon-class="onlyOneChild.meta.icon" />
            <item v-if="onlyOneChild.meta" :title="onlyOneChild.meta.title" :enTitle="onlyOneChild.meta.enTitle" />
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else ref="subMenu" :index="routeIndex" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
        <item v-if="item.meta" :title="item.meta.title" :enTitle="item.meta.enTitle" />
      </template>
      <sidebar-item
        v-for="(child, index) in item.children"
        :key="index + child.path"
        :is-nest="true"
        :item="child"
        :route-index="routeIndex + index"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    routeIndex: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  computed: {
    language() {
      return this.$store.state.settings.language
    },
    openSidebar() {
      return this.$store.state.settings.sidebar.opened
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
