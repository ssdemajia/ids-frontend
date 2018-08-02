<template>
  <div class="container">
   <el-card>
      <div slot="header">最新漏洞信息</div>
    <el-row>
      <el-table
      :data="events">
      <el-table-column
        prop="vul_name"
        label="漏洞名">
      </el-table-column>
      <el-table-column
        prop="vul_time"
        label="时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="vul_level"
        label="危害级别"
        width="100">
      </el-table-column>
    </el-table>
    </el-row>
   </el-card>
  </div>
</template>
<script>
import { getEventTopCountByNum } from "@/api/count"
export default {
  data() {
    return {
      vuls: [
        {
          vul_name:'',
          vul_time: 0,
          vul_level: 0
        }
      ]
    }
  },
  mounted() {
    
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
</style>
