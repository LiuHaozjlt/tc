<template>
  <div class="shouyexq-cont">
    <div>
      <div>
        <!-- <div>首页详情</div> -->
        <div class="shouyexiangq-head">
          <div class="shouyexiangq-head-left">
            <div @click="goshouye">
              <img :src="imgUrl" alt>
            </div>
          </div>
          <div class="shouyexiangq-head-right">
            <div class="shouyexiangq-head-right-icon" @click="collection(release.user_release_id)">
              <img src="../../image/sc.png" alt>
            </div>
            <!-- <div>
              <img src="../../image/fx.png" alt>
            </div>-->
            <!--我的举报-->
            <div class="shouyexiangq-head-right-icon" @click="report">
              <img src="../../image/jubao (2).png" alt>
            </div>
          </div>
        </div>
        <div class="slide-none"></div>
        <!--轮播内容-->
        <div class="slide-cont " style=" " v-if="false">
            <slide :list="slideList"></slide>
        </div>

        <!--首页详情内容-->
        <div class="shouyexiangq-content">
          <div class="shouyexq-cont-top">
            <div class="shouyexq-cont-top-lef">
             <!-- release.user.headimgurl.indexOf('http')>-1?release.user.headimgurl: 'http://info.00856.la'+release.user.headimgurl -->
              <img :src="release.user.headimgurl.indexOf('http')>-1?release.user.headimgurl: 'http://info.00856.la'+release.user.headimgurl " alt  >
              <div class="shouyexq-top-lef">{{release.user.nickname}}</div>
            </div>
            <div class="shouyexq-cont-top-rit">
              <div></div>
              <div class="shouyexq-cont-top-rit-time">{{release.created_time | formatDate}}</div>
            </div>
          </div>
          <div class="shouyexq-cont-cent">
            <!-- <div class="shouyexq-cont-cent-miaoxu">描叙</div> -->
            <div class="shouyexq-cont-cent-miaoxu"></div>
          </div>
          <div class="shouyexq-cont-cent-btm">
            <div class="shouyexq-top-lef">{{release.title}}</div>
            <div class="shouyexq-btmjianjie">
              {{release.describe}}
            </div>
          </div>

          <!--定位内容-->
          <div class="shouyexq-dingwei">
            <div class="shouyexq-dingwei-icon">
              <img src="../../image/dizhi.png" alt>
              <div class="dingwei-text">{{release.address}}</div>
            </div>
          </div>
        </div>
        <!--浏览过改信息的人-->
        <div class="liulanguoderen">
          <div class="liulankanguo">浏览过该信息的人还看过</div>
          <div class="liulan-list">
              <tuijiancont></tuijiancont>
          </div>
        </div>
      </div>
    </div>
    <!-- <mt-button size="large" >下侧弹出Popup</mt-button> -->
    <!-- <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4"  > -->
      <!-- <div class="header" @click="popupVisible4=false">
        <img src alt>
      </div> -->
      <!-- <div class="liangju">说两局在走</div>
       <div class="body liuyan-cent">
         <br>
         <br>
         <br>
         <img src="" alt="">
      </div>-->

      <!-- <div class="liuyan-item"> -->
        <!--留言列表-->
        <!-- <liuyanlist :list="list"></liuyanlist>
      </div> -->
      <!-- <mt-button class="bottom" @click="sendEvent" size="large" type="primary">
        <div class="kan-liu">
          <input type="text" placeholder="看对眼就留言，问问更多细节~">
          <div style="color:black;">发送</div>
        </div>
      </mt-button> -->
    <!-- </mt-popup> -->

    <!--联系电话弹窗-->
    <van-popup v-model="show"  position="bottom" :overlay="true" class="mint-popup-5">
      <div class="lianxidianhuawarp">
        <div class="lianxidianhua-bot">
          <img src="../../image/dianhua (1).png" alt>
          <div class="callfangshi">{{release.mobile}}</div>
          <div class="call">拨打电话</div>
        </div>
        <div class="lianxidianhua-bot">
          <img src="../../image/weixin.png" alt>
          <div class="callfangshi">{{release.weixin_id}}</div>
          <div class="call">复制</div>
        </div>
        <div class="lianxidianhua-bot">
          <img src="../../image/youjian.png" alt>
          <div class="callfangshi">{{release.email}}</div>
          <div class="call">复制</div>
        </div>
      </div>
    </van-popup>
    <div class="liuyang">
      <!-- <div class="liuyan-icon">
        <img src="../../image/liuyan.png" alt>
        <div class="ly" @click="popup4">留言</div>
      </div> -->
      <div class="lianxifangs" @click="popup5">联系方式</div>

    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import liuyanlist from '../../components/liuyan-list'
