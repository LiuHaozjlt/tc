<template>
    <div class="pinlun-cont">
        <div class="pinglun" v-for="item in list" :key="item.id">
            <div class="pinlun-lf">
            <img :src="item.headimg">
            </div>
            <div class="pinlun-cent-warp">
            <div class="pinlun-cent-cont">
                <div class="pinlun-cent-top">{{item.user_nickname}}</div>
                <div class="pinlun-cent-cent">{{ item.content }}</div>
                <div class="fenz-hui">
                <div>{{item.create_time  | formatDate}}</div>
                <div @click="$router.push('/pinlunxiangq?count=' + item.reply_counts)">回复</div>
                </div>
            </div>
                <img src alt>
            </div>
        </div>
    </div>
</template>

    <!-- <div class="xiangqin-bot">
            <div>
                  <input type="text">
            </div>

            <div class="xiangqin-bot-img">
                <div>
                    <img src="../../image/ly.png" alt="">
                    <div class="xiangqin-topico">ssss万</div>
                </div>

                <img  src="../../image/sc.png" alt="">
                <img src="../../image/fx.png" alt="">
            </div>

    </div>-->

<script>
import {formatDate} from '../js/date'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style>
.xiao-guan{
  padding-left: 1rem;
  padding-right: 1rem;
}
.pinlun-cont{
  padding:0 1rem;
}
.liuyan-list{
  padding-bottom: 100%;
}
.meiyou{
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    padding:1.75rem /* 28/16 */ 0 2.125rem /* 34/16 */ 0;
    text-align: center;
}
.pinlun-cent-warp{
    justify-content: space-between;
    width:100%;
    display: flex;
    align-items: center;
    padding:1.0625rem /* 17/16 */ 0 1.0625rem /* 17/16 */ 0;
    border-bottom: 1px solid  #FFEBEBEB;
}
.pinlun-lf img{

}
.pinglun{
  display: flex;
  align-items: center;
}
.pinglun img {
  width: 0.9375rem /* 15/16 */;
  height: 1.0625rem /* 17/16 */;
  /* border: 1px solid red; */
}
.pinlun-cent-top {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.pinlun-cent-cent {
  width:100%;
    /* border:1px solid red; */
    padding:.75rem /* 12/16 */  0     .75rem /* 12/16 */ 0;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}
.pinglun {
  display: flex;
  line-height: 0.9375rem /* 15/16 */;
}
.fenz-hui {
  display: flex;

}
.fenz-hui div:nth-child(1) {
  margin-right: 0.75rem /* 12/16 */;
  font-size: 9px /* 10/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.pinglun div:nth-child(3) {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}
.pinlun-lf img {
  width: 2.25rem /* 36/16 */;
  height: 2.25rem /* 36/16 */;
  border-radius: 100%;
  /* border: 1px solid red; */
}
.wu-henxian {
  height: 0.3125rem /* 5/16 */;
  background: rgba(245, 245, 245, 1);
}
.xiangqi-cent-ct {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
}
.xiangqin-topico {
  color: white;
  text-align: center;
  width: 2rem /* 32/16 */;
  line-height: 0.8125rem;
  height: 0.8125rem /* 13/16 */;
  background: rgba(255, 103, 98, 1);
  border-radius: 0.4375rem /* 7/16 */;
  position: absolute;
  top: 0.6875rem /* 11/16 */ /* 5/16 */;
  left: 0.625rem /* 10/16 */;
  font-size: .5rem /* 8/16 */;
}
.xiangqin-bot {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  /* border:1px solid red; */
  align-items: center;
  background-color: #F4F4F4;
}
.xiangqin-bot div input {
  margin-bottom: 0;
  border-radius: 1rem /* 16/16 */;
  margin-right: 1.3125rem /* 21/16 */;
  width: 90% !important;
  height: 2.0625rem /* 33/16 */;
  margin-left:4%;
  /* border:1px solid red; */
}
.xiangqin-bot-img {
  display: flex;
  position: relative;
  height: 3.0625rem /* 49/16 */;
  align-items: center;
}
.xiangqin-bot-img img:nth-child(2) {
  margin-left: 1.4375rem /* 23/16 */;
}
.xiangqin-bot-img img:nth-child(3) {
  margin-left: 1.25rem /* 20/16 */;
}
.xiangqin-bot-img img {
  width: 1.4375rem /* 23/16 */;
  height: 1.375rem /* 22/16 */;
}
.xiangqin-cent {
  margin-top: 1.5rem /* 24/16 */;
  margin-bottom: 1.5rem /* 24/16 */;
  width: 100%;
  height: 12rem /* 192/16 */;
  background-color: brown;
}

.xiao-guan {
  display: flex;
  align-items: center;
  padding-top: 1rem /* 16/16 */;
  padding-bottom: 1.875rem /* 30/16 */;
}
.yinni {
  font-size: 1.5625rem /* 25/16 */;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
  line-height: 1.875rem /* 30/16 */;
}
.xiaoshi {
  line-height: 0;
  padding-right: 0.5625rem /* 9/16 */;
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.guangf {
  width: 1.6875rem /* 27/16 */;
  height: 0.8125rem /* 13/16 */;
  background-color: #ff6762;
}

</style>
