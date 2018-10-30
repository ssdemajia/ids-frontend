<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="6"> 
        <el-row><score/></el-row>
        <el-row><recent-vul/></el-row>
      </el-col>
      <el-col :span="12">
        <el-row><intrusion-map/></el-row>
        <el-row>
          <event-group></event-group>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row><system-info/></el-row>
        <el-row><top-event></top-event></el-row>
        <el-row></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EventGroup from './components/EventGroup' // 入侵事件时间分布
import Score from './components/Score' // 态势感知评估
import RecentVul from './components/RecentVul'  // 最近的事件
import TopEvent from './components/TopEvent'  // Top事件
import IntrusionMap from './components/MapGroup' //  入侵事件分布
import SystemInfo from './components/SystemInfo'  // 系统状态信息线

export default {
  components: {
    EventGroup,
    IntrusionMap,
    SystemInfo,
    TopEvent,
    RecentVul,
    Score
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>
