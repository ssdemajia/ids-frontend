<template>
  <div class="container">
    <div class="header">
      <p>入侵事件分布</p>
      <p class="sub-title">Intrusion event distribution</p>
    </div>
    <div class="map-wrapper">
      <intrusion-map></intrusion-map>
    </div>
    
  </div>
</template>

<script>
import IntrusionMap from './Map';
export default {
  components: {
    IntrusionMap
  }
}
</script>

<style lang="scss" scoped>
.container {
  .header {
    color: white;
    // border: 2px solid #409eff;
    border-left: none;
    border-right: none;
    padding-top: 12px;
    // margin-top: 12px;
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
