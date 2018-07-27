<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-row>
          <el-col :span="8">
            <p class="control-tip">选择接口</p>
          </el-col>
          <el-col :span="16">
            <el-select class="control-select" v-model="Interface" placeholder="请选择端口">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="control-btn" :gutter="4">
          <el-col :span="12">
            <el-button type="primary" @click="start">开启监控</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" @click="stop">关闭监控</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="20">
        <el-table
          height="1080"
          :border="true"
          :data="pcap">
          <el-table-column
            label="序号"
            prop="id"
            width="80">
          </el-table-column>
          <el-table-column
            width="80"
            label="时间"
            prop="time">
          </el-table-column>
          <el-table-column
            width="80"
            label="长度"
            prop="length">
          </el-table-column>
          <el-table-column
            width="160"
            label="源地址"
            prop="src">
          </el-table-column>
          <el-table-column
            width="160"
            label="目的地址"
            prop="dst">
          </el-table-column>
          <el-table-column
            width="80"
            label="协议"
            prop="protocol">
          </el-table-column>
          <el-table-column
            label="信息"
            prop="info">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { monitorInterface, startMonitor, stopMonitor,  getPacket} from '@/api/watch'
export default {
  data() {
    return {
      options: [],
      Interface: null,
      pcap: [],
      timer: null,
      packet_id: 0,
      pcapMaxLen: 400
    }
  },
  mounted() {
    new Promise((resolve, reject) => {
      monitorInterface().then(response => {
        this.options = response.result  
        // console.log(this.Interface)
        if (this.Interface == null && this.options.length != 0) {
          this.Interface = this.options[0].value
          // console.log(this.Interface.value)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  methods: {
    start() {
      new Promise((resolve, reject) => {
        console.log("start monitor")
        startMonitor(this.Interface).then((response) => {
          
          if (response.result === "success") {
            resolve(response)
          }
          else {
            reject()
          }
        })
      }).then(() => {
        this.timer = setInterval(() => {
              new Promise((res, rej) => {
                getPacket(this.packet_id).then((resp) => {
                  this.pushCaps(resp.result)
                  // console.log(resp)
                })
              })
        }, 1000)
      })
    },
    stop() {
      console.log("stop!" + this.timer)
      clearInterval(this.timer)
      if (this.Interface) {
        stopMonitor(this.Interface)
      }
    },
    pushCaps(packets) {
      var len = packets.length
      if (this.pcap.length + len > this.pcapMaxLen) {
        this.pcap = this.pcap.concat(packets)
        this.pcap = this.pcap.slice(this.pcap.length + len - this.pcapMaxLen)
      } else {
        this.pcap = this.pcap.concat(packets)
      }
    }
  
  },
  watch: {
    Interface(val) {
      this.stop()
    }
  },
  beforeDestroy() {
    this.stop()
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f0f2f5;
  padding: 20px;
  .control-btn {
    margin-top: 20px;
  }
  .control-select {
    margin-right: 10px;
    margin-top: 5px;
  }
  .control-tip {
    margin-left: 10px;
  }
}
</style>
