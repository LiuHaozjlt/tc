<template>
  <div>
    <div>
      <div class="pinpaishangjia-head" :style="{backgroundImage: `url(${sellerInfo.img})`}">
        <div>
          <div class="shangjiafanhui">
            <div class="shangjiazuo-left">
                    <img
              :src="imgUrl"
              alt
              class="shangjiafanghui-zuo shangjiazuo"
              @click="gowodeele"
            >
            </div>
            <div class="shangjiazuo-rit">
               <img :src="fengxiangIcon" alt class="shangjiafengx shangjiayou">
            </div>

          </div>
        </div>

      </div>
      <div class="dianpu-logo-cont">
        <div class="dianpu-logo">
          <img :src="sellerInfo.logo" alt>
        </div>
        <div class="gsmchen">{{sellerInfo.name}}</div>
      </div>
      <gsjianjie>{{sellerInfo.info}}</gsjianjie>
    </div>

    <div class="tao-wu">
      <div v-show="sellerInfo.release_type_id">{{releaseList.length || 0}}{{units[sellerInfo.release_type_id]}}</div>
    </div>

    <!--三个二级联动-->
    <div class="sangeliand">
      <sgeerjiliandong :search-options="searchOptions" @update="getSellInfo"></sgeerjiliandong>
    </div>

    <div>
      <div
        class="fangyuan-warp"
        v-for="(item,index) in releaseList"
        :key="index"
        @click="getchanpxq(index)"
      >
        <div class="liu-guo-cent">
          <div class="changxqleft">
            <img :src="'http://info.00856.la'+item.img" alt>
          </div>
          <div class="changxqrit">
            <div>
              <div class="changxq-bot-rigt-top">{{item.title}}</div>
            </div>
            <div>
              <div class="changxqcent">
                <div class="changxq-bot-lef" v-if="item.rent_hall">
                  <div class="changxq-bot-rit-cent">{{item.rent_hall.name}}</div>
                  <div class="changxq-bot-rit-cent"></div>
                  <div class="changxq-bot-rit-cented">{{item.rent_decoration.name}}</div>
                </div>
                <div class="shier" v-if="item.prices">{{item.prices}}KIP</div>
                <div v-if="item.recruit_prices_start">{{item.recruit_prices_start}}
                  -
                  {{item.recruit_prices_end}}
                  {{item.prices_unit}}/月</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--教育-->
    <!-- <div> -->

    <!-- <div v-for="(item,index) in jiaoyu" :key="index">
    -->
    <!-- <div class="liu-guo-cent" @click="getchanpxq">
        <div class="changxqleft">
          <img :src="jiaoyu.img" alt>
        </div>
        <div class="changxqrit">
          <div>
            <div class="changxq-bot-rigt-top">{{jiaoyu.name}}</div>
          </div>
          <div>
            <div class="changxqcent jiaoyu-a">
              <div class="changxq-bot-lef">
    <div class="changxq-bot-rit-cent">{{jiaoyu.name}}</div>-->
    <!-- <div class="changxq-bot-rit-cent"> {{jiaoyu.name}}</div> -->
    <!-- <div class="changxq-bot-rit-cented"> </div> -->
    <!-- </div>
              <div class="shier">{{jiaoyu.name}}KIP</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>-->
    <!-- <pinpaifenxiang></pinpaifenxiang> -->

    <!--app下载地址-->
    <a href="http://192.168.0.25:8080/tongcheng.apk" download="文件名称">
      <pinpaifenxiang v-if="xiazai"></pinpaifenxiang>
    </a>
    <!--未发布提示-->
    <dianne class v-if="fangyuantishi"></dianne>
  </div>
</template>

<script>
import {wls} from '../../store/index'
import dianne from '../../components/dianjiatishi'
import pinpaifenxiang from '../../components/pinpaifenxiang'
// import pinpaifenxiang from '../../components/pinpaifenxiang'
import gsjianjie from '../../components/gsjianjie'
import gangzhi from '../../components/gang-zhi'
import sgeerjiliandong from '../../components/sangeliandong'
import { Toast } from 'vant'

