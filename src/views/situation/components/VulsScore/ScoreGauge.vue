<template>
  <div class="container">
    <div id="situation-score-chart" :style="{width:'110px', height:'110px'}"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-liquidfill";
import { getSafeScore } from "@/api/count";
export default {
  props: {
    score: {
      type: Number,
      // default: 0.6
    }
  },
  data() {
    return {
      liquidChart: null,
      timer: null
    };
  },
  mounted() {
    console.log(this.score)
    this.initOption();
  },
  watch: {
    score: {
      deep: true,
      handler(val) {
        console.log('sitmap watch!')
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions(val) {
      let option = {
        series: [
          {
            type: "liquidFill",
            data: [
              {
                name: "总分",
                value: this.score
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
        document.querySelector("#situation-score-chart")
      );
      this.setOptions();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 20px;
}
</style>