import { mapState, mapMutations, mapActions } from 'vuex'
import tuijiancont from '../../components/tuijian-cont'
import slide from '../../components/slide'
import {formatDate} from '../../js/date'
import { Popup } from 'vant'

Vue.use(Popup)

export default {
  name: 'Picker',
  data () {
    return {
      popupVisible5: false,
      // popupVisible4: false,
      list: [],
      release: {},
      imgUrl: require('../../image/baijiantou.png'),
      slideList: [],
      show: false

    }
  },

  created () {
    this.lianggezhi()
    this.release_id = this.$route.query.user_release_id
    let self = this
    this.getReleases({id: this.release_id}).then((data) => {
      // console.log(data)
      let res = data.data
      if (res.error_code === 0) {
        self.release = res.data
        self.release.pics.forEach((e) => {
          self.slideList.push(e.img)
        })
      }
    })
    // console.log(this.$router.user_release_id)
  },
  filters: {
    formatDate (time) {
      var date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  mounted () {
    // this.sendEvent()
  },
  computed: {
    img () {
      return this.$store.state.imgCache
    },
    // lang () {
    //   return this.$store.state.lang
    // }

    ...mapState(['indexData'])
  },
  components: {
    liuyanlist,
    tuijiancont,
    slide
  },
  methods: {

    getData () {
      let self = this
      this.release_id = this.$route.query.user_release_id
      this.getReleases({id: this.release_id}).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.error_code === 0) {
          self.release = res.data
        }
      })
    },
    // bodaiphone () {
    //   window.location.href = 'tel:+10086'
    // },
    ...mapActions(['getReleases', 'sellerReleaseCollect']),
    report () {
      this.$router.push('/wodeyijian')
    },
    collection (id) {
      this.sellerReleaseCollect({
        user_release_id: id
      }).then(res => {
        if (res.data.error_code === 0) {
          this.$router.push({path: '/shoucang'})
        }
      })
    },
    lianggezhi () {
      // let user_release_id = this.$route.query.user_release_id
    },
    goshouye () {
      // this.$router.back(-1)
      this.$router.push({path: '/index'})
    },
    // sendEvent () {
    //   this.popupVisible4 = false
    //   this.false = true
    //   this.list.push({
    //     id: this.list.length + 1,
    //     content: new Date().toLocaleString()
    //   })
    // },
    // popup4 () {
    //   // this.popupVisible4 = false
    //   this.true = false
    // },
    popup5 () {
      // debugger
      this.show = true
    },
    getRelease () {

    }
  },
  watch: {
    // 如果路由发生变化，再次执行该方法
    '$route': 'getData'
  }
}

</script>

<style scoped>
.slide-none{
  height: 8%;
}

.shouyexq-cont-top-rit{
  width:30%;
}

