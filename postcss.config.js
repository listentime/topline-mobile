// node中path模块，用来获取路径分隔符，就是反斜杠和正斜杠，为了防止不同系统，就用这个sep模块
const { sep } = require('path')
module.exports = ({ file }) => {
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1 ? 37.5 : 75
  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
