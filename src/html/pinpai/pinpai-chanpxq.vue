<template>
  <div>
    <div>
      <!-- <div>品牌产品详情</div> -->
      <!-- <div class="pinpaixq-head">
        <div>
          <img class="pinpaixq-head-left" src="../../image/zuojiantou.png" alt>
        </div>
        <div class="xin-gan">
          <div>
            <img src alt>
          </div>
          <div class="xin-gan-mid">
            <img src alt>
          </div>
          <div>
            <img src alt>
          </div>
        </div>
      </div> -->
      <!--房源产品信息-->
      <div class="pinpaichanp-head-img" @click="goshangjiacp">
        <img :src="imgUrl" alt="">
      </div>
      <div class="shangjiafangyuan">
        <div class="yuan-zhang">{{data.title}}</div>
        <div class="di-lou">
          <div class="di-z">
            <img src="../../image/dizhi.png" alt>
          </div>
          <div class="hu-lou">{{data.address}}</div>
        </div>
        <div class="kip-yue">{{data.prices}}KIP/月</div>
        <div class="fang-xiu">
          <div>房屋：{{data.rent_hall.name}}</div>
          <div>装修： </div>
        </div>
      </div>

      <div class="miao-shu">
        <div class="miao-shu-lef">房屋描述:</div>
        {{data.info}}
      </div>

      <!--职位招聘-->
      <!-- <div class="gongdasuan">
                <div class="gong-zhi">工作地址:</div>
                <div class="chang-suan">长沙是芙蓉八一路喝奶粉打算</div>
      </div>-->

      <!--公司信息-->
      <!-- <div>
                <div>
                    <div class="gong-xi">公司信息</div>
                    <div class="gong-ye">
                          <div>阿诗丹顿付付付付多所发所</div>
                            <div>v企业</div>
                    </div>
                    <div class="wushi-fa">
                        <div>50</div>-<div>99</div>人
                        <div class="shuxian">|</div>
                        <div>私营</div>
                        <div class="shuxian">|</div>
                        <div>批发</div>
                    </div>
                    <div class="zhon-men">
                        中央军委主席、中央全面依法治国委员会主任习近平2月25日下午主持
                        召开中央全面依法治国委员会第二次会议
                        并发表重要讲话他强调，改革开放40年的经验告诉我们
                    </div>
                    <div class="gzhi">
                        <div class="gz">公司地址</div>
                        ：<div class="cfu">长沙芙蓉八一路鸿飞大厦1505</div>
                    </div>
                </div>
      </div>-->
      <!-- <div class="liulan-guo">浏览过该信息的人还看过</div> -->
      <!--房源信息-->
      <!-- <div class="liu-guo-cent">
                <div class="changxqleft">
                    <img src="" alt="">
                </div>
                <div class="changxqrit">
                    <div>
                        <div class="changxq-bot-rigt-top">精品一室一厅江景房精装修豪华花园...</div>
                    </div>
                    <div>
                        <div class="changxqcent">
                            <div class="changxq-bot-lef">
                                <div class="changxq-bot-rit-cent">一室一厅以为</div>
                                <div class="changxq-bot-rit-cent">湘江中路</div>
                                <div class="changxq-bot-rit-cented">豪华装修</div>
                            </div>
                            <div class="shier">
                                    12.000KIP
                            </div>
                        </div>
                    </div>
                </div>
      </div>-->

      <!--招聘信息-->
      <!-- <div class="zhaop-cont">
                <div>
                    <div class="zhao-shu">招聘销售待遇从有中暑</div>
                    <div class="ba-yue">8.0000-120000KIP/月</div>
                </div>
                <div class="chakan">
                    查看
                </div>
      </div>-->
      <!--土地交易-->
      <!-- <div>
                <div class="nian-rang">
                    <div class="nian-mian">
                        <div class="nian">
                            年限：<div>50年</div>
                        </div>
                        <div class="mian">
                            面积：<div>1050某</div>
                        </div>
                    </div>

                    <div class="yon-he">
                        <div class="yon">
                            用途：<div>50年</div>
                        </div>
                        <div class="he">
                            合作方式：<div>转让</div>
                        </div>
                    </div>
                </div>
      </div>-->
      <!-- <div class="dian-shi">
                <div class="dian-pu">
                      <img src="../../image/店铺精选.png" alt="">
                    <div>店铺</div>
                </div>

                <div class="lian-shi">联系方式</div>
      </div>-->
      <!-- <div class="fengxiang">分享</div> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgUrl: require('../../image/baijiantou.png')
    }
  },
  computed: {
    data () {
      debugger
      return JSON.parse(this.$route.query.data) || {}
    }
  },
  methods: {
    goshangjiacp () {
      this.$router.back(-1)
    }
  }
}
</script>

<style>
.pinpaichanp-head-img{
  width:1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  border-radius: 100%;
  background-color: #676968;
  display: flex;
    align-items: center;
    justify-content: center;
}
.pinpaichanp-head-img img{

  height: .9375rem /* 15/16 */;
}
.pinpaixq-head-left {
  width: 0.5625rem /* 9/16 */;
  height: 1rem /* 16/16 */;
}
.liu-guo-cent {
  border: 1px solid white;
}
.fengxiang {
  height: 2.25rem /* 36/16 */;
  color: white;
  text-align: center;
  line-height: 2.25rem /* 36/16 */;
  background: linear-gradient(
    72deg,
    rgba(255, 179, 30, 1),
    rgba(255, 146, 30, 1)
  );
  border-radius: 1.125rem /* 18/16 */;
  position: fixed;
  bottom: 1%;
  width: 100%;
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
}
/* .liu-guo-cent img {
  width: 100%;
  height: 15%;
} */
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
  margin-top: 5%;
}
.kip-yue {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(235, 94, 94, 1);
  padding-bottom: 0.9375rem /* 15/16 */;
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
  padding: 0.8125rem /* 13/16 */ 0 0.8125rem /* 13/16 */ 0;
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
  align-items: center;
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
