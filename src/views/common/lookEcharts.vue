<template>
  <div class="mod-demo-echarts">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartLineBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import { BASICDATA_API } from '@/api/api'
import { dateFormat } from '@/net/validate'
export default {
  data () {
    return {
      chartLine: null,
      time: '',
      dataListA: [
        {
          'name': '邮件营销',
          'type': 'line',
          'stack': '总量',
          'data': [ 120, 132, 101, 134, 90, 230, 210 ]
        },
        {
          'name': '联盟广告',
          'type': 'line',
          'stack': '总量',
          'data': [ 220, 182, 191, 234, 290, 330, 310 ]
        },
        {
          'name': '视频广告',
          'type': 'line',
          'stack': '总量',
          'data': [ 150, 232, 201, 154, 190, 330, 410 ]
        },
        {
          'name': '直接访问',
          'type': 'line',
          'stack': '总量',
          'data': [ 320, 332, 301, 334, 390, 330, 320 ]
        },
        {
          'name': '搜索引擎',
          'type': 'line',
          'stack': '总量',
          'data': [ 820, 932, 901, 934, 1290, 1330, 1320 ]
        }
      ]
    }
  },
  mounted () {
    this.initChartLine()
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
    test () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          console.log(dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'))
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    autoPlay () {
      this.time = setInterval(() => {
        this.test()
      }, 8000)
    },
    // 折线图
    initChartLine () {
      var option = {
        'title': {
          'text': '看区折线图堆叠'
        },
        'tooltip': {
          'trigger': 'axis'
          // 'axisPointer': {
          //   'type': 'cross',
          //   'label': {
          //     'backgroundColor': '#6a7985'
          //   }
          // }
        },
        'legend': {
          'data': [ '邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎' ]
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
          'data': [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
        },
        'yAxis': {
          'type': 'value'
        },
        'series': this.dataListA
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

<style lang="scss">
  .mod-demo-echarts {
    > .el-alert {
      margin-bottom: 10px;
    }
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
  }
</style>
