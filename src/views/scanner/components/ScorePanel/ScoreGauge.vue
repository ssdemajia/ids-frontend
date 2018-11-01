<template>
  <div class="score-gauge" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from "echarts";
import { getIntrusionLoc } from "@/api/info";
require("echarts/map/js/world.js");
require("echarts/map/js/china.js");
import { debounce } from "@/utils";

export default {
  props: {
    detailVaule: {  // 用于标题下面的安全系数分数
      type: Number,
      default: 80
    },
    autoResize: {
      type: Boolean,
      default: true
    },

  },
  data() {
    return {
      width: "100%",
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
    window.addEventListener("resize", this.__resizeHanlder);
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
    detailVaule: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.querySelector(".score-gauge"));
      this.setOptions(this.chartData);
    },
    setOptions(detailVaule) {
      this.chart.setOption({
        backgroundColor: "#fff",
        series: [
          {
            name: '刻度',
            type: 'gauge',
            radius: '83%',
            center: ['60%', '50%'],
            min:0,//最小刻度
            max:10,//最大刻度
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1,'rgba(0,0,0,0)']]
              }
            },
            //仪表盘轴线
            axisLabel: {
              show: true,
              color:'#828080',
              distance:23,
            },
            //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {          
                width: 1,
                color: '#828080'
              },
              length: -8
             },
             //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: '#828080'
              }
            },//分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            type: 'gauge',
            radius: '62%',
            center: ['60%', '50%'],
            splitNumber: 0, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 15,
                color: [
                [
                  this.detailVaule/100, new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, 
                    [
                      {offset: 0, color: '#5c53de'},
                      {offset: 1, color: '#18c8ff'}
                    ]
                  )
                ],
                [
                  1, '#413e54'
                ]
              ]
              }
            },//分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, '-26%'], // x, y，单位px
              textStyle: {
                color: '#828080',
                fontSize: 18
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, '16%'],
              color: '#000',
              formatter: function(params) {
                return params
              },
              textStyle: {
                fontSize: 42,
                color: '#000'
              },
            },
            data: [{
              name: "安全系数",
              value: this.detailVaule
            }]
          }
        ] // series end
      })
    }, // setOptions end
  }
};
</script>
