<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from "echarts";
import { getIntrusionLoc } from "@/api/info";
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
    }
  },
  data() {
    return {
      width: "100%",
      height: "420px",
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

    getIntrusionLoc().then(response => {
      this.chartData = response.location;
    });
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
      this.chart = echarts.init(document.querySelector(".chart"));
      this.setOptions(this.chartData);
    },
    setOptions(value) {
      this.chart.setOption({
        backgroundColor: "#000",
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name + " : " + params.value[2] + "次";
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
          splitNumber: 8,
          inRange: {
            color: ["#d94e5d", "#eac736", "#50a3ba"]
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
          zoom: 2,
          center: [115.97, 29.71],
          itemStyle: {
            normal: {
              areaColor: "#000", //#1b1b1b
              borderColor: "#409eff"
            },
            emphasis: {
              areaColor: "#2f21c4"
            }
          }
        },
        series: [
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5 //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.3 //尾迹线条曲直度
              }
            },
            data: this.convertData(value)
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 8, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 10 //波纹圆环最大限制，值越大波纹越大
            },
            symbolSize: function(val) {
              return 4 + val[2] / 1000; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false
              }
            },
            data: value
          },
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
    convertData(data) { 
      // 转换为线段模式
      let res = [];
      const hangzhou = {
        name: '杭州',
        value: ['120.19', '30.26', 0]
      }
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        res.push({
          fromName: dataItem.name,
          toName: hangzhou.name,
          coords: [dataItem.value.slice(0,2), hangzhou.value.slice(0, 2)]
        })
      }
      return res;
    }
  }
};
</script>
