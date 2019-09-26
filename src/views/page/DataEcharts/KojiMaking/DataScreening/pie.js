export let pie = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    right: '40px',
    top: '10%',
    height: '80%',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 15,
    textStyle: {
      color: '#ffffff',
      fontSize: '12px'
    },
    data: ['决策环节占比', '办理环节占比', '审核环节占比', '未办环节占比', '决策环节占比1', '办理环节占比1', '审核环节占比1', '未办环节占比1']
  },
  series: [
    {
      name: '产品分布情况',
      type: 'pie',
      selectedMode: 'single',
      center: ['25%', '50%'],
      radius: [0, '45%'],
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      color: ['#5fcc5f', '#bd4ae7', '#fda338'],
      data: [
        {value: 335, name: '决策环节占比', selected: true},
        {value: 679, name: '办理环节占比'},
        {value: 1548, name: '审核环节占比'}
      ]
    },
    {
      name: '产品分布情况',
      type: 'pie',
      center: ['25%', '50%'],
      radius: ['60%', '85%'],
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      color: ['#f35945', '#12c0ff', '#dcca36', '#1887ff', '#fff56b'],
      data: [
        {value: 1000, name: '未办环节占比'},
        {value: 889, name: '决策环节占比1'},
        {value: 600, name: '办理环节占比1'},
        {value: 500, name: '审核环节占比1'},
        {value: 229, name: '未办环节占比1'}
      ]
    }
  ]
}
