<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getCount } from '@/api/event'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      data: []
    }
  },
  mounted() {
    console.log("Get")
    
    getCount('tcp').then((response) => {
      console.log("TCP")
      console.log(response)
      this.data.push({
        value: response.count,
        name: "TCP"
      })
      getCount('icmp').then((response) => {
        console.log("icmp")
        this.data.push({
          value: response.count,
          name: "ICMP"
        })
        getCount('ip').then((response) => {
        console.log("ip")
        this.data.push({
          value: response.count,
          name: "IP"
        })
          getCount('udp').then((response) => {
            this.data.push({
              value: response.count,
              name: "UDP"
            })
            this.initChart()
            this.__resizeHanlder = debounce(() => {
            if (this.chart) {
              this.chart.resize()
            }
            }, 100)
            window.addEventListener('resize', this.__resizeHanlder)
          })
        })
      })
    })

      console.log("init")
      
    
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['TCP', 'UDP', 'IP', 'ICMP']
        },
        calculable: true,
        series: [
          {
            name: '协议类型分布',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.data,
              // { value: 320, name: 'Industries' },
              // { value: 240, name: 'Technology' },
              // { value: 149, name: 'Forex' },
              // { value: 100, name: 'Gold' },
              // { value: 59, name: 'Forecasts' }
              
            
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
