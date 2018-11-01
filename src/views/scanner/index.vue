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
        <vul-map :chartData="$store.state.task.tasks"/>
      </el-row>
      <el-row>
        <ScorePanel/>
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
// import VulLine from './components/VulLine'
import VulMap from './components/VulMap'
import ScorePanel from './components/ScorePanel'
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
    VulMap,
    ScorePanel
  },
  mounted() {
    this.$store.dispatch('getRecords')
  }
};
</script>

<style scoped>
.HistoryCard {
  margin-left: 8px;
}
</style>
