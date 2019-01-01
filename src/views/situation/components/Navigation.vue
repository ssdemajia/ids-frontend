<template>
  <nav class="situcation-nav">
    <div class="nav-item">
      <router-link to="/search"><svg-icon icon-class="search"/>搜索</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/console"><svg-icon icon-class="console"/>控制台</router-link>
    </div>
    <div class="nav-item">
      <router-link to="/setting"><svg-icon icon-class="setting"/>设置</router-link>
    </div>
  </nav>
</template>

<script>

export default {
  
}
</script>

<style lang="scss" scoped>
.situcation-nav {
  display: flex;
  flex-direction: row;
  .nav-item {
    margin: 8px 36px 0 36px; 
    flex: 1;
    a {
    font-size: 18px;
    color: white;
  }
  }
}
</style>

</style>
