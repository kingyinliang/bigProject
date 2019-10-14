<template>
  <div class="pageMain">
    <echarts-head>欣和企业制曲车间数据展示中心</echarts-head>
    <div class="Container">
      <div class="Container_box">
        <div class="Container_box_left">
          <div class="Container_box_left_top">
            <div class="Container_box_left_top_title"><p>看曲实时曲线</p></div>
            <div class="Container_box_left_top_echarts" id="Line1"></div>
          </div>
          <div class="Container_box_left_bottom">
            <div class="Container_box_left_top_title"><p>曲房警报</p></div>
            <div class="Container_box_ul">
              <ul>
                <li v-for="(item, index) in warningList" :key="index"><p>{{index+1}}、{{item}}</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="Container_box_right">
          <div class="Container_box_right_top">
            <div class="Container_box_right_top_temp">
              <p class="clearfix">
                <span v-for="(item, index) in temp" :key="index">{{item}}℃</span>
              </p>
            </div>
            <div class="Container_box_right_top_text">
              <div>
                <p>风温：{{rightText[0]}}℃</p>
              </div>
              <div>
                <p>转速：{{rightText[1]}}Hz4</p>
              </div>
            </div>
          </div>
          <div class="Container_box_right_bottom">
            <div class="Container_box_left_top_title"><p>曲房运行状态</p></div>
            <div class="Container_box_ul">
              <ul>
                <!--<li><p>1、2018-09-12  08:12   风机过载</p></li>-->
                <!--<li><p>1、2018-09-12  08:12   开始加湿</p></li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { line } from './Line'
import { ECHARTS_API } from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      Line1: null,
      lineColor: [
        '#ffd27a',
        '#EE2C2C',
        '#02af5d',
        '#006699',
        '#00FFFF',
        '#b765f3',
        '#ADFF2F',
        '#ff5f87'],
      warningList: [],
      temp: [],
      rightText: []
    }
  },
  mounted () {
    this.Line1 = echarts.init(document.getElementById('Line1'))
    // this.Line1.setOption(line)
    this.getData()
    window.addEventListener('resize', () => {
      if (this.Line1) {
        this.Line1.resize()
      }
    })
  },
  methods: {
    getData () {
      this.$http(`${ECHARTS_API.KOJIMAKING_DETAIL_LINE}`, 'POST', {
        deptId: this.$store.state.echarts.dataEchartDetailDeptId,
        holderName: this.$store.state.echarts.dataEchartDetailHolderName
      }, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.Line1.setOption(this.setLine(data.list[0], data.list[1]))
          this.rightText = data.list[2]
          this.warningList = data.list[3]
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    setLine (data, time) {
      let option = JSON.parse(JSON.stringify(line))
      option.legend.data = []
      option.series = []
      option.title.subtext = `制曲时间 ${time[0]}H ${time[1]}M ${time[2]}S`
      delete option.xAxis.data
      this.temp = []
      data.forEach((item, Index) => {
        let series = []
        item.data.forEach((it, index) => {
          series.push([item.time[index], it])
          if (index + 1 === item.data.length) {
            this.temp.push(it)
          }
        })
        option.legend.data.push(item.name)
        option.series.push({
          name: item.name,
          smooth: true,
          type: 'line',
          itemStyle: {
            color: this.lineColor[Index]
          },
          areaStyle: {},
          data: series
        })
      })
      return option
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
  .pageMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .Container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 120px;
      &_box {
        display: flex;
        justify-content: left;
        &_ul{
          margin-top: 10px;
          margin-left: 10px;
          ul,li{
            font-size: 12px;
            color: white;
            list-style:none;
            line-height: 20px;
          }
        }
        &_left{
          width: 600px;
          &_top{
            width: 100%;
            display: flex;
            flex-direction: column;
            padding-left: 15px;
            padding-top: 15px;
            background: url('~@/assets/img/echartsDetailLeftBg.png') no-repeat;
            background-size:100% 100%;
            &_title{
              margin-left: 10px;
              height: 20px;
              line-height: 20px;
              font-size: 16px;
              color: #00dfff;
              border-left: 6px solid #00dfff;
              padding-left: 10px;
            }
            &_echarts{
              flex: 1;
              width: 100%;
            }
          }
          &_bottom{
            width: 100%;
            background: url('~@/assets/img/echartsDetailLeftBg1.png') no-repeat;
            background-size:100% 100%;
            padding-left: 15px;
            padding-top: 10px;
          }
        }
        &_right{
          width: 450px;
          margin-left: 50px;
          &_top {
            text-align: center;
            position: relative;
            color: #00051a;
            font-size: 14px;
            line-height: 20px;
            width: 100%;
            background: url('~@/assets/img/echartsDetailLeftBg2.png') no-repeat;
            background-size:100% 100%;
            &_temp{
              width: 100%;
              position: absolute;
              p{
                margin: auto;
                width: 200px;
                span{
                  width: 50%;
                  float: left;
                  line-height: 25px;
                }
              }
            }
            &_text{
              width: 100%;
              position: absolute;
              p{
                display: inline-block;
                margin: auto;
                text-align: left;
              }
            }
          }
          &_bottom{
            width: 100%;
            background: url('~@/assets/img/echartsDetailLeftBg1.png') no-repeat;
            background-size:100% 100%;
            padding-left: 15px;
            padding-top: 10px;
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
          height: 630px;
          &_left{
            width: 600px;
            &_top{
              height: 450px;
              margin-bottom: 30px;
            }
            &_bottom{
              height: 150px;
            }
          }
          &_right{
            width: 450px;
            margin-left: 50px;
            &_top {
              height: 450px;
              margin-bottom: 30px;
              &_temp{
                top: 100px;
              }
              &_text{
                bottom: 170px;
              }
            }
            &_bottom {
              height: 150px;
            }
          }
        }
      }
    }
  }
  @media (min-width: 1367px) {
    .pageMain {
      .Container {
        &_box {
          width: 1380px;
          height: 730px;
          &_ul{
            li{
              font-size: 14px;
            }
          }
          &_left{
            width: 780px;
            &_top{
              height: 550px;
              margin-bottom: 30px;
            }
            &_bottom{
              height: 150px;
            }
          }
          &_right{
            width: 550px;
            margin-left: 50px;
            &_top {
              height: 550px;
              margin-bottom: 30px;
              &_temp{
                font-size: 16px;
                top: 130px;
              }
              &_text{
                bottom: 210px;
                font-size: 16px;
                line-height: 25px;
              }
            }
            &_bottom {
              height: 150px;
            }
          }
        }
      }
    }
  }
</style>
