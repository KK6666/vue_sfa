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
          <!-- errors.has('comNum')———判断错误集合中，name为comNum的input是否有错误，有则返回true -->
          <div
            class="login-input-field"
            :class="{active: active_index===1, error: errors.has('comNum')}"
          >
            <label for="comNum">公司编码:</label>
            <input
              type="number"
              placeholder="请输入4位数字"
              id="comNum"
              v-model="company_num"
              @focus="active_index=1"
              v-validate="'required|length:4'"
              name="comNum"
            />
            <!-- 显示验证未通过信息 -->
            <!-- <span>{{ errors.first('comNum') }}</span> -->
          </div>
          <div
            class="login-input-field"
            :class="{active: active_index===2, error: errors.has('empNum')}"
          >
            <label for="empNum">员工编号:</label>
            <input
              type="number"
              placeholder="请输入5位数字"
              id="empNum"
              v-model="person_num"
              @focus="active_index=2"
              v-validate="{required:true, length:5}"
              name="empNum"
            />
          </div>
          <div
            class="login-input-field"
            :class="{active: active_index===3, error: errors.has('pwd')}"
          >
            <label for="pwd">登录密码:</label>
            <input
              type="password"
              placeholder="请输入6位及以上密码"
              id="pwd"
              v-model="password"
              @focus="active_index=3"
              v-validate="'required|min:6'"
              name="pwd"
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
    <div class="login-btn" @click="handleLogBtnClick">
      <p>登录</p>
    </div>
  </div>
</template>

<script>
import "../assets/font/iconfont.css"
import { Indicator, Toast  } from 'mint-ui'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: "Login",
  components: {},
  data () {
    return {
      // 通过active_index改变，给input绑定active的class
      active_index: 0,
      company_num: '',
      person_num: '',
      password: '',
      remember: false,
      autolog: false
    }
  },
  mounted () {
    // localstorage里的数据赋值给data的属性
    let data = JSON.parse(localStorage.getItem('Login_data'))
    for ( let i in data) {
      this[i] = data[i]
    }
    if (this.autolog===true) {
      this.handleLogBtnClick()
    }
  },
  methods: {
    ...mapMutations([
      // 将 `this.saveUserData()` 映射为 `this.$store.commit('saveUserData')`
      'saveUserData'
    ]),
    // 选择框逻辑：自动登录需同时记住密码，当取消记住密码，自动登录也要取消
    changeRememberStatus () {
      this.remember = !this.remember
      // 当remember为false，让autolog也为false
      this.remember || (this.autolog=false)
    },
    changeAutologStatus () {
      this.autolog = !this.autolog
      this.autolog && (this.remember=true)
    },
    async handleLogBtnClick () {
      // 强制执行一次校验，这里貌似是异步的，如果不写await会直接先执行后面的代码
      await this.$validator.validate()
      // this.errors.any()--errors有数据，即有错误返回true
      if (this.errors.any()) {
        Toast({
          message: '请正确填写信息',
          duration: 1000
        })
      } else {
        Indicator.open('登陆中...')
        axios.post('/api/login',{
          CNO: this.company_num,
          PNO: this.person_num,
          Passwd: this.password
        })
        .then ((res)=>{
          Indicator.close()
          if (res.data.code === 1) {
            // 登录成功
            // 用户信息存入sessionStorage----localStorage会自动将数据转换成为字符串形式，所以我们存储json类型时，可以先用JSON.stringify(data)转成字符串存储，取出时再用JSON.parse()转化为json
            localStorage.setItem('Login_data',JSON.stringify({
              remember: this.remember,
              autolog: this.autolog,
              company_num: this.remember ? this.company_num : '',
              person_num: this.remember ? this.person_num: '',
              password: this.remember ? this.password: ''
            }))

            // 用户信息存入sessionStorage，解决vuex在页面刷新后就丢失数据问题
            sessionStorage.setItem('Login_data',JSON.stringify(res.data.user))

            // 用户信息存入vuex
            this.saveUserData(res.data.user)

            // 跳转至home
            this.$router.push('/home')
          } else {
            // 登录失败
            Toast({
              message: '账号密码错误',
              duration: 1000
            })
          }
        })
        .catch ((e)=>{
          console.log(e)
          Indicator.close()
          Toast({
            message: '登录异常，请重试',
            duration: 1000
          })
        })
      }
    }
  }
};
</script>

<style lang='scss'>
//修改mintui样式，因为和本组件不是同一个组件
.mint-spinner-snake {
  width: px2rem(64) !important;
  height: px2rem(64) !important;
}
.mint-indicator-text{
  font-size: px2rem(30) !important;
}
.mint-toast-text {
  height: px2rem(40);
  font-size: px2rem(40);
}
</style>

<style lang='scss' scoped>
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
        label {
          font-weight: bold;
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

