<template>
  <div class="score-specify">
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="score-item">
          <div class="card-panel-text">脆弱性</div>
          <div class="card-num-wrapper">
            <count-to class="card-panel-num" :startVal="0" :endVal="vulnerability" :duration="2600"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="score-item">
          <span class="card-panel-text">威胁范围</span>
           <div class="card-num-wrapper">
            <count-to class="card-panel-num" :startVal="0" :endVal="scope" :duration="2600"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <el-row type="flex" justify="center">
      <el-col :span="9">
        <div class="score-item">
          <span class="card-panel-text">攻击向量</span>
           <div class="card-num-wrapper">
            <count-to class="card-panel-num" :startVal="0" :endVal="attackVector" :duration="2600"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="score-item">  
          <span class="card-panel-text">事件复杂度</span>
           <div class="card-num-wrapper">
            <count-to class="card-panel-num" :startVal="0" :endVal="eventComplexity" :duration="2600"></count-to>
          </div>
        </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
import CountTo from "vue-count-to";
import { getSafeScore } from "@/api/count";
export default {
  data() {
    return {
      vulnerability: 0,
      scope: 0,
      attackVector: 0,
      eventComplexity: 0,
      timer: null
    };
  },
  components: {
    CountTo
  },
  mounted() {
    this.timer = setTimeout(this.getSystemScore, 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    getSystemScore() {
      getSafeScore()
        .then(result => {
          this.scope = result.score.scope*100;
          this.vulnerability = result.score.vulnerability*100;
          this.eventComplexity = result.score.eventComplexity*100;
          this.attackVector = result.score.attackVector*100
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.score-specify {
  margin-top: 16px;
  .score-item {
    background-color: #2f21c4;
    margin: 10px;
    height: 42px;
    border-radius: 5px;
    .card-panel-text {
      float: left;
      width: 80px;
      font-size: 14px;
      color: white;
      line-height: 42px;
      margin-left: 18px;
    }
    .card-num-wrapper {
      line-height: 42px;
      margin-left: 98px;
      width: 18px;
      .card-panel-num {
        font-size: 26px;
        color: #20ff4d;
      }
    }
  }
}
</style>
