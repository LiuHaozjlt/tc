<template>
  <div>
    <div>
      <div class="fabu-head">
        <img src="../../image/zuojiantou.png" alt @click="gofabuele">
        发布
        <div></div>
      </div>
      <!--发布中间内容-->
      <div class="fabu-peop-cent">
        <div class="biaoti-cent">
          <div class="shiwu-bl"><div class="biaox">*</div>标题</div>
          <div class="biaoti-ipt">
            <textarea
              type="textarea"
              maxlength="40"
              row="5"
              cols="5"
              placeholder="请输入不超过40个字的标题"
              class="shiwu"
              v-model="publish.title"
            ></textarea>
          </div>
        </div>

        <div class="biaoti-cent">
          <div class="shiwu-bl">描述</div>
          <div class="biaoti-ipt">
            <!-- <input type="text" placeholder="您可以对发布的内容进行详细的描述少时" class="shiwu"> -->
            <textarea
              type="textarea"
              maxlength="40"
              row="5"
              cols="5"
              placeholder="您可以对发布的内容进行详细的描述少时"
              class="shiwu"
              v-model="publish.introduce"
            ></textarea>
          </div>
        </div>

        <!--教育价格-->
        <!-- <jiaoyujiage></jiaoyujiage> -->
        <div v-if="releaseTypeId === 4">
          价格
          <input type="number" v-model="publish.prices">
          <span @click="isPriceUnitShow = true">
            {{publish.prices_unit}}
            <van-icon name="arrow" />
          </span>
        </div>
        <!--房源价格-->
        <div v-if="releaseTypeId === 2">
            <div class="yue" >
                <div class="yue-left">
                    <div>*</div>
                    <div>月租金</div>
                </div>

              
                <div class="yue-rit">
                    <input type="number" v-model="publish.prices">
                  
                        <div > {{publish.prices_unit}}</div>
                        <div @click="isPriceUnitShow = true">></div>
                    
                </div>
                
            </div>
            <div class="yue">
                <div class="yue-left">
                    <div>*</div>
                    <div>装修</div>
                </div>

                <div>
                    <div class="yue-rit">
                        <div class="yue-rit-rit" @click="isRentDecorationShow = true">
                            <div class="qinze">{{rentDecoration.name}}</div>
                            <div>></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="yue">
                <div class="yue-left">
                    <div>*</div>
                    <div>厅金</div>
                </div>

                <div>
                    <div class="yue-rit">                      
                        <div class="yue-rit-rit" >
                            <div class="qinze"> {{rentHall.name}}</div>
                            <div @click="isRentHallShow = true">></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <yueting></yueting> -->
        <!-- <div v-if="releaseTypeId === 2">
          <div class="yuezujing-cont">
            <div>月租金</div>
           
            <input type="number" v-model="publish.prices">
            <span @click="isPriceUnitShow = true">
              {{publish.prices_unit}}
              <van-icon name="arrow" />
            </span>
          </div>
          <div>
            装修
            <span @click="isRentDecorationShow = true">
              {{rentDecoration.name}}
              <van-icon name="arrow" />
            </span>
          </div>
          <div>
            厅室
            <span @click="isRentHallShow = true">
              {{rentHall.name}}
              <van-icon name="arrow" />
            </span>
          </div>
        </div> -->

        <!--上车-->
        <!-- <shoushang></shoushang> -->

        <!--金额合作-->
        <!-- <jinhe></jinhe> -->

        <!--岗位地址-->
        <!-- <gangzhi></gangzhi> -->

        <div class="biaoti-cent deerse">
          <div class="shiwu-bl">
            默认第一张为封面图 (
            <div class="zero">{{imageList.length}}</div>/
            <div class="fivetn">15</div>)
          </div>
          <div class="jia">
            <div v-for="(item, index) of imageList" :key="item">
              <div class="fenm-ico">
                <img :src="item" alt @click="handleImageClick(item)">
                <div class="fs-ico" @click="remove(index)">x</div>
              </div>
            </div>
          </div>
          <!--图片上传-->
          <van-uploader :after-read="onRead">
            <!-- <van-icon name="photograph" /> -->
            <div class="jia-img">
              <img src="../../image/xjh.png" alt>
            </div>
          </van-uploader>

          <!-- <img src="../../image/xjh.png" alt="" @click="addPic"> -->

          <!-- </div> -->
        </div>
        <div class="di-xuan" @click="$router.push('/address/list?from=publish&title=选择地址')">
          <div class="shiwu-bl">*地址</div>
          <div class="xuanze-di">
            <div class="shiwu">{{activeAddress ? activeAddress.address : "选择地址"}}</div>
            <div>
              <img src="../../image/jiantoutou.png" alt="">
            </div>
          </div>
        </div>
        <div class="shou-ma shuma-xiang">
          <div class="shou-ma-xing">*</div>
          <div class="shou-ma-shou">手机</div>
          <div class="biaoti-ipt">
            <input v-model="publish.mobile" type="text" placeholder="输入" class="shiwu">
          </div>
        </div>
        <div class="weixin shuma-xiang">
          <div class="shiwu-bl">微信：</div>
          <div class="biaoti-ipt">
            <input v-model="publish.weixin" type="text" placeholder="输入你的微信好" class="shiwu">
          </div>
        </div>

        <div class="youxiang shuma-xiang">
          <div class="shiwu-bl">邮箱：</div>
          <div class="biaoti-ipt">
            <input v-model="publish.email" type="text" placeholder="输入你的邮箱" class="shiwu">
          </div>
        </div>

        <!--公司企业-->
        <!-- <qiyehangye></qiyehangye> -->

        <!--公司简介-->
        <!-- <gongsjianjie></gongsjianjie> -->

        <div class="youxiang wo-fen deerse fanyijif">
          <div>
            <div class="wo-swc">
              <div class="shiwu-bl xufanyi">我需要翻译</div>
              <div class="biaoti-ipt">
                <div class="shiwu">翻译将消耗你5积分</div>
              </div>
            </div>
          </div>
          <van-switch  class="vantsw"  v-model="publish.is_trans" :active-value="2" :inactive-value="0"></van-switch>
        </div>
        <div class="shisan weixiang">*为必填项</div>

        <!--
          确定发
        布按钮-->
        <div class="qued-fab shiwu" @click="postquedfab">{{ publish.id ? "修改发布" : "确定发布"}}</div>
      </div>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="mtpop-box">
        <div class="fan-bai">翻译失败</div>
        <div class="dang-yi">当前积分不足，无法翻译</div>
        <div class="mei-wo">每天登陆或分享都能获得积分哦！</div>
        <div class="fangqi">
          <div class="fang-bai">放弃翻译</div>
        </div>
      </mt-popup>
      <mt-popup v-model="isPriceUnitShow" popup-transition="popup-fade" class="mtpop-box"  position="bottom">
        <van-picker :columns="priceUnits"  @change="onPriceUnitChange" />
      </mt-popup>
      <mt-popup v-model="isRentDecorationShow" popup-transition="popup-fade" class="mtpop-box"  position="bottom">
        <van-picker :columns="rentDecorations" value-key="name" @change="onRentDecorationChange" />
      </mt-popup>
      <mt-popup v-model="isRentHallShow" popup-transition="popup-fade" class="mtpop-box"  position="bottom">
        <van-picker :columns="rentHalls" value-key="name" @change="onRentHallChange" />
      </mt-popup>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Uploader } from 'vant'
