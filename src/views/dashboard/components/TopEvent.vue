<template>
  <div class="table-container">
    <div class="header">
      <p>入侵事件统计</p>
    </div>
    <div class="content">
      <table class="table-content" style="border-collapse: collapse; padding: 0;">
        <tr class="table-header">
          <th class="name-header">事件名</th>
          <th class="count-header">事件数量</th>
        </tr>
        <tr class="table-row" v-for="event in events" :key="event.name">
          <td class="name-col">{{ event.name }}</td>
          <td class="count-col">{{ event.count }}</td>
        </tr>
      </table>
    </div>
  </div>
  
</template>
<script>
import { getEventTopCountByNum } from "@/api/count";
export default {
  data() {
    return {
      events: [
        {
          name: "",
          count: 0
        }
      ]
    };
  },
  mounted() {
    getEventTopCountByNum(10).then(response => {
      let counts = response.counts;
      this.events = [];
      counts.forEach(element => {
        this.events.push({
          name: element[0],
          count: element[1]
        });
      });
    });
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
    padding: 12px;
    padding-top: 0px;
    .table-content {
      width: 100%;
      font-size: 14px;
      .table-header {
        .name-header {
          padding: 14px;
          width: 85%;
          text-align: left;
          border-bottom: 1px solid #fff;
        }
        .count-header {
          width: 15%;
          text-align: left;
          border-bottom: 1px solid #fff;
        }
      }
      .table-row {
        .name-col {
          line-height: 20px;
          padding-top: 12px;
          padding-bottom: 12px;
          padding-right: 6px;
          text-align: left;
        }
        .count-col {
          text-align: left;
        }
      }
    }
  }
}
</style>
