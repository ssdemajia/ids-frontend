<template>
  <div class="vuls-trend-container">
    <tabs defaultActive="time-distrubute">
      <tabs-pane name="time-distrubute" label="时间分布">
        <vuls-line/>
      </tabs-pane>
      <tabs-pane name="percent-distrubute" label="占比">
        <vuls-pie/>
      </tabs-pane>
    </tabs>
  </div>
</template>

<script>
// 漏洞库趋势

import VulsPie from './VulsPie'
import VulsLine from './VulsLine'

export default {
  components: {
    VulsPie,
    VulsLine
  }
}
</script>

<style lang="scss" scoped>
.vuls-trend-container {
  color: white;
}
.tabs-header {
  
}
</style>
