<template>
  <div class="denlu-frm">
    <form class="mui-input-group">
      <div class="mui-input-warp">
          <div class="mui-input-row">
            <img src="../image/wo@2x.png" alt="">
            <dropdown @change="xh = $event"></dropdown>
            <input type="text" class="mui-input-clear denlu" v-model='mobile' placeholder="手机号">
          </div>
      </div>
      <div class="mui-input-warp">
           <div class="mui-input-row" v-if="!isPasswordLogin || !isLogin">
            <img src="../image/suo@2x.png" alt="">
            <input type="password" class="mui-input-password denlu" v-model='code' placeholder="请输入验证码">
            <span v-if="!isSending" @click="getmessage">获取验证码</span>
            <span v-else-if="timeCount > -1" class="timer">{{timeCount }} s</span>
            <span v-else @click="reSend">重新发送</span>
          </div>
          <div class="mui-input-row" v-if='isPasswordLogin || !isLogin'>
            <img src="../image/suo@2x.png" alt="">
            <input type="password" class="mui-input-password denlu"   v-model='password'   placeholder="请输入密码">
          </div>
      </div>
      <div class="mui-input-warp">
        <!-- 不能这么写事件 -->
          <denlubtn :is-login="isLogin" :mobile='mobile' :code='code' @click.native="submit"></denlubtn>
      </div>
      <div class="mui-input-warp" v-if="isLogin">
      <div class="mui-button-row">
        <div>
           <div  class="dx-yanzhen" @click="changeLoginType">{{ isPasswordLogin ? "短信验证" : "账号登录"}}</div>
        </div>
        <div   class="wj-mima" v-if="isPasswordLogin" @click="onForget">忘记密码</div>
      </div>
      </div>
    </form>
    <!-- <div class="mui-input-warp">
     <qitafangshi></qitafangshi>
    </div> -->
  </div>
</template>

<script>
import dropdown from '@/components/dropdown-menu'
import denlubtn from '@/components/denlu-btn'
import { setInterval, clearInterval } from 'timers'
import { Toast } from 'mint-ui'
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isSending: false,
      timeCount: 56,
      isPasswordLogin: true,
      mobile: '',
      code: '',
      password: '',
      xh: ''
    }
  },
  components: {
    dropdown,
    denlubtn
  },
  // created(){
  //     Toast({
  //         message: '提示信息',
  //         position: 'center'，
  //     duration: -1
  //         })
  // }
  methods: {
    changeLoginType () {
      this.isPasswordLogin = !this.isPasswordLogin
    },
    send () {
      this.isSending = true
      let timer = setInterval(() => {
        if (this.timeCount === -1) {
          clearInterval(timer)
        } else {
          this.timeCount--
        }
      }, 1000)
    },
    reSend () {
      this.timeCount = 56
      this.send()
    },
    onForget () {
      this.$emit('forget')
    },
    getmessage () {
      let self = this
      console.log('短信验证')
      this.axius.post('/apis/v1/sms/send', {
        mobile: self.mobile,
        xh: 86,
        type: 0
      }).then(({ data }) => {
        console.log(data)
        if (data.error_code === 0) {
          self.send()
        } else {
          Toast(data.message)
          if (!this.isLogin && data.error_code === 400 && data.message === '该手机号已注册过') {
            this.$emit('change', true)
          }
        }
      })
    },

    loginByCode () {
      if (this.code === '') {
        console.log('没输入验证码')
        return false
      }
      this.axius.post('/apis/v1/user/login', {
        xh: 86,
        code: this.code,
        type: 2,
        mobile: this.mobile
      }).then(p => {
        console.log('登录接口')
        if (p.data.error_code === 0) {
          this.callAfterLogin(p.data.data)
        } else if (p.data.error_code === 400) {
          console.log('未注册')
          this.$emit('change', false)
        } else {
          console.log('其他错误')
          Toast({
            message: p.data.message,
            position: 'center',
            duration: -1
          })
        }
      })
    },
    getregist () {
      if (this.code === '') {
        console.log('没输入验证码')
        return false
      }

      let self = this
      this.axius.post('/apis/v1/user/register', {
        xh: 86,
        code: this.code,
        password: this.password,
        mobile: this.mobile
      }).then(({ data }) => {
        console.log(data)
        if (data.error_code === 0) {
          Toast('注册成功')
          this.$emit('change', true)
        } else {
          Toast(data.message)
        }
        // this.$emit('regist')
      })
    },

    // 密码登录
    loginByPassword () {
      if (this.password === '') {
        console.log('没输入密码')
        return false
      }
      this.axius.post('/apis/v1/user/login', {
        xh: 86,
        password: this.password,
        type: 1,
        mobile: this.mobile
      }).then(p => {
        console.log('登录接口')
        if (p.data.error_code === 0) {
          // 登录成功
          this.callAfterLogin(p.data.data)
        } else if (p.data.error_code === 400) {
          console.log('未注册')

          // 切换注册页面
          this.$emit('change', false)
        } else {
          console.log('其他错误')
          // 其他错误

          Toast({
            message: p.data.message,
            position: 'center'
            // duration: -1
          })
        }
      })
    },
    submit () {
      console.log('submit')
      if (this.mobile === '') {
        console.log('没输入')
        return false
      }

      // this.axius.post('/apis/v1/user/login', {
      //   xh: 86,
      //   code: this.code,
      //   type: 2,
      //   mobile: this.mobile
      // }).then(p => {
      //   console.log('登录接口')
      //   if (p.data.error_code === 0) {
      //     // 登录成功
      //   } else if (p.data.error_code === 0) {
      //     console.log(p.data.error_code)
      //     // 未注册 你先注册调用一下这个接口 找到这个code  x
      //     // 切换注册页面
      //   } else {
      //     console.log('其他错误')
      //     // 其他错误
      //     // 首先要知道登录没成功 需要注册是error—code
      //     Toast({
      //       message: p.data.message,
      //       position: 'center'
      //       // duration: -1
      //     })
      //   }
      // })
      if (!this.isLogin) {
        this.getregist()
        // debugger 注册成功
      } else {
        if (this.isPasswordLogin) {
          this.loginByPassword()
        } else {
          this.loginByCode()
        }
      }
    },
    callAfterLogin (userInfo) {
      Toast('登录成功')
      this.$store.commit('saveUserInfo', userInfo)
      this.$router.replace('/')
      this.$router.back()
    }
  }
}
</script>

<style>
.dx-yanzhen,
.wj-mima {
  font-size: 0.8125rem;
  font-family: PingFang-SC-Regular;
  font-weight: 200;
  color: rgba(153, 153, 153, 1);
}
.el-dropdown-menu li {
  width: 100px;
  text-align: center;
}
.mui-input-warp {
  padding: 0 10%;
  /* display: flex;
  justify-content: center */
}
.mui-input-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}
.mui-input-row img {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
}
.mui-input-group .mui-input-row {
  /* margin: 0 0.3rem; */
}
.mui-button-row {
  /* padding-bottom:9.125rem; */
  height: 0!important;
  display: flex;
  justify-content: space-between;
}
.mui-input-group .mui-input-row:after {
  width: 0;
  /* width: 90%; */
}
.mui-input-group:before {
    position: static;
    right: static;
    bottom: static;
    left: static;
    height: static;
    content: static;
    -webkit-transform: static;
    transform: static;
    background-color: static;
}
.mui-input-group:after {
    position: static;
    right: static;
    bottom: static;
    left: static;
    height: static;
    content: static;
    -webkit-transform: static;
    transform: static;
    background-color: static;
}
/* .timer {
  coloyangshi wo lai  hai you zui hou yig wnt
} */
</style>
