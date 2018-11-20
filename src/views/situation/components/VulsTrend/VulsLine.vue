<template>
<div class="vuls-line-container">
  <div class="vuls-line-chart" :style="{height:height,width:width}"></div>  
</div>
  
</template>

<script>
import echarts from "echarts";
import { getVulsDistribution } from "@/api/situation";
import { debounce } from "@/utils";

export default {
  props: {
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      width: "440px", // Todo 宽度设为100%会有问题
      height: "200px",
      chart: null,
      chartData: []
    };
  },
  mounted() {
    this.initChart();
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    if (window) {
      window.addEventListener("resize", this.__resizeHanlder);
    }

    getVulsDistribution().then(({ result }) => {
      this.chartData = result;
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }

    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.querySelector(".vuls-line-chart"));
      this.setOptions(this.chartData);
    },
    setOptions(value) {
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#3a4945"
            }
          }
        },
        legend: {
          textStyle: {
            color: "#fff"
          },
          data: ["低危漏洞", "中危漏洞", "高危漏洞"]
        },

        grid: {
          left: "0%",
          right: "2%",
          top: "12%",
          bottom: "19%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: value[0],
            axisLabel: {
              color: "#fff"
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#fff"
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "empty",
            fillerColor: "rgba(75,75,75,0.5)",
            borderColor: "#4B4B4B",
            dataBackground: {
              lineStyle: {
                color: "#2f4554",
                width: 0.5,
                opacity: 0.3
              },
              areaStyle: {
                color: "rgba(47, 69, 84, 0.3)",
                opacity: 0.3
              }
            }
          },
          {
            type: "inside",
            xAxisIndex: 0,
            filterMode: "empty"
          }
        ],
        series: [
          {
            name: "高危漏洞",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: value[1],
            symbol: "rect"
          },
          {
            name: "中危漏洞",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: value[2]
          },
          {
            name: "低危漏洞",
            type: "line",
            stack: "总量",
            areaStyle: {
              // color: '#000'
            },
            lineStyle: {},
            data: value[3]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.vuls-line-container {
  padding: 8px;
  padding-bottom: 0px;
}
</style>
