<template>
<div class="trend-line-container">
  <div :class="className" :style="{height:height,width:width}"></div>  
</div>
  
</template>

<script>
import echarts from "echarts";
import { debounce } from "@/utils";
import { getSystemInfoCount } from "@/api/situation";
import { systemVulsConstant } from '../../constant';
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
      width: "100%", // Todo 宽度设为100%会有问题
      height: "240px",
      chart: null,
      xData: [],
      yData: [],
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
    getSystemInfoCount().then(({ result }) => {
      this.xData = [];
      this.yData = [];
      systemVulsConstant.forEach(item => {
        if (item.query.length <= 0) {
          return;
        }
        this.xData.push(item.company);
        this.yData.push(result[item.query]);
      })
      this.setOptions();
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
  // watch: {
  //   type: {
  //     deep: true,
  //     handler(type) {
  //       this.setOptions(val);
  //     }
  //   }
  // },
  methods: {
    initChart() {
      this.chart = echarts.init(document.querySelector("." + this.className));

    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: "暴露公网设备数量",
          textStyle: {
            color: "#ccc"
          },
          left: "center"
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
          data: ["设备分布"]
        },

        grid: {
          left: "5%",
          right: "5%",
          top: "12%",
          bottom: "9%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xData,
            axisLabel: {
              textStyle: {                
                color: "#6a9cd5",
                margin: 10
              }
            },
            axisTick: {
              show: true,
              length: 200
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
            splitNumber: 5,
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
            name: "数量",
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgb(12,107,197)" },
                  { offset: 1, color: "#08447d" }
                ])
              }
            },
            label: {
              show: true,
              position: 'top',
              color: '#fff'
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgb(32,137,227)" },
                  { offset: 1, color: "#08447d" }
                ])
              }
            },
            barCategoryGap: '100%',
            data: this.yData
          },
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
