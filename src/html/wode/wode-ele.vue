<template>
    <div>
        <div class="wode-head-contn">
            <div class="wode-head-contn-lef">
                   <!-- <img src="../../image/图层 1.png" alt=""> -->
                   <img :src="imgele" alt="">
            </div>
            <div class="wode-head-in-rit"  @click="shezhi">
                        <img src="../../image/shezhi.png" alt="">
            </div>

             <div class="wode-head" @click="tobianji">
                    <div class="wode-head-in-warp">
                        <div class="wode-head-in">
                        <img :src="'http://info.00856.la'+userInfo.headimgurl || imgtuxiang" alt="">
                        <div>{{userInfo.nickname || '请登录'}}</div>
                        </div>
                    </div>
                    <div class="wode-head-rit">
                         <img src="../../image/jiantoutou.png" alt="">
                    </div>
            </div>
        </div>
        <div class="wode-cent-cont">
            <div class="wode-in" @click="getjifen">
                <div class="wode-in-in"><img src="../../image/wdjf.png" alt=""></div>
                <div class="shisi" >我的积分</div>
            </div>

            <div class="wode-in">
                <div class="wode-in-in"><img src="../../image/wdfb.png" alt=""></div>
                <div class="shisi" @click="getfabu">我的发布</div>
            </div>

            <template v-if="isPersonal">
            <div class="wode-in" @click="getshoucang">
                <div class="wode-in-in"><img src="../../image/wdsc.png" alt=""></div>
               <div class="shisi">我的收藏</div>
            </div>
            <div class="wode-in">
                <div class="wode-in-in"><img src="../../image/jbzx.png" alt=""></div>
                <div class="shisi" @click="wodejubao">我的举报</div>
            </div>
            </template>
        </div>
        <div class="wode-cent-bot-cont"  @click="gettongzhi">
            <div class="wode-cent-bot">
                <img src="../../image/tongzhi.png" alt=""  class="wode-cent-bot-ic">
                <span class="shiliu">通知</span>
            </div>
            <div class="wode-cent-bot-rit">
                <div class="wode-red">1</div>
                <div class="wode-head-rit">
                    <img src="../../image/jiantoutou.png" alt="">
                </div>
            </div>
        </div>
        <div class="wode-cent">
            <div class="wode-ct-ic" @click="changeVersion">
                <div class="wode-ct-ic-left">
                    <img src="../../image/qiehuan.png" alt=""  class="wode-cent-bot-ic">
                    <span >切换成 {{isPersonal ? "商家" : "个人"}}</span>
                </div>
                <img src="../../image/jiantoutou.png" alt="" class="ruzhuimg">
            </div>
            <!-- <div class="wode-ct-ic" @click="applyVip" v-if="!isPersonal">
                <div class="wode-ct-ic-left">
                    <img src="../../image/qiehuan.png" alt=""  class="wode-cent-bot-ic">
                    <span >入驻品牌商家</span>
                </div>
                <img src="../../image/jiantoutou.png" alt="" class="ruzhuimg">
            </div> -->
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data () {
    return {
      imgele: require('../../image/图层 1.png'),
      imgtuxiang: require('../../image/Facebook@2x.png')
    }
  },
  computed: {
    isPersonal () {
      return this.$store.state.isPersonal
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  created () {
    this.weidenglu()
  },
  methods: {
    weidenglu () {
      console.log('510')
      // debugger
      // if (this.userInfo === '') {
      //   this.$router.push('/dlu')
      // }
    },
    gettongzhi () {
      this.$router.push({path: '/wodetongzhi'})
    },
    getshoucang () {
      this.$router.push({path: '/shoucang'})
    },
    getjifen () {
      this.$router.push({path: '/wodejifmix'})
    },
    shezhi () {
      this.$router.push({path: '/wodeshezhi'})
    },
    tobianji () {
      this.$router.push({path: '/bianji'})
    },
    getfabu () {
      this.$router.push({path: '/wodefabu'})
    },
    wodejubao () {
      this.$router.push({path: '/jubao'})
    },
    changeVersion () {
      this.$store.state.publish = ''
      if (this.isPersonal) {
        if (this.userInfo.is_seller) {
          this.$store.commit('setPersonal', false)
          this.$store.dispatch('getSellerInfo')
        //   this.$store.dispatch('getPublishReleaseValue')
        } else {
          this.$router.push({path: '/wodexuanzelei'})
        }
      } else {
        this.$store.commit('setPersonal', true)
      }
    },
    applyVip () {
      Toast('功能开发中')
    }
  }
}
</script>

<style>
    .wode-cent-bot-cont{
        height: 3.75rem /* 60/16 */;
    }
    .wode-ct-ic-left{
        display:flex;
        justify-content: space-between;
        align-items: center;
        height: 24px;
    }
    .ruzhuimg{
        width:.5625rem /* 9/16 */;
        height: 1rem /* 16/16 */;
    }
    .wode-head-in-rit{
        position: absolute;
        top: 1.625rem /* 26/16 */;
        right: 0;
    }
    .wode-ct-ic{
        display:flex;
        justify-content: space-between;
        align-items: center;
        height: 3.75rem /* 60/16 */;
        /* width:100%; */
    }
    .wode-cent-bot-rit{
        display: flex;
    }
    .wode-red{
        text-align: center;
        width:1.125rem /* 18/16 */;
        height: 1.125rem /* 18/16 */;
        line-height: 1.125rem;
        background-color:#FF7461;
        border-radius: 50%;
        margin-right: .6875rem /* 11/16 */;
        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(254,254,254,1);
    }
    .wode-cent-bot-cont{
        display:flex;
        align-items: center;
        justify-content: space-between;

    }
    .wode-cent-bot{
        display: flex;
    }
    .wode-cent-bot div:nth-child(2){
        margin-left: .8125rem /* 13/16 */;
    }
    .wode-cent-bot-ic{
        width:1.6875rem /* 27/16 */;
        height: 1.5rem /* 24/16 */;
    }
    .shiliu{
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .shisi{
        font-size:.875rem /* 14/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .wode-cent-cont{
        display:flex;
        justify-content: center;
        text-align: center;
        /* border:1px solid red; */
        border-radius: .625rem /* 10/16 */;
        /* padding:5% 0 5% 0; */
        margin-top:16%;
    }
    .wode-in{
        width: 25%;
        flex:2;
    }
    .wode-in-in img{
        width:2.3125rem /* 37/16 */;
        height: 2.3125rem /* 37/16 */;
    }
    .wode-head-contn{
        position: relative;
        margin-bottom:1.875rem /* 30/16 */;
    }
    .wode-head{
        justify-content: space-between;
        background-color: #FFFFFF;
        width: 100%;
        /* border:1px solid black; */
        position:absolute;
        top:3.9375rem /* 63/16 */;
        height: 6.1875rem /* 99/16 */;
        border-radius: .625rem /* 10/16 */;
        display:flex;
        align-items: center;
    }
    .wode-head div{
        display: inline-flex;

    }
    .wode-head-in-rit img{
        width:1.4375rem /* 23/16 */;
        height: 1.4375rem /* 23/16 */;
        /* background-color: aqua; */
    }
   .wode-head-contn-lef img{
        width:100%;
        height: 8.25rem /* 132/16 */;
        /* border:1px solid red; */
    }
    .wode-head-in{
        display:flex;
        align-items: center;
    }
    .wode-head-in img{
        width:4.125rem /* 66/16 */;
        height: 4.125rem /* 66/16 */;

    }
    .wode-head-in div{
        padding-left: .8125rem /* 13/16 */;
    }
    .wode-cent{
        border-top: 1px solid #E1E1E1;
        border-bottom:1px solid #E1E1E1;
    }
    .wode-head-rit img{
        width:.5625rem /* 9/16 */;
        height: 1rem /* 16/16 */;
        /* border:1px solid red; */

    }
</style>
