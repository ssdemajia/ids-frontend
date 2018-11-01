<template>
  <div class="control-container">
    <div class="header">
      <el-button  size="medium" type="primary" @click="()=>{this.dialogVisible = true}">
      新建任务
      </el-button>
    </div>
    <el-dialog
      width="30%"
      title="新建任务"
      :visible.sync="dialogVisible"
    >
      <el-form>
        <el-form-item label="任务名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="设备IP地址">
          <el-input type="textarea" v-model="form.ips" placeholder="可以是多个IP地址，使用逗号区分"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTask" :loading="createTaskLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createTask } from '@/api/scan'

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        ips: '',
      },
      createTaskLoading: false
    }
  },
  methods: {
    createTask() {
      if (this.form.name.length == 0) {
        this.$message.error('任务名不能为空')
        return
      }
      if (this.form.ips.indexOf('，') != -1) {
        this.$message.error('请使用英文逗号')
        return
      }
      let ips = this.form.ips.split(',')
      if (ips.length == 0) {
        this.$message.error('请填入IP地址')
        return
      }
      let result = []
      let reg = /\s*(1\d{2}|2[0-5]{2}|[1-9]\d|[1-9]).(1\d{2}|2[0-5]{2}|[1-9]\d|\d).(1\d{2}|2[0-5]{2}|[1-9]\d|\d).(1\d{2}|2[0-5]{2}|[1-9]\d|\d)\s*/
      for (let i = 0; i < ips.length; i++) {
        if (reg.test(ips[i])) {
          result.push(ips[i].trim())
        }else {
          this.$message.error('请填入正确IP地址')
          return
        }
      }
      this.createTaskLoading = true
      createTask(this.form.name, result).then((response) => {
        this.createTaskLoading = false
        this.dialogVisible = false
      }).catch(err => {
        this.$message.error('任务名重复')
        this.createTaskLoading = false
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.control-container {
  margin: 10px;
  margin-top: 5px;
  text-align: center;
  .create-text {
    font-size: 24px;
    margin-right: 20px;
  }
}

</style>
