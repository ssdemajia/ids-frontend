<template>
   <div class="history-card-container">
     <el-card class="history-card">
      <div slot="header">扫描任务</div>
      <el-table
      :height="tableHeight"
      stripe
      :data="$store.state.task.tasks">
      <el-table-column 
        prop="name"
        label="任务名"
        width="200"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="进度"
      >
        <template slot-scope="scope">
          <el-progress :percentage="getPercentage(scope.row)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间"
      >
      </el-table-column>
      
      <el-table-column
        label="风险等级"
        width="80"
        >
        <template slot-scope="scope">
          <el-tag>{{ getLevel(scope.row) }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button @click="show(scope.row)" type="primary" icon="el-icon-search" circle></el-button>
          <el-button @click="show(scope.row)" type="success" icon="el-icon-caret-right" circle></el-button>
          <el-button @click="del(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
    <el-dialog
      width="50%"
      title="任务详情"
      :visible.sync="isDetailVisible"
    >
      <detail-panel :task="$store.state.task.current_task"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isDetailVisible = false">确 定</el-button>
      </span>
    </el-dialog>
   </div>
</template>
<script>
import DetailPanel from './DetailPanel'
import { deleteRecord } from "@/api/scan";
export default {
  data() {
    return {
      tableHeight: '750px',
      isDetailVisible: false,
      timer: null
    };
  },
  mounted() {
    this.timer = setTimeout(this.getTask, 1000);
    this.tableHeight = `${document.documentElement.clientHeight-250}px`;
  },
  props: {
    
  },
  computed: {
  },
  components: {
    DetailPanel
  },
  methods: {
    getTask(){
      console.log('lalalala');
      
      this.$store.dispatch('getTasks');
      this.timer = setTimeout(this.getTask, 1000);
    },
    del(task) {
      console.log('delete:', task)
      deleteRecord(task.name).then(res => {
        this.$store.commit('DELETE_RECORD', task)
      })
    },
    show(task) {
      this.isDetailVisible = true
      this.$store.commit('SET_CURRENT_TASK', task)
    },
    getLevel(tasks) {
      let results = tasks.result
      let score = 0
      results.forEach(result => {
        result.vul_cat.forEach(cat => score += cat)
      })
      return score
    },
    getPercentage(task) {
      if (task.status > 100) {
        return 100
      }
      return parseInt(task.status)
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
.history-card {
  margin-left: 10px;
}
</style>
