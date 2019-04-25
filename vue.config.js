module.exports = {
  lintOnSave: true,//使用eslint
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            propList: ['*'],
          }),
        ]
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    open: true, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host，默认是 localhost
    port: 8080, // 端口地址
  }
}