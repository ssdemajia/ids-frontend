<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";


export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "360px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }

    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);

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
    setOptions({ y_sig1, y_sig2, y_sig3, xdata } = {}) {
      this.chart.setOption({
        grid: {
          y: '6%',
          y2: '8%'
        },
        tooltip: {
          // trigger: "axis",
          // axisPointer: {
          //   type: "cross",
          //   label: {
          //     backgroundColor: "#ffffff"
          //   }
          // },
        },
        legend: {
          data: ["紧急事件", "中级事件", "警报"],
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xdata,
          axisLine: { lineStyle: { color: "white" } },
          axisLabel: { color: "white" }
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "white" } },
          splitLine: {show: false},
        },
        // grid: {
        //   left: "2%",
        //   right: "2%",
        //   bottom: "5%",
        //   top: "16%",
        //   containLabel: true
        // },
        series: [
          {
            name: "紧急事件",
            type: "line",
            stack: "总量",
            data: y_sig3,
            itemStyle: {
              lineStyle: {
                width: 4
              },
              color: "#00ff00"
            }
          },
          {
            name: "中级事件",
            type: "line",
            stack: "总量",
            data: y_sig2,
            itemStyle: {
              color: "#ff6600",
              lineStyle: {
                width: 4
              }
            }
          },
          {
            name: "警报",
            type: "line",
            stack: "总量",
            data: y_sig1,
            itemStyle: {
              color: "#2f21c4",
              lineStyle: {
                width: 4
              }
            }
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    }
  }
};
</script>

<style lang="scss" scoped>
.chart {
  
}
</style>
