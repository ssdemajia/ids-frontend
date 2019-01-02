<template>
  <div class="container">
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="banner">
          全球工控设备搜索
        </div>
        <div class="input-form">
          <input 
            class="input" 
            autofocus="autofocus" 
            placeholder="输入设备型号、厂商等"
            @keyup.enter="enterSearch"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    enterSearch(event) {
      console.log(event.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-image: url(/src/assets/ics-min.jpg);
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
    // z-index: 0;
  }
  .banner {
    color: #e7e7e7;
    text-align: center;
    font-size: 36px;
    margin-top: 35%;
    margin-bottom: 16px;
  }
  .input-form {
    box-shadow: 0 0 10px  rgba(150, 150, 150, 0.8);
    .input {
      border-radius: 5px;
      height: 100%;
      width: 100%;
      color: #333333;
      background-color: #e7e7e7;
      border: none;
      padding: 16px;
      height: 24px;;
      &:focus {
        border: 1px solid #000;
        outline: none;
      }
    }
  }
}
</style>
