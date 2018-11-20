<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
import { debounce } from "@/utils";
import { getSystemCount } from "@/api/situation";
export default {
  props: {
    autoResize: {
      type: Boolean,
      default: true
    },
    type: {
      type: String
    },
    className: {
      type: String,
      default: "trend-pi-chart"
    }
  },
  data() {
    return {
      width: "450px", // Todo 宽度设为100%会有问题
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
    getSystemCount(this.type).then(({ result }) => {

      let data = [];
      for (let key in result) {
        let kv = {};
        kv.name = key;
        kv.value = result[key];
        data.push(kv);
      }
      this.chartData = data;
      this.setOptions(this.chartData);
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
    type: {
      deep: true,
      handler(val) {

        this.setOptions(val);
      }
    }
  },
  methods: {
    initChart() {
      const chartDom = document.querySelector("."+this.className);

      this.chart = echarts.init(chartDom);
      this.setOptions();
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
            radius: "80%",
            center: ["50%", "55%"],
            data: value,

            label: {
              normal: {
                textStyle: {
                  color: "#fff"
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
                color: "#0c6bc5",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.6)"
              }
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      });
    }
  }
};
</script>
