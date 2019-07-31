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
      dataTime: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
    }
  },
  mounted () {
    // this.initChartLine()
    this.testInit()
    this.test()
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
          data.list.map((item) => {
            this.dataTime = item.time
            let itemA = {
              name: item.name,
              type: 'line',
              // stack: '总量',
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
          data.list.map((item) => {
            this.dataTime = item.time
            let itemA = {
              name: item.name,
              type: 'line',
              // stack: '总量',
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
    // 折线图
    initChartLine () {
      var option = {
        'title': {
          'text': '看区折线图',
          'subtext': '制曲时间：' + this.timeInfo[0] + 'H ' + this.timeInfo[1] + 'M ' + this.timeInfo[2] + 'S',
          'subtextStyle': { // 副标题内容的样式
            color: '#4EAAFF', // 绿色
            fontStyle: 'normal', // 主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
            fontWeight: 'lighter', // 可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
            fontFamily: 'san-serif', // 主题文字字体，默认微软雅黑
            fontSize: 16 // 主题文字字体大小，默认为12px
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
          'bottom': '3%',
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
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        'series': this.dataList
      }
      this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
      this.chartLine.setOption(option)
      window.addEventListener('resize', () => {
        this.chartLine.resize()
      })
    }
  }
}
</script>
