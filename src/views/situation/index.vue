<template>
  <div class="situation-container">
    <el-row>
      <el-col :span="6">
        <vuls-score />
        <vuls-all />
        <vuls-trend />
        <vuls-list />
      </el-col>
      <el-col :span="12">  
        <sit-map-group />
        <system-trend />
      </el-col>
      <el-col :span="6">
        <system-info />
        <system-vuls />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SitMapGroup from './components/SitMapGroup';
import VulsAll from './components/VulsAll';
import VulsTrend from './components/VulsTrend';
import VulsList from './components/VulsList';

import SystemTrend from './components/SystemTrend';
import SystemInfo from './components/SystemInfo';
import SystemVuls from './components/SystemVuls';
import VulsScore from './components/VulsScore';

export default {
  components: {
    VulsScore,    
    VulsAll,
    VulsTrend,
    VulsList,
    SitMapGroup,
    SystemTrend,
    SystemInfo,
    SystemVuls,
  }
}
</script>


<style lang="scss" scoped>
.situation-container {
  background-color: black;
}
</style>
