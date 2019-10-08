export let pie = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 10,
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
      data: [
        {
          value: 1548,
          name: '幽州',
          label: {
            normal: {
              backgroundColor: '#eee',
              borderColor: '#777',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                title: {
                  color: '#eee',
                  align: 'center'
                },
                abg: {
                  backgroundColor: '#333',
                  width: '100%',
                  align: 'right',
                  height: 25,
                  borderRadius: [4, 4, 0, 0]
                },
                weatherHead: {
                  color: '#333',
                  height: 24,
                  align: 'left'
                },
                hr: {
                  borderColor: '#777',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                value: {
                  width: 20,
                  padding: [0, 20, 0, 30],
                  align: 'left'
                },
                valueHead: {
                  color: '#333',
                  width: 20,
                  padding: [0, 20, 0, 30],
                  align: 'center'
                },
                rate: {
                  width: 40,
                  align: 'right',
                  padding: [0, 10, 0, 0]
                },
                rateHead: {
                  color: '#333',
                  width: 40,
                  align: 'center',
                  padding: [0, 10, 0, 0]
                }
              }
            }
          }
        },
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
