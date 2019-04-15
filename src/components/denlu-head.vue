<template>
  <div class="mui-input-warp denluhead-box">
    <!--这个箭头-->
    <img class="mima-img" src="../image/zuojiantou.png" alt="" @click="godelyan"  v-if="isForget">
    <div class="denluhead" v-if="!isForget">
      <img src="../image/gb@2x.png" @click="huifudenglu">
      <a href class="denlu" @click.prevent="change">{{ isLogin ? $t('register') : $t('login') }}</a>
    </div>
    <!-- <div v-if="false"> -->
    <span v-if="isForget">找回密码</span>
    <span></span>
    <!-- </div> -->
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
    huifudenglu () {
      console.log('hdl')
    },
    godelyan () {
      this.$router.back(-1)
    },
    change () {
      this.$emit('change', !this.isLogin)
      this.login = !this.login
    }
  }
}
</script>

<style>
.mima-img{
  width:.5625rem /* 9/16 */;
  height: 1.0625rem /* 17/16 */;
}
.denluhead-box {
  /* margin-top: 1.25rem; */
  height:2.75rem /* 44/16 */;
  line-height: 2.75rem /* 44/16 */;

}
.denluhead-box>span{
  display: flex;
  justify-content: center;
}
.denluhead {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.8125rem;
  align-items: center;
}
.denluhead img {
  display: inline-block;
  width: 0.90625rem;
  height: 0.90625rem;
}
</style>
