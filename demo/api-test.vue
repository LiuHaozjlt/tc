<template>
  <div>
    <!-- <div class="element"    @click="getqinqiu"></div> -->

    <div class="el" @click="duanxing"></div>
    <!-- <van-uploader :after-read="onRead">
        <van-icon name="photograph" />
    </van-uploader>-->
    <!-- {{shouyevalue}} -->
  </div>
</template>

<style>
.el {
  width: 200px;
  height: 200px;
  background-color: black;
}
.element {
  width: 200px;
  height: 60px;
  background-color: aqua;
  margin-bottom: 40px;
}
</style>

<script>
import { Uploader } from 'vant'
import Vue from 'vue'

Vue.use(Uploader)
export default {
  data () {
    return {
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.getData(vm.$route.query.type)
    })
  },
  methods: {
    getData (type) {
      switch (type) {
        case '土地交易':
          console.log(1)
          // somtghing 在这里调用接口。获取数据
          // let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
          this.axius({
            methods: 'get',
            url: 'apis/v1/seller/my-release',
            data: {},
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }).then(p => {
            console.log('土地数据', p.data.data.SellerReleaseInfo)
            // console.log('lx', p)
          })
          break
        case '教育机构':
          // somtghing 在这里调用接口。获取数据
          // eslint-disable-next-line no-redeclare

          break
        case '品牌房源':

          break
        case '二手车商家':

          break
        case '企业招聘':
          // somtghing 在这里调用接口。获取数据

          break
      }
    }
    // onRead (file) {
    //   console.log(file)
    // },

    // duanxing () {
    //   // console.log('dx')
    //   let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
    //   this.axius({
    //     methods: 'post',
    //     url: 'apis/v1/seller/my-release-create',
    //     data: {
    //       title: '小米',
    //       introduce: '费大幅度发',
    //       mobile: '11111111111',
    //       user_address_id: 2
    //     },
    //     headers: {
    //       Authorization: 'Bearer ' + token
    //     }
    //   }).then(p => {
    //     debugger
    //     // console.log('lx', p)
    //   })
    // },
    // getqinqiu () {
    //   // console.log('getqinqiu')
    //   let me = this
    //   let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
    //   me.axius({
    //     methods: 'get',
    //     url: 'apis/v1/user/seller-status',
    //     data: {},
    //     headers: {
    //       Authorization: 'Bearer ' + token
    //     }
    //   }).then(p => {
    //     if (p.data.data.status === 1) {
    //       me.duanxing()
    //     } else {
    //     }
    //   })
    // }
  }

  // mounted(){
  //     this.axius
  //     console.log(this.axius)
  // }
}
</script>
