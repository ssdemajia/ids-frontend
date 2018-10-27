<template>
  <div class="container" >
    <div class="header">
      <p>态势评估</p>
    </div>
    <div id="liquidfill-chart" :style="{width:'150px', height:'150px'}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-liquidfill";
import { getSafeScore } from "@/api/count";
export default {
  data() {
    return {
      score: 0.6,
      vulnerability: 0,
      scope: 0,
      attackVector: 0,
      eventComplexity: 0,
      liquidChart: null,
      timer: null
    };
  },
  mounted() {
    this.initOption();
    let container = document.querySelector(".container");
    container.style.height = `${document.documentElement.clientHeight / 3}px`;
    this.setScore();
    this.timer = setTimeout(this.setScore, 10000);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  },
  methods: {
    setScore() {
      getSafeScore().then((result) => {
        this.scope = result.score.scope
        this.vulnerability = result.score.vulnerability
        this.eventComplexity = result.score.eventComplexity
        this.attackVector = result.score.attackVector
        this.score = (this.scope+this.vulnerability+this.eventComplexity+this.attackVector)/4;
        console.log(result.score);
        this.setOptions();
      })
    },
    setOptions() {
      let option = {
        series: [
          {
            type: "liquidFill",
            data: [
              {
                name: "总分",
                value: this.score
              },
              {
                name: "脆弱性",
                value: this.vulnerability
              },
              {
                name: "攻击向量",
                value: this.attackVector
              },
              {
                name: "事件复杂度",
                value: this.eventComplexity
              },
              {
                name: "事件范围",
                value: this.scope
              }
            ],
            label: {
              show: true,
              fontSize: 56
            },
            center: ["50%", "50%"],
            radius: "95%",
            outline: {
              itemStyle: {
                borderColor: '#409eff'
              }
            },
            backgroundStyle: {
              color: "#000",
            },
            shape:
              "path://M80.168 484.568c0-104.608-0.168-203.848-0.168-329.136C198.848 117.752 329.664 72.776 509.168 32c179.504 40.776 310.32 85.752 429.168 123.432 0 125.288-0.168 224.528-0.168 329.144 0 294.744-240.408 456.88-428.992 507.432-188.592-50.552-429.008-212.696-429.008-507.44z",
            label: {
              color: '#0062bb',
              formatter: function(param) {
                return parseInt(param.value * 100) ;
              },
              fontSize: 56
            }
          }
        ]
      };
      this.liquidChart.setOption(option);
    },
    initOption() {
      this.liquidChart = echarts.init(
        document.querySelector("#liquidfill-chart")
      );
      this.setOptions();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  color: white;
  #liquidfill-chart {
    margin: 10px auto;
  }
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
    }
  }
  .score-specify {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    .score-item {
      width: 40%;
    }
  }
}
</style>
