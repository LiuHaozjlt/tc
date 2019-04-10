<template>
    <div>
        <div class="wode-jubxq-head">
            <img src="../../image/zuojiantou.png" alt="" @click="towodejubao">
            <div class="wode-jubxq-head-cent">举报详情</div>
            <div></div>
        </div>
        <div class="dai">待审核</div>
        <div class="wo-bao">我们将尽快处理您的举报</div>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    towodejubao () {
      this.$router.back(-1)
    }
  }

}
</script>

<style>
    .wode-jubxq-head{
        display:flex;
        justify-content: space-between;
        align-items: center;
        height: 2.75rem /* 44/16 */;
    }
    .wode-jubxq-head img{
        width:.6875rem /* 11/16 */;
       height: 1.25rem /* 20/16 */;
    }
    .dai{
        font-size:1.875rem /* 30/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(235,94,94,1);
        text-align: center;
        padding-top: 5%;
    }
    .wo-bao{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
        text-align: center;
        padding-top:6%;
    }
    .wode-jubxq-head-cent{
        text-align: center;
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
</style>
