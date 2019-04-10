<template>
    <div>
        <div class="jifengxq">
            <img src="../../image/zuojiantou.png" alt="" @click="tojifmix">
            积分详情
            <div></div>
        </div>

        <div>全部记录</div>

        <div>收入记录</div>
        <div>支出记录</div>
    </div>
</template>

<style>
.jifengxq{
    font-size:1.0625rem /* 17/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
height: 2.75rem /* 44/16 */;
display:flex;
justify-content: space-between;
align-items: center;

}
.jifengxq img{
    width:.6875rem /* 11/16 */;
    height: 1.25rem /* 20/16 */;
}
</style>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    tojifmix () {
      this.$router.back(-1)
    }
  }
}
</script>
