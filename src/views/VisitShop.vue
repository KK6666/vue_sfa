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
    <div class="main">
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
    </div>
  </div>
</template>

<script>
import Tab from '../components/Tab'
import service from '../service'
import { Indicator, Toast } from 'mint-ui'
export default {
  name: 'VisitShop',
  components: {
    Tab
  },
  data() {
    return {
      inputActive: false,
      inputVal: '',
      shopList: [],
      pos: null
    }
  },
  watch: {
    inputVal() {
      if (this.inputVal) {
        this.inputActive = true
      } else {
        this.inputActive = false
      }
    }
  },
  created() {
    this.getLocation()
      .then(() => this.searchShops())
      .catch(e => {
        console.log(e)
      })
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
    searchShops() {
      Indicator.open('请求数据中...')
      service
        .getShops(this.pos.Lng, this.pos.Lat, this.inputVal)
        .then(res => {
          Indicator.close()
          console.log(res)
          this.shopList = res.data
        })
        .catch(e => {
          Indicator.close()
          console.log(e)
          Toast('请求数据失败')
        })
    },
    getLocation() {
      Indicator.open('定位中...')
      // 腾讯地图获取设备地理坐标（使用promise封装）
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
    overflow-y: scroll;

    margin-top: px2rem(20);
    // border-top: 1px solid #ccc;
  }
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
