<template>
  <div>
    <div class="wode-qiye-head">
      <img src alt>
      企业认证
      <div></div>
    </div>
    <div class="wode-qiye-head-cent">
      <img src="../../image/zhizhao.png" alt>
    </div>
    <div class="dian-zhao" v-if="zhizhaodiv">
      <div>
        <img src="../../image/scsc.png" alt v-if="zhizhao">
        {{yingyezz}}
      </div>
    </div>
    <div class="dian-zhao shengheft" v-if="zhizhaodivs">
      <div>
        <img src="../../image/scsc.png" alt v-if="zhizhao">
        {{yingyezz}}
      </div>
    </div>
    <!--选择
        规 item.val 哪里默认有个 请选择
        性质，
        行业-->
    <div class="wode-qiye-cent" v-for="(item,index) in twre" :key="index">
      <div class="wode-qiye-cent-c">{{item.text}}</div>
      <div class="wode-qiye-rit" @click="setshijian(index)">
        <div>{{item.val || '请选择'}}</div>
        <img src alt>
      </div>
    </div>
    <div>
      <div class="yin-ze">营业执照上传规则</div>
      <div class="guohui-que">
        <div>1.国徽、二维码、公章需完整，不能有缺失部分</div>
        <div>2.营业执照无水印</div>
        <div>3.清晰原件数码照，拒绝扫描件、悬挂件</div>
        <div>4.复印件需加盖公司红章</div>
        <div>5.印个执照四周边框完整，不折叠、不反光、文字清晰可见</div>
        <div>6.请提供含统一社会信用代码的新版执照</div>
        <div>7.请核对匹配信息是否正确</div>
      </div>
    </div>

    <div class="zhu-ji">注：认证通过后，企业将带带有V企业标记</div>
    <div class="tijiao-shenhe" @click="tijiaoshenghe">提交审核</div>

    <!--底部弹窗规模-->
    <mt-popup v-model="popupVisible" position="bottom" class="guimo" :class="[nowIndex == 1 ? 'hangyegaodu' :'']">
      <div>
        <div class="qiyequque">
          <div>取消</div>
          <div @click="qinxuanze">确定</div>
        </div>
      </div>
      <div>
        <div class="cto" >
          <div class="gsguimoxiangwarp">
            <div class="gsguimoxiang"   @click="getbianse(index,item)"
             :class="[checkid==index ? 'gongsibeise':'']"
              v-for="(item,index) in guimo" :key="index" >{{item.name}}</div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<style>
.hangyegaodu{
  height: 12.5rem /* 200/16 */;
}
.gongsibeise{
    background-color: #fff3d8;
}
.qiyequque {
  display: flex;
  justify-content: space-between;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  padding: 0.625rem /* 10/16 */ 0;
}
.gsguimoxiangwarp {
  height: 12.5rem /* 200/16 */;
  overflow-y: auto;
}
.gsguimoxiang {
  padding: 0.625rem /* 10/16 */ 0;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #333333;
  text-align: center;
  /* background-color: #fff3d8; */
}
.guimo {
  width: 100%;
  /* height: 30%; */
}
.shengheft {
  color: #333333 !important;
}
.zhu-ji {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: #eb5e5e;
}
.yin-ze {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.guohui-que {
  padding-bottom: 100%;
}
.guohui-que div {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.dian-zhao {
  padding-top: 3%;
  text-align: center;
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 207, 97, 1);
}
.dian-zhao img {
  width: 0.75rem /* 12/16 */;
  height: 0.75rem /* 12/16 */;
}
.wode-qiye-head {
  height: 2.75rem /* 44/16 */;
  display: flex;
  justify-content: space-between;
}
.wode-qiye-head img {
  width: 0.6875rem /* 11/16 */;
  height: 1.25rem /* 20/16 */;
  background-color: red;
}
.wode-qiye-head-cent {
  text-align: center;
}
.wode-qiye-head-cent img {
  width: 8.875rem /* 142/16 */;
  height: 12.3125rem /* 197/16 */;
}
.wode-qiye-head {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.tijiao-shenhe {
  width: 100%;
  position: fixed;
  bottom: 0.4375rem /* 7/16 */;
}
.wode-qiye-rit div {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-right: 0.75rem /* 12/16 */;
}
.wode-qiye-cent-c {
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.wode-qiye-rit {
  display: flex;
  align-items: center;
}
.wode-qiye-rit img {
  width: 0.5625rem /* 9/16 */;
  height: 0.9375rem /* 15/16 */;
  border: 1px solid red;
}
.wode-qiye-head {
  text-align: center;
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
}
.wode-qiye-cent {
  display: flex;
  justify-content: space-between;
  padding: 1.25rem /* 20/16 */ 0 1.25rem /* 20/16 */ 0;
}
.tijiao-shenhe {
  height: 2.25rem /* 36/16 */;
  border-radius: 1.125rem /* 18/16 */;
  color: white;
  background-color: #ffb31e;
  line-height: 2.25rem /* 36/16 */;
  text-align: center;
}
</style>

<script>
import Vue from 'vue'
// import yinyeimgs from '../../image/scsc'
import { Popup } from 'mint-ui'

Vue.component(Popup.name, Popup)
export default {
  data () {
    return {
      popupVisible: false,
      zhizhaodivs: false,
      zhizhaodiv: true,
      shenghecolor: '',
      zhizhao: 'true',
      yingyezz: '点击上传营业执照',
      shenghez: '审核中',
      renzhencg: '认证成功',
      weitonguo: '未通过',
      twre: [{ text: '公司规模' }, { text: '企业性质' }, { text: '所在行业' }],
      guimo: [],
      nowIndex: 0, // 0,1,,2代表三种数据嗯shishi
      checkid: 0,
      qingxuanze: '请选择'

    }
  },
  methods: {
    qinxuanze () {
      this.twre[this.nowIndex].val = this.guimo[this.checkid].name //
      this.popupVisible = false
    },
    getbianse (index, item) {
      this.checkid = index
      this.qingxuanze = item.name
    },
    setshijian (index) {
      //   if (index == 0) {
      //     this.getguimo()
      //   }
      //   debugger
      switch (index) {
        case 0 :this.getguimo()
          break
        case 1 :this.getxingzhi()
          break
        case 2:this.getindustry()
      }
    },
    tijiaoshenghe () {
      this.zhizhaodiv = false
      this.zhizhaodivs = true
      this.zhizhao = false
      this.yingyezz = this.shenghez
      this.$router.push({path: '/index/wodeele'})
    },

    getguimo (a) {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'post',
        url: 'apis/v1/seller/auth-info',
        data: {},
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        this.popupVisible = true
        this.guimo = p.data.data.size
        this.nowIndex = 0
      })
    },
    getxingzhi (b) {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'post',
        url: 'apis/v1/seller/auth-info',
        data: {},
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        this.popupVisible = true
        this.guimo = p.data.data.nature
        this.nowIndex = 1
        // console.log('lx', p)
        // debugger
        // console.log('申请成功', p)
      })
    },
    getindustry (c) {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'post',
        url: 'apis/v1/seller/auth-info',
        data: {},
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        this.popupVisible = true
        this.guimo = p.data.data.industry
        this.nowIndex = 2
        // console.log('lx', p)
        // debugger 试试
        // console.log('申请成功', p)
      })
    }
  }
}
</script>
