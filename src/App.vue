<template>
  <div id="app">
    <router-view id="Router"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // if (this.$route.meta.title) document.title = this.$route.meta.title
    var HOST = require('./api/location-' + process.env.NODE_ENV).HOST
    var top = window.location.href
    top = top.split('//')[1].split('/')[0]
    if (top === HOST) {
      document.documentElement.style.visibility = 'visible'
    } else {
      window.location.href = `https://${HOST}`
    }
  }
}
</script>

<style>
@import "assets/css/base.css";
@import "assets/icon/iconfont.css";
  html{
    visibility: hidden;
  }
</style>
