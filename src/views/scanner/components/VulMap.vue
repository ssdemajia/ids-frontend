<template>
  <div class="container">
    <div class="header"><p>设备分布</p></div>
    <div :class="className" :style="{height:height,width:width}"></div>
  </div>
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
    },
    chartData: {
      type: Array,
      default: function() {
        return [{name:'ss', value:[123.2,23.2,100]}]
      }
    }
  },
  data() {
    return {
      width: "100%",
      height: "600px",
      chart: null,
    };
  },
  mounted() {
    this.initChart();
    this.chart.on('click', this.change_current_device)
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
    chartData: {
      deep: true,
      handler(val, oldVal) {
        if (oldVal.length === val.length) {
          return
        }
        this.setOptions(val);
      }
    }
  },
  methods: {
    change_current_device(params) {
      if (typeof params.data === "undefined") {
        return
      }
      let address = params.data.name;   // 实际点的name是这个设备的address属性
      if (typeof address === "undefined") {
        return
      }
      this.$store.commit('CHANGE_CURRENT_DEVICE', address);
      this.$store.commit('UPDATE_SCORE')
    },
    initChart() {
      this.chart = echarts.init(document.querySelector(".chart"));
      this.setOptions(this.chartData);
    },
    setOptions(value) {     
      let devices = this.convertData(value)
      this.chart.setOption({
        backgroundColor: "#fff",
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
          max: 20,
          splitNumber: 5,
          inRange: {
            color: ["#d94e5d", "#eac736", "#50a3ba"]
          },
          textStyle: {
            color: "#828080"
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
              areaColor: "#fbfbfb", //#1b1b1b
              borderColor: "#828080"
            },
            emphasis: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              areaColor: "#2f21c4"
            }
          }
        },  // geo end 

        series: [
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
              return 5 + val[2] / 1000; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false
              }
            },
            data: devices
          },
          {
            name: "设备",
            type: "scatter",
            coordinateSystem: "geo",
            data: devices,
            symbolSize: 14,
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
          },
        ] // series end
      })
    }, // setOptions end

    convertData(tasks) { 
      let res = [];
      for (let i = 0; i < tasks.length; i++) {  // 将所有tasks里的设备信息汇总
        res = res.concat(tasks[i].result)
      }
      this.$store.commit('UPDATE_DEVICES', res)
      let result = [];
      res.forEach(item => {
        let score = 0
        item.vul_cat.forEach(item => {
          score += item
        })
        result.push({
          name: item.address,
          value: [item.longitude, item.latitude, score] // 取出他们的漏洞数和经纬
        })
      })
      return result;
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  .header {
    margin-top: 5px;
    border: 2px solid #409eff;
    border-left: none;
    border-right: none;
    width: 100%;
    p {
      text-align: center;
      font-size: 18px;
      // font-weight: bold;
      margin: 12px auto;
    }
  }
}
</style>
