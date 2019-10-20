<template>
  <keep-alive>
    <div class="notice view">
      <TopHead title="公告" class="header"></TopHead>
      <div class="main">
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue
          ref="mescroll"
          :down="mescrollDown"
          :up="mescrollUp"
          class="mescroll"
          @init="mescrollInit"
        >
          <ul class="noticeList">
            <li
              v-for="(item, index) in noticeList"
              :key="index"
              class="noticeItem"
            >
              <router-link :to="`/notice/${item.id}`">
                <div class="noticeWrap">
                  <i
                    class="icon iconfont icon-dian"
                    :class="{ readed: item.isRead }"
                  ></i>
                  <div class="notice-bd">
                    <h3 class="noticeTitle">{{ item.title }}</h3>
                    <p class="noticeDate">{{ item.SubDate }}</p>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </mescroll-vue>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import '../assets/font/iconfont.css'
import TopHead from '../components/TopHead'
import service from '../service'
import MescrollVue from 'mescroll.js/mescroll.vue'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
export default {
  name: 'Notice',
  components: {
    TopHead,
    MescrollVue
  },
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: false,
        callback: this.downCallback
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        auto: false,
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        // page: {
        //   num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
        //   size: 10 //每页数据条数,默认10
        // },
        htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>',
        // noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        // // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // // 这就是为什么无更多数据有时候不显示的原因
        toTop: {
          //回到顶部按钮
          src: require('@/assets/img/mescroll-totop.png'), //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        }
        // empty: {
        //   //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
        //   warpId: 'xxid', //父布局的id (1.3.5版本支持传入dom元素)
        //   icon: './static/mescroll/mescroll-empty.png', //图标,默认null,支持网络图
        //   tip: '暂无相关数据~' //提示
        // }
      },
      hasNext: true
    }
  },
  computed: {
    ...mapState({
      noticeList: 'noticeList'
    })
  },
  mounted() {
    // 从noticeDetail返回时，会再此触发mounted，如果noticeList已经有数据了，就不要再发起axios
    if (this.noticeList.length) {
      return
    }
    // 最早一条公告时间设为为当前时间，并以当前时间为第一条时间加载(这里可以用mescroll在页面初始化时直接触发一次upCallback，不必再自己手动写第一次加载)
    service
      .getNotice(new Date(), 10, true)
      .then(res => {
        this.noticeListPush(res.data.data.messages.reverse())
        // earlistDate等于公告列表里最早一条的时间，作为下拉加载之前数据的earlistDate
        this.earlistDate = new Date(
          this.noticeList[this.noticeList.length - 1].SubDate
        )
        // latestDatee等于公告列表里最晚一条的时间，作为下拉加载之前数据的earlistDate
        this.latestDate = new Date(this.noticeList[0].SubDate)
      })
      .catch(e => {
        console.log(e)
      })
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  methods: {
    ...mapMutations(['noticeListPush', 'noticeListUnshift']),
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback(page, mescroll) {
      console.log('upCallback')
      service
        .getNotice(this.latestDate, 10, false)
        .then(res => {
          this.noticeListPush(res.data.data.messages.reverse())
          this.latestDate = new Date(this.noticeList[0].SubDate)
          if (this.noticeList.length > 60) {
            this.hasNext = false
          }
          // 数据渲染成功后,隐藏下拉刷新的状态,可通过mescroll.endSuccess的第二个参数设置是否还有数据，列表如果无下一页数据,则提示无更多数据
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.data.messages.length, this.hasNext)
          })
        })
        .catch(() => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    },
    downCallback(mescroll) {
      console.log(mescroll)
      console.log('downCallback')
      service
        .getNotice(this.earlistDate, 10, true)
        .then(res => {
          // 没有新的数据了
          if (res.data.data.messages <= 0) {
            return
          }
          this.noticeListUnshift(res.data.data.messages.reverse())
          this.earlistDate = new Date(
            this.noticeList[this.noticeList.length - 1].SubDate
          )
          this.$nextTick(() => {
            mescroll.endSuccess()
          })
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
          console.log(e)
        })
    }
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

.mescroll {
  position: fixed;
  top: px2rem(120);
  bottom: 0;
  height: auto;
}

.noticeList {
  background: white;
  .noticeItem {
    height: px2rem(120);
    padding: px2rem(50) 0 0 px2rem(40);
    border-bottom: px2rem(1) solid #ccc;
    .noticeTitle {
      font-size: px2rem(34);
      color: #000;
      line-height: px2rem(28);
    }
    .noticeDate {
      font-size: px2rem(26);
      color: #666;
      line-height: px2rem(16+34);
    }
    .noticeWrap {
      display: flex;
      i {
        flex: 0 0 px2rem(43);
        color: red;
        line-height: px2rem(20);
        font-size: px2rem(50);
      }
      i.readed {
        color: #ccc;
      }
    }
  }
}
</style>
