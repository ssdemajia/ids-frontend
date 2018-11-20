<template>
  <div class="container">
    <div class="header">
      <p>漏洞库</p>
    </div>
    <div class="count-panel">
      <div class="first-count">
        当前漏洞报告：
        <count-to class="count-item" :startVal="0" :endVal="allCount" :duration="2600"></count-to>
        条
      </div>
      <div>
        <span>
          高危： 
          <count-to class="count-item" :startVal="0" :endVal="highCount" :duration="2600"></count-to>
          条
        </span>
        <span>
          中危：
          <count-to class="count-item" :startVal="0" :endVal="middleCount" :duration="3600"></count-to>
          条
        </span>
        <span>
          低危：
          <count-to class="count-item" :startVal="0" :endVal="lowCount" :duration="4600"></count-to>
          条
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// 漏洞库总体
import CountTo from "vue-count-to";
import { getVulsCount } from '@/api/situation'

export default {
  data() {
    return {
      allCount: 0,
      highCount: 0,
      middleCount: 0,
      lowCount: 0,
    }
  },
  mounted() {
    getVulsCount().then(({ result }) => {
      this.allCount = result[0]
      this.highCount = result[1]
      this.middleCount = result[2]
      this.lowCount = result[3]
    }).catch((err) => {
      
    });
  },
  components: {
    CountTo,

  }
}
</script>

<style lang="scss" scoped>
.container {
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
  .count-panel {
    margin: 0px 8px;
    border-radius: 10px;
    padding: 12px;
    line-height: 24px;
    background-color: #262626;
    color: white;
    div, p {
      text-align: center;
    }
    span {
      margin-left: 10px;
    }
    .count-item {
      color: #409eff;
      font-weight: bold;
    }
  }
}
</style>

