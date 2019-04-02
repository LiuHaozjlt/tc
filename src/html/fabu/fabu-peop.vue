<template>
    <div>
        <div>
            <div class="fabu-head">
                发布
            </div>
            <div class="biaoti-cent">
                <div class="shiwu-bl">
                    *标题
                </div>
                <div class="biaoti-ipt">
                    <textarea type="textarea" maxlength='40' row="5" cols="5" placeholder="请输入不超过40个字的标题" class="shiwu">
                    </textarea>
                </div>
            </div>

            <div class="biaoti-cent">
                <div class="shiwu-bl">
                    *描述
                </div>
                <div class="biaoti-ipt">
                    <!-- <input type="text" placeholder="您可以对发布的内容进行详细的描述少时" class="shiwu"> -->
                    <textarea type="textarea" maxlength='40' row="5" cols="5" placeholder="您可以对发布的内容进行详细的描述少时" class="shiwu">
                    </textarea>
                </div>
            </div>

            <!--教育价格-->
            <jiaoyujiage></jiaoyujiage>

            <!--房源价格-->
            <yueting></yueting>

            <!--上车-->
            <shoushang></shoushang>

            <!--金额合作-->
            <jinhe></jinhe>

            <!--岗位地址-->
            <gangzhi></gangzhi>

            <div class="biaoti-cent">
                <div class="shiwu-bl">
                     默认第一张为封面图 (<div class="zero">{{addList.length}}</div>/<div class="fivetn">15</div>)
                </div>
                <div class="jia">
                    <div v-for="(item, index) of addList" :key="item.file.name">
                        <div class="fenm-ico" >
                            <img :src="item.content" alt="" @click="handleImageClick(item.content)">
                          <div class="fs-ico" @click="remove(index)">x</div>
                        </div>
                    </div>
                </div>
                 <!--图片上传-->
                <van-uploader :after-read="onRead">
                 <!-- <van-icon name="photograph" /> -->
                    <div class="jia-img">
                        <img src="../../image/xjh.png" alt="">
                    </div>
                </van-uploader>

                   <!-- <img src="../../image/xjh.png" alt="" @click="addPic"> -->

                <!-- </div> -->

            </div>
            <div class="di-xuan">
                <div class="shiwu-bl">
                    *地址
                </div>
                <div class="xuanze-di">
                    <div class="shiwu">选择地址</div>
                    <div><img src="" alt=""></div>
                </div>
            </div>
            <div class="shou-ma">
                <div class="shou-ma-xing">*</div>
                <div class="shou-ma-shou">手机</div>
            </div>
            <div class="weixin">
                <div class="shiwu-bl">
                    微信：
                </div>
                <div class="biaoti-ipt">
                    <input type="text" placeholder="输入你的微信好" class="shiwu">
                </div>
            </div>

            <div class="youxiang">
                <div class="shiwu-bl">
                    邮箱：
                </div>
                <div class="biaoti-ipt">
                    <input type="text" placeholder="输入你的邮箱" class="shiwu">
                </div>
            </div>

            <!--公司企业-->
            <qiyehangye></qiyehangye>

            <!--公司简介-->
            <gongsjianjie></gongsjianjie>

            <div class="youxiang wo-fen">
                <div>
                    <div class="wo-swc">
                        <div class="shiwu-bl xufanyi">
                        我需要翻译
                        </div>
                        <div class="biaoti-ipt">
                        <div   class="shiwu">翻译将消耗你5积分</div>
                        </div>
                    </div>
                </div>
                <mt-switch v-model='showPopWin' @click.native="tbox"></mt-switch>
            </div>
            <div class="shisan">*为必填项</div>
            <div class="qued-fab shiwu" @click="postquedfab">确定发布</div>

            <mt-popup
  v-model="popupVisible"
  popup-transition="popup-fade" class="mtpop-box">
   <div class="fan-bai">翻译失败</div>
   <div class="dang-yi">当前积分不足，无法翻译</div>
   <div class="mei-wo">每天登陆或分享都能获得积分哦！</div>
   <div class="fangqi">
       <div class="fang-bai">放弃翻译</div>
   </div>
</mt-popup>

        </div>

    </div>
</template>

<script>

import Vue from 'vue'
import { Uploader } from 'vant'
import {Switch, Toast} from 'mint-ui'
import { Popup } from 'mint-ui'
import jiaoyujiage from '../../components/jiaoyujiage'
import yueting from '../../components/yue-ting'
import shoushang from '../../components/shou-shang'
import jinhe from '../../components/jin-he'
import gangzhi from '../../components/gang-zhi'
import qiyehangye from '../../components/qiyehangye'
import gongsjianjie from '../../components/gonsjianjie'
Vue.use(Uploader)
Vue.component(Switch.name, Switch)
Vue.component(Popup.name, Popup)
export default {
  data () {
    return {
      notimg: true,
      popupVisible: false,
      addList: 0,
      imageList: 0, // 存后台返回的地址
      showPopWin: false // switchde 状态
    }
  },
  components: {
    jiaoyujiage,
    yueting,
    shoushang,
    jinhe,
    gangzhi,
    qiyehangye,
    gongsjianjie
  },
  methods: {
    // addPic () {
    //   this.addList.push('img')
    // },
    remove (index) {
      console.log('ok')
      this.addList.splice(index, 1)
      this.imageList.splice(index, 1)
    },
    tbox () {
      this.popupVisible = !this.showPopWin
    },
    hidePop () {
      this.popupVisible = false
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
        // debugger
        // console.log('图片上传', p.data.data)
        if (p.data.error_code === 0) {
          Toast('上传成功')
          this.addList.push(file)
          this.imageList.push(p.data.data.uploadFilePath)
        } else {
          Toast(p.data.message)
        }
      })
    },
    postquedfab () {
      this.$router.push({path: '/wodefabu'})
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'post',
        url: 'apis/v1/user/releases',
        data: {
          release_type_id: 444444,
          title: 999999,
          describe: 555,
          mobile: 3333,
          code: 4,
          address: '长沙',
          img: 3,
          is_trans: 1,
          xh: 86,
          user_address_id: 0
        },
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(p => {
        console.log('确定发布', p.data.data)
      })
    },

    handleImageClick (img) {
      this.$store.commit('cacheImage', img)
      this.$router.push('/shouyexq')
    }

  }

}
</script>

