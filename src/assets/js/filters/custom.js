// 时间格式化
let dateServer = value => {
  let timeUn = ''
  let hou = ''
  let min = ''
  let sec = ''
  if (typeof value === 'number') {
    timeUn = new Date(value)
  } else {
    timeUn = new Date(parseInt(value.split(':')[0]) * 1000)
  }
  if (timeUn.getHours() < 10) {
    hou = '0' + timeUn.getHours()
  } else {
    hou = timeUn.getHours()
  }
  if (timeUn.getMinutes() < 10) {
    min = '0' + timeUn.getMinutes()
  } else {
    min = timeUn.getMinutes()
  }
  if (timeUn.getSeconds() < 10) {
    sec = '0' + timeUn.getSeconds()
  } else {
    sec = timeUn.getSeconds()
  }
  return (
    timeUn.getFullYear() +
    '-' +
    (timeUn.getMonth() + 1) +
    '-' +
    timeUn.getDate() +
    ' ' +
    hou +
    ':' +
    min +
    ':' +
    sec
  )
}

// 图片转化
let jumpImgs = value => {
  if (value && value !== 'mock') {
    return value
  } else {
    return 'static/images/common/userImg.jpg'
  }
}

export { dateServer, jumpImgs }
