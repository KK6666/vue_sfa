<template>
  <div class="visitShop view">
    <TopHead title="进店拜访" class="header"></TopHead>
    <Tab class="tab">
      <template v-slot:titleL
        >计划内
      </template>
      <template v-slot:titleR>
        计划外
      </template>
    </Tab>
    <!-- search部分 -->
    <div class="searchWrapper">
      <div class="wrapperL">
        <i class="iconfont">&#xe615;</i>
        <input
          ref="input"
          v-model="inputVal"
          type="text"
          placeholder="请输入搜索内容"
          @focus="inputFocus"
          @blur="inputBlur"
          @keydown.enter="searchShops"
        />
      </div>
      <div v-show="inputActive" class="wrapperR">
        <i class="iconfont cancel" @click="inputClear">&#xe63a;</i>
        <div class="line"></div>
        <div class="searchText" @click="searchShops">
          搜索
        </div>
      </div>
    </div>
    <div id="main" ref="main" class="main">
      <mescroll-vue
        ref="mescroll"
        :up="mescrollUp"
        class="mescroll"
        @init="mescrollInit"
      >
        <ul class="listWrap">
          <li v-for="item in shopList" :key="item.id" class="listItem">
            <ul>
              <li class="top">
                <span>{{ item.name }}</span>
                <span>
                  <i class="iconfont">&#xe61f;</i>&lt;{{ item.distance }}米
                </span>
              </li>
              <li class="middle">{{ `id:${item.id}` }}</li>
              <li class="bottom">{{ item.bossName }}</li>
            </ul>
            <i class="iconfont iR">&#xe84e;</i>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>

