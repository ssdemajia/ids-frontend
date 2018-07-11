<template>
<div class="EventContent">
  <el-table 
    :border="true"
    :height="auto"
    :data="Events"
    style="width: 100%">
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
      prop="timestamps">
    </el-table-column>
    <el-table-column
      label="来源地址"
      prop="ip_src">
    </el-table-column>
    <el-table-column
      label="目的地址"
      prop="ip_dst">
    </el-table-column>
    <el-table-column
      label="协议类型"
      prop="protocol">
    </el-table-column>
        <el-table-column
      label="威胁等级"
      >
      <template slot-scope="scope">
        <el-tag :type="priority_map[scope.row.sig_priority]">优先级:{{scope.row.sig_priority}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right">
      <template slot-scope="scope">
        <el-button @click="handler(scope.row)" type="primary" round>详细</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
>
  
</el-pagination>
</div>
  
</template>

<script>
export default {
  methods: {
    handler(row) {
      this.$router.push('/event/' + row.cid)
    },
    getHeight() {
      return 800
    }
  },
  data() {
    this.levels = [

    ]
    return {
      cid: 0,
      loading: false,
      Events: [],
      priority_map :{
        1:"info",
        2:"warning",
        3:"danger"
      }
    }
  },
  mounted: function() {
    // console.log('lalalala')
    this.loading = true
    this.$store.dispatch('GetEventFromServer', 0).then(()=> {
      this.loading = false     
      this.Events = this.$store.state.event.events
    }).catch((error) => {
      this.loading = false
      console.log(error)
    })
  },
  computed: {
  }
}
</script>

<style lang="scss">
// .level-icon {
//   margin: 20px;
//     height: 110px;
//     text-align: center;
//     width: 110px;
//     float: left;
//     font-size: 30px;
//     color: #24292e;
//     cursor: pointer;
// }
// span {
//     display: block;
//     font-size: 24px;
//     margin-top: 10px;
//   }
</style>
