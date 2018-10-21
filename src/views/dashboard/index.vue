<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="6"> 
        <el-row>漏洞数，五天变化</el-row>
        <el-row>最新漏洞</el-row>
        <el-row></el-row>
      </el-col>
      <el-col :span="12">
        <el-row><intrusion-map/></el-row>
        <el-row>
          <event-group></event-group>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row><system-info/></el-row>
        <el-row><top-table></top-table></el-row>
        <el-row></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EventGroup from './components/EventGroup' // 
import TopTable from './components/TopTable' // Top10 事件数
import EventCountTable from './components/EventCountTable'

import VulLib from './components/VulLib'   // 最新漏洞分布
import TopVul from './components/TopVul' 

import IntrusionMap from './components/Map' //  入侵事件分布
import SystemInfo from './components/SystemInfo'  // 系统状态信息线
import EventPie from './components/PieChart' // 事件协议分布派图

export default {
  components: {
    EventGroup,
    IntrusionMap,
    SystemInfo,
    TopTable
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
