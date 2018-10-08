<template>
  <el-row :gutter="20" class="container">
    <el-col :span="8">
      <el-row>
        
          <el-input v-model="ip">
           <template slot="prepend">IP地址</template>
            <el-button slot="append" icon="el-icon-search" @click="canSearch && search()"></el-button>
          </el-input>
        
      </el-row>
      <el-row>
        <HistoryCard></HistoryCard>
      </el-row>
    </el-col>
    <el-col :span="8">
      <ResultCard :loading="resultLoading"></ResultCard>
    </el-col>
    <el-col :span="8">
      <VulScanCard :loading="vulLoading"></VulScanCard>
    </el-col>
  </el-row>
</template>

<script>
import { getSystem } from "@/api/vulnerability";
import ResultCard from "./components/ResultCard";
import HistoryCard from "./components/HistoryCard";
import VulScanCard from './components/VulScanCard';

export default {
  methods: {
    search() {
      if (this.canSearch != false) {
        this.canSearch = false;
        console.log(this.ip);
        if (this.ip.length == 0) {
          this.$message("请正确填写IP地址");
        }
        this.$store.commit("SET_CURRENT_RECORD", {})
        this.resultLoading = true;
        getSystem(this.ip)
          .then(response => {
            
            let scanResult = response.result
            scanResult['ip'] = this.ip
            console.log(scanResult)
            this.$store.commit("SET_CURRENT_RECORD", scanResult)
            this.canSearch = true;
            this.resultLoading = false;
          })
          .catch(error => {
            this.canSearch = true;
            this.resultLoading = false;
          });
      }
    }
  },
  data() {
    return {
      ip: "",
      canSearch: true,
      searchResult: {},
      resultLoading: false,
      vulLoading: false
    };
  },
  components: {
    ResultCard,
    HistoryCard,
    VulScanCard
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f0f2f5;
  height: 960px;
}
.el-row {
  margin-bottom: 20px;
}
</style>
