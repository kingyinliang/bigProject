<template>
  <div class="pageMain">
    <echarts-head>欣和企业制曲车间数据展示中心</echarts-head>
    <div class="totalContainer">
      <div class="totalContainer_box">
        <div class="totalContainer_dataItem">
          <p class="totalContainer_dataItem_title">制曲一车间数据</p>
          <div id="NightingaleRose"></div>
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
          <div class="totalContainer_center_bottom"></div>
        </div>
        <div class="totalContainer_dataItem">
          <p class="totalContainer_dataItem_title">制曲二车间数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { option } from './NightingaleRose'
export default {
  name: 'index',
  data () {
    return {
      NightingaleRose: null
    }
  },
  mounted () {
    this.NightingaleRose = echarts.init(document.getElementById('NightingaleRose'))
    this.NightingaleRose.setOption(option)
  },
  activated () {
    if (this.NightingaleRose) {
      this.NightingaleRose.resize()
    }
  },
  methods: {
    rotateCircle (index) {
      let leftMove, rightMove
      if (document.body.offsetWidth > 1366) {
        leftMove = '-215px'
        rightMove = '215px'
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

<style lang="scss" scoped>
#NightingaleRose{
  width: 297px;
  height: 184px;
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
      margin: auto;
      background: url('~@/assets/img/echartsItemBg.png') no-repeat;
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
  .totalContainer{
    &_box{
      width: 1316px;
    }
    &_dataItem{
      width: 329px;
      height: 582px;
    }
    &_center{
      width: 658px;
      &_top{
        width: 100%;
        height: 340px;
        &_imgBox{
          width: 280px;
          height: 275px;
          &_img{
            width: 280px;
            height: 275px;
            font-size: 16px;
            &:nth-child(1){
              left: -215px;
            }
            &:nth-child(3){
              left: 215px;
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
        width: 620px;
        height: 238px;
      }
    }
  }
}
</style>
