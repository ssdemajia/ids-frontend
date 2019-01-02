<template>
  <nav class="nav-container">
    <div class="nav-icon">
      <router-link to="/search">
        <svg-icon class="icon" icon-class="logo"/>
      </router-link>
    </div>
    <div class="nav-logo">
      <router-link to="/search">
        工控实验室
      </router-link>
    </div>
    <div class="nav-item" :class="{'active':(currentPage == 'search')}">
      <router-link to="/search">
        <svg-icon icon-class="search"/>搜索
      </router-link>
    </div>
    <div class="nav-item" >
      <router-link to="/situation">
        <svg-icon icon-class="shell"/>态势感知
      </router-link>
    </div>
    <div class="nav-item" :class="{'active':(currentPage == 'console')}">
      <router-link to="/console">
        <svg-icon icon-class="console"/>控制台
      </router-link>
    </div>
    <div class="nav-item" :class="{'active':(currentPage == 'setting')}">
      <router-link to="/setting">
        <svg-icon icon-class="setting"/>设置
      </router-link>
    </div>
    <div class="nav-search" v-if="canShowSearch">
      <input autofocus="autofocus" vmodel="searchValue" placeholder="输入modbus或siemens"/>
      <button >
        <svg-icon icon-class="search"/>
      </button>
    </div>
    <div class="nav-login"
      @click="logout"
    >
      退出登陆
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchValue: '',
      canShowSearch: true,
      currentPage: 'search'
    }
  },
  watch: {
    $route() {
      this.showNavSearch()
    }
  },
  methods: {
    logout() {
      // 退出登陆
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    showNavSearch() {
      // 是否显示搜索框
      if (this.$route.path == '/search') {
        this.canShowSearch = false;
      } else {
        this.canShowSearch = true;
      }
      if (this.$route.path.indexOf('search')!= -1) {
        this.currentPage = 'search';
      } else if (this.$route.path.indexOf('setting')!= -1) {
        this.currentPage = 'setting';
      } else if (this.$route.path.indexOf('console')!= -1) {
        this.currentPage = 'console';
      } else {
        this.currentPage = '';
      }
    }
  },
  created() {
    this.showNavSearch();
  },
};
</script>

<style lang="scss" scoped>
$height: 56px;  // NavBar的高度
$item-color: #e0e0e0;
.nav-container {
  border-bottom: 1px solid #444;
  height: $height;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #262626;
  .nav-icon {
    animation: rotation 4s linear infinite;
    padding: 4px;
    margin-left: 24px;
    .icon {
      color: white;
      height: $height - 8px;
      width: $height - 8px;
    }
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  .nav-logo {
    font-size: 24px;
    color: #e0e0e0;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    padding-top: $height / 4;
    margin-right: 56px;
  }
  .nav-item {
    color: $item-color;
    font-size: 16px;
    line-height: $height;
    padding: 0 16px;
    border-left: 1px solid #353535;
    vertical-align: middle;
    svg {
      margin-right: 4px;
    }
    &:hover  {
      color: white;
      background-color: #000;
    }
    &.active {
      color: white;
      background-color: #000;
    }
  }
  .nav-search {
    padding-top: 16px;
    margin-left: 16px;
    display: flex;
    input {
      width: 300px;
      border: 1px solid #000;
      border-radius: 0;
      height: 28px;
      font-size: 13px;
      color: #555;
      line-height: 24px;
      padding: 4px;
      outline: none;
    }
    button {
      height: 28px;
      width: 38px;
      border: 1px solid #555;
      outline: none;
      color: #e0e0e0;
      background-color: #555;
      &:active {
        color: white;
        background-color: #464646;
        border: 1px solid #464646;
      }
    }
  }
  .nav-login {
    position: fixed;
    color: $item-color;
    font-size: 16px;
    right: 10px;
    top: 16px;
    cursor: pointer;
    &:hover  {
      color: white;
    }
  }
}
</style>

