<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
     -->
    <el-row class="container">
      <el-col :span="24"> <!--主栏 -->
        <el-row> 
          <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="lineChartData"></line-chart>
        </el-row> <!-- 图表 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <top-table></top-table>
          </el-col>
          <el-col :span="8">
            <event-count-table></event-count-table>
          </el-col>
          <el-col :span="8">
            <vul-lib></vul-lib>
          </el-col>
        </el-row>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TopTable from './components/TopTable'
import EventCountTable from './components/EventCountTable'
import VulLib from './components/VulLib'
import { getEventCountBySig, getEventCountByTime } from '@/api/count'

export default {
  data() {
    return {
      dataSig: 0,
      lineChartData: {
        xdata: [0, 0, 0, 0], 
        ydata: [0, 0, 0, 0]},
      dataType: 'day'
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.dataSig = type
      // console.log(type)
      getEventCountByTime(this.dataType, this.dataSig).then((response) => {
      // console.log(response.counts);
      const lineData = response.counts
      let xdata = [];
      let ydata = [];
      for (let i = 0; i < lineData.length; i++) {
        ydata.push(lineData[i][0]);
        xdata.push(lineData[i].slice(1).join('.'))      
      }
      this.lineChartData = {xdata, ydata}
    })
    }
  },
  components: {
    PanelGroup,
    LineChart,
    TopTable,
    EventCountTable,
    VulLib
  },
  mounted() {
    this.handleSetLineChartData(0)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 20px;
    background-color: #f0f2f5;
    .panel-group {
      // margin-left: 20px;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
// .el-row {
//    background-color: aqua; 
//   }
</style>
