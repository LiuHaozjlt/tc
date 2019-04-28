<template>
    <div>
        <div class="wode-yijian-head">
            <img src="../../image/zuojiantou.png" alt="" @click="goyijianqian">
            意见反馈
            <div></div>
        </div>
        <div class="fankuicont">
            <textarea type="textarea"  row="5" cols="5" placeholder="请在吃输入你要反馈的内容" ref="fankuitext" @input="getfanhuiLeft">
            </textarea>
            <div class="lin-four">
                <div class="fanhuiWenzileft">{{fankuiwenzi}}</div>/<div>200</div>
            </div>
        </div>
        <div class="yijian-emai">
            <input type="text" placeholder="请输入您的手机好">
        </div>

        <!--上传图片-->
        <div>
            <div class="shang-tu">上传截图</div>
        </div>

        <div class="yijian-tij">
            提交
        </div>
    </div>
</template>
<script>
import { Switch, Toast } from 'mint-ui'
import { Popup } from 'mint-ui'

export default {
  data () {
    return {
      fankuiwenzi: 0

    }
  },
  methods: {
    goyijianqian () {
      this.$router.back(-1)
    },
    getfanhuiLeft () {
      this.fankuiwenzi = this.$refs.fankuitext.value.length
    }
    // 图片上传

  }
}
</script>

<style>
     .wode-yijian-head img{
         width:.6875rem /* 11/16 */;
         height: 1.25rem /* 20/16 */;
     }
    .wode-yijian-head{
        display:flex;
        justify-content: space-between;
        height: 2.75rem /* 44/16 */;
        align-items: center;
    }
    .shang-tu{
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .yijian-emai input{
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .fankuicont textarea{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
    }
    .lin-four{
        display:flex;
        justify-content: flex-end;
        position:absolute;
        bottom:20px;
        right: 0;
    }
    .yijian-tij{
        color:white;
        height: 2.25rem /* 36/16 */;
        background-color: #FFB31E;
        border-radius: 1.125rem /* 18/16 */;
        line-height: 2.25rem /* 36/16 */;
        text-align: center;
        position: fixed;
        bottom: .4375rem /* 7/16 */;
        width:100%;
    }
    .fankuicont{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        position: relative;
    }
    .wode-yijian-head{
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align: center;
    }

</style>
