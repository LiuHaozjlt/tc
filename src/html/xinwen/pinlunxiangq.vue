<template>
    <div>
        <div class="pinlunxiangq-head">
            <div>{{count}}</div>条回复
        </div>
        <div class="pinlunxiangq-cent">

        </div>

        <div class="pinlunxiangq-botm">
            <input type="text" placeholder="请输入你的想法">
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      count: this.$route.query.count
    }
  }
}
</script>

<style>
.pinlunxiangq-botm input{
    width:100%;
    height: 1.875rem /* 30/16 */;
    /* border:1px solid red; */
    position: fixed;
    bottom: .4375rem /* 7/16 */;
}
.pinlunxiangq-head{
    display:flex;
    font-size:1.0625rem /* 17/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    justify-content: center
}
/* .pinlunxiangq-head div{
    display:inline
} */
</style>
