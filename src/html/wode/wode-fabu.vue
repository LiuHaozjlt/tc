<template>
  <div>
    <div class="wode-fabu-head">
      <div></div>
      <div class="wo-bu">我的发布</div>
      <div class="pi-chu">批量删除</div>
    </div>
    <div>
      <div class="wode-fabu-box">
        {{me}}
        发布内容
      </div>
    </div>
    <div class="wode-fabu-cent">
      <div class="xiu-chu" v-for="(item,index) in fourmenu" :key="index">
        <div @click="getzhid(item.url)" class="xiu-chu-in">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      me: '',
      fourmenu: [
        { text: '修改' },
        { text: '刷新' },
        { text: '置顶', url: 'wodezhid' },
        { text: '删除' }
      ]
    }
  },
  methods: {
    getMe () {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'get',
        url: '/apis/v1/user/releases/me',
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
        this.me = p.data.data
        // console.log('me', p.data)
      })
    },
    getzhid (url) {
      this.$router.push({ path: url })
    }
  },
  mounted () {
    this.getMe()
  }
}
</script>

<style>
.wode-fabu-head{
  display:flex;
  justify-content: space-between;
}
.pi-chu{
  font-size:.9375rem /* 15/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
}
.wode-fabu-cent {
  display: flex;
  justify-content: space-between;

}
.wode-fabu-cent div {
  /* width:70%; */
}
.xiu-chu {
  /* width:70%; */
}
.xiu-chu-in {
  display: flex;
  height: 1.4375rem /* 23/16 */;
  line-height: 1.4375rem /* 7/16 */;
  text-align: center;
  padding:0 .5rem; /*我随便设置的  OK  */
}
.wode-fabu-head {
  font-size: 1.125rem /* 18/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(33, 33, 33, 1);
}
.shouYe-cent-left div img {
  height: 1.875rem /* 30/16 */;
}
.wode-fabu-box {
  height: 8.75rem /* 140/16 */;
  background-color: blue;
}
.xiu-chu div {
  background-color: #ffc74d;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
