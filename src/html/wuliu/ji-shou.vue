<template>
  <div>
    <div class="ji-shou-head">
      <div class="ji-shou-head-lef">
        <!-- <img src="" alt=""> -->
        <div @click="godingdanqian">
          <img src="../../image/dajiantou.png" alt="">
        </div>
        <div></div>
        <div @click="godingdan">我的订单</div>
      </div>
      <div class="ji-shou-head-cent">
        <img src="../../image/wl.png" alt>
      </div>
    </div>
    <!--寄件人-->
    <div class="ji-cent-top" @click="selectAddress('send')">
      <div class="ji-shou-ji">
        <img src="../../image/jijian.png" alt>
      </div>
      <div class="ji-cent-cent">
        <div class="name-cent">
          <div class="ji-name name-numb">{{sendAddress.consignee || '寄件人'}}</div>
          <div class="ji-numb">{{sendAddress.mobile}}</div>
        </div>
        <div class="ji-cent">{{concatAddress(sendAddress)}}</div>
      </div>
      <div class="ji-rit">
        <img src="../../image/jiantoutou.png" alt>
      </div>
    </div>
    <!--收件人-->
    <div class="ji-cent-top" @click="selectAddress('receive')">
      <div class="ji-shou-ji">
        <img src="../../image/shou.png" alt>
      </div>
      <div class="ji-cent-cent">
        <div class="name-cent">
          <div class="ji-name name-numb">{{receiveAddress.consignee || '收件人'}}</div>
          <div class="ji-numb">{{receiveAddress.mobile}}</div>
        </div>
        <div class="ji-cent">{{concatAddress(receiveAddress)}}</div>
      </div>
      <div class="ji-rit">
        <img src="../../image/jiantoutou.png" alt>
      </div>
    </div>
    <div class="qiwang">
      <div class="ji-cent-bot-lef">期望上门收货时间：</div>
      <div class="ji-cent-bot-rit" @click="isShowDate = true">
        <div >{{logisticOrder.receive_time === today ? "今天" : logisticOrder.receive_time}}</div>
        <div class="jtian">
          <img src="../../image/jiantoutou.png" alt>
        </div>
      </div>
    </div>

    <div class="qiwang" @click="showGoodsType">
      <div class="ji-cent-bot-lef">物品类型：</div>
      <div class="ji-cent-bot-rit">
        <div>{{goodsType[isLaos ? 'name_la' : 'name']}}</div>
        <div class="jtian">
          <img src="../../image/jiantoutou.png" alt>
        </div>
      </div>
    </div>

    <div class="qiwang">
      <div class="ji-cent-bot-lef">估计重量：</div>
      <div class="ji-cent-bot-rit">
        <div class="jia">
          <img src="../../image/xjh.png" alt @click="addWeight(1)">
        </div>
        <div class="jtian zhonliang">{{logisticOrder.weight}}kg</div>
        <div class="jian">
          <img src="../../image/xjjh.png" alt @click="addWeight(-1)">
        </div>
      </div>
    </div>

    <div class="beizhu">
      备注：
      <textarea v-model="logisticOrder.memo" class="beizhu-text" placeholder="快点来少时诵诗书所所所"/>
      <div class="jishu">
        <div class="jishugeshu">
          <div>{{memoLength}}</div>/
          <div>50</div>
        </div>
      </div>
    </div>
    <div class="tiaokuan">
      提交表示同意
      <div>《老挝咨询物流服务条款》</div>
    </div>

    <div class="tijiao" @click="submit">提交</div>

    <!--物品类
    型弹窗-->
    <van-popup class="wupinleixing" v-model="popupVisible" position="bottom">
      <div class="tou-shou">投递违禁物品和无包装物品将拒收</div>
    </van-popup>
    <van-popup v-model="isGoodsTypeShow" position="bottom">
      <van-picker :columns="logisticGoodsType" :value-key="isLaos ? 'name_la' : 'name'"
        @change="selectGoodsType" />
    </van-popup>

    <!--时间日期-->
    <van-popup v-model="isShowDate" position="bottom">
      <van-picker class="test"
  show-toolbar
  :columns="columns"
  @cancel="onCancel"
  @confirm="onConfirm"
