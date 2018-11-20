<template>
  <div class="tabs-container">
    <div class="tabs-header"
      @mousewheel="handleWheel"
      >
      <span  
        v-for="pane in panes" 
        :key="pane.label" 
        :class="['tab-item', {active: pane.name == activeName} ]" 
        @click="() => clickPane(pane)">
        {{ pane.label }}
      </span>
    </div>
    <slot></slot>
  </div>
  
</template>

<script>
export default {
  name: "Tabs",
  props: {
    defaultActive: String,
    handleClick: Function // 自定义tab点击事件
  },
  mounted() {
    this.activeName = this.defaultActive;
    this.calcPaneInstances();
  },
  data() {
    return {
      activeName: "",
      headers: [],
      panes: []
    };
  },
  methods: {
    handleWheel(event) {
      let tabItem = event.target;
      let tabHeader = tabItem.parentElement;
      if (event.deltaY > 0) {
        tabHeader.scrollLeft += 50;
      }
      else {
        tabHeader.scrollLeft -= 50;
      }
    },
    clickPane(pane) {
      if (this.handleClick) {
        this.handleClick(pane);
      }
      this.activeName = pane.name;
    },
    calcPaneInstances() {
      const paneSlots = this.$slots.default.filter(vnode => {
        return (
          vnode.componentOptions &&
          vnode.componentOptions.tag &&
          vnode.componentOptions.tag === "tabs-pane"
        );
      });
      this.panes = paneSlots.map(({ componentInstance }) => componentInstance);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs-container {
  background-color: #262626;
  margin: 8px;
  border-radius: 12px;
  .tabs-header {
    color: #fff;
    font-size: 14px;
    background-color: #000;
    display: flex;
    overflow-x: scroll;
    .tab-item {
      flex-shrink: 0;
      padding: 8px 12px;
      background-color: #4f4e4e;
      border-radius: 8px 8px 0 0;
      margin-right: 1px;

      &.active {
        background-color: #262626;
      }
    }
    &::-webkit-scrollbar {
      height: 0px;
      display: none;
    }
  }
}
</style>
