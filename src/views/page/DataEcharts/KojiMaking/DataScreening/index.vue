<template>
  <div class="pageMain">
    <echarts-head>欣和企业制曲车间数据展示中心</echarts-head>
    <div class="totalContainer">
      <div class="totalContainer_box">
        <div class="totalContainer_dataItem">
          <p class="totalContainer_dataItem_title">制曲一车间数据</p>
          <div class="totalContainer_dataItem_tit clearfix">
            <img src="@/assets/img/echartsTitleBgL.png" alt="">
            <span>当年产品分布</span>
            <img src="@/assets/img/echartsTitleBgR.png" alt="">
          </div>
          <div id="NightingaleRose1" class="NightingaleRose"></div>
          <div class="totalContainer_dataItem_tit clearfix">
            <img src="@/assets/img/echartsTitleBgL.png" alt="">
            <span>当年产量概览</span>
            <img src="@/assets/img/echartsTitleBgR.png" alt="">
          </div>
          <div id="pillar1" class="pillar"></div>
        </div>
        <div class="totalContainer_center">
          <div class="totalContainer_center_top">
            <div class="totalContainer_center_top_imgBox">
              <div class="totalContainer_center_top_imgBox_img smallBox" @click="rotateCircle(0, $event)">
                <p>已使用</p>
                <p><span>{{House.oneWorkShop[0]}}</span>间</p>
                <p>一车间曲房<br>共：{{House.oneWorkShop[1]}}间</p>
              </div>
              <div class="totalContainer_center_top_imgBox_img bigBox" @click="rotateCircle(1, $event)">
                <p>已使用</p>
                <p><span>{{House.oneWorkShop[0] + House.twoWorkShop[0]}}</span>间</p>
                <p>曲房共：{{House.oneWorkShop[1] + House.twoWorkShop[1]}}间</p>
              </div>
              <div class="totalContainer_center_top_imgBox_img smallBox" @click="rotateCircle(2, $event)">
                <p>已使用</p>
                <p><span>{{House.twoWorkShop[0]}}</span>间</p>
                <p>二车间曲房<br>共：{{House.twoWorkShop[1]}}间</p>
              </div>
            </div>
          </div>
          <div class="totalContainer_center_bottom">
            <p class="totalContainer_dataItem_title" style="line-height: 30px">产量分布情况</p>
            <div id="pie" class="pie"></div>
          </div>
        </div>
        <div class="totalContainer_dataItem">
          <p class="totalContainer_dataItem_title">制曲二车间数据</p>
          <div class="totalContainer_dataItem_tit clearfix">
            <img src="@/assets/img/echartsTitleBgL.png" alt="">
            <span>当年产品分布</span>
            <img src="@/assets/img/echartsTitleBgR.png" alt="">
          </div>
          <div id="NightingaleRose2" class="NightingaleRose"></div>
          <div class="totalContainer_dataItem_tit clearfix">
            <img src="@/assets/img/echartsTitleBgL.png" alt="">
            <span>当年产量概览</span>
            <img src="@/assets/img/echartsTitleBgR.png" alt="">
          </div>
          <div id="pillar2" class="pillar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { radiuspie } from './NightingaleRose'
