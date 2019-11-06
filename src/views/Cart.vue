<template>
  <div class="cart view">
    <TopHead :title="shopItem.shop.name" class="header"></TopHead>
    <div class="main">
      <Warehouse
        v-for="warehouseItem in shopItem.warehouseArray"
        :key="warehouseItem.id"
        :warehouse-item="warehouseItem"
        :shop-id="shopItem.shop.id"
      ></Warehouse>
    </div>
    <footer>
      <Check
        class="left"
        :checked="shopItem.checked"
        @checkClick="checkClick"
      ></Check>
      <div class="right">
        <div>全选</div>
        <div class="total">
          合计：<span>{{ getPriceTotal }}元</span>
        </div>
        <div class="button">确认</div>
      </div>
    </footer>
  </div>
</template>

<script>
import Check from '../components/Check'
import { mapState, mapMutations } from 'vuex'
import Warehouse from '../components/Warehouse'
export default {
  name: 'Cart',
  components: {
    Warehouse,
    Check
  },
  data() {
    return {
      shopItem: null //当前门店对应的购物车信息
    }
  },
  computed: {
    ...mapState(['cartList', 'curOrderShop']),
    // 计算总价格
    getPriceTotal: function() {
      let total = 0
      this.shopItem.warehouseArray.forEach(warehouse => {
        warehouse.goodsArray.forEach(goods => {
          if (goods.checked == true) {
            total += goods.count * goods.goods.monery
          }
        })
      })
      return total
    }
  },
  created() {
    this.shopItem = this.cartList.find(
      cart => cart.shop.id == this.curOrderShop.id
    )
  },
  methods: {
    ...mapMutations(['changeAllChecked']),
    checkClick() {
      this.changeAllChecked({
        shopId: this.shopItem.shop.id,
        allChecked: this.allChecked
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
    overflow-y: scroll;
  }
}

footer {
  background-color: #fff;
  padding: 0 px2rem(28);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: px2rem(100);
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  .left {
    margin-right: px2rem(28);
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total {
      span {
        color: red;
      }
    }
    .button {
      width: px2rem(168);
      height: px2rem(70);
      line-height: px2rem(70);
      text-align: center;
      background-color: #109d3d;
      border-radius: px2rem(5);
      color: white;
    }
  }
}
</style>
