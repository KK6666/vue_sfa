<template>
  <div class="noticeDetail view">
    <TopHead title="公告信息" class="header"></TopHead>
    <div class="main">
      {{ $route.params.id }}
      三字经_百度汉语 作者：王应麟 人之初，性本善。性相近，习相远。
      苟不教，性乃迁。教之道，贵以专。 昔孟母，择邻处。子不学，断机杼。
      窦燕山，有义方。教五子，名俱扬。 养不教，父之过。教不严，师之惰。
      子不学，非所宜。幼不学，老何为。 玉不琢，不成器。人不学，不知义。
      为人子，方少时。亲师友，习礼仪。
      香九龄，能温席。孝于亲，所当执。三字经_百度汉语 作者：王应麟
      人之初，性本善。性相近，习相远。 苟不教，性乃迁。教之道，贵以专。
      昔孟母，择邻处。子不学，断机杼。 窦燕山，有义方。教五子，名俱扬。
      养不教，父之过。教不严，师之惰。 子不学，非所宜。幼不学，老何为。
      玉不琢，不成器。人不学，不知义。 为人子，方少时。亲师友，习礼仪。
      香九龄，能温席。孝于亲，所当执。三字经_百度汉语 作者：王应麟
      人之初，性本善。性相近，习相远。 苟不教，性乃迁。教之道，贵以专。
      昔孟母，择邻处。子不学，断机杼。 窦燕山，有义方。教五子，名俱扬。
      养不教，父之过。教不严，师之惰。 子不学，非所宜。幼不学，老何为。
      玉不琢，不成器。人不学，不知义。 为人子，方少时。亲师友，习礼仪。
      香九龄，能温席。孝于亲，所当执。
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead'
export default {
  name: 'NoticeDetail',
  components: {
    TopHead
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
    overflow-y: scroll;
  }
}
</style>
