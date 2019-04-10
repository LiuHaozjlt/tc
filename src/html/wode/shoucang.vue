<template>
    <div>
        <div class="shoucang-head">
            <div class="wode-shoucang"><img src="../../image/Path .png" alt=""></div>
            <div class="wode-shoucang">我的收藏</div>
            <div class="shoucang-head-quxiao">编辑</div>
        </div>
        <div class="shoucang-del">删除</div>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    // goJuBao () {
    //   this.$router.push({
    //     path: '/jubao'
    //   })
    // }
  }
}
</script>

<style>
    .shoucang-head{
        display:flex;
        align-items: center;
        background-color: #FFB31E;
    }
    .wode-shoucang {
        height: 2.75rem /* 44/16 */;

        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .wode-shoucang  img{
        width:.625rem /* 10/16 */;
        height: 1.0625rem /* 17/16 */;
    }
    .shoucang-head-quxiao{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .wode-shoucang{
        font-size:1.125rem /* 18/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(33,33,33,1);
    }
    .shoucang-del{
        width:60%;
        height: 2.25rem /* 36/16 */;
        background-color: #FFB31E;
        border-radius: 1.125rem /* 18/16 */;
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 2.25rem /* 36/16 */;
        text-align: center;
        position: fixed;
        bottom: .4375rem /* 7/16 */;
        right:0;
    }
    .shoucang-head{
        display:flex;
        justify-content: space-between;
    }
    .wode-shoucang{
        font-size:1.125rem /* 18/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(33,33,33,1);
    }
</style>
