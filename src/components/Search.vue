<template>
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
      />
    </div>
    <div v-show="inputActive" class="wrapperR">
      <i class="iconfont cancel" @click="inputClear">&#xe63a;</i>
      <div class="line"></div>
      <div class="searchText">搜索</div>
    </div>
    <!-- <div v-show="!inputActive" class="fnWrapper"></div> -->
  </div>
</template>

<script>
export default {
  name: 'VisitShop',
  data() {
    return {
      inputActive: false,
      inputVal: ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.searchWrapper {
  height: px2rem(80);
  background: #fafafa;
  width: 94%;
  margin-left: 3%;
  margin-top: px2rem(20);
  border-radius: px2rem(20);
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
      background: #fafafa;
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
</style>
