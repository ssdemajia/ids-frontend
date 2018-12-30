<template>
  <div class="layout-container">
    <nav-bar />
    <app-main />
  </div>
</template>

<script>
import NavBar from  './components/NavBar';
import AppMain from  './components/AppMain';
export default {
  components: {
    NavBar,
    AppMain,
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100%;
}
</style>
