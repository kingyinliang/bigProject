<template>
  <div class="EchartsHead">
    <p><slot></slot></p>
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
  height: 90px;
  padding-top: 5px;
  position: relative;
  p{
    padding-top: 7px;
    font-size: 30px;
    color: white;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 0px;
  }
  img{
    display: block;
    width: 100%;
  }
}
@media (max-width: 1300px) {
  .EchartsHead p{
    font-size: 28px;
  }
}
@media (max-width: 1200px) {
  .EchartsHead p{
    font-size: 26px;
  }
}
@media (max-width: 1100px) {
  .EchartsHead p{
    font-size: 22px;
  }
}
</style>
