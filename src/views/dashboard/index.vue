<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
     -->
    <el-row :gutter="8">
      <el-col :span="4"><summary-box></summary-box></el-col>
      <el-col :span="20"><detail-table></detail-table></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SummaryBox from './components/SummaryBox'
import DetailTable from './components/DetailTable'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components: {
    SummaryBox,
    DetailTable
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
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
