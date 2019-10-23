<template>
  <div class="view">
    <TopHead title="门店签到" class="header">
      <i slot="r" class="iconfont">&#xe61e;</i>
    </TopHead>
    <div class="main">
      <ul class="picWrap">
        <li>
          <ImgBtn
            icon-class="icon-xiangji"
            val="拍摄照片"
            @btnClick="takePhoto"
          ></ImgBtn>
        </li>
        <li>
          <!-- 在属性前isred加冒号，表示此属性的值是变量或表达式，如果不加，就认为是字符串，所以抛错。 -->
          <ImgBtn
            icon-class="icon-shanchudange"
            val="删除照片"
            :isred="true"
          ></ImgBtn>
        </li>
        <li>
          <ImgBtn></ImgBtn>
        </li>
        <li><ImgBtn></ImgBtn></li>
        <li><ImgBtn></ImgBtn></li>
      </ul>
      <input type="file" class="file" />
    </div>
  </div>
</template>

<script>
import ImgBtn from '../components/ImgBtn'
export default {
  name: 'Sign',
  components: {
    ImgBtn
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    takePhoto() {}
  }
}
</script>

<style lang="scss" scoped>
// 页面实现header固定，main单独实现滑动
.view {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  .header {
    // TopHead的父组件（也就是整个页面）会全部使用flex布局，如果内容超出页面高度，子元素的flex-shrink默认为1，head设置的高度会缩小，设置为0后不会缩小
    flex-shrink: 0;
  }
  .main {
    // overflow: scroll;
  }
}

.header {
  i {
    font-size: px2rem(36);
  }
}

.picWrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: px2rem(20);
}
</style>
