<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form class="form" :model="form" ref="form" label-width="100px">
          <el-form-item label="MongoDB">
            <el-input v-model="form.mongo"></el-input>
          </el-form-item>
          <el-form-item label="ElasticSearch">
            <el-input v-model="form.elasticsearch"></el-input>
          </el-form-item>
          <el-form-item label="Zmapd">
            <el-input v-model="form.zmapd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="promary" @click="onSubmit">
              修改
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSettings, setSettings } from '@/api/settings';

export default {
  data() {
    return {
      form: {
        mongo: '',
        elasticsearch: '',
        zmapd: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      setSettings(this.form).then(() => {
        this.$message('修改成功');
      })
    }
  },
  created() {
    getSettings().then(({ data }) => {
      for (let key in data) {
        this.form[key] = data[key];
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 24px;
}
</style>

