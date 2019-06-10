// 空值验证
export function isNull(val) {
  if ([undefined, null, ''].includes(val)) {
    return false
  } else {
    return true
  }
}