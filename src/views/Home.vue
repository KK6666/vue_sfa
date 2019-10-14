<template>
  <div class="home">
    <TopHead title="SFA">
      <router-link
        slot="r"
        class="icon iconfont icon-user"
        to="/user"
      ></router-link>
    </TopHead>
    <div class="mainWrapper">
      <header>{{ getYearMonth }}</header>
      <div class="pies">
        <Pie :val="getDayOfMonth" title="月进度"></Pie>
        <Pie :val="monthPercent" title="月销售额完成"></Pie>
        <Pie :val="totalShops" title="有效门店" :is-percent-show="false"></Pie>
      </div>
    </div>
    <ul class="topicWrapper">
      <li v-for="i in 9" :key="i">
        <template v-if="i <= topicList.length">
          <Topic
            :url="topicList[i - 1].url"
            :img-url="topicList[i - 1].imgUrl"
            :menu-name="topicList[i - 1].menuName"
          >
          </Topic>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import TopHead from '../components/TopHead'
import Pie from '../components/Pie'
import Topic from '../components/Topic'
import service from '../service'
const topicList = [
  {
    menuName: '公司通告',
    imgUrl: require('@/assets/img/gstg.png'),
    url: '/notice'
  },
  {
    menuName: '进店拜访',
    imgUrl: require('@/assets/img/jdbf.png'),
    url: '/visitshop'
  },
  {
    menuName: '电话订单',
    imgUrl: require('@/assets/img/dhdd.png'),
    url: '/phoneorder'
  },
  {
    menuName: '订单状态',
    imgUrl: require('@/assets/img/ddzt.png'),
    url: '/orders'
  },
  {
    menuName: '培训资料',
    imgUrl: require('@/assets/img/pxzl.png'),
    url: '/training'
  },
  {
    menuName: '消息中心',
    imgUrl: require('@/assets/img/xxzx.png'),
    url: '/message'
  },
  {
    menuName: '新增门店',
    imgUrl: require('@/assets/img/xzmd.png'),
    url: '/addedshop'
  },
  {
    menuName: '数据同步',
    imgUrl: require('@/assets/img/sjtb.png'),
    url: '/asyncdata'
  }
]
export default {
  name: 'Home',
  components: {
    TopHead,
    Pie,
    Topic
  },
  data: function() {
    return {
      monthPercent: 0,
      totalShops: 0,
      topicList: topicList
    }
  },
  computed: {
    getYearMonth() {
      let date = new Date()
      return `${date.getFullYear()}年${date.getMonth() + 1}月`
    },
    getDayOfMonth() {
      let t = new Date()
      return parseInt((t.getDate() / 30) * 100)
    }
  },
  mounted() {
    service.getUserProgress().then(res => {
      this.monthPercent = res.data.monthPercent * 100
      this.totalShops = res.data.totalShops
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.home {
  color: $text-color;
  padding-top: px2rem(120);
  background: white;
  height: 100%;
}
.mainWrapper {
  width: 100%;
  header {
    width: 100%;
    height: px2rem(90);
    text-align: center;
    line-height: px2rem(90);
    font-size: $text-size-imp;
  }
  .pies {
    display: flex;
    justify-content: space-around;
    margin-top: px2rem(10);
  }
}
.topicWrapper {
  margin-top: px2rem(50);
  padding-left: px2rem(30);
  padding-right: px2rem(30);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-top: 1px solid #ccc;
  li {
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    // 未平分剩余宽度前，各占30%，可保证每行只有三个元素
    flex: 1 1 30%;
    // padding: 10% 0;
  }
  li:nth-of-type(3n) {
    border-right: none;
  }
}
</style>
