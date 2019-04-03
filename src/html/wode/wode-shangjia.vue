<template>
    <div class="wode-shangjia-warp">
      <div class="wode-shangjia">
          商家信息
      </div>
      <div class="wode-shangjia-warp-cent">

          <div class="logo-mingc">
            <!--商家logo-->
            <div class="shangjia-logo">

                <van-uploader  class="logo-icon"  :after-read="onReadLogo">
                    <div class="logo-img-top">
                      <img :src="shopImageLocals || shopImages  " alt="">
                    </div>

                    <div class="logo-img">   <img :src="shopImageadd" alt=""></div>
                    <!-- <img src="../../image/xjh.png" alt=""> -->
                </van-uploader>
            </div>

            <div>
                <div class="shang-chen" @click="getshangjmc">
                    {{title || '商家名称'}}
                </div>
                <div><img src="" alt=""></div>
            </div>
          </div>

          <!--我的店铺图片上传-->
          <div>
              <div>
                  <div class="shefenmian">
                      <van-uploader :after-read="onReadStore" class="dianpushangchuan">
                          <img :src="shopImageLocal || shopImage || shopImagePlaceholder" alt="">
                          <!-- <img src="../../image/xjh.png" alt=""> -->
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
      </div>
    </div>
</template>

<script>
import {Switch, Toast} from 'mint-ui'
import { Uploader } from 'vant'
import Vue from 'vue'
import shopImagePlaceholder from '../../image/xjh.png'
import shopImageadd from '../../image/tj.png'
Vue.use(Uploader)
export default {
  data () {
    this.shopImageadd = shopImageadd
    this.shopImagePlaceholder = shopImagePlaceholder
    return {
      shopImage: '',
      shopImageLocal: '',
      shopImages: '',
      shopImageLocals: ''
    }
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
      this.$router.push({path: '/index/wodeele'})
    },
    // 提取上传步骤
    uploadFileFn (file) {
      let data = new FormData()
      data.append('upimage', file.file)
      //   console.log(data)
      // Toast('正在上传...')
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      return this.axius({
        method: 'post',
        url: 'apis/v1/upload/image',
        data: data,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onReadStore (file) {
      this.notimg = true
      //   this.$refs.goodImg.src = file.content
      //   console.log(file)

      this.uploadFileFn(file).then(p => {
        // console.log('图片上传', p.data.data)
        if (p.data.error_code === 0) {
          Toast('上传成功')
          this.shopImageLocal = file.content
          this.shopImage = p.data.data.uploadFilePath
        } else {
          Toast(p.data.message)
        }
      })
    },
    onReadLogo (file) {
      this.notimg = true
      //   this.$refs.goodImg.src = file.content
      //   console.log(file) 把logo这边shopImageLocal || shopImage || shopImagePlaceholder这几个变量用另外的变量保存，不要两者用同一个地址就不会有影响了，这后面你弄吧，这几个变量，我不知道是啥，已经吧上传写成两个不用的函数了

      this.uploadFileFn(file).then(p => {
        // console.log('图片上传', p.data.data) 没刷新代码
        if (p.data.error_code === 0) {
          Toast('上传成功')
          // 改这里
          this.shopImageLocals = file.content
          this.shopImages = p.data.data.uploadFilePath
        } else {
          Toast(p.data.message)
        }
      })
    }
  }
}
</script>

<style>
.logo-mingc{
  background-color: #FFFFFF;
  border-radius: .5rem /* 8/16 */;
  border:1px solid #FFFFFF;
  margin-bottom: 5%;
}
.wode-shangjia-warp-cent{
  background-color: #F5F5F5;
}
.logo-img-top{
  position: relative;
  overflow: hidden;
}
.logo-img-top img{
  width:100%;
  height: 100%;

}
.logo-img{
  position:absolute;
  bottom:  .1875rem /* 3/16 */;
  right: 0;
}
.logo-img img{
  width:1rem /* 16/16 */;
  height:1rem /* 16/16 */;
}
.logo-img-top{
  background-color: #FFECC3;
  width:3.9375rem /* 63/16 */;
  height: 3.9375rem /* 63/16 */;
  border-radius: 100%;
}
.dianpushangchuan{

}
.dianpushangchuan img{

}
.logo-icon{
  margin-bottom: 5%;

}
.logo-icon img{
  /*   */

  /* width:100%;
  height: 20%; */
}
.wode-shangjia-warp{
  padding-bottom: 100%;
}
.shangjiajianjie textarea{
  height: 30%!important;
}
.shangjia-logo{
  text-align: center;
}
.shefenmian{
    height: 40%;
    background-color: #fff6e2;
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
        display: flex;
    justify-content: space-between;
    width: 19%;

    }
     .xuantian div{
       /* margin-right: 5%; */
     }
     .xuantian img{
         width:.5625rem /* 9/16 */;
         height: .9375rem /* 15/16 */;

     }
    .qiye-xuan{
        display:flex;
        justify-content: space-between;
        height: 3.4375rem /* 55/16 */;
        background-color:white;
        align-items: center;
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
