<template>
  <div 
    class="tab-pane"
    v-show="active"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabsPane",
  componentName: "TabsPane",
  props: {
    label: String,
    name: String,
  },
  computed: {
    active() {
      return this.$parent.activeName == this.name
    }
  },
  
}
</script>

<style lang="scss" scoped>
.tab-pane {
  width: 100%;
}
</style>
