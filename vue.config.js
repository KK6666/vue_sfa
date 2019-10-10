module.exports = {
  css: {
    loaderOptions: {
      sass: {
        //    // 旧
        //      data: `@import "~@/assets/scss/variables.scss";`
        //    // 新
        //      prependData: `@import "~@/assets/scss/variables.scss";`
        prependData: `@import "./src/assets/style/main.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://yapi.demo.qunar.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock/2226/api' // rewrite path
        }
      }
    },
    // 可以让eslint警告显示在console
    hot: true,
    clientLogLevel: 'warning'
  }
}
