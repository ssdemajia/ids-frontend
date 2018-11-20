<template>
<div class="trend-line-container">
  <div :class="className" :style="{height:height,width:width}"></div>  
</div>
  
</template>

<script>
import echarts from "echarts";
import { debounce } from "@/utils";
import { getSystemDistribute } from "@/api/situation";

export default {
  props: {
    autoResize: {
      type: Boolean,
      default: true
    },
    type: String,
    className: {
      type: String,
      default: "trend-pi-chart"
    }
  },
  data() {
    return {
      width: "440px", // Todo 宽度设为100%会有问题
      height: "240px",
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
    getSystemDistribute(this.type).then(({ result }) => {
      console.log('distribute:', result)
      this.chartData[0] = result.date
      this.chartData[1] = []
      this.chartData[2] = []
      this.chartData[3] = []
      this.chartData[4] = []
      result['result'].forEach(element => {
        this.chartData[4].push(element['高危'])
        this.chartData[3].push(element['中危'])
        this.chartData[2].push(element['低危'])
        this.chartData[1].push(element['健康'])
      });
      this.setOptions(this.lineData);
    })
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
    type: {
      deep: true,
      handler(type) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.querySelector("." + this.className));

    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: "设备安全性趋势",
          textStyle: {
            color: "#ccc"
          },
          left: "right"
        },
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
          data: ["设备安全性"]
        },

        grid: {
          left: "0%",
          right: "2%",
          top: "12%",
          bottom: "9%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.chartData[0],
            axisLabel: {
              textStyle: {
                color: "#6a9cd5",
                margin: 15
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#233e64"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#233e64"
              }
            },
            axisLine: { show: false },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#6a9cd5"
              }
            },
            axisTick: { show: false }
          }
        ],

        series: [
          {
            name: "高危",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#08447d" },
                  { offset: 1, color: "rgb(12,107,197)" }
                ])
              }
            },
            data: this.chartData[4]
          },
          {
            name: "中危",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#0f78dd" },
                  { offset: 1, color: "rgb(12,107,197)" }
                ])
              }
            },
            data: this.chartData[3]
          },
          {
            name: "低危",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#1585f0" },
                  { offset: 1, color: "rgb(12,107,197)" }
                ])
              }
            },
            data: this.chartData[2]
          },
          {
            name: "健康",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2d91f1" },
                  { offset: 1, color: "rgb(12,107,197)" }
                ])
              }
            },
            data: this.chartData[1]
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
