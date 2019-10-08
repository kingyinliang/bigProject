import echarts from 'echarts'

export let bar = {
  yAxis: {
    show: false
  },
  xAxis: {
    type: 'category',
    data: ['空', '普通', 'TB', 'JY', 'JYTB'],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#19f5fe'
      }
    }
  },
  series: [
    {
      type: 'bar',
      barWidth: '20px',
      barCategoryGap: '2%',
      label: {
        show: true,
        position: 'top',
        textStyle: {
          fontSize: '12',
          color: '#19f5fe'
        }
      },
      itemStyle: {
        normal: {
          barBorderRadius: 10,
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: '#19f7ff'},
              {offset: 1, color: '#0799f4'}
            ]
          )
        },
        emphasis: {
          barBorderRadius: 10,
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: '#19f7ff'},
              {offset: 1, color: '#0799f4'}
            ]
          )
        }
      },
      data: [220, 182, 191, 234, 130]
    }
  ]
}
