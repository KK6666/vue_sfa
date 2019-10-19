<template>
  <div id="app">
    <keep-alive include="Notice">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
#app {
  background: white;
}

// 修改mintui样式
.mint-spinner-snake {
  width: px2rem(64) !important;
  height: px2rem(64) !important;
}
.mint-indicator-text {
  font-size: px2rem(30) !important;
  line-height: px2rem(30) !important;
}
.mint-toast-text {
  // height: px2rem(80) !important;
  line-height: px2rem(30) !important;
  font-size: px2rem(30) !important;
}
</style>
