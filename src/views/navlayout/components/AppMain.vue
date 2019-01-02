<template>
  <div class="main">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.main {
  height: calc(100% - 56px);
  margin-top: 56px;
}
</style>
