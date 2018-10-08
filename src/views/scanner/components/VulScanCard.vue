<template>
  <div>
    <el-card 
    class="box-card"
    v-loading="loading"
    
  >
    <div slot="header">漏洞扫描结果</div>
    <el-row>
      <el-table
      max-height="800"
      :data="$store.state.record.vuls">
      <el-table-column
        prop="title"
        label="扫描结果"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="详情"
        width="80"
      >
        <template slot-scope="scope">
          <el-button @click="showSpecify(scope.row)" type="primary" icon="el-icon-search" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-row>
  </el-card>
  <el-dialog
  title="漏洞详细信息"
  :visible.sync="dialogVisible"
  width="40%"
  >
  <ShowVul :vul="dialogData"></ShowVul>
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
  
</template>

<script>
import ShowVul from './ShowVul'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogData: {}
    };
  },
  props: {},
  methods: {
    showSpecify(vul) {
      this.dialogVisible = true
      this.dialogData = vul
    }
  },
  components:{
    ShowVul
  }
};
</script>
