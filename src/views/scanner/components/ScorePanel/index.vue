<template>
  <div class="container">
    <div class="header"><p>设备信息</p></div>
    <div v-if="!$store.state.task.current_device.hasOwnProperty('info')">
        <div class="empty-text">还未选定设备</div>
    </div>
    <div v-else>
      <el-row>
        <el-col :span="8">
          <score-gauge :detailVaule="$store.state.task.score"/>
        </el-col>
        <el-col :span="16">
          <device-info :data="$store.state.task.current_device"/>
        </el-col>   
      </el-row>
    </div>
  </div>
</template>

<script>
import { getVuls } from '@/api/scan'
import ScoreGauge from './ScoreGauge'
import DeviceInfo from './DeviceInfo'
export default {
  components: {
    ScoreGauge,
    DeviceInfo
  },
  data() {
    return {
      levelToType: {
        高: "danger",
        中: "warning",
        低: "info"
      },
      score: 100
    }
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container {
  .header {
    border: 2px solid #409eff;
    border-left: none;
    border-right: none;
    width: 100%;
    p {
      text-align: center;
      font-size: 18px;
      // font-weight: bold;
      margin: 12px auto;
    }
  }
  .empty-text {
    width: 100px;
    margin: 20px auto;
    color: #909399;
  }
}
</style>

