<template>
  <div class="container">
   <el-card>
     <div slot="header">
       <span>事件协议类型分布</span>
       <el-button style="float: right; padding: 3px 0" type="text">切换视图</el-button>
     </div>
     <pie-chart></pie-chart>
   </el-card>
  </div>
</template>
<script>
import PieChart from './PieChart'
import { getEventTopCountByNum } from "@/api/count"
export default {
  data() {
    return {
      events: [
        {
        event_name:'',
        event_count: 0
        }
      ]
    }
  },
  mounted() {
    
  },
  components: {
    PieChart
  }
}
</script>
<style>
.title {
  margin: 0px;
  color: #606266;
  background-color: #fff;
  padding: 5px;
  line-height: 23px;
  text-align: center;
  font-size: 1.2em;
  font-weight: 500; 
}
.chart {
  margin-top: 50px;
}
</style>
