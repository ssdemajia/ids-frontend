<template>
  <div class="vuls-list-container">
    <tabs 
      :defaultActive="active"
      :handleClick="tabsClick"
    >
      <tabs-pane 
        v-for="tab in tabs" 
        :key="tab.company"
        :name="tab.query" 
        :label="tab.company"
      > 
        <list
          name="tab.query"
          :data="vuls"
          :height="360"
        />
    </tabs-pane>
    </tabs>
  </div>
</template>

<script>
// 漏洞库详情
import List from './List'
import { tabConstant } from '../../constant'
import { getVulsByKey } from '@/api/situation'

export default {
  components: {
    List
  },
  data() {
    return {
      tabs: tabConstant,
      allVuls: {},
      vuls: [],
      active: ''
    }
  },
  mounted() {
    getVulsByKey(name).then(({ result }) => {
        this.allVuls[name] = result
        this.vuls = result;
    })
  },
  methods: {
    tabsClick(pane) {
      let name = pane.name
      if (name in this.allVuls) {
        this.vuls = this.allVuls[name]
        return 
      }
      getVulsByKey(name).then(({ result }) => {
        this.allVuls[name] = result
        this.vuls = result;
      })
    }
  }
}
</script>

<style lang="scss">
.vuls-list-container {
  padding-top: 1px;
}
</style>
