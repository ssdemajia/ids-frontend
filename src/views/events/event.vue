<template>
  <div class="event-container">
    <el-row  :gutter="20" class="grid-content">
      <el-col :span="6" :offset="9">
        <el-button type="primary" @click="previousEvent">上一个事件</el-button>
        <el-button type="primary" @click="nextEvent">下一个事件</el-button>
        </el-col>
      
    </el-row>
    <el-row class="meta">
      <el-col :span="24">
        <el-table
          :border="true"
          :data="event">
          <el-table-column
          
            label="序号"
            prop="cid">
          </el-table-column>
          <el-table-column
            label="告警信息"
            style="width: 100;"
            prop="sig_name">
          </el-table-column>
          <el-table-column
            label="时间"
            prop="timestamp">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="ip">
      <el-col :span="24">
        <el-table
          :border="true"
          :data="ip">
          <el-table-column
            label="IP 源地址"
            prop="ip_src">
          </el-table-column>
          <el-table-column
            label="IP 目的地址"
            prop="ip_src">
          </el-table-column>
          <el-table-column
            label="IP版本号"
            prop="ip_ver">
          </el-table-column>
          <el-table-column
            label="IP头部长度"
            prop="ip_hlen">
          </el-table-column>
          <el-table-column
            label="IP TOS"
            prop="ip_tos">
          </el-table-column>
          <el-table-column
            label="IP数据包长度"
            prop="ip_len">
          </el-table-column>
          <el-table-column
            label="IP 序号(id)"
            prop="ip_id">
          </el-table-column>
          <el-table-column
            label="IP标志位"
            prop="ip_flags">
          </el-table-column>
          <el-table-column
            label="IP偏移"
            prop="ip_off">
          </el-table-column>
          <el-table-column
            label="IP TTL"
            prop="ip_ttl">
          </el-table-column>
          <el-table-column
            label="IP校验和"
            prop="ip_csum">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="proto4-icmp" v-if="protocol=='ICMP'">
      <el-col :span="24">
        <el-table
          :border="true"
          :data="proto4">
          <el-table-column
            label="ICMP类型"
            prop="icmp_type">
          </el-table-column>
          <el-table-column
            label="ICMP代码"
            prop="icmp_code">
          </el-table-column>
          <el-table-column
            label="ICMP校验和"
            prop="icmp_csum">
          </el-table-column>
          <el-table-column
            label="ICMP序号(id)"
            prop="icmp_id">
          </el-table-column>
          <el-table-column
            label="ICMP校验和"
            prop="icmp_csum">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="proto4-udp" v-if="protocol=='UDP'">
      <el-col :span="24">
        <el-table
          :border="true"
          :data="proto4">
          <el-table-column
            label="UDP源端口"
            prop="udp_sport">
          </el-table-column>
          <el-table-column
            label="UDP目的端口"
            prop="udp_dport">
          </el-table-column>
          <el-table-column
            label="UDP校验和"
            prop="udp_csum">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row class="proto4-tcp" v-if="protocol=='TCP'">
      <el-col :span="24">
        <el-table
          :border="true"
          :data="proto4">
          <el-table-column
            label="TCP源端口"
            prop="tcp_sport">
          </el-table-column>
          <el-table-column
            label="TCP目的端口"
            prop="tcp_dport">
          </el-table-column>
          <el-table-column
            label="TCP序列号"
            prop="tcp_seq">
          </el-table-column>
          <el-table-column
            label="TCP ACK"
            prop="tcp_ack">
          </el-table-column>
          <el-table-column
            label="TCP偏移(off)"
            prop="tcp_off">
          </el-table-column>
          <el-table-column
            label="TCP RES"
            prop="tcp_res">
          </el-table-column>
          <el-table-column
            label="TCP标识符"
            prop="tcp_flags">
          </el-table-column>
          <el-table-column
            label="TCP窗口大小"
            prop="tcp_win">
          </el-table-column>
          <el-table-column
            label="TCP校验和"
            prop="tcp_csum">
          </el-table-column>
          <el-table-column
            label="TCP带外数据"
            prop="tcp_urp">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getEventDetail } from '@/api/event'
