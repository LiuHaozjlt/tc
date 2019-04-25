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
           <div class="mui-input-row" v-if="!isPasswordLogin || !isLogin || isForget">
            <img src="../image/yzm.png" alt="">
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
        <denlubtn @click.native="submit">
          {{isForget ? "重置密码" : (isLogin ? "登录" : "注册")}}
        </denlubtn>
      </div>
      <div class="mui-input-warp" v-if="isLogin && !isForget">
      <div class="mui-button-row">
        <div>
           <div  class="dx-yanzhen" @click="changeLoginType">{{ isPasswordLogin ? "短信验证" : "账号登录"}}</div>
        </div>
        <div   class="wj-mima" v-if="isPasswordLogin" @click="onForget">忘记密码</div>
      </div>
      </div>
    </form>
    <div class="zhucexieyi" v-if="!isLogin">
      注册表示已同意《老挝咨询使用协议》
    </div>
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
    },
    isForget: {
      type: Boolean,
      default: false
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
      xh: 86
    }
  },
  components: {
    dropdown,
    denlubtn
  },

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
      // console.log('短信验证')
      let type = 0

      if (this.isForget) {
        type = 1
      } else if (this.isLogin) {
        type = 2
      }
      this.axius.post('/apis/v1/sms/send', {
        mobile: self.mobile,
        xh: this.xh,
        type: type
      }).then(({ data }) => {
        // console.log(data)
        if (data.error_code === 0) {
          self.send()
        } else {
          Toast(data.message)
          if (type === 0 && data.error_code === 400) {
            this.$emit('change', true)
          }
        }
      })
    },

    loginByCode () {
      if (this.code === '') {
        // console.log('没输入验证码')
        return false
      }
      this.axius.post('/apis/v1/user/login', {
        xh: 86,
        code: this.code,
        type: 2,
        mobile: this.mobile
      }).then(p => {
        // console.log('登录接口')
        if (p.data.error_code === 0) {
          this.callAfterLogin(p.data.data)
        } else {
          // console.log('其他错误')
          Toast({
            message: p.data.message,
            position: 'center',
            duration: -1
          })
          if (p.data.message.indexOf('未注册') > -1) {
            this.$emit('change', false)
          }
        }
      })
    },
    getregist () {
      if (this.code === '') {
        Toast('请输入验证码')
        return false
      }

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
        Toast('请输入密码')
        return false
      }
      this.axius.post('/apis/v1/user/login', {
        xh: 86,
        password: this.password,
        type: 1,
        mobile: this.mobile
      }).then(p => {
        // console.log('登录接口')
        if (p.data.error_code === 0) {
          // 登录成功
          this.callAfterLogin(p.data.data)
        } else {
          Toast({
            message: p.data.message,
            position: 'center'
            // duration: -1
          })
          if (p.data.message.indexOf('未注册') > -1) {
            this.$emit('change', false)
          }
        }
      })
    },
    submit () {
      console.log('submit')
      if (this.mobile === '') {
        Toast('没输入')
        return false
      }

      if (this.isForget) {
        this.resetPassword()
        return
      }
      if (!this.isLogin) {
        this.getregist()
      } else {
        if (this.isPasswordLogin) {
          this.loginByPassword()
        } else {
          this.loginByCode()
        }
      }
    },
    resetPassword () {
      if (this.code === '') {
        Toast('请输入验证码')
        return false
      }
      if (this.password === '') {
        Toast('请输入密码')
        return false
      }

      this.axius.post('/apis/v1/user/password-reset', {
        xh: this.xh,
        password: this.password,
        code: this.code,
        mobile: this.mobile
      }).then(p => {
        if (p.data.error_code === 0) {
          this.$emit('change', true)
          this.code = ''
          Toast('重置密码成功，现在可以登录啦')
        } else {
          // console.log('其他错误')
          // 其他错误

          Toast({
            message: p.data.message,
            position: 'center'
            // duration: -1
          })
        }
      })
    },
    callAfterLogin (userInfo) {
      Toast('登录成功')
      this.$store.commit('saveUserInfo', userInfo)
      this.$router.replace('/')
    }
  }
}
</script>

<style>
.zhucexieyi{
  font-size:.8125rem /* 13/16 */;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
text-align: center;
}
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
