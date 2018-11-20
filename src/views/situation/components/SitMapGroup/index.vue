<template>
  <div class="container">
    <div class="header">
      <p>工控设备分布</p>
      <p class="sub-title">Industrial Equipment Distribution</p>
    </div>
    <div class="map-wrapper">
      <sit-map height="calc(70vh - 53px)"></sit-map>
    </div>
    
  </div>
</template>

<script>
import SitMap from "./SitMap";

export default {
  components: {
    SitMap
  }
};
</script>

<style lang="scss" scoped>
.container {
  .header {
    color: white;
    border-left: none;
    border-right: none;
    padding-top: 12px;
    p {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin: 0px;
    }
    .sub-title {
      font-size: 10px;
      color:gray;
    }
  }
  .map-wrapper{
    padding: 8px;
  }
}
</style>
