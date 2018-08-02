<template>
  <div class="container">
   <el-card>
      <div slot="header">Top 10 事件类型</div>
    <el-row>
      <el-table
      :data="events">
      <el-table-column
        prop="event_name"
        label="事件名">
      </el-table-column>
      <el-table-column
        prop="event_count"
        label="事件数量"
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
      events: [
        {
        event_name:'',
        event_count: 0
        }
      ]
    }
  },
  mounted() {
    getEventTopCountByNum(10).then((response) => {
      let counts = response.counts
      this.events = []
      counts.forEach(element => {
        this.events.push({
          event_name: element[0],
          event_count: element[1]
        })
      });
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
