<template>
  <div id="app">
    <router-view id="Router"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (this.$route.meta.title) document.title = this.$route.meta.title
  }
}
</script>

<style>
@import "assets/css/base.css";
@import "assets/icon/iconfont.css";
</style>
