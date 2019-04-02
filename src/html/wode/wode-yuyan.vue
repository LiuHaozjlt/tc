<template>
    <div>
        <div class="wode-yuyan">选择语言</div>
        <div>
             <div class="yuyan-cent-top" @click="geticonshang">
                 <div class="yuyan-zh">
                        <img src="" alt="">
                        中文
                 </div>
                <img src="../../image/duide.png" alt="" v-if="duishang" >
             </div>
             <div class="yuyan-cent-cent" @click="geticon">
                <div class="yuyan-lao">
                    <img src="" alt="">
                    老挝文
                </div>
                <img src="../../image/duide.png" alt="" v-if="dui">
             </div>
             <div class="yuyan-qued">确定</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      duishang: true,
      dui: false

    }
  },
  methods: {
    geticon () {
      this.dui = true
      this.duishang = false
    },
    geticonshang () {
      this.dui = false
      this.duishang = true
    }
  }
}
</script>

<style>
    .yuyan-cent-cent{
        display:flex;
        justify-content: space-between;
    }
    .yuyan-cent-top{
        display: flex;
        justify-content: space-between;
    }
    .yuyan-cent-cent img{
        width:1.0625rem /* 17/16 */;
        height: 1.0625rem /* 17/16 */;
    }
    .yuyan-cent-top img {
    width: 1.0625rem /* 17/16 */;
    height: 1.0625rem /* 17/16 */;}
    .yuyan-qued{
        height: 2.25rem /* 36/16 */;
        color:white;
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        border-radius: 1.125rem /* 18/16 */;
        background-color: #FFB31E;
        line-height: 2.25rem /* 36/16 */;
        margin-top: 3.4375rem /* 55/16 */;
    }
    .yuyan-zh,.yuyan-lao{
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .wode-yuyan{
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align: center;
    }
</style>
