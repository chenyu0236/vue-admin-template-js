<template>
  <span slot="title" v-if="title">{{ itemTitle }}</span>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    enTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    itemTitle() {
      if (this.$store.state.settings.language == 'zh') {
        return this.title
      }
      return this.enTitle
    }
  },
  created() {}
}
</script>
