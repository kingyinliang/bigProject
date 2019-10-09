<template>
  <div class="pageMain">
    <echarts-head>欣和企业制曲车间数据展示中心</echarts-head>
    <div class="Container">
      <div class="Container_box">
        <div class="Container_box_table">
          <p class="Container_box_table_title">曲房状态汇总</p>
          <el-table class="KojiMakingTable"  :data="KojiMakingData" stripe row-class-name="KojiMakingTable_row">
            <el-table-column prop="holderNo" label="曲房" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="罐号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="产品" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="温度(℃)" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="入曲时间" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="阶段" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
        <div class="Container_box_echarts">
          <div class="Container_box_echarts_bg">
            <p class="Container_box_echarts_bg_title">曲房使用情况</p>
            <div class="Container_box_echarts_bg_box">
              <div class="Container_box_echarts_bg_box_left el-icon-arrow-left" @click="boxClick(false)"></div>
              <div class="Container_box_echarts_bg_box_right el-icon-arrow-right" @click="boxClick(true)"></div>
              <div class="Container_box_echarts_bg_box_e">
                <div class="Container_box_echarts_bg_box_barOrPie clearfix">
                  <div class="Container_box_echarts_bg_box_barPie" id="Bar1"></div>
                  <div class="Container_box_echarts_bg_box_barPie" id="Pie1"></div>
                  <div class="Container_box_echarts_bg_box_barPie" id="Bar2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { bar } from './Bar'
import { pie } from './Pie'
export default {
  name: 'index',
  data () {
    return {
      num: 0,
      Bar1: null,
      Bar2: null,
      Pie1: null,
      KojiMakingData: [{holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}]
    }
  },
  mounted () {
    this.Bar1 = echarts.init(document.getElementById('Bar1'))
    this.Bar2 = echarts.init(document.getElementById('Bar2'))
    this.Pie1 = echarts.init(document.getElementById('Pie1'))
    this.Bar1.setOption(bar)
    this.Bar2.setOption(bar)
    this.Pie1.setOption(pie)
    window.addEventListener('resize', () => {
      if (this.Bar1) {
        this.Bar1.resize()
      }
      if (this.Bar2) {
        this.Bar2.resize()
      }
      if (this.Pie1) {
        this.Pie1.resize()
      }
    })
  },
  methods: {
    boxClick (str) {
      console.log(this.num)
      let ele = this.$('.Container_box_echarts_bg_box_barOrPie').eq(0)
      let left
      if (str) {
        left = (this.num + 1) * -100
      } else {
        if (this.num === 0) {
          ele.css('left', '-200%')
          left = -100
        } else {
          left = (this.num - 1) * -100
        }
      }
      ele.animate({left: `${left}%`}, 300, () => {
        if (str) {
          this.num++
        } else {
          if (this.num === 0) {
            this.num = 1
          } else {
            this.num--
          }
        }
        if (this.num >= 2) {
          this.num = 0
          ele.css('left', '0')
        }
      })
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
  .KojiMakingTable{
    &.el-table::before{
      height: 0px!important;
    }
    &.el-table, .el-table__expanded-cell{
      background-color: rgba(0, 0, 0, 0);
    }
    th{
      text-align: center;
      border-bottom: none!important;
      background: rgba(0, 104, 190, 0.1)!important;
    }
    &_row,tr,&_row:hover,tr:hover{
      background: rgba(0, 0, 0, 0)!important;
      td{
        text-align: center;
        border-bottom: none!important;
        background: rgba(0,181,246, 0.1)!important;
      }
    }
    &_row.el-table__row--striped{
      background: rgba(0, 0, 0, 0)!important;
      td{
        text-align: center;
        border-bottom: none!important;
        background: rgba(0, 104, 190, 0.1)!important;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .pageMain{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .Container{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 120px;
      &_box {
        display: flex;
        justify-content: left;
        &_table{
          height: 100%;
          background: url('~@/assets/img/echartsWorkShopBg.png') no-repeat;
          background-size:100% 100%;
          &_title{
            text-align: center;
            color: white;
            font-size: 20px;
            line-height: 48px;
            color: #19f5fe;
            margin-bottom: 10px;
          }
        }
        &_echarts{
          height: 100%;
          margin-left: 25px;
          padding-top: 50px;
          &_bg{
            width: 100%;
            height: 100%;
            background: url('~@/assets/img/echartsWorkShopRightBg.png') no-repeat;
            background-size:100% 100%;
            &_title{
              text-align: center;
              font-size: 24px;
              color: #19f5fe;
            }
            &_box{
              width: 100%;
              position: relative;
              &_left,&_right{
                top: 77px;
                position: absolute;
                color: #59baf2;
                font-size: 45px;
                cursor: pointer;
              }
              &_e{
                width: 100%;
                overflow: hidden;
                position: relative;
                height: 200px;
              }
              &_barOrPie{
                width: 300%;
                height: 200px;
                position: absolute;
                left: 0;
              }
              &_barPie{
                width: 33.333333%;
                height: 200px;
                float: left;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1367px) {
    .pageMain {
      .Container {
        &_box {
          width: 1153px;
          height: 500px;
          &_table {
            width: 655px;
          }
          &_echarts {
            width: 427px;
            &_bg{
              &_title{
                padding-top: 25px;
              }
              &_box{
                padding: 0 80px;
                &_left{
                  left: 35px;
                }
                &_right{
                  right: 35px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (min-width: 1367px) {
    body{
      min-height: 670px!important;
    }
    .pageMain {
      .Container {
        &_box {
          width: 1353px;
          height: 580px;
          &_table {
            width: 755px;
          }
          &_echarts {
            width: 503px;
            margin-left: 40px;
            &_bg{
              &_title{
                padding-top: 35px;
              }
              &_box{
                padding: 0 90px;
                &_left{
                  left: 45px;
                }
                &_right{
                  right: 45px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