import { Switch, Toast } from 'mint-ui'
import { Popup } from 'mint-ui'
import jiaoyujiage from '../../components/jiaoyujiage'
import yueting from '../../components/yue-ting'
import shoushang from '../../components/shou-shang'
import jinhe from '../../components/jin-he'
import gangzhi from '../../components/gang-zhi'
import qiyehangye from '../../components/qiyehangye'
import gongsjianjie from '../../components/gonsjianjie'
import {mapState} from 'vuex'
Vue.use(Uploader)
Vue.component(Switch.name, Switch)
Vue.component(Popup.name, Popup)
export default {
  data () {
    // 发布接口要求的参数
    this.publishInitial = {
      title: '',
      introduce: '',
      mobile: '',
      user_address_id: '',
      weixin: undefined,
      email: undefined,
      is_trans: 2,
      img: undefined,
      prices: undefined,
      prices_unit: undefined,
      rent_decoration_id: undefined,
      rent_hall_id: undefined,
      xh: '86',
      car_brand_id: undefined,
      car_registration_time: undefined,
      land_age: undefined,
      land_acreage: undefined,
      land_use_id: undefined,
      land_cooperation_id: undefined,
      recruit_is_face: undefined,
      recruit_prices_start: undefined,
      recruit_prices_end: undefined
    }

    return {
      notimg: true,
      popupVisible: false,
      addList: [],
      imageList: [], // 存后台返回的地址
      showPopWin: false, // switchde 状态
      zhuangtai: '',
      rentDecoration: '',
      rentHall: '',
      isPriceUnitShow: false,
      isRentDecorationShow: false,
      isRentHallShow: false
    }
  },
  computed: {
    ...mapState(['isPersonal', 'publish', 'publishReleaseValue', 'sellerInfo', 'activeAddress']),
    releaseTypeId () {
      return this.isPersonal ? this.$route.query.releaseTypeId : this.sellerInfo.release_type_id
    },
    priceUnits () {
      return this.publishReleaseValue.prices_unit || []
    },
    rentDecorations () {
      return this.publishReleaseValue.rent_decoration_id
    },
    rentHalls () {
      return this.publishReleaseValue.rent_hall_id
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
  created () {
    // this.getruzhushengq()
    this.getstatus()
    this.releaseValueRequst = this.$store.dispatch('getPublishReleaseValue').then(() => {
      this.publishInitial.prices_unit = this.priceUnits[0]
    })

    if (!this.isPersonal && !this.releaseTypeId) {
      this.$store.dispatch('getSellerInfo')
    }
    if (this.activeAddress) {
      this.publishInitial.user_address_id = this.activeAddress.user_address_id
    }
    // this.getruzhushengq()
    // 通过url的releaseId判断是否是修改
    if (this.$route.query.releaseId) {
      // 如果用户刷新的话，store里的publish会丢失，解决办法是后台出一个查询发布详情的接口，根据id去查
      // 另一种方法就是把publish存到localStorage，刷新的时候再从localStorage取出来
      // 现在先简单做返回处理
      if (Object.keys(this.publish).length === 0) {
        this.$router.back()
      } else {
        this.mapPublish()
      }
    }
  },
  mounted () {
    if (Object.keys(this.publish).length === 0) {
      this.$store.commit('updatePublish', this.publishInitial)
    } else {
      this.releaseValueRequst.then(() => {
        // 根据一些字段的id从 releaseValue 里找到对应的选项对象，其他类型的一些字段类似增加即可
        let rdId = this.publish.rent_decoration_id
        let rhId = this.publish.rent_hall_id
        let img = this.publish.img
        if (rdId) {
          this.rentDecoration = this.rentDecorations.find(item => item.id == rdId)
        }
        if (rhId) {
          this.rentHall = this.rentHalls.find(item => item.id == rhId)
        }
        if (img) {
          this.imageList = img.split(',')
        }
      })
    }
  },
  methods: {
    gofabuele () {
      this.$router.back(-1)
    },

    remove (index) {
      this.imageList.splice(index, 1)
    },
    tbox () {
      this.popupVisible = !this.showPopWin
    },
    hidePop () {
      this.popupVisible = false
    },
    onRead (file) {
      let me = this
      this.notimg = true
      //   this.$refs.goodImg.src = file.content
      //   console.log(file)
      let data = new FormData()
      data.append('upimage', file.file)

      //   console.log(data)
      //   Toast('正在上传...')
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        method: 'post',
        url: 'apis/v1/upload/image',
        data: data,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        }
      }).then(p => {
        // debugger
        // console.log('图片上传', p.data.data)
        if (p.data.error_code === 0) {
          Toast('上传成功')
          // me.addList.push(file)
          me.imageList.push(p.data.data.uploadFilePath)
          this.publish.img = this.imageList.join(',')
        } else {
          Toast(p.data.message)
        }
      })
    },
    postquedfab () {
      this.$store.dispatch('publishSeller', this.publish).then(({data}) => {
        if (data.error_code === 0) {
          Toast('发布成功')
          this.$store.commit('updatePublish', {})
          this.$router.replace('/') // 发布成功后跳到的地址
        } else {
          Toast(data.message)
        }
      })
    },
    getstatus () {
      //   console.log('getqinqiu')
      let me = this
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      me.axius({
        methods: 'get',
        url: 'apis/v1/user/seller-status',
        data: {},
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        me.zhuangtai = p.data.data.status
        // console.log(me.zhuangtai)
        // if (p.data.data.status === 1) {
        //   me.postquedfab()
        // } else {
        // }
      })
    },

    onPriceUnitChange (picker, value, index) {
      this.publish.prices_unit = value
    },
    onRentDecorationChange (picker, value, index) {
      this.rentDecoration = value
      this.publish.rent_decoration_id = value.id
    },
    onRentHallChange (picker, value, index) {
      this.rentHall = value
      this.publish.rent_hall_id = value.id
    },

    // 修改发布时参数调整
    // 列表跳过来时，发布存到了store.state.publish
    mapPublish () {
      let publish = {
        _cover: true, // commit的时候会覆盖掉原publish
        id: this.$route.query.releaseId // 保留 id 发布时就会作为修改
      }
      let publishModify = this.publish

      Object.keys(this.publishInitial).forEach(key => {
        publish[key] = publishModify[key]
      })
      let imgs = (publishModify.img_pic || []).map(item => item.img)
      imgs.unshift(publish.img)
      publish.img = imgs.join(',')
      this.$store.commit('updatePublish', publish)
    }

    // handleImageClick (img) {
    //   this.$store.commit('cacheImage', img)
    //   this.$router.push('/shouyexq')
    // }
  }
}
</script>