import { pillar } from './pillar'
import { pie } from './pie'
import { ECHARTS_API } from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      NightingaleRose1: null,
      NightingaleRose2: null,
      pillar1: null,
      pillar2: null,
      pie: null,
      House: {
        oneWorkShop: [0],
        twoWorkShop: [0]
      }
    }
  },
  mounted () {
    this.GetHouseData()
    this.NightingaleRose1 = echarts.init(document.getElementById('NightingaleRose1'))
    this.NightingaleRose2 = echarts.init(document.getElementById('NightingaleRose2'))
    this.pillar1 = echarts.init(document.getElementById('pillar1'))
    this.pillar2 = echarts.init(document.getElementById('pillar2'))
    this.pie = echarts.init(document.getElementById('pie'))
    // 模拟图表数据
    // this.NightingaleRose1.setOption(radiuspie)
    // this.NightingaleRose2.setOption(radiuspie)
    // this.pillar1.setOption(pillar)
    // this.pillar2.setOption(pillar)
    // this.pie.setOption(pie)
    // 初始化图表
    pie.legend.data = []
    this.setNightingaleRose()
    this.setPillar()
    // 窗口大小改变改变图表
    window.addEventListener('resize', () => {
      if (this.NightingaleRose1) {
        this.NightingaleRose1.resize()
      }
      if (this.NightingaleRose2) {
        this.NightingaleRose2.resize()
      }
      if (this.pillar1) {
        this.pillar1.resize()
      }
      if (this.pillar2) {
        this.pillar2.resize()
      }
      if (this.pie) {
        this.pie.resize()
      }
    })
  },
  methods: {
    // 曲房情况
    GetHouseData () {
      this.$http(`${ECHARTS_API.KOJIMAKING_HOME_HOUSE}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.House = {
            oneWorkShop: data.oneWorkShop,
            twoWorkShop: data.twoWorkShop
          }
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    // 请求数据
    setNightingaleRose () {
      this.$http(`${ECHARTS_API.KOJIMAKING_HOME_MATERIAL}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.NightingaleRose1.setOption(this.NightingaleRoseData(data.oneWorkShop))
          this.NightingaleRose2.setOption(this.NightingaleRoseData(data.twoWorkShop))
          this.pie.setOption(this.PieData1(data))
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    setPillar () {
      this.$http(`${ECHARTS_API.KOJIMAKING_HOME_MONTHOUTPUT}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.pillar1.setOption(this.PillarData(data.oneWorkShop))
          this.pillar2.setOption(this.PillarData(data.twoWorkShop))
          this.pie.setOption(this.PieData2(data))
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    // 处理数据
    NightingaleRoseData (data) {
      let option = JSON.parse(JSON.stringify(radiuspie))
      let dataAxis = []
      let seriesData = []
      data.forEach(item => {
        seriesData.push({
          value: (item.amount / 1000).toFixed(2),
          name: item.materialName
        })
        dataAxis.push(`${item.materialName}`)
      })
      option.series[0].data = seriesData
      option.legend.data = dataAxis
      option.graphic[1].style.text = `${dataAxis.length}个`
      return option
    },
    PillarData (data) {
      let option = JSON.parse(JSON.stringify(pillar))
      let dataAxis = []
      let seriesData = []
      data.forEach(item => {
        seriesData.push((item.amount / 1000).toFixed(2))
        dataAxis.push(`${item.everyMonth}月`)
      })
      option.series[0].data = seriesData
      option.yAxis.data = dataAxis
      return option
    },
    PieData1 (data) {
      let option = pie
      let seriesData = []
      data.oneWorkShop.forEach(item => {
        seriesData.push({
          value: (item.amount / 1000).toFixed(2),
          name: `制曲一${item.materialName}`
        })
        pie.legend.data.push(`制曲一${item.materialName}`)
      })
      data.twoWorkShop.forEach(item => {
        seriesData.push({
          value: (item.amount / 1000).toFixed(2),
          name: `制曲二${item.materialName}`
        })
        pie.legend.data.push(`制曲二${item.materialName}`)
      })
      option.series[1].data = seriesData
      return option
    },
    PieData2 (data) {
      let option = pie
      let oneWorkShop = 0
      let twoWorkShop = 0
      data.oneWorkShop.forEach(item => {
        oneWorkShop = oneWorkShop + (item.amount / 1000).toFixed(2) * 1
      })
      data.twoWorkShop.forEach(item => {
        twoWorkShop = twoWorkShop + (item.amount / 1000).toFixed(2) * 1
      })
      option.legend.data.push('制曲一车间')
      option.legend.data.push('制曲二车间')
      option.series[0].data = [
        {value: oneWorkShop.toFixed(2), name: '制曲一车间'},
        {value: twoWorkShop.toFixed(2), name: '制曲二车间'}
      ]
      return option
    },
    // 曲房动画
    rotateCircle (index) {
      let leftMove, rightMove
      if (document.body.offsetWidth > 1366) {
        leftMove = '-225px'
        rightMove = '225px'
      } else {
        leftMove = '-185px'
        rightMove = '185px'
      }
      this.$('.totalContainer_center_top_imgBox_img').eq(index).animate({ left: 0 }, 200)
      if (index === 0) {
        this.$('.totalContainer_center_top_imgBox_img').eq(1).animate({ left: rightMove }, 200)
        this.$('.totalContainer_center_top_imgBox_img').eq(2).animate({ left: leftMove }, 200)
      } else if (index === 1) {
        this.$('.totalContainer_center_top_imgBox_img').eq(2).animate({ left: rightMove }, 200)
        this.$('.totalContainer_center_top_imgBox_img').eq(0).animate({ left: leftMove }, 200)
      } else if (index === 2) {
        this.$('.totalContainer_center_top_imgBox_img').eq(0).animate({ left: rightMove }, 200)
        this.$('.totalContainer_center_top_imgBox_img').eq(1).animate({ left: leftMove }, 200)
      }
      this.$('.totalContainer_center_top_imgBox_img').removeClass('bigBox')
      this.$('.totalContainer_center_top_imgBox_img').addClass('smallBox')
      this.$('.totalContainer_center_top_imgBox_img').eq(index).addClass('bigBox')
    }
  },
  computed: {},
  components: {
    EchartsHead: resolve => {
      require(['../../layout/EchartsHead'], resolve)
    }
  }
}
</script>

<style lang="scss">
  .DataEchartsContent{
    background: url('~@/assets/img/echartsBg.png') no-repeat;
    background-size:100% 100%;
  }
</style>

<style lang="scss" scoped>
  .DataEchartsContent{
    background: url('~@/assets/img/echartsBg.png') no-repeat;
    background-size:100% 100%;
  }
.pageMain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.totalContainer{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 120px;
  .totalContainer_box{
    display: flex;
    justify-content: left;
  }
  &_dataItem{
    transition: all 1s;
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
      margin-bottom: 10px;
    }
    &_tit{
      width: 268px;
      margin: auto;
      span{
        float: left;
        font-size: 12px;
        color: #00dfff;
        padding-bottom: 4px;
        border-bottom: 2px transparent solid;
        border-image: linear-gradient(to right,#2d77f3,#21e7ff) 1 10;
      }
      img{
        width: 98px;
        height: 8px;
        margin-top: 4px;
        float: left;
      }
    }
  }
  &_center{
    width: 558px;
    &_top{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &_imgBox{
        position: relative;
        &_img{
          position: absolute;
          text-align: center;
          color: white;
          background: url('~@/assets/img/echartsItemCircle.png') no-repeat;
          background-size:100% 100%;
          &:nth-child(1){
            left: -185px;
          }
          &:nth-child(3){
            left: 185px;
          }
          p:nth-child(1){
            padding-top: 45px;
          }
          p:nth-child(2){
            margin: 10px 0;
          }
          p{
            font-weight: 400;
            span{
              font-size: 24px;
              font-weight: bold;
              font-stretch: normal;
              letter-spacing: 0px;
              color: #00ffd4;
            }
          }
        }
      }
    }
    &_bottom{
      transition: all 2s;
      margin: auto;
      background: url('~@/assets/img/echartsItemBottomBg.png') no-repeat;
      background-size:100% 100%;
    }
  }
}
.smallBox{
  transform: scale(0.7);
  transition: all 2s;
}
.bigBox{
  transform: scale(1);
  transition: all 2s;
}
@media (max-width: 1367px) {
  .NightingaleRose{
    width: 100%;
    height: 164px;
  }
  .pillar{
    width: 100%;
    margin-top: 10px;
    height: 220px;
  }
  .pie{
    width: 100%;
    margin-top: 10px;
    height: 149px;
  }
  .totalContainer {
    &_box {
      width: 1153px;
    }
    &_dataItem {
      width: 297px;
      height: 479px;
    }
    &_center{
      width: 558px;
      &_top{
        width: 100%;
        height: 280px;
        &_imgBox{
          width: 214px;
          height: 209px;
          &_img{
            width: 214px;
            height: 209px;
            font-size: 12px;
          }
        }
      }
      &_bottom{
        width: 518px;
        height: 199px;
      }
    }
  }
}
@media (min-width: 1367px) {
  .NightingaleRose{
    width: 100%;
    height: 219px;
  }
  .pillar{
    width: 100%;
    margin-top: 10px;
    height: 285px;
  }
  .pie{
    width: 100%;
    height: 179px;
  }
  .totalContainer{
    &_box{
      width: 1406px;
    }
    &_dataItem{
      width: 359px;
      height: 612px;
      &_title{
        margin-bottom: 20px;
      }
    }
    &_center{
      width: 688px;
      &_top{
        width: 100%;
        height: 357px;
        &_imgBox{
          width: 285px;
          height: 280px;
          &_img{
            width: 285px;
            height: 280px;
            font-size: 16px;
            &:nth-child(1){
              left: -225px;
            }
            &:nth-child(3){
              left: 225px;
            }
            p:nth-child(1){
              padding-top: 60px;
            }
            p{
              span{
                font-size: 28px;
              }
            }
          }
        }
      }
      &_bottom{
        width: 635px;
        height: 255px;
      }
    }
  }
}
</style>
