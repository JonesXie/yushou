// 空值验证
export function isNull(val) {
  if ([undefined, null, ''].includes(val)) {
    return false
  } else {
    return true
  }
}

// 时间转化
function add0(m) {
  return m < 10 ? '0' + m : m
}
export function getTime(val) { //
  let now;
  if (val === undefined) {
    now = new Date()
  } else {
    now = new Date(val)
  }
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hour) + ':' + add0(minute) + ':' + add0(second)
}