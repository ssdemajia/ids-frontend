<template>
  <div class="system-vuls">
    <div class="system-vuls-container">
     <div class="header">设备漏洞</div>
    </div>
    <div class=system-vuls-list>
      <div 
        class="empty" 
        v-if="IsCurrentDeviceInfoEmpty">
          <p>请选择地图中一个设备</p>
      </div>
      <div
        v-else-if="IsVulsEmpty"
        class="empty" 
      >
        <p>该设备无已知漏洞</p>
      </div>
      <div 
        v-else
        class="list-item"
        v-for="vul in vuls" 
        :key='vul.cve'
        @click="() => handleClick(vul)"
      >
        <div class="item-header">
          <span :class="getLevel(vul.level[0])">{{ vul.level[0] }}</span>
          <span class="product">{{ vul.product }}</span>
          <span class="date">{{ vul.submit_date }}</span>
        </div>
          <transition name="fade">
            <div v-show="activeItem === vul.cve">
              <table class="specifyTable">
                <colgroup>
                  <col id="label">
                  <col id="descript">
                </colgroup>
                <tr>
                  <td class="key">CVE</td>
                  <td class="value">{{ vul.cve }}</td>
                </tr>
                <tr>
                  <td class="key">CNVD</td>
                  <td class="value">{{ vul.cnvd }}</td>
                </tr>
                <tr>
                  <td class="key">公开日期</td>
                  <td class="value">{{ vul.date }}</td>
                </tr>
                <tr>
                  <td class="key">危险级别</td>
                  <td :class="['value', getLevel(vul.level[0])]">{{ vul.level[0] }}</td>
                </tr>
                <tr>
                  <td class="key">漏洞信息</td>
                  <td class="value">{{ vul.description }}</td>
                </tr>
                <tr>
                  <td class="key">解决方案</td>
                  <td class="value">{{ vul.solve }}</td>
                </tr>
                <tr>
                  <td class="key">补丁信息</td>
                  <td class="value">{{ vul.patch }}</td>
                </tr>
                <tr>
                  <td class="key">验证信息</td>
                  <td class="value">{{ vul.verification }}</td>
                </tr>
                <tr>
                  <td class="key">参考链接</td>
                  <td class="value">{{ vul.link }}</td>
                </tr>
                </table>
              </div>
            </transition>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: ""
    };
  },
  mounted() {},
  methods: {
    getLevel(level) {
      const levels = {
        高: "level-high",
        中: "level-middle",
        低: "level-low"
      };
      return levels[level] + " level";
    },
    handleClick(item) {
      if (item.cve === this.activeItem) {
        this.activeItem = "";
      } else {
        this.activeItem = item.cve;
      }
    }
  },
  computed: {
    vuls() {
      return this.$store.state.situation.currentDeviceInfo.vuls;
    },
    IsVulsEmpty() {
      return this.$store.state.situation.currentDeviceInfo.vuls.length == 0;
    },
    IsCurrentDeviceInfoEmpty() {
      //   判断是否为空
      const info = this.$store.state.situation.currentDeviceInfo;
      return Object.keys(info).length === 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.system-vuls {
  margin-top: 40px;
  background-color: #262626;
  color: white;
  border-radius: 12px;
  height: 60vh;
  .header {
    color: rgba(206, 206, 206, 0.6);
    text-align: center;
    font-size: 18px;
    line-height: 36px;
  }
  .system-vuls-list {
    height: 60vh;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 5px;
      height: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
    }

    .empty {
      color: rgba(206, 206, 206, 0.4);
      font-size: 22px;
      text-align: center;
      padding: 120px 0;
    }

    .list-item {
      margin: 6px;
      border-radius: 8px;
      background-color: rgb(18, 18, 18);
      line-height: 24px;
      color: white;

      .item-header {
        padding: 8px;
        .level {
          vertical-align: middle;
          display: inline-block;
          height: 24px;
          width: 24px;
        }
        .product {
          vertical-align: middle;
          text-align: left;
          font-size: 16px;
          display: inline-block;
          height: 24px;
          width: 300px;
          overflow: hidden;
        }
        .date {
          display: inline-block;
          height: 24px;
          font-size: 14px;
        }
      }

      .specifyTable {
        background-color: #000;
        word-wrap: break-word;
        word-break: break-all;
        #label {
          width: 10%;
        }
        .key {
          color: rgba(255, 255, 255, 0.7);
          text-align: right;
          font-weight: 600;
        }
        .value {
          padding-left: 10px;
          width: 50%;
          line-height: 130%;
          word-wrap: break-word;
        }
      }
    }
  }
  .level-high {
    color: red;
  }
  .level-middle {
    color: orange;
  }
  .level-low {
    color: yellow;
  }
}
</style>