<style>
.yue-rit input{
  /* width:60%!important; */
  margin-bottom: 0;
}
.yue-rit-rit div:nth-child(1){
  color:#C3C3C3;
}
.qinze{
    font-size:.9375rem /* 15/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(195,195,195,1);
}
.yue-left div:nth-child(2){
    font-size:.9375rem /* 15/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:#333333;
}
.yue{
    display:flex;
    /* justify-content: space-between; */
}
.yue-left{
    display: flex;
    align-items: center;
    width:17%;
}
.yue-rit{
    display:flex;
    align-items: center;
    width:70%;
}
.yue-rit-rit{
    display:flex;
}
.yuezujing-cont{
  display:flex;
  justify-content: space-between;
}
.van-switch--on{
  background-color: #FFE9BF!important;
}
.van-switch__node{
  width:1.625rem /* 26/16 */;
  height: 1.625rem /* 26/16 */;
}
.vantsw{
  width:2.8125rem /* 45/16 */;
  height: 1.5625rem /* 25/16 */;
}
.mint-switch-core::before{
  background-color: #E7E7E7;
}
.biaox{
    color:red;
}
.weixiang{
    padding-top: 2%;
}
.fanyijif{
    height: 10%;
    display: flex;
    align-items: center;
}
.biaoti-ipt input{
    margin-bottom: 0!important;
    border:0!important;
}
.shuma-xiang{
    height: 10%;
    background-color:white;
    display:flex;
    align-items: center;
}
.deerse{
    background-color: #FFFFFF;
}
.fabu-peop-cent {
  background-color: #f5f5f5;
      padding-top: 4%;
}
.fabu-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fabu-head img {
  width: 0.6875rem /* 11/16 */;
  height: 1.25rem /* 20/16 */;
}
.shou-ma {
  display: flex;
}
.shou-ma-xing {
  color: red;
}
.shou-ma-shou {
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
}
.fangqi {
  display: flex;
  justify-content: center;
  text-align: center;
}
.fang-bai {
  margin-bottom: 7%;
  width: 60%;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background-color: #ffb31e;
  border-radius: 1rem /* 16/16 */;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem; /* 36/16 */
}
.mtpop-box {
  height: 180px;
  text-align: center;
  width: 100%;
}
.mei-wo {
  padding-top: 3%;
  padding-bottom: 8%;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  /* padding-top:1.0625rem /* 17/16 */
}
.dang-yi {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  /* padding-top:1.75rem /* 28/16 */
}
.fan-bai {
  padding-top: 8%;
  padding-bottom: 5%;
  font-size: 1.25rem /* 20/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.fangqi {
  /* padding-bottom:1.8125rem /* 29/16 */
}
.jia {
  display: flex;
}
/* .jia div{
        width:25%;
    } */