<style>
    .shou-ma{
        display:flex;

    }
    .shou-ma-xing{
        color:red;
    }
    .shou-ma-shou{
        font-size:15px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
    }
    .fangqi{
        display: flex;
        justify-content: center;
        text-align: center;
    }
    .fang-bai{
        margin-bottom: 7%;
        width:60%;
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        background-color: #FFB31E;
        border-radius: 1rem /* 16/16 */;
        height: 2.25rem /* 36/16 */;
        line-height: 2.25rem /* 36/16 */
    }
    .mtpop-box{
        text-align: center;
        width: 100%;
    }
    .mei-wo{
        padding-top: 3%;
        padding-bottom: 8%;
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
        /* padding-top:1.0625rem /* 17/16 */;
    }
    .dang-yi{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        /* padding-top:1.75rem /* 28/16 */;
    }
    .fan-bai{
        padding-top: 8%;
        padding-bottom: 5%;
        font-size:1.25rem /* 20/16 */;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
    .fangqi{
        /* padding-bottom:1.8125rem /* 29/16 */
    }
    .jia{
        display:flex;
    }
    /* .jia div{
        width:25%;
    } */
    .jia-img{
        display: flex;
        align-items: center;
        /* text-align: center; */
        justify-content: center;
        width:4.0625rem /* 65/16 */;
        height: 4.0625rem /* 65/16 */;
        background-color: #FFF6E2;
        border-radius: .5rem /* 8/16 */;
    }
    .fs-ico{
        top: -5px;
        left: 52px;
        width:1.0625rem /* 17/16 */;
        height: 1.0625rem /* 17/16 */;
        border-radius: 50%;
        background-color:red;
        color:white;
        text-align: center;
        line-height: 1.0625rem;
        position: absolute;
    }
     .fenm-ico{
         display:flex;
         position:relative;
     }
    .fenm-ico img{
        width:4.0625rem /* 65/16 */;
        height: 4.0625rem /* 65/16 */;
        border-radius: .5rem /* 8/16 */;
        border:1px solid red;
    }
    .qued-fab{
        margin-top:2.8125rem /* 45/16 */;
        color:white!important;
        background-color: #FFB31E;
        height: 2.25rem /* 36/16 */;
        border-radius: 1.125rem /* 18/16 */;
        text-align: center;
        line-height: 2.25rem /* 36/16 */;
    }
    .shisan{
        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(235,94,94,1);
    }
    .wo-swc{
        display:flex;
    }
    .wo-fen{
        display:flex;
        justify-content: space-between;
    }
    .xufanyi{
        padding-right: 1.5rem /* 24/16 */;
    }
    .youxiang{
        display:flex;
    }
    .weixin{
        display:flex;
        /* height: 2.875rem /* 46/16 */;
        /* line-height: 2.875rem; */

        /* border:1px solid red; */
    }
    .di-xuan{
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        /* justify-content: flex-start; */
        justify-content: space-between;
        height: 30px;
        /* 具体自5己定 */
    }
    .xuanze-di{
        display:flex;
        align-items: center;
    }
    .xuanze-di div:nth-child(2) img{
        margin-left: 1rem /* 16/16 */;
        width:.5625rem /* 9/16 */;
        height: 1rem /* 16/16 */;
        border:1px solid red;
    }
    .jia{
        position: relative;

        margin-bottom: 1rem /* 16/16 */;
    }
    .jia-img img{
        width:1.4375rem /* 23/16 */;
        height: 1.4375rem /* 23/16 */;
        border-radius: .5rem /* 8/16 */;
        background-color: #FFF6E2;
        /* line-height: 4.0625rem /* 65/16 */
    }
    .zero,.fivetn{
        display: inline;
    }
    .biaoti-cent{
        background-color: #FFE9BF;
    }
    .biaoti-ipt textarea{
        border:0;
        padding-left: 0;
        padding-bottom: 2.3125rem /* 37/16 */;
        word-break:break-all;
        width:100%;
    }
    .fabu-head{
        height: 2.75rem /* 44/16 */;
        line-height: 2.75rem /* 44/16 */;
        text-align: center;
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .shiwu{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(195,195,195,1);
    }
    .shiwu-bl{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:#333333;
    }
    .mint-switch-input:checked + .mint-switch-core{
        border:0!important;
    }
    .mint-switch-core{
        border:static;
        background-color: #FFE9BF!important;
    }
    .mint-switch-core::after{
        background-color: #9C9C9C!important;
    }
    /* .mint-switch-core::before{
        background-color: yellow!important;
    } */
</style>
