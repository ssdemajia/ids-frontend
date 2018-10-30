<template>
  <div class="EventGroupWrapper">
    <el-row>
      <el-col>
        <div class="EventHander">入侵事件趋势</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">  
        <panel-group></panel-group>
      </el-col>
      <el-col :span="20">
        <line-chart :chartData="lineChartData"></line-chart>
      </el-col>
    </el-row> 
  </div>
</template>

<script>
import { getAllCountByTime } from '@/api/count';
import LineChart from './LineChart';
import PanelGroup from './PanelGroup';
export default {
  data() {
    return {
      lineChartData: {},
      dataType: 'day',
      dataSig: 1
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.dataSig = type
      getAllCountByTime(this.dataType).then((response) => {
      const lineData = response.counts
      this.lineChartData = {
        y_sig1: lineData[0], 
        y_sig2: lineData[1], 
        y_sig3: lineData[2], 
        xdata: lineData[3]
      }
      })
    }
  },
  mounted() {
    this.handleSetLineChartData(0)
  },
  components: {
    LineChart,
    PanelGroup
  }
}
</script>

<style lang="scss" scoped>
.EventGroupWrapper {
  margin-top: 12px;
}
.EventHander {
  padding: 5px 0px;
  border-top: 2px solid #409eff;
  border-bottom: 2px solid #409eff;
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 0;
}
</style>
