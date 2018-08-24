<template>
  <div class="container">
   <el-card>
      <div slot="header">最新漏洞信息</div>
    <el-row>
      <el-table
      :data="vuls">
      <el-table-column
        fit="false"
        :show-overflow-tooltip="true"
        prop="title"
        label="漏洞名">
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="level"
        label="危害级别"
        width="100">
      </el-table-column>
    </el-table>
    </el-row>
   </el-card>
  </div>
</template>
<script>
import { getVulTop } from "@/api/count"
export default {
  data() {
    return {
      vuls: [
        {
          vul_name: null,
          vul_time: 0,
          level: 0
        }
      ]
    }
  },
  mounted() {
    getVulTop().then((response) => {
      console.log(response.result)
      this.vuls = response.result
      this.vuls.filter((item) => {
        item.level = item.level[0]
      })
    })
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
