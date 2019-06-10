// 空值验证
export function isNull(val) {
  if(val !== undefined && val !== null && val !== ''){
    return true
  }else{
    return false
  }
}