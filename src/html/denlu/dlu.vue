<template>
  <div class="login">
    <!-- <div @click="changeLang">{{$t('message.lang')}}</div> -->
    <div class="login-box">
    <!-- <div class="test">测试</div> -->
      <denluhead :is-login="isLogin" :is-forget="isForget" @change="changeLogin"></denluhead>
      <denlulogo></denlulogo>
      <denlufrm :is-login="isLogin" :is-forget="isForget" @forget="isForget = true" @change="isLogin = $event"></denlufrm>
      <denluxuanxiang v-if="isLogin && !isForget"></denluxuanxiang>
    </div>
  </div>
</template>
<script>
import denluhead from '@/components/denlu-head'
import denlulogo from '@/components/denlu-logo'
import denlufrm from '@/components/denlu-from'
import denluxuanxiang from '@/components/denlu-xuanxiang'
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
  created () {

  },
  methods: {
    // setvalue() {
    //   console.log("222");
    //   this.$router.push({ path: "/yzsjhm" });
    // },
    changeLogin (val) {
      this.isLogin = val
    },
    login () {

    },
    changeLang () {
      this.$i18n.locale = this.$i18n.locale === 'zh' ? 'laos' : 'zh'
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
