const htmlToTextRegexp = new RegExp('>(.*?)<', 'g')
// html转换成文本(safari不支持零宽断言,所以这样处理)
export const htmlToText = (str) => {
  let text = []
  str.replace(htmlToTextRegexp, function (match, sub1) {
    text.push(sub1)
  })
  return text.join('')
}

// 不足十加零
export const addZero = (nums) => {
  if (nums < 10) {
    return '0' + nums
  } else {
    return nums
  }
}
// 生成标准时间格式 (yyyy-mm-dd hh:mm)
export const timeFormat = (dataTime, format = 'yyyy-MM-dd HH:mm:ss') => {
  let timeUn = ''
  let year = ''
  let month = ''
  let date = ''
  let hou = ''
  let min = ''
  let sec = ''
  if (typeof dataTime === 'string' || typeof dataTime === 'number') {
    timeUn = new Date(dataTime)
  } else if (dataTime instanceof Date) {
    timeUn = dataTime
  } else {
    return ''
  }
  year = timeUn.getFullYear()
  month = timeUn.getMonth() + 1
  date = timeUn.getDate() + 1
  hou = timeUn.getHours()
  min = timeUn.getMinutes()
  sec = timeUn.getSeconds()
  return format
    .replace('yyyy', year)
    .replace('MM', addZero(month))
    .replace('M', month)
    .replace('dd', addZero(date))
    .replace('d', date)
    .replace('HH', addZero(hou))
    .replace('H', hou)
    .replace('mm', addZero(min))
    .replace('m', min)
    .replace('ss', addZero(sec))
    .replace('s', sec)
}

// 转换到标准时间格式(yyyy-mm-dd hh:mm)
export const timeToStandard = (dataTime, type) => {
  let regTime = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/
  let regDay = /^(\d{4})-(\d{2})-(\d{2})$/
  if (dataTime !== '' && dataTime !== undefined && dataTime != null) {
    if (regTime.test(dataTime) || regDay.test(dataTime)) {
      return dataTime
    } else {
      if (type === 'day') {
        return timeFormat(dataTime.getTime(), 'yyyy-MM-dd')
      } else {
        return timeFormat(dataTime.getTime())
      }
    }
  } else {
    return ''
  }
}

// 图片路径转化
export const jumpImgs = (value, defaultmg) => {
  if (value) {
    return value
  } else {
    return '/static/images/' + defaultmg
  }
}

export const timeToCNWeek = (dataTime) => {
  let timeUn
  if (typeof dataTime === 'string' || typeof dataTime === 'number') {
    timeUn = new Date(dataTime)
  } else if (dataTime instanceof Date) {
    timeUn = dataTime
  } else {
    return ''
  }
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return weekday[timeUn.getDay()]
}
