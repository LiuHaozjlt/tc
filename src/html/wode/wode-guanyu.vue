<template>
    <div>
        <div class="guanyuleft-warp">
            <div class="guanyuleft">
            <img src="../../image/zuojiantou.png" alt="" @click="gowodeguanyuqian">
            </div>
            <div class="guanyu-head">
            关于我们
            </div>
            <div></div>
        </div>

        <div class="guanyu-bot-cont">
          <div class="guanyu-bot">version  1.0.1</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      four: 4
    }
  },
  methods: {
    gowodeguanyuqian () {
      this.$router.back(-1)
    }
  }
}
</script>

<style>
    .guanyuleft img{
      width:.6875rem /* 11/16 */;
      height: 1.25rem /* 20/16 */;
    }
    .guanyuleft-warp{
      height: 2.75rem /* 44/16 */;
      display:flex;
      justify-content: space-between;
      align-items: center;
    }
    .guanyu-bot-cont{
      width:100%;
      display: flex;
      justify-content: center;
    }
    .guanyu-bot{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        position: fixed;
        bottom: 3%;

    }
    .guanyu-head{
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
</style>
