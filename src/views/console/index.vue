<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="6">
        <el-row class="control-bar">
          <el-button type="primary" @click="showDialog">创建新任务</el-button>
        </el-row>
        <el-row class="">
          <el-table 
            :data="jobs"
          >
            <!-- <el-table-column
              prop="id"
              label="ID"
            >
            </el-table-column> -->
            <el-table-column
              prop="name"
              label="名称"
            >
            </el-table-column>
            <el-table-column
              prop="port"
              label="端口"
            >
            </el-table-column>
            <el-table-column
              prop="time_remaining"
              label="剩余时间"
            >
            </el-table-column>
            <el-table-column
              prop="percent_complete"
              label="已完成"
            >
            </el-table-column>
            <el-table-column
              prop="percent_complete"
              label="已完成"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button @click="view(scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      title="创建新任务"
      :visible.sync="canShouldDialog"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="任务名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="目标端口">
          <el-input v-model="form.port" placeholder="80"></el-input>
        </el-form-item>
        <el-form-item label="扫描返回">
          <el-input v-model="form.subnets" placeholder="192.168.1.0/24"></el-input>
        </el-form-item>
        <el-form-item label="带宽">
          <el-input v-model="form.bandwidth"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="onSubmit">创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createJob, getJobs, deleteJob } from '@/api/console';
export default {
  data() {
    return {
      form: {
        name: '',
        port: 0,
        subnets: '',
        bandwidth: 1,
        white_list_file: '',
        black_list_file: '',
        verbosity: 3
      },
      canShouldDialog: false,
      timer: null, //定时拉取任务信息
      // jobs: {
      //   name: '',
      //   port: 0,
      //   status: 0,
      //   time_remaining: 0,
      //   percent_complete: 0,

      // }
      jobs: []
    }
  },
  methods: {
    showDialog() {
      this.canShouldDialog = true;
    },
    onSubmit() {
      createJob(this.form).then(() => {
        this.$message('创建成功');
        this.canShouldDialog = false;
      }).catch(() => {
        this.canShouldDialog = false;
      })
    },
    getAllJobs() {
      getJobs().then(({jobs}) => {
        this.jobs = jobs;
        setTimeout(this.getAllJobs, 1000);
      });
    },
    view(job) {
      console.log(job);
    },
    handleDelete(job) {
      deleteJob(job.id).then(() => {
        this.$message('成功删除');
      })
    }
  },
  created() {
    this.timer = setTimeout(this.getAllJobs, 2000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
</script>

<style lang="scss" scoped>
.control-bar {
  margin-top: 24px;
}
</style>
