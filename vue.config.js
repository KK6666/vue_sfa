module.exports = {
  css: {
    loaderOptions: {
      sass: {
//    // 旧
//      data: `@import "~@/assets/scss/variables.scss";`
//    // 新
//      prependData: `@import "~@/assets/scss/variables.scss";`
        prependData: `@import "./src/lib/hotcss/px2rem.scss";`
      }
    }
  }
}