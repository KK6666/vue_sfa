<template>
  <div class="topHead">
    <div class="tp-l" @click="$router.go(-1)">
      <i class="icon iconfont icon-back"></i>
    </div>
    <div class="title">{{ title }}</div>
    <div class="tp-r">
      <slot name="r"></slot>
    </div>
  </div>
</template>

<script>
import '../assets/font/iconfont.css'
export default {
  name: 'TopHead',
  props: {
    title: { type: String, default: '' }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.topHead {
  width: 100%;
  height: px2rem(120);
  line-height: px2rem(120);
  font-size: px2rem(36);
  background-color: #23bb59;
  color: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  .tp-l {
    padding-left: px2rem(28);
    min-width: px2rem(36);
  }
  .tp-r {
    padding-right: px2rem(28);
    min-width: px2rem(36);
  }
  .icon {
    font-size: px2rem(36);
  }
}
</style>
