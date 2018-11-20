<template>
  <div class="score-col-container">
    <div class="score-item" v-for="item in data" :key="item.name">
      <span>{{item.name}}:</span>
      <count-to 
        class="score-item-value" 
        :startVal="0" 
        :endVal="item.value" :duration="2600"></count-to>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  props: {
    data: Array
  },
  components: {
    CountTo
  }
}
</script>

<style lang='scss' scoped>
.score-col-container {
  width: 100px;
  color: white;
  .score-item {
    background-color: #2f21c4;
    border-radius: 6px;
    margin: 20px 0;
    line-height: 36px;
    font-size: 16px;
    text-align: center;

    .score-item-value {
      color: #20ff4d;
    }
  }
}
</style>
