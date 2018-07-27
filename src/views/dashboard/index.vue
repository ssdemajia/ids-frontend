<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
     -->
    <el-row class="container">
      <el-col :span="18"> <!--主栏 -->
        <el-row> 
          <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
        </el-row>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="lineChartData"></line-chart>
        </el-row> <!-- 图表 -->
      </el-col>
      <el-col :span="6"> <!--右侧栏 -->

      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// 按需引入 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$el);
      this.setOptions();
    },
    setOptions() {

    }
  },
  components: {
    PanelGroup,
    LineChart
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
