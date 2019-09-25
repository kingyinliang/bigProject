<template>
  <div>
    <echarts-head>欣和企业制曲车间数据展示中心</echarts-head>
    <div class="totalContainer">
      <div class="dataItem">
        <p class="dataItem_title">制曲一车间数据</p>
      </div>
      <div class="totalContainer_center">
        <div class="totalContainer_center_top">
          <div class="totalContainer_center_top_imgBox">
            <img src="@/assets/img/echartsItemCircle.png" alt="">
          </div>
        </div>
        <div class="totalContainer_center_bottom"></div>
      </div>
      <div class="dataItem">
        <p class="dataItem_title">制曲二车间数据</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {
    EchartsHead: resolve => {
      require(['../../layout/EchartsHead'], resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
.totalContainer{
  display: flex;
  justify-content: left;
  padding-left: 120px;
  .dataItem{
    width: 329px;
    height: 582px;
    background: url('~@/assets/img/echartsItemBg.png') no-repeat;
    background-size:100% 100%;
    &_title{
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 26px;
      text-align: center;
      letter-spacing: 0px;
      color: #2fd5ff;
    }
  }
  &_center{
    width: 558px;
    &_top{
      width: 558px;
      height: 337px;
      &_imgBox{
        width: 325px;
        height: 309px;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    &_bottom{
      width: 518px;
      height: 232px;
      margin: auto;
      background: url('~@/assets/img/echartsItemBg.png') no-repeat;
      background-size:100% 100%;
    }
  }
}
</style>