/>
    </van-popup>

  </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapMutations} from 'vuex'
import {Popup, Toast, DatetimePicker, Picker} from 'vant'

Vue.use(DatetimePicker)

Vue.use(Picker)
// Vue.use(Popup)

export default {
  data () {
    let today = new Date()
    this.today = this.formatDate(today)
    this.orderInitial = {
      sendAddress: {},
      receiveAddress: {},
      goodsType: {},
      weight: 1,
      receive_time: this.today,
      memo: ''
    }
    return {
      // columns: ['今天', '明天', '2月26日', '嘉兴', '湖州'],
      isShowDate: false,
      defaultUserAddress: null,
      popupVisible: false,
      isGoodsTypeShow: false,
      // minHour: 10,
      // maxHour: 20,
      minDate: today,
      // maxDate: new Date(2019, 10, 1),
      currentDate: new Date()
    }
  },
  computed: {
    ...mapState(['logisticOrder', 'logisticGoodsType', 'isLaos']),
    memoLength () {
      return (this.logisticOrder.memo || '').length
    },
    sendAddress () {
      return this.logisticOrder.sendAddress || {}
    },
    receiveAddress () {
      return this.logisticOrder.receiveAddress || {}
    },
    goodsType () {
      return this.logisticOrder.goodsType || {}
    }
  },
  created () {
    if (Object.keys(this.logisticOrder).length === 0) {
      this.updateLogisticOrder(this.orderInitial)
    }
    this.columns = this.xuanzeDate(0, 500)
  },
  methods: {
    ...mapMutations(['updateLogisticOrder']),
    formatter () {

    },
    xuanzeDate (min, max) {
      var arr = []
      var de = new Date()
      for (var i = min; i <= max; i++) {
        var de2 = new Date(de.getTime() + i * 24 * 60 * 60 * 1000)
        var month = de2.getMonth() + 1
        var day = de2.getDate()
        arr.push(month + '月' + day + '日')
      }
      return arr
    },
    onConfirm (value, index) {
      // value
    },
    onCancel () {
      Toast('取消')
    },
    riQichajian () {
      this.show = true
    },
    godingdan () {
      this.$router.push({path: '/dingdan'})
    },
    godingdanqian () {
      this.$router.back(-1)
    },
    showGoodsType () {
      this.isGoodsTypeShow = true
    },
    selectAddress (type) {
      this.$router.push({
        path: '/address/list?from=logistic',
        query: {
          title: type === 'send' ? '选择寄件人' : '选择收件人',
          type
        }
      })
    },

    concatAddress ({provice = '', city = '', address = ''}) {
      return [provice, city, address].join(' ')
    },
    selectGoodsType (picker, value, index) {
      this.updateLogisticOrder({goodsType: value})
    },
    addWeight (n) {
      // debugger
      let weight = this.logisticOrder.weight + n

      if (weight === 0) weight = 1

      this.logisticOrder.weight = weight
    },
    onDateSelect (value) {
      this.updateLogisticOrder({receive_time: this.formatDate(value)})
      this.isShowDate = false
    },
    formatDate (aDate) {
      let month = (aDate.getMonth() + 1).toString().padStart(2, 0)
      return '' + aDate.getFullYear() + month + aDate.getDate()
    },
    submit () {
      let {
        goodsType,
        sendAddress,
        receiveAddress,
        weight,
        receive_time,
        memo
      } = this.logisticOrder

      let data = {
        goods_type_id: goodsType.goods_type_id,
        send_address_id: sendAddress.user_address_id,
        receive_address_id: receiveAddress.user_address_id,
        memo: memo.substr(0, 50),
        weight,
        receive_time
      }
      if (!data.send_address_id) {
        Toast('请选择寄件人')
        return
      }
      if (!data.receive_address_id) {
        Toast('请选择寄件人')
        return
      }
      if (!data.goods_type_id) {
        Toast('请选择物品类型')
        return
      }

      this.$store.dispatch('createLogisticOrder', data).then(({data}) => {
        if (data.error_code === 0) {
          Toast('物流订单创建成功')
          this.updateLogisticOrder({_cover: true})
          this.$router.replace('/dingdan') // 创建成功后跳到物流订单列表
        } else {
          Toast(data.message)
        }
      })
    }
  },
  mounted () {
    if (this.logisticGoodsType.length === 0) {
      this.$store.dispatch('getLogisticGoodsType').then(() => {
        let goodsType = this.logisticGoodsType[0]
        goodsType && this.updateLogisticOrder({goodsType})
      })
    }
  }
}
</script>

