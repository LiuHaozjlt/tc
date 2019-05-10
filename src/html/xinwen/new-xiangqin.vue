<template>
  <div>
    <div class="new-xiangqinhead" @click="goNew">
      <img src="../../image/zuojiantou.png" alt>
    </div>
    <div class="new-xiangqin">
      <div class="yinni">{{articlenew.title}}</div>
      <div class="xiao-guan">
        <div class="xiaoshi">{{articlenew.create_time}}</div>
        <div class="guangf">官方</div>
      </div>
      <div class="xiangqi-cont" v-html="articlenew.content"></div>
      <!-- <div class="xiangqin-cent"></div> -->
      <!-- <div class="xiangqi-cent-ct">
        央视网消息（新闻联播）：中共中央总书记国家主席、中
        央军委主席、中央全面依法治国委员会主任习近平2开
      </div>
      <div class="xiangqin-cent"></div>-->
      <div class="wu-henxian"></div>
      <liuyanlist :list="articlenew.comment"></liuyanlist>
      <div class="meiyou">没有更多评论！</div>
    </div>
    <div class="xiangqin-bot" @click="toplxq">
      <div>
        <input type="text">
      </div>
      <div class="xiangqin-bot-img">
        <div>
          <img src="../../image/ly.png" alt>
          <div class="xiangqin-topico">ssss万</div>
        </div>
        <img src="../../image/sc.png" alt>
        <img src="../../image/fx.png" alt>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>

import liuyanlist from '../../components/liuyan-list'
import {wls} from '../../store/index'
export default {
  data () {
    return {
      articlenew: {},
      id: ''
    }
  },
  components: {
    liuyanlist
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.id = vm.$route.query.id
      vm.getDetail()
    })
  },
  methods: {
    goNew () {
      this.$router.back(-1)
    },
    toplxq () {
      this.$router.push({ path: '/pinlunxiangq' })
    },
    getDetail () {
      let userinfo = wls.get('userInfo', {})
      let token = userinfo.access_token
      // console.log(this.id)
      // let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'get',
        url: '/apis/v1/article/' + this.id,
        data: {
          // goods_type_id: 444444,
          // weight: 99,
          // send_address_id: 555,
          // receive_address_id: 3333,
          // receive_time: 4
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(p => {
        // console.log(p.data.data)
        this.articlenew = p.data.data
      })
    }
  }
}
</script>

<style>
.new-xiangqinhead {
  height: 2.75rem /* 44/16 */;
  line-height: 2.75rem /* 44/16 */;
  display: flex;
  align-items: center;
}
.new-xiangqinhead img {
  width: 0.6875rem /* 11/16 */;
  height: 1.25rem /* 20/16 */;
}

.pinlun-cent-cent {
  margin-left: 2%;
}
.guangf {
  text-align: center;
  line-height: 0.8125rem;
  font-size: 0.5625rem /* 9/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.new-xiangqin {
  padding-bottom: 100%;
}

.meiyou {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding: 1.75rem /* 28/16 */ 0 2.125rem /* 34/16 */ 0;
  text-align: center;
}
.pinlun-cent-warp {
  justify-content: space-between;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1.0625rem /* 17/16 */ 0 1.0625rem /* 17/16 */ 0;
  border-bottom: 1px solid #ffebebeb;
}
.pinlun-lf img {
}
.pinglun {
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
  /* border:1px solid red; */
  padding: 0.75rem /* 12/16 */ 0 0.75rem /* 12/16 */ 0;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}
.pinlun-lf {
  margin-right: 5%;
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
}
.xiangqin-bot {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  /* border:1px solid red; */
  align-items: center;
  background-color: #fff4f4f4;
}
.xiangqin-bot div input {
  margin-bottom: 0;
  border-radius: 1rem /* 16/16 */;
  margin-right: 1.3125rem /* 21/16 */;
  width: 90% !important;
  border: 0;
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
.xiangqi-cont {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 1.875rem /* 30/16 */;
}
.xiao-guan {
  display: flex;
  align-items: center;
  padding-top: 1rem /* 16/16 */;
  padding-bottom: 1.875rem /* 30/16 */;
}
.yinni {
  font-size: 25px;
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
