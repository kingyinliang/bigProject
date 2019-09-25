
export let option = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    align: 'left',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      color: '#ffffff',
      fontSize: '12px'
    },
    right: '10px',
    y: '20px',
    data: ['办理环节占比', '审核环节占比', '未办环节占比', '决策环节占比']
  },
  graphic: [{
    type: 'text',
    left: '67px',
    top: '45%',
    z: 2,
    style: {
      text: '产品总数',
      textAlign: 'center',
      fill: '#ffffff'
    }
  }, {
    type: 'text',
    left: '85px',
    top: '55%',
    z: 2,
    style: {
      text: '5个',
      textAlign: 'center',
      fill: '#ffffff'
    }
  }],
  calculable: true,
  series: [
    {
      name: '半径模式',
      type: 'pie',
      radius: [38, 80],
      center: ['95px', '50%'],
      roseType: 'radius',
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
      color: ['#f19610', '#8a00e1', '#34d160', '#0278e7'],
      data: [
        {value: 10, name: '办理环节占比'},
        {value: 5, name: '审核环节占比'},
        {value: 15, name: '未办环节占比'},
        {value: 25, name: '决策环节占比'}
      ]
    }
  ]
}
