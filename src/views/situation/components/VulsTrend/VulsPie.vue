<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
import { getVulsCount } from "@/api/situation";
import { debounce } from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: "vuls-pie-chart"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      width: "450px",   // Todo 宽度设为100%会有问题
      height: "200px",
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
    if (window) {
      window.addEventListener("resize", this.__resizeHanlder);
    }
    
    getVulsCount().then(({ result }) => {
      this.chartData = result
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
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.querySelector(".vuls-pie-chart"));
      this.setOptions(this.chartData);
    },
    setOptions(value) {
      this.chart.setOption({

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/> {b} : {c} 例({d}%)"
        },
        series: [
          {
            name: "漏洞库",
            type: "pie",
            radius: "70%",
            center: ["50%", "55%"],
            data: [
              { value: value[1], name: "高危漏洞" },
              { value: value[2], name: "中危漏洞" },
              { value: value[3], name: "低危漏洞" }
            ],
            
          }
        ],
        label: {
          normal: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: "#c23131",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function(idx) {
          return Math.random() * 200;
        }
      });
    }
  }
};
</script>
