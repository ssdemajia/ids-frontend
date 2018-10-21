<template>
  <div id="infoCharts" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts';
import { debounce } from '@/utils';
import { getSystemSummary } from '@/api/info'

export default {
  data() {
    return {
      width: '100%',
      chart: null,
      chartData: {
        'cpu': [4, 5, 6, 5.3, 6.7],
        'mem': [20, 26.5, 28, 33, 35.4]
      },
      timer: null,
    }
  },
  computed: {
    height() {
      return `${document.documentElement.clientHeight/3}px`
    }
  },
  mounted() {
    this.timer = setTimeout(this.intervalGetInfo, 3000);
    this.initChart();
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHanlder)
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.timer) {
      return 
    } else {
      clearTimeout(this.timer)
    }
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
    intervalGetInfo() { //定时获取系统信息
      getSystemSummary().then(response => {
        if (this.chartData['cpu'].length == 5) { // 不超过5个时间段
          this.chartData['cpu'].shift()
          this.chartData['mem'].shift()
        }
        this.chartData['cpu'].push(response['cpu']);
        this.chartData['mem'].push(response['mem']);
        this.timer = setTimeout(this.intervalGetInfo, 3000);
      });
    },
    initChart() {
      let charts = document.querySelector('#infoCharts');
      this.chart = echarts.init(charts);
      this.setOptions(this.chartData);
    },
    setOptions(val) {
      var cpuData = val['cpu']
      var memData = val['mem']
      var option = {
        title: {
          text: '系统运行状态',
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          data: ['CPU使用率', '内存占用率'],
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ['前4小时','前3小时','前2小时','前1小时','当前'],
          axisLine: { lineStyle: { color: "white" } },
          axisLabel: { color: "white" }
        },
        yAxis: {
          splitLine: {show: false}, //  背景分割线
          type: 'value',
          axisLabel: {
            formatter: '{value}%',
            color: "white"
          },
          axisLine: { lineStyle: { color: "white" } },
          max: 100, // 最大值
        },
        series: [
          {
            name: 'CPU使用率',
            type: 'line',
            data: cpuData,
            // markPoint: {
            //   data: [
            //     {type: 'max', name:'最大值'},
            //     {type: 'min', name:'最小值'},
            //   ]
            // },
            markLine: {
              data: [
                {type: 'average', name:'平均值'},
              ]
            },
            itemStyle: {
              color: "#00ff00"
            },
            areaStyle: {}
          },
          {
            name: '内存占用率',
            type: 'line',
            data: memData,
            // markPoint: {
            //   data: [
            //     {type: 'max', name:'最大值'},
            //     {type: 'min', name:'最小值'},
            //   ]
            // },
            markLine: {
              data: [
                {type: 'average', name:'平均值'},
              ]
            },
            itemStyle: {
              color: "#6258C9",
            },
            areaStyle: {}
          },
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