.jia-img {
  display: flex;
  align-items: center;
  /* text-align: center; */
  justify-content: center;
  width: 4.0625rem /* 65/16 */;
  height: 4.0625rem /* 65/16 */;
  background-color: #fff6e2;
  border-radius: 0.5rem /* 8/16 */;
}
.fs-ico {
  top: -5px;
  left: 52px;
  width: 1.0625rem /* 17/16 */;
  height: 1.0625rem /* 17/16 */;
  border-radius: 50%;
  background-color: red;
  color: white;
  text-align: center;
  line-height: 1.0625rem;
  position: absolute;
}
.fenm-ico {
  display: flex;
  position: relative;
}
.fenm-ico img {
  width: 4.0625rem /* 65/16 */;
  height: 4.0625rem /* 65/16 */;
  border-radius: 0.5rem /* 8/16 */;
  /* border: 1px solid red; */
}
.qued-fab {
  margin-top: 2.8125rem /* 45/16 */;
  color: white !important;
  background-color: #ffb31e;
  height: 2.25rem /* 36/16 */;
  border-radius: 1.125rem /* 18/16 */;
  text-align: center;
  line-height: 2.25rem /* 36/16 */;
}
.shisan {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(235, 94, 94, 1);
}
.wo-swc {
  display: flex;
}
.wo-fen {
  display: flex;
  justify-content: space-between;
}
.xufanyi {
  padding-right: 1.5rem /* 24/16 */;
}
.youxiang {
  display: flex;
}
.weixin {
  display: flex;
  /* height: 2.875rem /* 46/16 */
  /* line-height: 2.875rem; */

  /* border:1px solid red; */
}
.di-xuan {
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  justify-content: space-between;
  height:10%;
  background-color: white;
  /* 具体自5己定 */
}
.xuanze-di {
  display: flex;
  align-items: center;
}
.xuanze-di div:nth-child(2) img {
  margin-left: 1rem /* 16/16 */;
  width: 0.5625rem /* 9/16 */;
  height: 1rem /* 16/16 */;
  /* border: 1px solid red; */
}
.jia {
  position: relative;

  margin-bottom: 1rem /* 16/16 */;
}
.jia-img img {
  width: 1.4375rem /* 23/16 */;
  height: 1.4375rem /* 23/16 */;
  border-radius: 0.5rem /* 8/16 */;
  background-color: #fff6e2;
  /* line-height: 4.0625rem /* 65/16 */
}
.zero,
.fivetn {
  display: inline;
}
.biaoti-cent {
  /* background-color: #FFE9BF; */
  /* margin-top: 4%; */
}
.biaoti-ipt textarea {
  border: 0;
  padding-left: 0;
  padding-bottom: 2.3125rem /* 37/16 */;
  word-break: break-all;
  width: 100%;
  color:#C3C3C3;
}
.fabu-head {
  height: 2.75rem /* 44/16 */;
  line-height: 2.75rem /* 44/16 */;
  text-align: center;
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.shiwu {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(195, 195, 195, 1);
}
.shiwu-bl {
    background-color: white;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #333333;
  display:flex;
}
.mint-switch-input:checked + .mint-switch-core {
  border: 0 !important;
}
.mint-switch-core {
  border: static;
  background-color: #ffe9bf !important;
}
.mint-switch-core::after {
  background-color: #9c9c9c !important;
}
/* .mint-switch-core::before{
        background-color: yellow!important;
    } */
</style>
