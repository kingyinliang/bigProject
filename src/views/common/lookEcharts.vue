<template>
  <div class="mod-demo-echarts">
    <div id="J_chartLineBox" class="chart-box"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { KJM_API } from '@/api/api'
// import { dateFormat } from '@/net/validate'
export default {
  data () {
    return {
      chartLine: null,
      time: '',
      timeInfo: [],
      titleList: [],
      dataList: [],
      dataTime: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ],
      colorChange: {}
    }
  },
  mounted () {
    // this.initChartLine()
    this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
    this.testInit()
    this.autoPlay()
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
      this.chartLine.resize()
    }
  },
  methods: {
    autoPlay () {
      this.time = setInterval(() => {
        this.test()
      }, 10000)
    },
    testInit () {
      this.$http(`${KJM_API.IOT_LIST}`, 'POST', {}).then(({data}) => {
        if (data.code === 0) {
          this.timeInfo = data.timeList
          this.titleList = []
          this.dataList = []
          data.list.map((item, key) => {
            this.dataTime = item.time
            let colorChange = this.GetColor(key)
            let itemA = {
              name: item.name,
              type: 'line',
              // stack: '总量',
              itemStyle: colorChange,
              data: item.data
            }
            this.titleList.push(item.name)
            this.dataList.push(itemA)
          })
          this.initChartLine()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    test () {
      this.$http(`${KJM_API.IOT_LIST}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.timeInfo = data.timeList
          this.titleList = []
          this.dataList = []
          data.list.map((item, key) => {
            this.dataTime = item.time
            let colorChange = this.GetColor(key)
            let itemA = {
              name: item.name,
              type: 'line',
              // stack: '总量',
              itemStyle: colorChange,
              data: item.data
            }
            this.titleList.push(item.name)
            this.dataList.push(itemA)
          })
          // var option = {
          //   'title': {
          //     'text': '看区折线图',
          //     'subtext': '制曲时间：' + this.timeInfo[0] + 'H ' + this.timeInfo[1] + 'M ' + this.timeInfo[2] + 'S',
          //     'subtextStyle': { // 副标题内容的样式
          //       'color': '#4EAAFF', // 绿色
          //       'fontStyle': 'normal', // 主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
          //       'fontWeight': 'lighter', // 可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
          //       'fontFamily': 'san-serif', // 主题文字字体，默认微软雅黑
          //       'fontSize': 16 // 主题文字字体大小，默认为12px
          //     }
          //   },
          //   'tooltip': {
          //     'trigger': 'axis',
          //     'axisPointer': {
          //       'type': 'cross',
          //       'label': {
          //         'backgroundColor': '#6a7985'
          //       }
          //     }
          //   },
          //   'legend': {
          //     'data': this.titleList
          //   },
          //   'grid': {
          //     'left': '3%',
          //     'right': '4%',
          //     'bottom': '60px',
          //     'containLabel': true
          //   },
          //   'toolbox': {
          //     'feature': {
          //       'saveAsImage': { }
          //     }
          //   },
          //   'xAxis': {
          //     'type': 'category',
          //     'boundaryGap': false,
          //     'data': this.dataTime
          //   },
          //   'yAxis': {
          //     'type': 'value',
          //     'splitNumber': 2,
          //     'axisLabel': {
          //       'formatter': '{value} °C'
          //     }
          //   },
          //   'series': this.dataList
          // }
          let option = this.GetOption()
          this.chartLine.setOption(option)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 折线图
    initChartLine () {
      // var option = {
      //   'title': {
      //     'text': '看区折线图',
      //     'subtext': '制曲时间：' + this.timeInfo[0] + 'H ' + this.timeInfo[1] + 'M ' + this.timeInfo[2] + 'S',
      //     'subtextStyle': { // 副标题内容的样式
      //       'color': '#4EAAFF', // 绿色
      //       'fontStyle': 'normal', // 主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
      //       'fontWeight': 'lighter', // 可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
      //       'fontFamily': 'san-serif', // 主题文字字体，默认微软雅黑
      //       'fontSize': 16 // 主题文字字体大小，默认为12px
      //     }
      //   },
      //   'tooltip': {
      //     'trigger': 'axis',
      //     'axisPointer': {
      //       'type': 'cross',
      //       'label': {
      //         'backgroundColor': '#6a7985'
      //       }
      //     }
      //   },
      //   'legend': {
      //     'data': this.titleList
      //   },
      //   'grid': {
      //     'left': '3%',
      //     'right': '4%',
      //     'bottom': '60px',
      //     'containLabel': true
      //   },
      //   'toolbox': {
      //     'feature': {
      //       'saveAsImage': { }
      //     }
      //   },
      //   'xAxis': {
      //     'type': 'category',
      //     'boundaryGap': false,
      //     'data': this.dataTime
      //   },
      //   'yAxis': {
      //     'type': 'value',
      //     'splitNumber': 2,
      //     'axisLabel': {
      //       'formatter': '{value} °C'
      //     }
      //   },
      //   'series': this.dataList,
      //   dataZoom: [{
      //     type: 'slider',
      //     show: true,
      //     realtime: true,
      //     start: 95,
      //     end: 100
      //   }, {
      //     type: 'inside',
      //     start: 95,
      //     end: 100,
      //     realtime: true,
      //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      //     handleSize: '70%',
      //     handleStyle: {
      //       color: '#fff',
      //       shadowBlur: 3,
      //       shadowColor: 'rgba(0, 0, 0, 0.6)',
      //       shadowOffsetX: 2,
      //       shadowOffsetY: 2
      //     }
      //   }]
      // }
      let option = this.GetOption()
      option.dataZoom = [{
        type: 'slider',
        show: true,
        realtime: true,
        start: 95,
        end: 100
      }, {
        type: 'inside',
        start: 95,
        end: 100
        // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        // handleSize: '70%',
        // handleStyle: {
        //   color: '#fff',
        //   shadowBlur: 3,
        //   shadowColor: 'rgba(0, 0, 0, 0.6)',
        //   shadowOffsetX: 2,
        //   shadowOffsetY: 2
        // }
      }]
      this.chartLine.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine.resize()
      })
    },
    GetOption () {
      let optionMap = {
        'title': {
          'text': '看区折线图',
          'subtext': '制曲时间：' + this.timeInfo[0] + 'H ' + this.timeInfo[1] + 'M ' + this.timeInfo[2] + 'S',
          'subtextStyle': { // 副标题内容的样式
            'color': '#4EAAFF', // 绿色
            'fontStyle': 'normal', // 主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
            'fontWeight': 'lighter', // 可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
            'fontFamily': 'san-serif', // 主题文字字体，默认微软雅黑
            'fontSize': 16 // 主题文字字体大小，默认为12px
          }
        },
        'tooltip': {
          'trigger': 'axis',
          'axisPointer': {
            'type': 'cross',
            'label': {
              'backgroundColor': '#6a7985'
            }
          }
        },
        'legend': {
          'data': this.titleList
        },
        'grid': {
          'left': '3%',
          'right': '4%',
          'bottom': '60px',
          'containLabel': true
        },
        'toolbox': {
          'feature': {
            'saveAsImage': { }
          }
        },
        'xAxis': {
          'type': 'category',
          'boundaryGap': false,
          'data': this.dataTime
        },
        'yAxis': {
          'type': 'value',
          'splitNumber': 4,
          'axisLabel': {
            'formatter': '{value} °C'
          }
        },
        'series': this.dataList
      }
      return optionMap
    },
    GetColor (index) {
      if (index === 0) {
        this.colorChange = {
          normal: {
            color: '#F04864',
            lineStyle: {
              color: '#F04864'
            }
          }
        }
      } else if (index === 1) {
        this.colorChange = {
          normal: {
            color: '#FACC14',
            lineStyle: {
              color: '#FACC14'
            }
          }
        }
      } else if (index === 2) {
        this.colorChange = {
          normal: {
            color: '#1890FF',
            lineStyle: {
              color: '#1890FF'
            }
          }
        }
      } else if (index === 3) {
        this.colorChange = {
          normal: {
            color: '#2FC25B',
            lineStyle: {
              color: '#2FC25B'
            }
          }
        }
      } else if (index === 4) {
        this.colorChange = {
          normal: {
            color: '#8543E0',
            lineStyle: {
              color: '#8543E0'
            }
          }
        }
      } else if (index === 5) {
        this.colorChange = {
          normal: {
            color: '#13C2C2',
            lineStyle: {
              color: '#13C2C2'
            }
          }
        }
      } else if (index === 6) {
        this.colorChange = {
          normal: {
            color: '#8A391B',
            lineStyle: {
              color: '#8A391B',
              width: 3
            }
          }
        }
      }
      return this.colorChange
    }
  }
}
</script>

<style lang="scss">
  .mod-demo-echarts {
    .chart-box {
      min-height: 400px;
    }
  }
</style>