.shouyexiangq-content{
  padding: 0 14px;
}
.shouyexq-cont {
  /* padding: 0 4%; */
}
.shouyexiangq-head-right-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.liulankanguo {
  padding: 3% 0;
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
      margin-left: 10px;
}
.shouyexq-dingwei-icon {
  display: flex;
  border: 2px solid #ededed;
  border-left: none;
  border-right: none;
  height: 8%;
  align-items: center;
}
.dingwei-text {
  padding-left: 5%;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.shouyexq-dingwei-icon img {
  width: 0.8125rem /* 13/16 */;
  height: 1.0625rem /* 17/16 */;
}
.shouyexq-cont-top-rit-time {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.shouyexq-cont-cent-miaoxu {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  padding: 5% 0;
}
.shouyexq-cont-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5% 0;
}
.shouyexq-top-lef {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.shouyexq-cont-top-lef {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width:89%;
}
.shouyexq-cont-top-lef img {
  width: 2.6875rem /* 43/16 */;
  height: 2.6875rem /* 43/16 */;
  border-radius: 100%;
  margin-right: 4%;
}
.shouyexq-btmjianjie {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  padding: 5% 0;
}
.mint-popup-5 {
  width: 100%;
  border-top-left-radius: 1.125rem /* 18/16 */;
  border-top-right-radius: 1.125rem /* 18/16 */;
}
.lianxidianhuawarp {
  padding-top: 10%;
  padding-left: 5%;
}
.callfangshi {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding-left: 3%;
}
.call {
  position: absolute;
  right: 5%;
  width: 30%;
  border-radius: 0.875rem /* 14/16 */;
  background-color: #ffb31e;
  color: white;
  text-align: center;
  height: 1.75rem /* 28/16 */;
  line-height: 1.75rem /* 28/16 */;
}
.lianxidianhua-bot {
  display: flex;
  /* justify-content: space-between; */
  margin-bottom: 10%;
}
.lianxidianhua-bot img {
  width: 1.75rem /* 28/16 */;
  height: 1.4375rem /* 23/16 */;
}
.liuyan-icon {
  display: flex;
  width: 25%;
}
.liuyang {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0%;
  width: 100%;
  background-color: white;
  margin-left: 14px;
  justify-content: space-evenly;
}
.lianxifangs {
  width: 66%;
  height: 2.25rem /* 36/16 */;
  border-radius: 1.125rem /* 18/16 */;
  background-color: #ffb31e;
  color: white;
  line-height: 2.25rem /* 36/16 */;
  text-align: center;
}
.ly {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  margin: 0 10%;
}
.liuyan-icon img {
  width: 1.25rem /* 20/16 */;
  height: 1.25rem /* 20/16 */;
}
.shouyexiangq-head-left div {
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  background-color: #9a9b9a;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shouyexiangq-head-right div {
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  background-color: #9a9b9a;
  border-radius: 100%;
}

.shouyexiangq-head-right {
  display: flex;
  justify-content: space-between;
  width: 30%;
}
.shouyexiangq-head-right img {
}
.shouyexiangq-head {

  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 2%;
  z-index: 99999;
  width: 100%;
  padding: 0 10px;
}
.shouyexiangq-head-left,
.shouyexiangq-head-right {
  height: 1.875rem /* 30/16 */;
}

.shouyexiangq-head img {
  width: 1.0625rem /* 17/16 */;
  height: 1.0625rem /* 17/16 */;
}
.shouxq-top img {
  height: 40%;
  width: 100%;
}
.kan-liu input {
  border-radius: 1rem /* 16/16 */;
  height: 2.0625rem /* 33/16 */;
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.mint-button--primary {
  background-color: #f4f4f4 !important;
}
.kan-liu {
  height: 3.0625rem /* 49/16 */;
  background-color: #f4f4f4;
}
.liuyan-cent {
  padding-bottom: 9.75rem /* 156/16 */;
}
.liuyan-cent img {
  height: 7.25rem /* 116/16 */;
  background-color: aqua;
}
.liangju {
  padding-top: 7.375rem /* 118/16 */;
  text-align: center;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.header {
  text-align: center;
}
.header img {
  width: 1.0625rem /* 17/16 */;
  height: 0.625rem /* 10/16 */;
  background-color: aqua;
}
.body {
  text-align: center;
}
.mint-popup-4 {
  border-radius: 15px 15px 0px 0px;
  width: 100%;
  height: 60%;
}
.bottom {
  position: fixed;
  bottom: 0;
}
</style>
