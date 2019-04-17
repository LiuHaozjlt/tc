<template>
  <div class="mui-input-warp denluhead-box">
    <!--这个箭头-->
    <template v-if="!isForget">
      <img class="close" src="../image/gb@2x.png" @click="back('login')">
      <a href class="denlu" @click.prevent="change">{{ isLogin ? $t('register') : $t('login') }}</a>
    </template>
      <template   v-if="isForget">
      <img class="mima-img" src="../image/zuojiantou.png" alt="" @click="back('forget')" >
      <span>找回密码</span>
      <span></span>
      </template>
  </div>
</template>
<script>
// import zujianvalue from "../html/zujian-value";

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
      login: true
    }
  },
  mounted () {
    this.login = this.isLogin
  },
  methods: {
    back (type) {
      this.$emit('back', type)
    },
    change () {
      this.$emit('change', !this.isLogin)
      this.login = !this.login
    }
  }
}
</script>

<style scoped>
.denluhead-box {
  /* margin-top: 1.25rem; */
  height:2.75rem /* 44/16 */;
  line-height: 2.75rem /* 44/16 */;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.close {
  width: 0.90625rem;
  height: 0.90625rem;
}
.mima-img{
  width: 0.5625rem /* 9/16 */;
  height: 1.0625rem /* 17/16 */;
}
</style>
