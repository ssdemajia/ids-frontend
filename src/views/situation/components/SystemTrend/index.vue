<template>
  <div class="trend-container">
    <tabs 
      :defaultActive="active"
      :handleClick="tabsClick"
    >
      <tabs-pane 
        v-for="(tab, index) in tabs" 
        :key="tab.company"
        :name="tab.query" 
        :label="tab.company"
      > 
        <div 
          v-if="index == 0"
        >
          <system-count />
        </div>
        <div 
          v-else 
          class="tab-item-container"
        >
          <trend-pie 
            :className="tab.query + 'trend-pi-chart'" 
            :type="tab.query"
          />
          <trend-line 
            :className="tab.query + 'trend-line-chart'" 
            :type="tab.query" />
        </div>
    </tabs-pane>
    </tabs>
  </div>
</template>

<script>
import { systemVulsConstant } from "../../constant";
import TrendPie from "./TrendPie";
import TrendLine from './TrendLine';
import SystemCount from './SystemCount';

export default {
  data() {
    return {
      tabs: systemVulsConstant,
      active: "", // "" 表示tabs为全部
    };
  },
  components: {
    TrendPie,
    TrendLine,
    SystemCount
  },
  methods: {
    tabsClick() {

    }
  }
};
</script>

<style lang="scss" scoped>
.trend-container {
  height: 30vh;
  color: white;
  .tab-item-container {
    display: flex;
  }
}
</style>
