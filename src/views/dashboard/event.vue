<template>
  <div class="event">
    <el-row class="Menu">
      <el-col><div class="bg-purple-dark"></div></el-col>
    </el-row>
    <el-row class="Meta">

    </el-row>
    <el-row class="IP">

    </el-row>
    <el-row class="Proto4">

    </el-row>
  </div>
</template>

<script>
import { getEventDetail } from '@/api/event'
export default {
  name: 'event',
  data() {
    return {
      ip:{},
      proto4: {},
      cid: -1,
      protocol: ""
    }
  },
  methods: {
    getProtocol(cid) {
      var _this = this
      const proto = this.$store.state.event.events[cid-1].protocol
      getEventDetail(cid, proto).then(response => {
        // console.log("response")
        // console.log(response)
        _this.cid = cid
        _this.protocol = proto
        _this.ip = response.ip
        _this.proto4 = response.proto4
      })
    }
  },
  created() {
    var cid = this.$route.params.id;
    this.getProtocol(parseInt(cid))
  }
}
</script>

<style>

</style>
