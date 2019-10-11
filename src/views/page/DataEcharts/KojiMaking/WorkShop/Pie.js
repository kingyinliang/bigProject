export let pie = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 0,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#ffffff',
      fontSize: '12px'
    },
    left: 'center',
    data: ['西凉', '益州', '兖州', '荆州', '幽州']
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      color: ['#46eac7', '#ffd27a', '#b765f3', '#0094ee', '#ff5f87'],
      data: [
        {value: 1548, name: '幽州'},
        {value: 535, name: '荆州'},
        {value: 510, name: '兖州'},
        {value: 634, name: '益州'},
        {value: 735, name: '西凉'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
