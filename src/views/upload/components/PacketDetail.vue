<template>
  <div class="container">
    <el-dialog
      title="数据包详情"
      :visible="dialogVisible"
      @close="dialogVisible = false"
    >
    <div>
      <el-collapse accordion>
        <template v-for="layer in info">
          <el-collapse-item :key="layer.layer" :title="layer.layer">
            <div v-for="line in layer.fields" :key="layer.layer+line">
              <strong>{{ line.split(':')[0] }}:</strong>{{line.split(':')[1]}}
               <!-- {{ line }} -->
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">返回</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "packet-detail",
  props: {
    info: {
      type: Array,
      required: true
    },
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 800px
}
</style>