<script>
import Tab from '../components/Tab'
import service from '../service'
import { Indicator, Toast } from 'mint-ui'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'VisitShop',
  components: {
    Tab,
    MescrollVue
  },
  data() {
    return {
      inputActive: false,
      inputVal: '',
      shopList: [],
      pos: null,

      // mescroll相关
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        // 上拉加载的配置.
        auto: false,
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- 我是有底线的 --</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        // // 避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // // 这就是为什么无更多数据有时候不显示的原因
        toTop: {
          //回到顶部按钮
          src: require('@/assets/img/mescroll-totop.png'), //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: 'main', //父布局的id (1.3.5版本支持传入dom元素)
          // icon: './static/mescroll/mescroll-empty.png', //图标,默认null,支持网络图
          tip: '暂无相关数据' //提示
        }
      },
      hasNext: true
    }
  },
  watch: {
    inputVal() {
      if (this.inputVal) {
        this.inputActive = true
      } else {
        this.inputActive = false
        // 清空搜索内容时，获取一次数据
        this.searchShops()
      }
    }
  },
  created() {
    // 定位成功后请求shop数据（this.getLocation已用promise封装）
    this.getLocation()
      .then(() => this.searchShops())
      .catch(e => {
        console.log(e)
      })
  },
  mounted() {
    // 设置mescroll定位的top值 ,下拉刷新关闭
    this.setMescroll()
  },
  methods: {
    inputFocus() {
      this.$refs.input.placeholder = ''
    },
    inputBlur() {
      this.$refs.input.placeholder = '请输入搜索内容'
    },
    inputClear() {
      this.inputVal = ''
      this.inputActive = false
    },
    // 腾讯地图获取设备地理坐标（使用promise封装）
    getLocation() {
      Indicator.open('定位中...')
      return new Promise((resolve, reject) => {
        var geolocation = new window.qq.maps.Geolocation(
          '65DBZ-RNYK6-KRWS3-ESEJR-LL5VZ-NCBKQ',
          'myapp'
        )
        geolocation.getLocation(
          position => {
            Indicator.close()
            console.log(position)
            this.pos = position
            resolve(position)
          },
          () => {
            Indicator.close()
            reject()
            Toast('定位失败，请刷新重试')
            console.log('定位失败')
          }
        )
      })
    },
    searchShops() {
      // pos不存在（即未定位），不可以search
      if (!this.pos) {
        Toast('请先刷新页面重新点位')
        return
      }
      // 搜索前，将数据清空，并且将mescroll的页码归0
      this.shopList = []
      this.mescrollUp.page.num = 0
      // 主动触发上拉加载,注意this.upCallback是无效的。请求数据的axios写在upCallback里面，触发即可发起一次请求
      this.mescroll.triggerUpScroll()
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    setMescroll() {
      // mescroll定位top
      this.$refs.mescroll.$el.style.top = this.$refs.main.offsetTop + 'px'
      // mescroll 下拉刷新关闭
      this.mescroll.lockDownScroll(true)
    },
    upCallback(page, mescroll) {
      console.log('upCallback')
      Indicator.open('请求数据中...')
      service
        .getShops(this.pos.Lng, this.pos.Lat, this.inputVal, page.num)
        // .getShops(1, 1, this.inputVal, page.num)
        .then(res => {
          console.log(res)
          Indicator.close()

          // 模拟搜索没有返回结果的情况（用服务器时删除）
          if (this.inputVal.length >= 3) {
            res.data = []
          }
          /////////////////////////////////////////////////////////////////////

          this.shopList.push(...res.data)

          // 模拟数据按照距离从小到大排序（用服务器时删除）
          this.shopList.sort((a, b) => a.distance - b.distance)
          /////////////////////////////////////////////////////////////////////

          if (res.data.length <= 0 || this.shopList.length >= 60) {
            this.hasNext = false
          }
          // 数据渲染成功后,隐藏下拉刷新的状态,可通过mescroll.endSuccess的第二个参数设置是否还有数据，列表如果无下一页数据,则提示无更多数据
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.length, this.hasNext)
          })
        })
        .catch(e => {
          console.log(e)
          Indicator.close()
          Toast('请求数据失败')
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
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
  .header,
  .tab,
  .searchWrapper {
    // 如果内容超出页面高度，子元素的flex-shrink默认为1，head设置的高度会缩小，设置为0后不会缩小
    flex-shrink: 0;
  }
  .main {
    // overflow-y: scroll;
    margin-top: px2rem(20);
    background: pink;
  }
}

.mescroll {
  position: fixed;
  // top: 0;
  bottom: 0;
  height: auto;
  z-index: 99;
}

// search部分
.searchWrapper {
  height: px2rem(80);
  // background: #fafafa;
  border: 2px solid #ccc;
  width: 94%;
  margin-left: 3%;
  margin-top: px2rem(20);
  border-radius: px2rem(10);
  overflow: hidden;
  display: flex;
  .wrapperL {
    flex: 1;
    display: flex;
    i {
      font-size: px2rem(40);
      width: px2rem(80);
      height: 100%;
      line-height: px2rem(80);
      text-align: center;
      color: #ccc;
      // background: red;
    }
    input {
      flex: 1;
      height: 100%;
      line-height: px2rem(80);
      border: none;
      font-size: px2rem(30);
      // background: #fafafa;
      // background: orange;
    }
  }
  .wrapperR {
    display: flex;
    align-items: center;
    .searchText {
      width: px2rem(100);
      text-align: center;
      line-height: px2rem(80);
      font-size: px2rem(30);
      color: black;
      // background: yellow;
    }
    .line {
      height: 50%;
      border: 1px solid #ccc;
    }
    .cancel {
      font-size: px2rem(30);
      height: 100%;
      line-height: px2rem(80);
      width: px2rem(80);
      text-align: center;
      color: #ccc;
      // background: pink;
    }
  }

  // 改变placeHolder颜色
  input::-webkit-input-placeholder {
    color: #ccc;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #ccc;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #ccc;
  }
}

.listWrap {
  .listItem {
    height: px2rem(150);
    margin: 0 5%;
    padding: px2rem(15) 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    // background: pink;
    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 90%;
      .top {
        height: px2rem(30);
        line-height: px2rem(30);
        font-size: px2rem(30);
        // background: pink;
        display: flex;
        justify-content: space-between;
        i {
          font-size: px2rem(30);
        }
      }
      .middle {
        height: px2rem(25);
        line-height: px2rem(25);
        font-size: px2rem(25);
        // background: pink;
      }
      .bottom {
        height: px2rem(25);
        line-height: px2rem(25);
        font-size: px2rem(25);
        // background: pink;
      }
    }
    .iR {
      font-size: px2rem(30);
      // background: pink;
      width: 10%;
      text-align: right;
    }
  }
}
</style>