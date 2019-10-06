<template>
  <div class="login">
    <h1 class="title">欢迎登陆SFA系统</h1>
    <div class="login-con-wrap">
      <div class="login-con-hat"></div>
      <div class="login-main-con">
        <div class="logo-wrap">
          <div class="logo"></div>
        </div>
        <div class="login-input-group">
          <!-- class绑定-对象语法，下面的语法表示 active 这个 class 存在与否将取决于active_index===1 -->
          <div
            class="login-input-field"
            :class="{active: active_index===1}"
          >
            <label for="comCode">公司编码:</label>
            <input
              type="number"
              id="comCode"
              v-model="company_num"
              @focus="active_index=1"
            />
          </div>
          <div
            class="login-input-field"
            :class="{active: active_index===2}"
          >
            <label for="empNum">员工编号:</label>
            <input
              type="number"
              id="empNum"
              v-model="person_num"
              @focus="active_index=2"
            />
          </div>
          <div
            class="login-input-field"
            :class="{active: active_index===3}"
          >
            <label for="pwd">登录密码:</label>
            <input
              type="password"
              id="pwd"
              v-model="password"
              @focus="active_index=3"
            />
          </div>
        </div>
        <div class="login-option-wrap">
          <div
            class="remember-pwd"
            @click="changeRememberStatus"
          >
            <i
              class="iconfont"
              :class="{iconFuxuankuangXuanzhong: remember, iconFuxuankuangWeixuanzhong: !remember}"
            ></i>
            <span>保存密码</span>
          </div>
          <div
            class="auto-login"
            @click="changeAutologStatus"
          >
            <i
              class="iconfont"
              :class="autolog? 'iconFuxuankuangXuanzhong': 'iconFuxuankuangWeixuanzhong'"
            ></i>
            <span>自动登录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="login-btn">
      <p>登录</p>
    </div>
  </div>
</template>

<script>
import "../assets/font/iconfont.css";
export default {
  name: "Login",
  components: {},
  data () {
    return {
      // 通过active_index改变，给input绑定active的class
      active_index: 0,
      company_num: "",
      person_num: "",
      password: "",
      remember: false,
      autolog: false
    }
  },
  methods: {
    // 选择框逻辑：自动登录需同时记住密码，当取消记住密码，自动登录也要取消
    changeRememberStatus () {
      this.remember = !this.remember
      // 当remember为false，让autolog也为false
      this.remember || (this.autolog=false)
    },
    changeAutologStatus () {
      this.autolog = !this.autolog
      this.autolog && (this.remember=true)
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2ade69 !important;
}
.title {
  color: #fff;
  font-size: px2rem(36);
  text-align: center;
  padding-top: px2rem(148-40-36);
}
.login-con-wrap {
  margin-top: px2rem(40);
  .login-con-hat {
    width: px2rem(537);
    height: px2rem(18);
    background-color: #eeeeee;
    margin: 0 auto;
    border-radius: px2rem(18) px2rem(18) 0 0;
  }
  .login-main-con {
    width: px2rem(600);
    height: px2rem(836);
    background-color: #fff;
    margin: 0 auto;
    border-radius: px2rem(14);
    .logo-wrap {
      height: px2rem(190);
      padding-top: px2rem(80);
      .logo {
        width: px2rem(190);
        height: px2rem(190);
        background-image: url(../assets/logo.png);
        background-size: cover;
        margin: 0 auto;
      }
    }
    .login-input-group {
      margin-top: px2rem(80);
      .login-input-field {
        width: px2rem(440);
        height: px2rem(90);
        line-height: px2rem(90);
        padding-left: px2rem(30);
        margin: 0 auto;
        font-size: px2rem(28);
        color: #757575;
        border: 2px solid #e2e2e2;
        border-radius: px2rem(40);
        margin-bottom: px2rem(30);
        input {
          width: px2rem(250);
          padding-left: px2rem(25);
          border: 0 none;
          outline: 0 none;
          font-size: px2rem(28);
        }
      }
    }
    .login-input-field.active {
      border: 2px solid #10903d;
      color: #10903d;
    }
    .login-input-field.error {
      border: 2px solid red;
      color: red;
    }
    .login-option-wrap {
      margin-top: px2rem(45);
      font-size: px2rem(24);
      color: #757575;
      span {
        margin-left: px2rem(15);
        letter-spacing: px2rem(2);
        font-size: px2rem(30)
      }
      i.iconfont {
        font-size: px2rem(30);
      }
      .remember-pwd {
        display: inline-block;
        margin-left: px2rem(80);
      }
      .remember-pwd.active,
      .auto-login.active {
        color: #10903d;
      }
      .auto-login {
        display: inline-block;
        margin-left: px2rem(100);
      }
    }
  }
}
.login-btn {
  width: px2rem(600);
  height: px2rem(100);
  line-height: px2rem(100);
  text-align: center;
  margin: px2rem(20) auto 0;
  color: #10903d;
  background-color: #fff;
  font-size: px2rem(36);
  border-radius: px2rem(15);
  letter-spacing: px2rem(5);
}
</style>
