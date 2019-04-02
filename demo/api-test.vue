<template>
    <div>
      <!-- <div class="element"    @click="getqinqiu"></div> -->

      <div   class="el" @click="duanxing"></div>
      <!-- <van-uploader :after-read="onRead">
        <van-icon name="photograph" />
      </van-uploader> -->
        <!-- {{shouyevalue}} -->
    </div>
</template>

<style>
  .el{
    width:200px;
    height: 200px;
    background-color: black;
  }
  .element{
  width:200px;
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
      // shouyevalue: []
      //       type	是	int	登录方式 (1账号密码登录)
      // mobile	是	string	手机号
      // password	是	string	密码
    }
  },
  methods: {
    // onRead (file) {
    //   console.log(file)
    // },

    duanxing () {
      console.log('dx')
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'post',
        url: 'apis/v1/seller/my-release-create',
        data: {
          // recommend: 1

          // upimage:
          // release_type_id: 444444,
          // name: '小米',
          // img: 3,
          // info: '我是刘德华'

          title: '小米',
          introduce: '费大幅度发',
          mobile: '11111111111',
          user_address_id: 2

          // describe: 555,
          // mobile: 3333,
          // code: 4,
          // address: '长沙',

          // is_trans: 1,

          // xh: 86,
          // user_address_id: 0
        },
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(p => {
        debugger
        console.log('lx', p)
        // debugger
        // console.log('申请成功', p)
      })
    // this.axius.post('/apis/v1/logistic', {
    //   goods_type_id: 444444,
    //   weight: 99,
    //   send_address_id: 555,
    //   receive_address_id: 3333,
    //   receive_time: 4,
    //   headers: {
    //     //         'Authorization': 'Bearer ' + token
    //   }}
    // ).then(p => {
    // // debugger
    //   console.log(p.data)
    // })
    },
    getqinqiu () {
      console.log('getqinqiu')
      let me = this
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      me.axius({
        methods: 'get',
        url: 'apis/v1/user/seller-status',
        data: {

          // address: '长沙',

          // is_trans: 1,

          // xh: 86,
          // user_address_id: 0
        },
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        // console.log('请求', p.data)

        if (p.data.data.status === 1) {
          me.duanxing()
        } else {

        }
        // debugger
        // console.log('申请成功', p)
      })
    // this.axius.post('/apis/v1/logistic', {
    //   goods_type_id: 444444,
    //   weight: 99,
    //   send_address_id: 555,
    //   receive_address_id: 3333,
    //   receive_time: 4,
    //   headers: {
    //     //         'Authorization': 'Bearer ' + token
    //   }}
    // ).then(p => {
    // // debugger
    //   console.log(p.data)
    // })
    }

  }

  // mounted(){
  //     this.axius
  //     console.log(this.axius)
  // }
}
</script>
