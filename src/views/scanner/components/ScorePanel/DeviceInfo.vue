<template>
  <div class='device-container'>
    <el-row>
      <el-col :span="12">
        <div>
          <span class="key">IP: </span>{{data.ip}} 
        </div>
        <div>
          <span class="key">Port:</span>{{data.port}}
        </div>
        <div>
          <span class="key">Address:</span>{{data.address}}
        </div>
      </el-col>
      <el-col :span="12">
        <div v-for="(v, k) in getInfo()" :key="k">
          <span class="key">{{k}}:</span> {{v}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    getInfo() {
      var infos = this.data.info;
      let result = {};
      for (let key in infos) {
        if (key === "key" || key === "profile") {
          continue;
        }
        if (!infos[key]) {
          result[key] = '无'
        }
        else if (infos[key].length === 0) {
          result[key] = '无'
        }
        else {
          result[key] = infos[key];
        }
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.key {
  display: inline-block;
  width: 80px;
  line-height: 24px;
}
</style>

