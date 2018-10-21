<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from "echarts";
import { getIntrusionLoc } from '@/api/info';  
require("echarts/map/js/world.js");
require("echarts/map/js/china.js");
import { debounce } from "@/utils";

// map data形式： {name:"海南",value:[经度，纬度，值]}
// chartData: [{name:"海南",value:[经度，纬度，值]}, {name:"海南",value:[经度，纬度，值]}]

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      width: "100%",
      height: "460px",
      chart: null,
      chartData: [],
    };
  },
  mounted() {
    this.initChart();
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHanlder)
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);

    getIntrusionLoc().then(response => {
      this.chartData = response.location
    })
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
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    setOptions(value) {
      this.chart.setOption({
        backgroundColor: "#404a59",
        title: {
          text: "入侵事件分布",
          subtext: "Intrusion event distribution",
          sublink: "/",
          x: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name + " : " + params.value[2]+'次';
          }
        },
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["pm2.5"],
          textStyle: {
            color: "#fff"
          }
        },
        visualMap: {
          min: 0,
          max: 800,
          calculable: true,
          inRange: {
            color: ["#50a3ba", "#eac736", "#d94e5d"]
          },
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          roam: true,
          map: "world",
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            name: "intrusion event",
            type: "scatter",
            coordinateSystem: "geo",
            data: value,
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1
              }
            }
          }
        ]
      });
    },
    
  }
};
</script>
