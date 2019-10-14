export let line = {
  title: {
    subtext: '制曲时间 16H 20M 15S'
  },
  dataZoom: [{
    type: 'slider',
    show: true,
    realtime: true,
    start: 80,
    end: 100
  }, {
    type: 'inside',
    start: 80,
    end: 100
  }],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#ffffff'
    },
    width: '400px',
    right: '30px',
    data: ['设定品温', '平均风温', '平均品温']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '50px',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisLine: {onZero: false},
      boundaryGap: false
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#7c8090',
          type: 'dashed'
        }
      }
    }
  ],
  series: [
    {
      name: '设定品温',
      smooth: true,
      type: 'line',
      itemStyle: {
        color: '#fdcd3a'
      },
      stack: '总量',
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '平均风温',
      smooth: true,
      type: 'line',
      itemStyle: {
        color: '#008ffb'
      },
      stack: '总量',
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '平均品温',
      smooth: true,
      type: 'line',
      itemStyle: {
        color: '#02af5d'
      },
      stack: '总量',
      areaStyle: {normal: {}},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
