<template>
    <div>
        <!-- {{logistic}} -->
        <div>
            <div class="xuanzeren">
                <img src="../../image/zuojiantou.png" alt="" @click="gojishou">
                选择寄件人
                <div></div>
            </div>
            <div class="dizhilist" v-if='dizhilist'>
                <div v-for="(item,index) in logistic" :key="index">
                    <div class="xuanze-top xuanze-top-ft">
                        <div>{{item.send_consignee}}</div>
                        <div>{{item.order_sn}}</div>
                    </div>
                    <div class="xuanze-top-ft">{{item.send_city}}</div>
                    <div class="xuanze-bot">
                        <div class="xuanze-top-bot" @click="duigou(index)">
                            <img  v-if='true' src="../../image/choose_N.png" alt="">
                            <div class="xuanze-top-ft">{{shewei === index ? '设为默认' : '默认地址'}}</div>
                        </div>
                        <div class="bj-sc">
                            <div class="xuanze-bot-rit">
                                <img src="../../image/bj.png" alt="">
                                <div class="bianji-shanchu" @click="getxindizhi">编辑</div>
                            </div>
                            <div class="xuanze-bot-rit"   @click="deleteAddress(index)">
                                <img src="../../image/ssscc.png" alt="">
                                <!--接口传数据可以通过index拿得到，先请求后台，在做前端删除操作-->
                                <div class="bianji-shanchu">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tianjia" @click="getdizhi">
            添加新地址
        </div>
    </div>
</template>

<script>
export default {
  props: {
    type: String,
    defaulf: ''
  },
  data () {
    return {
      logistic: [],
      shewei: 0, // 第一个为默认上
      //   dui: '../../image/choose.png',
      moren: '默认地址',
      dizhilist: true
    }
  },
  methods: {
    getdleit (index) {
      this.dizhilist[index] = false
    },
    gojishou () {
      this.$router.back(-1)
    },
    getxindizhi () {
      this.$router.push({path: '/dizhi'})
    },
    duigou (index) {
      this.shewei = index
    },
    getdizhi () {
      this.$router.push({path: '/dizhi'})
    },
    deleteAddress (i) {
      this.logistic.splice(i, 1)
      // 只是前端做了删除动作，这里需要请求接口告诉后台不然刷新之后，还是会有的
    }
  },
  mounted () {
    let self = this
    let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
    this.axius.get('/apis/v1/logistic', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(p => {
      self.logistic = p.data.data
      console.log(p.data.data)
    })
  }

}
</script>

<style>
.tianjia{
    width:100%;
    bottom: .4375rem /* 7/16 */;
    position: fixed;
    text-align: center;
    line-height: 2.25rem /* 36/16 */;
    border-radius: 1.125rem /* 18/16 */;
    background-color: #FFB31E;
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.xuanzeren{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.xuanzeren img{
    width:.6875rem /* 11/16 */;
    height: 1.25rem /* 20/16 */;
}
.xuanzeren{
    line-height:2.75rem /* 44/16 */;
    height: 2.75rem /* 44/16 */;
    text-align: center;
    font-size:1.0625rem /* 17/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.bianji-shanchu{
    padding-left: .4375rem /* 7/16 */;
}
.xuanze-bot{
    margin-top:1.5625rem /* 25/16 */;
    border-top: 1px solid #E1E1E1;
    justify-content: space-between;
    display: flex;
    height: 2.5rem /* 40/16 */;
    /* border:1px solid red; */
    align-items: center;
}
.bj-sc{
    display: flex;
}
.bj-sc div:nth-child(1){
    margin-right: 1.4375rem /* 23/16 */;
}
.bianji-shanchu{
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
}
.xuanze-bot-rit{
    display: flex;
    align-items: center;
}
.xuanze-bot-rit img{
    width:1.0625rem /* 17/16 */;
    height: 1.0625rem /* 17/16 */;
}
.xuanze-top-bot div{
    padding-left:.625rem /* 10/16 */;
}
.xuanze-top-bot{
    display: flex;
}
.xuanze-top-bot img{
    width:1.1875rem /* 19/16 */;
    height: 1.1875rem /* 19/16 */;
}
.xuanze-top-ft{
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.xuanze-top{
    display: flex;
    justify-content: space-between;
    /* border:1px solid red; */
    padding-top:1rem /* 16/16 */;
    padding-bottom: 1rem /* 16/16 */;

}
</style>
