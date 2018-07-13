<template>
  <el-card class="box-card-component">
    <div class="box-card-header">
      检测事件统计
    </div>
    <div>
      <div style="padding-top:35px;" class="progress-item">
        <span>TCP类型 </span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="TCPPercent"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkTCP" @change="protocolChange"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      <div style="padding-top:25px;" class="progress-item">
        <span>IP类型</span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="IPPercent"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkIP" @change="protocolChange"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      <div style="padding-top:25px;" class="progress-item">
        <span>UDP类型</span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="UDPPercent"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkUDP" @change="protocolChange"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      <div style="padding-top:25px;" class="progress-item">
        <span>ICMP类型</span>
        <el-row>
          <el-col :span="20">
            <el-progress :percentage="ICMPPercent"></el-progress>
          </el-col>
          <el-col :span="4">
            <el-checkbox v-model="checkICMP" @change="protocolChange"></el-checkbox>
          </el-col>
        </el-row>               
      </div>
      
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'summaryBox',
  data() {
    return {
      checkTCP: true,
      checkUDP: true,
      checkIP: true,
      checkICMP: true,
      // event_count: 0,
      // tcp_event_count: 0,
      // udp_event_count: 0,
      // icmp_event_count: 0,
      // ip_event_count: 0
    }
  },
  methods: {
    calPercent(a, b) {
      return Math.round(a/b*100)
    },
    protocolChange(row) {
      this.$store.commit("Protocol_Change", {
        tcp: this.checkTCP, 
        udp: this.checkUDP, 
        ip: this.checkIP, 
        icmp: this.checkICMP})
    }
  },
  computed: {
    TCPPercent() {      
      var event_count = this.$store.getters.getEventsCount
      var tcp_event_count = this.$store.getters.filterTCPEvent.length
      if (tcp_event_count == 0) {
        return 0
      }
      return this.calPercent(tcp_event_count, event_count)
    },
    UDPPercent() {
      var event_count = this.$store.getters.getEventsCount
      var udp_event_count = this.$store.getters.filterUDPEvent.length
      if (udp_event_count == 0) {
        return 0
      }
      return this.calPercent(udp_event_count, event_count)
    },
    ICMPPercent() {
      var event_count = this.$store.getters.getEventsCount
      var icmp_event_count = this.$store.getters.filterICMPEvent.length
      if (icmp_event_count == 0) {
        return 0
      }
      return this.calPercent(icmp_event_count, event_count)
    },
    IPPercent() {
      var event_count = this.$store.getters.getEventsCount
      var ip_event_count = this.$store.getters.filterIPEvent.length
      if (ip_event_count == 0) {
        return 0
      }
      return this.calPercent(ip_event_count, event_count)
    }
  },
  watch: {

  }
}
</script>
