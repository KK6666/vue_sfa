<template>
  <div>
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
        <Pie :val="totalshops" title="有效门店" :is-percent-show="false"></Pie>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead'
import Pie from '../components/Pie'
import service from '../service'
export default {
  name: 'Home',
  components: {
    TopHead,
    Pie
  },
  data: function() {
    return {
      monthPercent: 0,
      totalshops: 0
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
      this.monthPercent = res.data.monthPercent
      this.totalshops = res.data.totalshops
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mainWrapper {
  width: 100%;
  header {
    width: 100%;
    height: px2rem(90);
    text-align: center;
    line-height: px2rem(90);
  }
  .pies {
    display: flex;
    justify-content: space-around;
    margin-top: px2rem(10);
  }
}
</style>
