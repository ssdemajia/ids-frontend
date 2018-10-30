<template>
  <div class="vul-container">
    <el-dialog
      :close-on-click-modal="false"
      :before-close="handleBeforeClose"
      width="60%"
      height="800px"
      title="漏洞信息"
      :visible.sync="isVisible"
      append-to-body
    >
      <el-row>
        <el-col :span="12">
          <el-table
            :data="vuls"
            @row-click="handleClick">
            <el-table-column
              :show-overflow-tooltip="true"
              prop="title"
              label="简介"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="公布时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="level"
              width="80"
              label="危险级别">
              <template slot-scope="scope">
                <el-tag :type="computeLevel(scope.row.level)">{{ scope.row.level[0] }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <vul-detail :vul="current_vul"/>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeHandler">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VulDetail from './VulDetail'
export default {
  props: {
    isVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    vuls: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      levelToType: {
        高: "danger",
        中: "warning",
        低: "info"
      },
      current_vul: {},
    };
  },
  methods: {
    computeLevel(level) {
      level = level[0]; // 竟然是长度为4
      return this.levelToType[level];
    },
    handleClick(row, event, column) {
      this.current_vul = row
    },
    closeHandler() {
      this.$emit('vul-table-close')
    },
    handleBeforeClose(done) {
      this.$emit('vul-table-close')
      done()
    }
  },
  mounted() {
    this.current_vul = this.vuls[0]
  },
  components: {
    VulDetail
  }
};
</script>

<style>
</style>
