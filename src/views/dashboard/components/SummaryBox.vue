<template>
  <el-card class="box-card-component">
    <div class="box-card-header">
      检测事件统计
    </div>
    <div>
      <div style="padding-top:35px;" class="progress-item">
        <span>TCP类型</span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="70"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkTcp"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      <div style="padding-top:25px;" class="progress-item">
        <span>IP类型</span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="70"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkTcp"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      <div style="padding-top:25px;" class="progress-item">
        <span>UDP类型</span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="70"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkTcp"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      <div style="padding-top:25px;" class="progress-item">
        <span>ICMP类型</span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="70"></el-progress>
            <el-input  name="password"></el-input>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkTcp"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'summaryBox',
  data() {
    return {
      checkTcp: true
    }
  }
}
</script>
