<template>
  <div class="EchartsHead">
    <p>欣和企业制曲车间数据展示中心</p>
    <img src="@/assets/img/echartsHead.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'EchartsHead',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.EchartsHead{
  width: 100%;
  height: 85px;
  position: relative;
  p{
    font-size: 30px;
    color: white;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 10px;
  }
  img{
    display: block;
    width: 100%;
  }
}
@media (max-width: 1200px) {
  .EchartsHead p{
    font-size: 26px;
  }
}
@media (max-width: 1100px) {
  .EchartsHead p{
    font-size: 20px;
  }
}
</style>
