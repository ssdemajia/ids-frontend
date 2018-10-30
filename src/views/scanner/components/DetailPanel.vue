<template>
  <div class="detail-container">
    <div class="container-header">
      <div class="container-header-name">{{ task.name }}</div>
      <div class="container-header-date">{{ task.date }}</div>
    </div>
    <el-collapse v-model="activeIP" accordion>
        <el-collapse-item v-for="result in task.result" :key="result.address" :name="result.ip">
          <template slot="title">
            <div class="collapse-item-title">
              设备
              <span class="ip"> IP:{{ result.ip }} </span>
              <span class="profile">型号:{{ result.info.profile }} </span> 
              <span class="address">位置: {{ result.address }}</span> 
              <el-tag :type="getTagType(result.vul_cat)">{{ setLevel(result.vul_cat) }}</el-tag>          
            </div>
          </template>
          <div v-for="(value, key) in getFormatInfo(result.info)" :key="key">
            <span class="info-key">{{ key }}:</span> <span> {{ value }} </span>
          </div>
          <div class="vul-button-wrapper">
            <el-button class="vul-button" @click="showVuls" type="primary" plain>查看漏洞信息</el-button>
          </div>
        </el-collapse-item>
    </el-collapse>
    <vul-table 
      :isVisible="isVulDetailVisible" 
      :vuls="current_vuls"
      @vul-table-close='handlerClose'/>
  </div>
</template>

<script>
import VulTable from './VulTable'
import { getVuls } from "@/api/scan";
export default {
  props: {
    task: Object
  },
  data() {
    return {
      activeIP: "",
      isVulDetailVisible: false,
      tag: {
        style: "danger",
        text: "紧急"
      },
      current_vuls: []
    };
  },
  components: {
    VulTable
  },
  methods: {
    handlerClose() {
      console.log('cao')
      this.isVulDetailVisible = false
    },
    getTagType(vul_cat) {
      let result = 0;
      vul_cat.forEach(vul => {
        result += vul;
      });
      if (result >= 15) {
        return "danger";
      } else if (result >= 10 && result < 15) {
        return "warning";
      } else if (result >= 5 && result < 10) {
        return "info";
      } else if (result > 0 && result < 5) {
        return "";
      } else {
        return 'success';
      }
    },
    setLevel(vul_cat) {
      let result = 0;
      vul_cat.forEach(vul => {
        result += vul;
      });
      if (result >= 15) {
        return "紧急";
      } else if (result >= 10 && result < 15) {
        return "高危";
      } else if (result >= 5 && result < 10) {
        return "中危";
      } else if (result > 0 && result < 5) {
        return "低危";
      } else {
        return "健康";
      }
    },
    showVuls() {
      getVuls(this.activeIP).then(response => {
        let vuls = response.result;
        if (vuls.length == 0) {
          this.$message({
            message: "该设备当前无漏洞",
            showClose: true,
            duration: 1500
          });
          return;
        }
        this.current_vuls = vuls;
        this.isVulDetailVisible = true;
      });
    },
    getFormatInfo(info) {
      let result = {};
      for (let key in info) {
        if (key === "key") {
          continue;
        }
        if (info[key].length == 0) {
          result[key] = "无";
          continue;
        }
        result[key] = info[key];
      }
      return result;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.container-header {
  font-size: 28px;
  text-align: center;
  margin-bottom: 14px;
  .container-header-name {
    float: left;
    margin: 0px;
    width: calc(100% - 100px);
  }
  .container-header-date {
    font-size: 16px;
    margin-left: calc(100% - 100px);
    width: 100px;
  }
}
.collapse-item-title {
  padding-left: 18px;
  .ip,
  .profile,
  .address {
    margin-right: 20px;
  }
}
.info-key {
  display: inline-block;
  width: 90px;
  text-align: right;
  margin-right: 20px;
}
.vul-button-wrapper {
  margin: 10px auto;
  width: 100px;
}
</style>