<style>
.van-picker-column__item{
  padding:0!important;
  width:33%;
}
.van-picker__title{
  display:none;
}
.van-picker-column ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.van-picker__columns{
  justify-content: center;
}

.tou-shou {
  width:100%;
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  position: fixed;
  bottom: 6%;
  text-align: center;
}
.wupinleixing {
  width: 100%;
  height: 30%;
}
.jishugeshu {
  display: flex;
  justify-content: flex-end;
}
.ji-shou-head-lef {
  display: flex;
}
.tijiao {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 1.875rem /* 30/16 */;
  background-color: #ffb31e;
  height: 2.25rem /* 36/16 */;
  border-radius: 1.125rem /* 18/16 */;
  text-align: center;
  line-height: 2.25rem;
}
.tiaokuan div {
  color: #ffc74d;
}
.tiaokuan {
  display: flex;
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.jishu {
  text-align: right;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 179, 30, 1);
}
.beizhu-text {
  font-size: 15px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);

  height: 15%;
}
.beizhu {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.zhonliang {
  padding: 2% 15%;
  margin: 0 0.9375rem /* 15/16 */;
  height: 1.6875rem /* 27/16 */;
  background-color: #ffc74d;
  color: white;
  line-height: 1.6875rem;
}
.jia img {
  width: 0.8125rem /* 13/16 */;
  height: 0.8125rem /* 13/16 */;
}
.jian img {
  width: 0.8125rem /* 13/16 */;
  /* height: .125rem /* 2/16 */
}
.ji-cent-bot-lef {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.ji-cent-bot-rit div:nth-child(1) {
  font-size: 15px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.jtian img {
  width: 0.5625rem /* 9/16 */;
  height: 1rem /* 16/16 */;

  margin-left: 0.8125rem /* 13/16 */;
}
.qiwang {
  display: flex;
  justify-content: space-between;
  height: 10%;
  align-items: center;
}

.ji-cent-bot-rit {
  display: flex;
  align-items: center;
}
.ji-cent-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.6875rem /* 75/16 */;
}
.ji-rit img {
  width: 0.5625rem /* 9/16 */;
  height: 1rem /* 16/16 */;
}
.ji-shou-head {
  position: relative;
}
.ji-shou-head-cent {
  height: 6.25rem /* 100/16 */;
  /* border:2px solid black; */
  position: absolute;
  top: 0;
}
.ji-shou-head-cent img {
  width: 100%;
  height: 6.25rem /* 100/16 */;
}
.ji-shou-head-lef {
  height: 6.25rem /* 100/16 */;
  /* border: 2px solid red; */
  z-index: 9;
  position: relative;
  display: flex;
  justify-content: space-between;
  /* background-color:aqua; */
  align-items: center;
}
.ji-shou-head-lef div {
  font-size: 1.125rem /* 18/16 */;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(255, 255, 255, 1);
}
.ji-shou-head-lef img {
  width: 1.375rem /* 22/16 */;
  height: 0.9375rem /* 15/16 */;
  /* border: 1px solid red; */
}

.ji-shou-ji img {
  width: 2.375rem /* 38/16 */;
  height: 2.375rem /* 38/16 */;
}
.ji-numb {
  padding-left: 0.3125rem /* 5/16 */;
}
.ji-cent {
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  /* padding-top: .4375rem /* 7/16 */
}
.name-numb {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.ji-name {
  /* line-height: 0; */
}
.name-cent {
  display: flex;
}
</style>
