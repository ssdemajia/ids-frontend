<template>
  <el-row class="panel-group" >
    <el-col  class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('3')">
        <div class="card-panel-description">
          <div class="card-panel-text">高危事件</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="highCount" :duration="2600"></count-to>
        </div>
      </div>

       <div class="card-panel" @click="handleSetLineChartData('2')">
        <div class="card-panel-description">
          <div class="card-panel-text">中危事件</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="mediumCount" :duration="3000"></count-to>
        </div>
      </div>

      <div class="card-panel" @click="handleSetLineChartData('1')">
        <div class="card-panel-description">
          <div class="card-panel-text">低级威胁</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="lowCount" :duration="3200"></count-to>
        </div>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { getEventCountBySig } from "@/api/count";

export default {
  data() {
    return {
      lowCount: 0,
      mediumCount: 0,
      highCount: 0,
      allCount: 0
    };
  },
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  },
  mounted() {
    getEventCountBySig(3)
      .then(response => {
        this.highCount = response.count;
      })
      .then(() => {
        getEventCountBySig(2).then(response => {
          this.mediumCount = response.count;
        });
      })
      .then(() => {
        getEventCountBySig(1).then(response => {
          this.lowCount = response.count;
        });
      })
      .then(() => {
        getEventCountBySig(0).then(response => {
          this.allCount = response.count;
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  // margin-top: 18px;
  // .card-panel-col {
  //   margin-bottom: 32px;
  // }
  .card-panel {
    height: 70px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: rgb(32, 255, 77);
    background: #2f21c4;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(50, 46, 255, 0.05);
    border-radius: 14px;
    margin: 0 25px 35px 25px;
    &:first-child{
      margin-top: 35px;
    }
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .card-panel-description {
      font-weight: bold;
      margin-left: 20px;
      margin-top: 14px;
      
      .card-panel-text {
        line-height: 16px;
        color: rgba(255, 233, 233, 1);
        font-size: 14px;
        margin-bottom: 5px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
