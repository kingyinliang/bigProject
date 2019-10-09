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
      Iotime: '',
      timeInfo: [],
      titleList: [],
      dataList: [],
      dataTime: [],
      colorChange: {},
      params: {
        factory: '',
        houseNoName: '',
        workShopName: '',
        inStartTime: '',
        orderHouseId: ''
      },
      subtext: ''
    }
  },
  mounted () {
    // this.initChartLine()
    this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
  },
  beforeDestroy () { // 清除定时器
    clearInterval(this.Iotime)
    console.log('beforeDestroy')
  },
  destroyed () { // 清除定时器
    clearInterval(this.Iotime)
    console.log('destroyed')
  },
  activated () {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.chartLine) {
      this.chartLine.resize()
    }
  },
  methods: {
    testInit (formHeader) {
      console.log('1')
      clearInterval(this.Iotime)
      this.params = {
        factory: formHeader.factory,
        houseNoName: formHeader.houseNoName,
        workShopName: formHeader.workShopName,
        inStartTime: formHeader.inStartTime,
        orderHouseId: formHeader.orderHouseId
      }
      // if (this.params.inStartTime !== '') {
      //   this.Iotime = setInterval(() => {
      //     this.test()
      //   }, 10000 * 6 * 2)
      // }
      if (this.params.inStartTime !== '') {
        this.Iotime = setInterval(() => {
          this.test()
        }, 10000 * 2)
      }
      this.$http(`${KJM_API.IOT_LIST}`, 'POST', this.params).then(({data}) => {
        if (data.code === 0) {
          this.DataProcessing(data)
          this.initChartLine()
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    test () {
      console.log('3')
      this.$http(`${KJM_API.IOT_LIST}`, 'POST', this.params, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.DataProcessing(data)
          let option = this.GetOption()
          this.chartLine.setOption(option)
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    DataProcessing (data) {
      this.timeInfo = data.timeList
      if (data.timeList.length !== 0) {
        this.subtext = this.timeInfo[0] + 'H ' + this.timeInfo[1] + 'M ' + this.timeInfo[2] + 'S'
      }
      this.titleList = []
      this.dataList = []
      data.list.map((item, key) => {
        if (item.data.length > 0) {
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
        }
      })
    },
    // 折线图
    initChartLine () {
      let option = this.GetOption()
      option.dataZoom = [{
        type: 'slider',
        show: true,
        realtime: true,
        start: 0,
        end: 100
      }, {
        type: 'inside',
        start: 0,
        end: 100
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
          'subtext': '制曲时间：' + this.subtext,
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
