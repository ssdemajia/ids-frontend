<template>
  <div class="container">
    <el-col :span="6">
      <el-row>
        <el-input v-model="ip">
           <template slot="prepend">IP地址</template>
            <el-button slot="append" icon="el-icon-search" @click="canSearch && search()"></el-button>
        </el-input>
      </el-row>
      <el-row>
        历史记录
      </el-row>
    </el-col>
    <el-col :span="12">

    </el-col>
  </div>
</template>

<script>
import { getSystem } from '@/api/vulnerability'
export default {
  methods: {
    search() {
      if (this.canSearch != false) {
        this.canSearch = false
        console.log(this.ip)
        if (this.ip.length == 0) {
          this.$message('请正确填写IP地址')
        }
        getSystem(this.ip).then((response) => {
          console.log(response.result)
          this.canSearch = true
        })
        
      }      
    }
  },
  data() {
    return {
      ip:"",
      canSearch: true
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f0f2f5;
  height: 960px;
}
</style>
