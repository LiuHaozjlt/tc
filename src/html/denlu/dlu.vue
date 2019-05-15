<template>
  <div class="login">
    <!-- <div @click="changeLang">{{$t('message.lang')}}</div> -->
    <div class="login-box">
    <!-- <div class="test">测试</div> -->
      <denluhead class="login-head" :is-login="isLogin" :is-forget="isForget"
           @change="changeLogin" @back="handleBack"></denluhead>
      <denlulogo></denlulogo>
      <denlufrm :is-login="isLogin" :is-forget="isForget" @forget="isForget = true" @change="isForget = false;isLogin = $event"></denlufrm>
      <denluxuanxiang v-if="isLogin && !isForget"></denluxuanxiang>
    </div>
  </div>
</template>
<script>
import denluhead from '@/components/denlu-head'
import denlulogo from '@/components/denlu-logo'
import denlufrm from '@/components/denlu-from'
import denluxuanxiang from '@/components/denlu-xuanxiang'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isLogin: true,
      isForget: false
    }
  },
  components: {
    denluhead,
    denlulogo,
    denluxuanxiang,
    denlufrm
  },
  computed: {
    ...mapState(['isLaos'])
  },
  methods: {
    ...mapMutations(['setIsLaos']),
    changeLogin (val) {
      this.isLogin = val
    },
    handleBack (type) {
      if (type === 'forget') {
        this.isForget = false
      } else if (type === 'login') {
        this.$router.push('/')
      }
    },
    login () {

    },
    changeLang () {
      this.$i18n.locale = !this.isLaos ? 'zh' : 'laos'
      this.setIsLaos(!this.isLaos)
      // this.$i18n.locale = this.$i18n.locale === 'zh' ? 'laos' : 'zh'
    }
  },
  mounted () {

  }
}
</script>
<style>
.mint-toast {
  width: 7.8125rem;
  border-radius: 0.625rem;
  /* height: 0.625rem; */
}
.mint-toast-text {
  height: 0.625rem;
  line-height: 0.625rem;
  font-size: 0.6875rem;
  font-family: PingFang-SC-Regular;
  font-weight: 200;
  color: rgba(255, 255, 255, 1);
}
.login {
  /* -top: 1.25rem; */
}
.login-box {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  /* padding-top: 1.25rem; */
}
.login-head {
  margin-bottom: 2.5rem;
}

.mui-input-row span{
  font-size: .8125rem /* 13/16 */;
  width:100%;
  color:#999999;
  text-align: right;
}

.dlu a {
  font-size: 15px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
}

.zhanghao_mima > div > div > input {
  width: 100%;
  display: block;
  text-align: center;
}
/* .zhanghao_mima > div > select {
  height: 50px;
  outline: none;
}
.zhanghao_mima > div > select > option {
  outline: none;
} */
</style>
