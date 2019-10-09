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
                <p><span>480</span>间</p>
                <p>曲房共：345间</p>
              </div>
              <div class="totalContainer_center_top_imgBox_img bigBox" @click="rotateCircle(1, $event)">
                <p>已使用</p>
                <p><span>481</span>间</p>
                <p>曲房共：345间</p>
              </div>
              <div class="totalContainer_center_top_imgBox_img smallBox" @click="rotateCircle(2, $event)">
                <p>已使用</p>
                <p><span>482</span>间</p>
                <p>曲房共：345间</p>
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
import { option } from './NightingaleRose'
import { pillar } from './pillar'
import { pie } from './pie'
export default {
  name: 'index',
  data () {
    return {
      NightingaleRose1: null,
      NightingaleRose2: null,
      pillar1: null,
      pillar2: null,
      pie: null
    }
  },
  mounted () {
    this.NightingaleRose1 = echarts.init(document.getElementById('NightingaleRose1'))
    this.NightingaleRose2 = echarts.init(document.getElementById('NightingaleRose2'))
    this.pillar1 = echarts.init(document.getElementById('pillar1'))
    this.pillar2 = echarts.init(document.getElementById('pillar2'))
    this.pie = echarts.init(document.getElementById('pie'))
    this.NightingaleRose1.setOption(this.setNightingaleRose1(option))
    this.NightingaleRose2.setOption(this.setNightingaleRose2(option))
    this.pillar1.setOption(pillar)
    this.pillar2.setOption(pillar)
    this.pie.setOption(pie)
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
    setNightingaleRose1 (param) {
      let option = JSON.parse(JSON.stringify(param))
      option.series[0].data = [
        {value: 10, name: '办理环节占比'},
        {value: 5, name: '审核环节占比'},
        {value: 15, name: '未办环节占比'},
        {value: 25, name: '决策环节占比'}
      ]
      return option
    },
    setNightingaleRose2 (param) {
      let option = JSON.parse(JSON.stringify(param))
      option.series[0].color = ['#0fd5f9', '#57c48c', '#eae97b', '#9e34e4']
      option.series[0].data = [
        {value: 25, name: '办理环节占比'},
        {value: 20, name: '审核环节占比'},
        {value: 15, name: '未办环节占比'},
        {value: 10, name: '决策环节占比'}
      ]
      return option
    },
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
