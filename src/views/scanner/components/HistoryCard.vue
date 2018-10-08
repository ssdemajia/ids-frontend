<template>
   <el-card>
      <div slot="header">扫描历史记录</div>
    <el-row>
      <el-table
      :data="$store.state.record.records">
      <el-table-column
        prop="ip"
        label="设备IP地址"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="信息"
      >
        <template slot-scope="scope">
          {{ scope.row.profile }}
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button @click="show(scope.row)" type="primary" icon="el-icon-search" circle></el-button>
          <el-button @click="del(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-row>
   </el-card>
</template>
<script>
import { deleteRecord } from "@/api/scan";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('getRecords');
  },
  props: {
    
  },
  computed: {
    profile() {
      
    }
  },
  methods: {
    del(record) {
      console.log('delete:', record)
      deleteRecord(record.ip).then(res => {
        this.$store.commit('DELETE_RECORD', record)
      })
    },
    show(record) {
      console.log('show:', record)
      this.$store.commit('SET_CURRENT_RECORD', record)
    }
  }
};
</script>
<style>
.title {
  margin: 0px;
  color: #606266;
  background-color: #fff;
  padding: 5px;
  line-height: 23px;
  text-align: center;
  font-size: 1.2em;
  font-weight: 500;
}
</style>
