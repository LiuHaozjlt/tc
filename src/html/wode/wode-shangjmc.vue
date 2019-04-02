<template>
    <div>
        <div class="shang-chen">商家名称</div>
        <div class="shangjianame">
            <input type="text" v-model="mingzi">
        </div>
          <div class="zhichi shisan">
                支持<div class="six">20</div>位字符以内的中英文、数字
            </div>
        <div class="shangbao" @click="mcbaocun">保存</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      mingzi: ''
    }
  },
  methods: {
    mcbaocun () {
      this.$router.push({
        path: '/wodeshangjia',
        query: {
          text: this.mingzi
        }
      })
    }
  }
}
</script>

<style>
.shangjianame input{
    text-align: center;
}
.shang-chen{
    text-align: center;
}
 .six{
        color:#FFC74D;
    }
.shangbao{
    height: 2.25rem /* 36/16 */;
    text-align: center;
    line-height: 2.25rem /* 36/16 */;
    color:white;
    background-color: #FFB31E;
    border-radius: 1.125rem /* 18/16 */;
}
  .zhichi{
        display: flex;
        justify-content: center;
    }
      .shisan{
        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
</style>
