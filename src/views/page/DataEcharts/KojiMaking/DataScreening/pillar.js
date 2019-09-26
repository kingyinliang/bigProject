import echarts from 'echarts'

var dataAxis = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149]
export let pillar = {
  yAxis: {
    type: 'category',
    data: dataAxis,
    nameTextStyle: {
      align: 'left'
    },
    axisLabel: {
      textStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#42a4ff'],
        opacity: 0.6,
        width: 1,
        type: 'solid'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#42a4ff',
        opacity: 0.6
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#fff'
      }
    }
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  grid: {
    bottom: '20px',
    left: '45px',
    width: '78%',
    height: '90%',
    borderColor: '#006fff'
  },
  series: [
    {
      type: 'bar',
      barWidth: '12px',
      barCategoryGap: '60%',
      label: {
        show: true,
        position: 'insideRight',
        textStyle: {
          fontSize: '12',
          color: '#fff'
        }
      },
      itemStyle: {
        normal: {
          barBorderRadius: [0, 5, 5, 0],
          color: new echarts.graphic.LinearGradient(
            0, 0, 1, 0,
            [
              {offset: 0, color: '#006fff'},
              {offset: 1, color: '#9e4ee9'}
            ]
          )
        },
        emphasis: {
          barBorderRadius: [0, 5, 5, 0],
          color: new echarts.graphic.LinearGradient(
            0, 0, 1, 0,
            [
              {offset: 0, color: '#006fff'},
              {offset: 1, color: '#9e4ee9'}
            ]
          )
        }
      },
      data: data
    }
  ]
}
