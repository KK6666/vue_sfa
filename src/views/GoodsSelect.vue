<template>
  <div class="view goodsSelect">
    <TopHead title="产品选择" class="header"></TopHead>
    <div class="main item-wrap">
      <GoodsListItem
        class="goodsListItem"
        :number-visible="false"
        :goods="goodsInfo"
      ></GoodsListItem>
      <ul class="item-wrap">
        <li>
          <div>仓库</div>
          <div class="warehouse">
            <span>{{ warehouse.reponame }}</span>
            <i class="iconfont">&#xe84e;</i>
          </div>
        </li>
        <li>
          <div>库存</div>
          <div>{{ goodsInfo.number }}</div>
        </li>
        <li>
          <div>数量</div>
          <div class="count">
            <div @click="countReduce">-</div>
            <input
              ref="input"
              v-model.number="count"
              type="text"
              @input="inputInput"
            />
            <div @click="countAdd">+</div>
          </div>
        </li>
      </ul>
    </div>
    <footer>
      <div>取消</div>
      <div>加入购物车</div>
    </footer>
  </div>
</template>

<script>
import service from '../service'
import GoodsListItem from '../components/GoodsListItem'
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  data() {
    return {
      goodsId: 0,
      goodsInfo: null,
      warehouse: {},
      count: 1
    }
  },
  computed: {
    ...mapState(['goods', 'warehouseList'])
  },
  created() {
    this.goodsId = this.$route.params.id
    // 获取当前货物信息
    this.goodsInfo = this.goods.find(item => item.id == this.goodsId)
    console.log(this.goodsInfo)
    // 获取当前商品对应仓库的信息
    this.getWarehouse()
  },
  methods: {
    ...mapMutations(['initWarehouseList']),
    getWarehouse() {
      service
        .getWarehouse()
        .then(res => {
          console.log(res)
          // res为所有的仓库信息，后面都会用到，存进vuex
          if (!this.warehouseList) {
            this.initWarehouseList(res.data)
          }
          this.warehouse = this.warehouseList.find(
            item => item.id == this.goodsInfo.warehouseId
          )
          console.log(this.warehouse)
        })
        .catch(e => {
          console.log('获取当前仓库信息失败 getWarehouse failed')
          console.log(e)
        })
    },
    countAdd() {
      if (this.count >= this.goodsInfo.number) {
        Toast({
          message: '超过库存',
          position: 'middle',
          duration: 1000
        })
        return
      }
      this.count++
    },
    countReduce() {
      if (this.count <= 1) return
      this.count--
    },
    inputInput() {
      if (this.count >= this.goodsInfo.number) {
        Toast({
          message: '超过库存',
          position: 'middle',
          duration: 1000
        })
        this.count = 1
      }
      // 控制input只能为正整数
      this.$refs.input.value = this.$refs.input.value.replace(
        /^(0+)|[^\d]+/g,
        ''
      )
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
    overflow-y: scroll;
  }
}
.main {
  padding: 0 px2rem(28);
  .item-wrap {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: px2rem(100);
      border-bottom: 1px solid #ccc;
      .warehouse {
        display: flex;
        align-items: center;
      }
      .count {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: px2rem(220);
        text-align: center;
        div {
          border: 1px solid black;
          width: px2rem(47);
          height: px2rem(47);
        }
        input {
          border: 1px solid black;
          width: px2rem(90);
          height: px2rem(47);
          text-align: center;
          border-radius: 5px;
        }
      }
    }
  }
}
footer {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #ccc;
  div {
    flex: 1;
    height: px2rem(100);
    line-height: px2rem(100);
    text-align: center;
  }
  div:first-child {
    color: red;
    border-right: 1px solid #ccc;
  }
  div:last-child {
    color: #23bb59;
  }
}
</style>
