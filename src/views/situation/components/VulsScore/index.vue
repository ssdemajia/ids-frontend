<template>
  <div class="vuls-score-container">
    <div class="header">
      <p>态势评估</p>
    </div>
    
    <div class="score-row">
      <el-row :gutter="20">
        <el-col :span="8">
          <score-col class="left-score" :data="leftData"/>
        </el-col>
        <el-col :span="8">
          <score-gauge :score="score"/>
        </el-col>
        <el-col :span="8">
          <score-col class="right-score" :data="rightData"/>
        </el-col>
      </el-row>
      
    </div>    
  </div>
</template>

<script>

import ScoreGauge from "./ScoreGauge";
import ScoreCol from "./ScoreCol";

import { getSystemScore } from '@/api/situation'

export default {
  components: {
    ScoreGauge,
    ScoreCol
  },
  data() {
    return {
      score: 0.6,
      leftData: [
        {name: '高危', value: 10},
        {name: '中危', value: 10}
      ],
      rightData: [
        {name: '低危', value: 10},
        {name: '健康', value: 10}
      ]
    }
  },
  mounted() {
    getSystemScore().then(({ result }) => {
      this.leftData.forEach(item => {
        item.value = result[item.name]
      })
      this.rightData.forEach(item => {
        item.value = result[item.name]
      })
      let sum = 0;
      let danger = 0;
      Object.keys(result).forEach(item => {
        sum += result[item]
      })
      this.score = 1 - result['高危'] / sum
      console.log(this.score)
    }) 
  }
};
</script>

<style lang="scss" scoped>
.vuls-score-container {
  height: 15vh;
  .header {
    border-top: 2px solid #409eff;
    margin-top: 24px;
    p {
      margin-top: -13px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      background-color: #000;
      width: 180px;
      font-size: 26px;
      text-align: center;
      color: #fff;
    }
  }
  .score-row {
    .left-score {
      margin-left: 35%;
      margin-right: 2px;
    }
    .right-score {

    }
  }
}
</style>
