<template>
  <div class="system-wrapper">
    <div class="header">
      <p>设备信息</p>
    </div>
    <div class="system-info-wrapper">
       <div class="system-info-container">
        <transition name='fade'>
          <div class="empty" v-if="IsCurrentDeviceInfoEmpty">
          <p>请选择地图中一个设备</p>
        </div>
        <div class="info" v-else>
          <div>
            <span class="item-key">IP: </span><span class="item-value">{{ systemInfo.ip}}</span>
          </div>
          <div>
            <span class="item-key">地理位置:</span><span class="item-value">{{ systemInfo.location.country_name }}</span>
          </div>
          <div v-for="(item, itemKey) in systemInfo.data" :key="itemKey">
            <span class="item-key">{{ itemKey }} :</span><span class="item-value">{{ item }}</span>
          </div>
        </div>
        </transition>
      </div>
    </div>
   
    
  </div>
</template>

<script>
export default {
  mounted() {},
  computed: {
    IsCurrentDeviceInfoEmpty() {
      //   判断是否为空
      const info = this.$store.state.situation.currentDeviceInfo;
      return Object.keys(info).length === 0;
    },
    systemInfo() {
      // return this.$store.state.situation.currentDeviceInfo
      const info = this.$store.state.situation.currentDeviceInfo;
      return info;
    }
  }
};
</script>

<style lang="scss" scoped>
.system-wrapper {
  height: 40vh;
  .header {
    border-top: 2px solid #409eff;
    margin-top: 24px;
    p {
      margin-top: -13px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
      background-color: #000;
      width: 180px;
      font-size: 26px;
      text-align: center;
      color: #fff;
    }
  }
  .system-info-wrapper {
    padding-top: 10px;
    padding-bottom: 10px;
    color: white; // 字体白色
    background-color: #262626;
    border-radius: 12px;

    .system-info-container {
      height: calc(40vh - 26px);
      overflow-y: auto;
      .empty {
        color: rgba(206, 206, 206, 0.4);
        font-size: 22px;
        text-align: center;
        padding: 120px 0;
      }
      .info {
        // 系统信息中每一行
        .item-key {
          display: inline-block;
          width: 180px;
          text-align: right;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.6);
          line-height: 28px;
          margin-top: 5px;
          margin-left: 20px;
        }
        .item-value {
          margin-top: 5px;
          margin-left: 15px;
        }
      }
      &::-webkit-scrollbar {
        // display: none;
        width: 5px;
        height: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
      }
    }
  }
}
</style>
