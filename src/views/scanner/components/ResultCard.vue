<template>
  <el-card 
    class="box-card"
    v-loading="loading"
    element-loading-text="拼命扫描中"
  >
    <div slot="header" class="scanHeader">
      <span >识别结果</span>
    </div>
    <h4 v-if="isEmpty">暂无扫描结果</h4>
    <div class="result" v-for="(value, key) in getCurrentRecord" :key="key" >
      <span>{{ key }}:</span> <span> {{ value}} </span>
      
    </div>
    <div class="btnGroup">
      <el-button type="success" @click="saveRecord">保存结果</el-button>
      <el-button class="scanBtn" type="primary" @click="scanVul">漏洞扫描</el-button>
    </div>
  </el-card>
</template>

<script>
import { scanVul } from "@/api/scan";
export default {
  props: {
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    isEmpty() {
      let obj = this.$store.state.record.current_record;
      let keys = Object.keys(obj);
      return keys.length == 0;
    },
    getCurrentRecord() {
      console.log(this.$store.getters.getResult)
      return this.$store.getters.getResult
    }
  },
  methods: {
    saveRecord() {
      if (Object.keys(this.$store.state.record.current_record).length == 0){
        return
      }
      this.$store.dispatch('insertScanRecord')
    },
    scanVul() {
      scanVul(this.$store.state.record.current_record).then(resp => {
        this.$store.commit('EMPTY_VULS')
        console.log('sb:', resp.result.length);
        resp.result.forEach(vul => {
          this.$store.commit('INSERT_VUL', vul)
        })
        
      })
    }
  }
}
</script>

<style scoped>
.scanHeader {
  text-align: center;
}
.result {
  font-size: 16px;
  line-height: 32px;
}
.scanBtn {
  float: right;
}
h4 {
  text-align: center;
  font-weight: 400;
}
.btnGroup {
  margin-top: 18px;
}
</style>
