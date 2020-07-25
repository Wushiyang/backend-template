/**
 *   过滤器
 */
import Vue from 'vue'
import * as custom from './custom'

// 过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

// 时间补零
Vue.prototype.numsAdd = nums => {
  if (nums < 10) {
    return '0' + nums
  } else {
    return nums
  }
}

// 转换时间
Vue.prototype.timer = (dataTime, days) => {
  let timeUn = ''
  let hou = ''
  let min = ''
  let sec = ''
  if (dataTime === undefined || dataTime == null || dataTime === '') {
    return ''
  }
  if (typeof dataTime === 'number') {
    timeUn = new Date(dataTime)
  } else {
    timeUn = new Date(parseInt(dataTime.split(':')[0]) * 1000)
  }
  hou = Vue.prototype.numsAdd(timeUn.getHours())
  min = Vue.prototype.numsAdd(timeUn.getMinutes())
  sec = Vue.prototype.numsAdd(timeUn.getSeconds())
  if (days === 'day') {
    return (
      timeUn.getFullYear() +
      '-' +
      Vue.prototype.numsAdd(timeUn.getMonth() + 1) +
      '-' +
      Vue.prototype.numsAdd(timeUn.getDate())
    )
  }
  return (
    timeUn.getFullYear() +
    '-' +
    Vue.prototype.numsAdd(timeUn.getMonth() + 1) +
    '-' +
    Vue.prototype.numsAdd(timeUn.getDate()) +
    ' ' +
    hou +
    ':' +
    min +
    ':' +
    sec
  )
}

// 判断时间格式
Vue.prototype.timercheck = (dataTime, type) => {
  let regTime = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/
  let regDay = /^(\d{4})-(\d{2})-(\d{2})$/
  if (dataTime !== '' && dataTime !== undefined && dataTime != null) {
    if (regTime.test(dataTime) || regDay.test(dataTime)) {
      return dataTime
    } else {
      if (type === 'day') {
        return Vue.prototype.timer(dataTime.getTime(), 'day')
      } else {
        return Vue.prototype.timer(dataTime.getTime())
      }
    }
  } else {
    return ''
  }
}
