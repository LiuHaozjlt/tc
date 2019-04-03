<template>
  <div>
    <div>
      <!--房源分享-->
      <div>
        <div class="shangjiafanhui">
          <div>
            <img src="" alt="">
          </div>
          <div class="shangjiafengx" @click="fengxiang">
            <img src="../../image/fx.png" alt="">
          </div>
        </div>
      </div>
      <div class="dianpu-logo-cont">
        <div class="dianpu-logo">
          <img src="" alt="">
        </div>
      </div>
      <div class="gsmchen">公司名字</div>
      <gsjianjie></gsjianjie>
    </div>

    <div class="tao-wu">
      <div>5</div>套房屋
    </div>

    <div class="sangeliand">三个二级联动</div>

    <!--房源-->
    <div>
      <div v-for="(item,index) in myrelease" :key="index" @click="getchanpxq(index)">
        <div class="liu-guo-cent">
          <div class="changxqleft">
            <img :src="item.img" alt>
          </div>
          <div class="changxqrit">
            <div>
              <div class="changxq-bot-rigt-top">{{item.title}}</div>
            </div>
            <div>
              <div class="changxqcent">
                <div class="changxq-bot-lef">
                  <div class="changxq-bot-rit-cent">{{item.rent_hall.name}}</div>
                  <div class="changxq-bot-rit-cent"></div>
                  <div class="changxq-bot-rit-cented">{{item.rent_decoration}}</div>
                </div>
                <div class="shier">{{item.prices}}KIP</div>
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
                <div class="changxq-bot-rit-cent">{{jiaoyu.name}}</div> -->
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
  </div>
</template>

<script>
import gsjianjie from '../../components/gsjianjie'
import gangzhi from '../../components/gang-zhi'
export default {
  data () {
    return {
      myrelease: '',
      jiaoyu: ''
    }
  },
  components: {
    gsjianjie,
    gangzhi
  },
  methods: {
    fengxiang () {
      console.log('分享')
    },
    getchanpxq (index) {
      this.$router.push({
        path: '/pinpaichanpxq',
        query: {
          data: JSON.stringify(this.myrelease[index])
        }
      })
    },
    getdianpu () {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'get',
        url: 'apis/v1/seller/my-release',
        data: {
          // upimage:
          // release_type_id: 444444,
          // title: 99,
          // describe: 555,
          // mobile: 3333,
          // code: 4,
          // address: '长沙',
          // img: 3,
          // is_trans: 1,
          // xh: 86,
          // user_address_id: 0
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        // console.log('店铺', this.myrelease = p.data.data.SellerInfo)
        this.myrelease = p.data.data.SellerReleaseInfo
        // console.log('教育', p.data.data.SellerInfo)
        // this.jiaoyu = p.data.data.SellerInfo
        // console.log('教育', this.myrelease)
        // console.log('招聘店铺', p.data.data)
      })
    }
  },
  mounted () {
    this.getdianpu()
  }
}
</script>

<style>
.shangjiafanhui{
  display:flex;
  justify-content: space-between;
}
.shangjiafengx{
  width:1.9375rem /* 31/16 */;
  height: 1.9375rem /* 31/16 */;
  /* background-color: #000000; */
}
.shangjiafengx img{
  width:.9375rem /* 15/16 */;
  height: .9375rem /* 15/16 */;
}
.dianpu-logo img{
  width:100%;
  height: 5.375rem /* 86/16 */;
  border:1px solid red;
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
}
.gsmchen {
  font-size: 1.125rem /* 18/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  /* color:rgba(255,255,255,1); */
  text-align: center;
  padding-top: 4%;
}
.jiaoyu-a {
}
.changxqcent {
  display: flex;
  justify-content: space-between;
}
.dianpu-logo-cont {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}
.dianpu-logo {
  width: 5.375rem /* 86/16 */;
  height: 5.375rem /* 86/16 */;
  border-radius: 100%;
  border: 2px solid rebeccapurple;
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
}
.liu-guo-cent {
  display: flex;
  justify-content: space-between;
}
.liu-guo-cent img {
  width: 100%;
  height: 30%;
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
.pinpaixq-head div img {
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  background-color: brown;
}
</style>