function ParseError(message) {
  this.message = message || '解析服务器协议错误'
  this.name = 'ParseError'
}
ParseError.prototype = new Error()
ParseError.prototype.constructor = ParseError
export default {
  name: 'event',
  data() {
    return {
      ip:[],
      proto4: [],
      cid: -1,
      protocol: "",
      event:[]
    }
  },
  methods: {
    getProtocol(cid) {
      var _this = this
      const _cid = this.$store.state.event.current_event.cid
      getEventDetail(cid).then(response => {
        _this.cid = cid
        _this.event= this.parseEvent(response.event)
        _this.event.cid = cid
        _this.protocol = response.protocol
        _this.ip = this.parseIP(response.ip)
        _this.proto4 = this.parseProto4(response.proto4, response.protocol)
        console.log(_this.event);
        console.log(_this.ip);
        console.log(_this.proto4);
        
      }).catch(error => {
        console.log(error)
      })
    },
    parseEvent(event) {
      if (event.length == 0) {
        return [{
          sig_name: "不明规则触发"
        }]
      }
      return [{
        sid: event[0],
        cid: event[1],
        sig_name: event[2],
        sig_class_id: event[3],
        sig_priority: event[4],
        timestamp: event[5],
        ip_proto: event[6]
      }]
    },
    parseProto4(proto4, proto) {
      if (proto === "ICMP") {
        return this.parseICMP(proto4)
      } 
      else if (proto === "UDP") {
        return this.parseUDP(proto4)
      }
      else if (proto === "TCP") {
        return this.parseTCP(proto4)
      }
      else {
        throw new ParseError("一个不了解的参数proto:"+proto)
      }
    },
    parseIP(ip_arr) {
      return [{
        ip_src: ip_arr[0],
        ip_dst: ip_arr[1],
        ip_ver: ip_arr[2],
        ip_hlen: ip_arr[3],
        ip_tos: ip_arr[4],
        ip_len: ip_arr[5],
        ip_id: ip_arr[6],
        ip_flags: ip_arr[7],
        ip_off: ip_arr[8],
        ip_ttl: ip_arr[9],
        ip_csum: ip_arr[10]
      }]
    },
    parseUDP(udp_arr) {
      return [{
        udp_sport: udp_arr[0],
        udp_dport: udp_arr[1],
        udp_len: udp_arr[2],
        udp_csum: udp_arr[3]
      }]
    },
    parseTCP(tcp_arr) {
      return [{
        tcp_sport: tcp_arr[0],
        tcp_dport: tcp_arr[1],
        tcp_seq: tcp_arr[2],
        tcp_ack: tcp_arr[3],
        tcp_off: tcp_arr[4],
        tcp_res: tcp_arr[5],
        tcp_flags: tcp_arr[6],
        tcp_win: tcp_arr[7],
        tcp_csum: tcp_arr[8],
        tcp_urp: tcp_arr[9]
      }]
    },
    parseICMP(icmp_arr) {
      return [{
        icmp_type: icmp_arr[0],
        icmp_code: icmp_arr[1],
        icmp_csum: icmp_arr[2],
        icmp_id: icmp_arr[3],
        icmp_seq: icmp_arr[4]
      }]
    },
    previousEvent() {
      this.cid-=1
      this.getProtocol(this.cid)
    },
    nextEvent() {
       this.cid+=1
      this.getProtocol(this.cid)
    }
  },
  created() {
    var cid = this.$route.params.id;
    this.getProtocol(parseInt(cid))
  },
  // watch: {
  //   $route(to, from) {
  //     console.log("watching you "+to+from)
  //     console.log(to)
  //     console.log(from)
  //   }
  // }
}
</script>

<style scoped>
.menu{
  margin-left: 10px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin: 15px;
}
.meta {
  margin: 15px;
}
.ip {
  margin: 15px;
}
.proto4-icmp {
  margin: 15px;
}
.proto4-tcp {
  margin: 15px;
}
.proto4-udp {
  margin: 15px;
}
</style>

