<template>
  <div>
    <div class="error">
      <p style="font-size: 100px">404</p>
      <p>页面走丢了哦T.T</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style scoped>
.error{
  width: 1000px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -500px;
  margin-top: -300px;
  font-size: 62px;
  font-weight: bold;
  text-align: center;
}
</style>
