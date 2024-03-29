// 解析url参数
// @example ?id = 12345 & a=b
// @return Object{id:12345,a:b}
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  //['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      //删除第一个元素并在‘=’位置分割，例如"2:3:4:5".split(":")将返回["2", "3", "4", "5"]
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])//decodeURIComponent可以对url进行解码
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
