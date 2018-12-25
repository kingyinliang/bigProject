/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}
/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}
// 人员管理数据处理
export function transfer (data) {
  var res = []
  var selcedid = []
  data.forEach((item, index) => {
    if (item.del_flag === '0') {
      selcedid.push(item.user_id)
    }
    res.push({
      label: item.name,
      key: item.user_id,
      screncon: item.name
    })
  })
  return {
    res: res,
    selcedid: selcedid
  }
}
export function setUserList (data) {
  var res = []
  data.forEach((item, index) => {
    res.push({
      label: item.realName + '（' + ((item.workNum !== null && item.workNum !== '') ? item.workNum : item.workNumTemp) + '）',
      key: item.realName + '（' + ((item.workNum !== null && item.workNum !== '') ? item.workNum : item.workNumTemp) + '）',
      screncon: item.realName + '（' + ((item.workNum !== null && item.workNum !== '') ? item.workNum : item.workNumTemp) + '）'
    })
  })
  return res
}
export function toDate (dateString) {
  var DATE_REGEXP = new RegExp('(\\d{4})-(\\d{2})-(\\d{2})([T\\s](\\d{2}):(\\d{2}):(\\d{2})(\\.(\\d{3}))?)?.*')
  if (DATE_REGEXP.test(dateString)) {
    var timestamp = dateString.replace(DATE_REGEXP, function ($all, $year, $month, $day, $part1, $hour, $minute, $second, $part2, $milliscond) {
      var date = new Date($year, $month, $day, $hour || '00', $minute || '00', $second || '00', $milliscond || '00')
      return date.getTime()
    })
    var date = new Date()
    date.setTime(timestamp)
    return date
  }
  return null
}
// dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// dateFormat(new Date(), "yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
export function dateFormat (date, fmt) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
/**
 * 导出
 * @param {*} ulr fileName vue
 */
export function exportFile (url, fileName, vue) {
  vue.lodingS = true
  vue.$http(url, 'POST', vue.plantList, false, true).then(({data}) => {
    let blob = new Blob([data], {
      type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob)
    } else {
      let elink = document.createElement('a')
      elink.download = `${fileName}${getNewDate()}.xlsx`
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      document.body.removeChild(elink)
    }
    vue.lodingS = false
  })
}
/**
 * 动画
 * @param {*}
 */
export function headanimation ($) {
  // 搜索切换显隐
  $('.toggleSearchBottom').click(function () {
    $('.searchCard').animate({height: 0}, 300, function () {
      $('.searchCard').parent('.main').css('padding-bottom', 0)
    })
    $(this).hide()
    $('.toggleSearchTop').show()
  })
  $('.toggleSearchTop').click(function () {
    let hei = $('.el-card__body').height()
    $('.searchCard').animate({height: `${hei + 40}px`}, 300, function () {
      $('.searchCard').parent('.main').css('padding-bottom', '15px')
    })
    $(this).hide()
    $('.toggleSearchBottom').show()
  })
}
/**
 * 获取时间
 * @param {*} null
 */
export function getNewDate () {
  return new Date().getFullYear().toString() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1).toString() : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate().toString() : ('0' + new Date().getDate()))
}

/**
 * 准备时间动画
 */
export function Readyanimation ($) {
  $('.readyshiftBtn').click(function () {
    var $shiftBox = $('.' + $(this).attr('name') + 'Box')
    if ($(this).find('i').hasClass('el-icon-caret-top')) {
      $(this).html('展开<i class="el-icon-caret-bottom"></i>')
      $shiftBox.data('heightData', $shiftBox.height())
      $shiftBox.css('overflow', 'hidden')
      $shiftBox.animate({height: 0}, 300, function () {})
    } else {
      $shiftBox.css('overflow', 'auto')
      $(this).html('收起<i class="el-icon-caret-top"></i>')
      $shiftBox.animate({height: $shiftBox.data('heightData')}, 300, function () {
        $shiftBox.css('height', 'auto')
      })
    }
  })
}
