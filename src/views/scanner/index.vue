<template>
  <el-row :gutter="20" class="container" :style="{'height':contaienrHeight}">
    <el-col :span="10">
      <el-row>
        <control-panel/>
      </el-row>
      <el-row>
        <HistoryCard></HistoryCard>
      </el-row>
    </el-col>
    <el-col :span="14">
      <el-row>
        <vul-map/>
      </el-row>
      <el-row>
        <vul-line/>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { getSystem } from "@/api/vulnerability";
// import ResultCard from "./components/ResultCard";
import HistoryCard from "./components/HistoryCard";
// import VulScanCard from './components/VulScanCard';

// import HistoryTable from './components/HistoryTable'
import ControlPanel from './components/ControlPanel'
import VulLine from './components/VulLine'
import VulMap from './components/VulMap'
import { getAllScanRecord } from "@/api/scan";

export default {
  methods: {
    
  },
  data() {
    return {
      records: [],
      contaienrHeight: '0px'
    };
  },
  components: {
    // HistoryTable,
    HistoryCard,
    ControlPanel,
    VulLine,
    VulMap
  },
  mounted() {
    this.$store.dispatch('getRecords')
  }
};
</script>

<style scoped>
.container {

}
.HistoryCard {
  margin-left: 8px;
}
</style>
