<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="100"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#2D2B3A"
      text-color="#bfcbd9"
      active-text-color="#857ce9"
      width="100"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