export default {
  data () {
    this.units = {
      1: '个热招职位',
      2: '套房源',
      3: '辆车',
      4: '门热门课程',
      5: '块地皮'
    }
    return {

      fengxiangIcon: require('../../image/fenxiang.png'),
      imgUrl: require('../../image/baijiantou.png'),
      fangyuantishi: false,
      jiaoyu: '',
      taoshu: '',
      queryParams: {
        rent_hall_id: '',
        prices: '',
        region_lv2: '',
        region_lv3: '',
        page: 1
      },
      xiazai: false,
      searchOptions: [],
      sellerType: '',
      releaseList: [],
      sellerInfo: {},
      priceUnit: []
    }
  },
  computed: {
    sellerId () {
      return this.$route.query.seller_id
    }
  },
  components: {
    dianne,
    gsjianjie,
    gangzhi,
    sgeerjiliandong,
    pinpaifenxiang
  },
  methods: {
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.getData(vm.$route.query.type)
      })
    },

    // 房源套数
    gowodeele () {
      this.$router.back(-1)
    },

    fengxiang () {
      this.xiazai = true
      // this.$router.push({path: '/pinpaichanpxq'})
      // console.log('分享')
    },
    getchanpxq (index) {
      this.$router.push({
        path: '/pinpaichanpxq',
        query: {
          data: JSON.stringify(this.releaseList[index])
        }
      })
      console.log(this.releaseList)
    },
    getSellInfo (filters = {}) {
      this.$store.dispatch('getSellerDetail', {seller_id: this.sellerId, ...filters}).then(({ data }) => {
        if (data.error_code !== 0) {
          Toast(data.message)
          return
        }

        let { SellerReleaseInfo, SellerInfo, SellerSearchInfo } = data.data
        console.log(data.data)

        this.releaseList = SellerReleaseInfo

        if (!this.sellerInfo.seller_id) {
          this.sellerInfo = SellerInfo

          let priceUnits = SellerSearchInfo.prices_unit

          delete SellerSearchInfo.prices_unit

          this.searchOptions = Object.keys(SellerSearchInfo).map(key => {
            let options = SellerSearchInfo[key] || []
            options.unshift({
              id: undefined,
              name: this.$t('unLimited'),
              name_la: this.$t('unLimited')
            })
            return {
              name: key,
              options,
              selected: '',
              ...(key === 'prices' ? { units: priceUnits } : {})
            }
          })
        }
      })
    }
  },
  created () {
    this.getSellInfo()
  }
}
</script>

<style>
.shangjiazuo-rit{
  display: flex;
  justify-content: center;
  align-items: center;
  width:1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  background-color: #686b69;
  border-radius: 100%;
}
.shangjiazuo-left{
  display: flex;
  justify-content: center;
  align-items: center;
  width:1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  border-radius: 100%;
  background-color: #686b69;
}
.dianpu-logo img{

}
.pinpaishangjia-head {
  background-size: cover;
  background-position: center;
  background-color: #b2bbcf;
  height: 30%;
}
.shangjiazuo {
  width:1.0625rem /* 17/16 */;
}
.shangjiayou {
  width: 0.9375rem !important/* 15/16 */;
  height: 0.9375rem !important/* 15/16 */;
}
/* .van-tab div div{
  color:#EE5C34;
} */
.van-tree-select__nav {
  width: 100% !important;
}
.van-picker-column__item {
  /* color:#EE5C34; */
}
.van-picker-column__item--selected {
  background-color: #fff3d8;
}
.van-tree-select__item {
  background-color: #fff3d8;
}
.van-tree-select__nitem--active {
  background-color: #fff3d8;
  color: #ee5c34;
}
.van-tabs__line {
  display: none;
}
.van-tree-select__nitem--active::after {
  display: none;
}
.van-icon-checked:before {
  display: none;
}
.shangjiafanhui {
  display: flex;
  justify-content: space-between;
  height: 2.75rem /* 44/16 */;
  align-items: center;
  padding:0 1rem;
}

