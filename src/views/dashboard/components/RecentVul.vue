<template>
  <div class="table-container">
    <div class="header">
      <p>最新漏洞信息</p>
    </div>
    <div class="content">
      <table class="table-content" style="border-collapse: collapse; padding: 0;">
        <tr class="table-header">
          <th class="name-header">漏洞名</th>
          <th class="date-header">公布时间</th>
          <th class="level-header">危险级别</th>
        </tr>
        <tr class="table-row" v-for="vul in vuls" :key="vul.title">
          <td class="name-col">{{ vul.title }}</td>
          <td class="date-col">{{ vul.date }}</td>
          <td class="level-col">
            <span :class="levelTag(vul.level)">{{ vul.level }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
  
</template>
<script>
import { getVulTop } from "@/api/count"
export default {
  data() {
    return {
      vuls: [
        {
          vul_name: null,
          vul_time: 0,
          level: 0
        }
      ]
    };
  },
  methods: {
    levelTag(level) {
      if (level == '高') {
        return 'level-tag-3';
      }else if (level=='中') {
        return 'level-tag-2';
      }else {
        return 'level-tag-1';
      }
    }
  },
  mounted() {
    getVulTop().then((response) => {
      this.vuls = response.result
      this.vuls.filter((item) => {
        item.level = item.level[0]
      })
    })
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  // display: flex;
  width: 100%;
  color: white;
  .header {
    border: 2px solid #409eff;
    border-left: none;
    border-right: none;
    width: 100%;
    p {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin: 12px auto;
    }
  }
  .content {
    table-layout: fixed;    
    padding: 12px;
    padding-top: 0px;
    .table-content {
      width: 100%;
      font-size: 14px;
      .table-header {
        .name-header {
          padding: 14px;
          width: 70%;
          text-align: left;
          border-bottom: 1px solid #fff;
        }
        .date-header {
          width: 18%;
          text-align: left;
          border-bottom: 1px solid #fff;
        }
        .level-header {
          width: 8%;
          text-align: left;
          border-bottom: 1px solid #fff;
        }
      }
      .table-row {
        // height: 24px;
        .name-col {
          line-height: 20px;
          padding-top: 12px;
          padding-bottom: 12px;
          padding-right: 6px;
          text-align: left;
        }
        .date-col {
          text-align: left;
        }
        .level-col {
          text-align: center;
          .level-tag-1 {
            color: #409eff;
          }
          .level-tag-2 {
            color: aqua;
          }
          .level-tag-3 {
            color: red;
          }
        }
      }
    }
  }
}
</style>
