<template>
  <div class="wode-shangjia-warp">
    <div class="wode-shangjia">
      <img src="../../image/zuojiantou.png" alt @click="goxuanzeshangjia">
      商家信息
      <div></div>
    </div>
    <div class="wode-shangjia-warp-cent">
      <div class="logo-mingc">
        <!--商家logo-->
        <div class="shangjia-logo">
          <van-uploader class="logo-icon" :after-read="onReadLogo">
            <div class="logo-img-top">
              <img :src="shopImageLocals || sellerInfo.logo  " alt>
            </div>

            <div class="logo-img">
              <img :src="shopImageadd" alt>
            </div>
            <!-- <img src="../../image/xjh.png" alt=""> -->
          </van-uploader>
        </div>

        <div>
          <div class="shang-chen" @click="getshangjmc">{{sellerInfo.name || '商家名称'}}</div>
          <div>
            <img src alt>
          </div>
        </div>
      </div>

      <!--我的店铺图片上传-->
      <div>
        <div>
          <div class="shefenmian">
            <van-uploader :after-read="onReadStore" class="dianpushangchuan">
              <img :src="shopImageLocal || sellerInfo.img || shopImagePlaceholder" alt>
              <!-- <img src="../../image/xjh.png" alt=""> -->
            </van-uploader>
          </div>
        </div>
      </div>

      <div class="shangjie">商家简介</div>
      <div class="shangjiajianjie">
        <textarea :value="sellerInfo.info" @change="updateIntro($event.target.value)"></textarea>
      </div>

      <div>
        <div class="qiye-xuan">
          <div class="ruqi">
            <div class="ruzhu">
              <img src="../../image/ruzhu.png" alt>
            </div>
            <div class="qiyezen">企业认证</div>
          </div>
          <div class="xuantian" @click="qiyerenzhen">
            <div>选填</div>
            <img src="../../image/jiantoutou.png" alt>
          </div>
        </div>
      </div>
      <div @click="getruzhushengq">
        <div class="chuangjian-dian">创建店铺</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Switch, Toast } from 'mint-ui'
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
      shopImageLocals: ''
    }
  },
  computed: {
    sellerInfo () {
      return this.$store.state.sellerInfo
    }
  },
  methods: {
    goxuanzeshangjia () {
      this.$router.back(-1)
    },
    qiyerenzhen () {
      this.$router.push({ path: '/wodeqiye' })
    },
    getshangjmc () {
      this.$router.push({ path: '/wodeshangjiamc' })
    },
    towodeshangjiamc () {
      this.$router.push({ path: '/index/wodeele' })
    },

    onReadStore (file) {
      this.notimg = true

      this.$uploadFileFn(file).then(p => {
        if (p.data.error_code === 0) {
          Toast('上传成功')
          this.shopImageLocal = file.content
          this.$store.commit('updateSellerInfo', {
            img: p.data.data.uploadFilePath
          })
        } else {
          Toast(p.data.message)
        }
      })
    },
    onReadLogo (file) {
      this.notimg = true

      this.$uploadFileFn(file).then(p => {
        if (p.data.error_code === 0) {
          Toast('上传成功')

          this.shopImageLocals = file.content
          this.$store.commit('updateSellerInfo', {
            logo: p.data.data.uploadFilePath
          })
        } else {
          Toast(p.data.message)
        }
      })
    },
    getruzhushengq () {
      let me = this
      // let token = 'jZvklXi8H9bs2bK9tBYYAoI19bjzAwU3_1556267215'
      me.axius({
        method: 'post',
        url: 'apis/v1/seller',
        data: this.sellerInfo,
        headers: {
          Authorization: 'Bearer ' + me.userInfo.access_token
        }
      }).then(p => {
        if (p.data.error_code !== 0) {
          Toast(p.data.message)
          this.$store.commit('setPersonal', true)
          this.$router.replace('/index/wodeele')
        } else {
          Toast('商家申请成功')
          this.$router.replace('/index/wodeele')
        }
      })
    },
    updateIntro (value) {
      this.$store.commit('updateSellerInfo', {
        info: value
      })
    }
  }
}
</script>

<style>
.wode-shangjia {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.75rem /* 44/16 */;
}
.wode-shangjia img {
  width: 0.6875rem /* 11/16 */;
  height: 1.25rem /* 20/16 */;
}
.logo-mingc {
  background-color: #ffffff;
  border-radius: 0.5rem /* 8/16 */;
  border: 1px solid #ffffff;
  margin-bottom: 5%;
}
.wode-shangjia-warp-cent {
  background-color: #f5f5f5;
  padding:0 1rem;
}
.logo-img-top {
  position: relative;
  overflow: hidden;
}
.logo-img-top img {
  width: 100%;
  height: 100%;
}
.logo-img {
  position: absolute;
  bottom: 0.1875rem /* 3/16 */;
  right: 0;
}
.logo-img img {
  width: 1rem /* 16/16 */;
  height: 1rem /* 16/16 */;
}
.logo-img-top {
  background-color: #ffecc3;
  width: 3.9375rem /* 63/16 */;
  height: 3.9375rem /* 63/16 */;
  border-radius: 100%;
}
.dianpushangchuan {
}
.dianpushangchuan img {
}
.logo-icon {
  margin-bottom: 5%;
}
.logo-icon img {
  /*   */

  /* width:100%;
  height: 20%; */
}
.wode-shangjia-warp {
  padding-bottom: 100%;
  background-color: #f5f5f5;
}
.shangjiajianjie textarea {
  height: 30% !important;
}
.shangjia-logo {
  text-align: center;
}
.shefenmian {
  height: 40%;
  background-color: #fff6e2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ruqi {
  display: flex;
  align-items: center;
}
.qiyezen {
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.ruzhu img {
  width: 1.6875rem /* 27/16 */;
  height: 0.8125rem /* 13/16 */;
}
.shangjie {
  padding: 2% 0 2% 0;
  text-align: center;
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.shang-chen {
  padding-bottom: 2%;
  text-align: center;
  font-size: 1.125rem /* 18/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(70, 70, 70, 1);
}
.wode-shangjia {
  text-align: center;
}
.xuantian {
  display: flex;
  justify-content: space-between;
  width: 19%;
  align-items: center;
}
.xuantian div {
  /* margin-right: 5%; */
}
.xuantian img {
  width: 0.5625rem /* 9/16 */;
  height: 0.9375rem /* 15/16 */;
}
.qiye-xuan {
  display: flex;
  justify-content: space-between;
  height: 3.4375rem /* 55/16 */;
  background-color: white;
  align-items: center;
  padding: 0 0.5rem;
}
.wode-shangjia {
  height: 2.75rem /* 44/16 */;
  line-height: 2.75rem /* 44/16 */;
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  background-color: white;
  margin-bottom: 3%;
  padding: 0 1rem;
}
.chuangjian-dian {
  background: linear-gradient(
    72deg,
    rgba(255, 179, 30, 1),
    rgba(255, 146, 30, 1)
  );
  border-radius: 18px;
  height: 2.25rem /* 36/16 */;
  color: white;
  line-height: 2.25rem /* 36/16 */;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  position: fixed;
  bottom: 2%;
  width: 90%;
}
</style>