.shangjiafengx {
  width: 1.9375rem /* 31/16 */;
  height: 1.9375rem /* 31/16 */;
  /* background-color: #000000; */
}
.shangjiafengx img {
  width: 0.9375rem /* 15/16 */;
  height: 0.9375rem /* 15/16 */;
}
.dianpu-logo img {
  width: 100%;
  height: 2.1875rem /* 35/16 */;
  /* border: 1px solid red; */
  border-radius: 100%;
}
.sangeliand {
  background-color: #ffb31e;
}
.tao-wu {
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  display: flex;
  padding: 2% 0;
}
.gsmchen {
  font-size: 1.125rem /* 18/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  /* color:rgba(255,255,255,1); */
  text-align: center;
  padding-top: 4%;
  padding-bottom: 5%;
}
.jiaoyu-a {
}
.changxqcent {
  display: flex;
  justify-content: space-between;
}
.dianpu-logo-cont {
  width: 100%;
  display: flex;
  align-items: center;
}
.dianpu-logo {
  width:2.1875rem /* 35/16 */;
  height: 2.1875rem /* 35/16 */;
  border-radius: 100%;

  margin-right: 3%;
}
.nian-rang {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.liu-guo-cent {
  padding-top: 5%;
}
.shuxian {
  padding: 0 3% 0 3%;
}
.gong-ye {
  display: flex;
}
.gong-ye div:nth-child(1) {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.gong-ye div:nth-child(2) {
  font-size: 0.5625rem /* 9/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(177, 104, 0, 1);
  background-color: #ffc74d;
}
.he {
  display: flex;
}
.yon {
  display: flex;
}
.yon-he {
  display: flex;
  justify-content: space-between;
}
.mian {
  display: flex;
}
.nian {
  display: flex;
}
.nian-mian {
  display: flex;
  justify-content: space-between;
}
.zhaop-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.zhao-shu {
  font-size: 1.1875rem /* 19/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.ba-yue {
  color: #eb5e5e;
}
.chakan {
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  height: 1.875rem /* 30/16 */;
  background-color: #ffc74d;
  display: inline;
}
.cfu {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.gz {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.gzhi {
  display: flex;
}
.zhon-men {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.wushi-fa {
  font-size: 0.6875rem /* 11/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  display: flex;
}
.gong-xi {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.gongdasuan {
  display: flex;
}
.chang-suan {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.gong-zhi {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.xin-gan-mid {
  margin: 0 4% 0 4%;
}
.fang-xiu {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ededed;
  padding-top: 3%;
}
.fang-xiu div {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.changxqleft {
  margin-right: 5%;
  width:30%;
}
.changxqleft img{
  width:100%;
  height: 4.5rem /* 72/16 */;
}
.changxqrit{
  width:70%;
}
.liu-guo-cent {
  display: flex;
  justify-content: space-between;

}
.changxq-bot-rigt-top{
  width:100%;
}

.changxqcent {
  display: flex;
  align-items: center;
}
.changxq-bot-rit-cented {
  font-size: 0.6875rem /* 11/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(177, 104, 0, 1);
  background-color: #ffc74d;
  display: inline;
}
.changxq-bot-rit-cent {
  font-size: 0.625rem /* 10/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.changxq-bot-rigt-top {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.shier {
  clear: both;
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(235, 94, 94, 1);
}
.liulan-guo {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.miao-shu-lef {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.miao-shu {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.kip-yue {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(235, 94, 94, 1);
}
.dian-shi {
  display: flex;
  position: fixed;
  bottom: 3%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.dian-pu div {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.dian-pu {
  display: flex;
  align-items: center;
}
.dian-pu img {
  width: 1rem /* 16/16 */;
  height: 0.9375rem /* 15/16 */;
}
.lian-shi {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background-color: #ffb31e;
  border-radius: 1.125rem /* 18/16 */;
  height: 2.25rem /* 36/16 */;
  text-align: center;
  line-height: 2.25rem /* 36/16 */;
  width: 80%;
}
.di-lou {
  display: flex;
  align-items: center;
}
.hu-lou {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.yuan-zhang {
  width: 100%;
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.pinpaixq-head {
  display: flex;
  justify-content: space-between;
}
.xin-gan {
  display: flex;
}
.xin-gan img {
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  background-color: red;
}
</style>
