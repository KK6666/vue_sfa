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
        <Pie :finish-val="finishVal" title="月进度"></Pie>
        <Pie :finish-val="finishVal" title="月销售额完成"></Pie>
        <Pie :finish-val="522" title="有效门店" :is-percent-show="false"></Pie>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from '../components/TopHead'
import Pie from '../components/Pie'
export default {
  name: 'Home',
  components: {
    TopHead,
    Pie
  },
  data: function() {
    return {
      finishVal: 20
    }
  },
  computed: {
    getYearMonth() {
      let date = new Date()
      return `${date.getFullYear()}年${date.getMonth() + 1}月`
    }
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
