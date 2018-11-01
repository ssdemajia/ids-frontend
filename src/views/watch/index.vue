<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-form ref="form" :inline="true" :model="form" class="packet-form" size="mini">
          <el-form-item  label="捕获数量">
            <el-input v-model="form.count" placeholder="数据包数量不能超过500" ></el-input>
          </el-form-item>
          <el-form-item  label="选择接口">
            <el-select class="control-select" v-model="form.interface" placeholder="请选择端口">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="start">开始</el-button>
            <el-button type="primary" @click="flash">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="20">
        <el-row>
          <el-table
          height="820"
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
              :show-overflow-tooltip="true"
              label="信息"
              prop="info">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="itemTotal"
            :page-size="itemPerPage"
            @current-change="handleCurrentChange"
            >
          </el-pagination>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { monitorInterface, startMonitor, getPacket } from '@/api/watch'
export default {
  data() {
    return {
      options: [],
      pcap: [],
      // pcapMaxLen: 400,
      form: {
        count:0,
        interface:null
      },
      itemPerPage: 20,
      itemTotal: 0,
      currentPage: 1,
      timer: null
    }
  },
  mounted() {
    new Promise((resolve, reject) => {
      monitorInterface().then(response => {
        this.options = response.result  
        // console.log(this.Interface)
        if (this.form.interface == null && this.options.length != 0) {
          this.form.interface = this.options[0].value
          // console.log(this.Interface.value)
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    this.timer = null
  },
  methods: {
    handleCurrentChange(index) {
      console.log(index)
      var { start, end } = this.calRange(index)
      getPacket(start, end).then((response) => {
        this.pcap = response.result
        this.itemTotal = response.count
        if (response.count < this.itemPerPage) {
          this.itemTotal = this.itemPerPage
        }
        this.currentPage = index
      })
    },
    start() {
      // console.log(this.form.count + this.form.interface)
      startMonitor(this.form.count, this.form.interface).then((response) => {
        this.timer = setTimeout(this.flash, 1000);
      })
    },
    flash() {
      var { start, end } = this.calRange()
      getPacket(start, end).then((response) => {
        console.log(response)
        this.pcap = response.result
        this.itemTotal = response.count
        console.log(response.count, this.form.count)
        if (response.count < this.itemPerPage) {
          this.itemTotal = this.itemPerPage
        }
        if (this.itemTotal >= parseInt(this.form.count)) {
          clearTimeout(this.timer)
          this.timer = null
        }
        else {
          setTimeout(this.flash, 1000);
        }
      })
    },
    calRange(index) {
      if (index == undefined) {
        index = this.currentPage
      }
      var start = (index-1) * this.itemPerPage
      var end = index * this.itemPerPage
      return { start, end }
    }
  },

}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f0f2f5;
  padding: 20px;

}
.el-input {
  width: 195px;
}
</style>
