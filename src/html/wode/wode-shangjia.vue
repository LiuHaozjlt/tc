<template>
    <div>
        <div class="wode-shangjia">
            商家信息
        </div>
        <div>

            <div class="shang-chen" @click="getshangjmc">
                {{title || '商家名称'}}
            </div>

            <div><img src="" alt=""></div>
        </div>

        <!--我的店铺图片上传-->
        <div>
            <div>
                <div class="shefenmian">
                    <van-uploader :after-read="onRead">
                        <img src="../../image//xjh.png" alt="">
                    </van-uploader>
                </div>
            </div>
        </div>

        <div class="shangjie">商家简介</div>
        <div class="shangjiajianjie">
            <textarea></textarea>
        </div>

        <div>
            <div class="qiye-xuan">
                <div class="ruqi">
                    <div class="ruzhu"><img src="../../image/ruzhu.png" alt=""></div>
                    <div class="qiyezen" @click="qiyerenzhen">企业认证</div>
                </div>
                <div class="xuantian">
                    <div>选填</div>
                    <img src="../../image/jiantoutou.png" alt="">
                </div>
            </div>
        </div>

        <div class="chuangjian-dian" @click="towodeshangjiamc">
            创建店铺
        </div>

        <!--我的店铺图片上传-->

    </div>
</template>

<script>
import {Switch, Toast} from 'mint-ui'
import { Uploader } from 'vant'
import Vue from 'vue'
Vue.use(Uploader)
export default {
  data () {
    return {}
  },
  computed: {
    title () {
      return this.$route.query.text
    }
  },
  methods: {
    qiyerenzhen () {
      this.$router.push({path: '/wodeqiye'})
    },
    getshangjmc () {
      this.$router.push({path: '/wodeshangjiamc'})
    },
    towodeshangjiamc () {
      this.$router.push({path: '/wodeele'})
    },
    onRead (file) {
      this.notimg = true
      //   this.$refs.goodImg.src = file.content
      //   console.log(file)
      let data = new FormData()
      data.append('upimage', file.file)
      //   console.log(data)
      Toast('正在上传...')
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        method: 'post',
        url: 'apis/v1/upload/image',
        data: data,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(p => {
        // console.log('图片上传', p.data.data)
        if (p.data.error_code === 0) {
          Toast('上传成功')
          this.addList.push(file)
          this.imageList.push(p.data.data.uploadFilePath)
        } else {
          Toast(p.data.message)
        }
      })
    }
  }
}
</script>

<style>
.shefenmian{
    height: 40%;
    background-color: rosybrown;
    display:flex;
    align-items: center;
    justify-content: center;
}
.ruqi{
    display:flex;
    align-items: center;
}
    .qiyezen{
        font-size:1rem /* 16/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
    }
    .ruzhu img{
        width:1.6875rem /* 27/16 */;
        height: .8125rem /* 13/16 */;
    }
    .shangjie{
        text-align: center;
        font-size:.875rem /* 14/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(153,153,153,1);
    }
    .shang-chen{
        text-align: center;
        font-size:1.125rem /* 18/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(70,70,70,1);
    }
    .wode-shangjia{
        text-align: center;
    }
    .xuantian{
        display:flex;

    }
     .xuantian img{
         width:.5625rem /* 9/16 */;
         height: .9375rem /* 15/16 */;
     }
    .qiye-xuan{
        display:flex;
        justify-content: space-between;
    }
    .wode-shangjia{
        height: 2.75rem /* 44/16 */;
        line-height: 2.75rem /* 44/16 */;
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .chuangjian-dian{
        background:linear-gradient(72deg,rgba(255,179,30,1),rgba(255,146,30,1));
        border-radius:18px;
        height: 2.25rem /* 36/16 */;
        color:white;
        line-height:2.25rem /* 36/16 */;
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-align: center;
        position:fixed;
        bottom:2%;
        width:100%;
    }
</style>
