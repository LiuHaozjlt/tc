<template>
    <div>
        <div>企业招聘</div>
        <!-- <div>{{myrelease}}</div> -->
        <div  v-for="(item,index) in seller " :key="index">
            <!-- {{myrelease}} -->
            <div class="pinpai-cent">
                <div class="fang-icon">
                      <img :src="item.img">
                </div>
                <div>
                    <div class="gongsi">丐萝贸易公司</div>
                    <div class="gon-yuan">共有{{item.seller_release_id}}套房源</div>
                </div>
                <div>
                    <div>v企业</div>
                    <div>ssssfafsf</div>
                </div>
            </div>
            <div class="pinpai-cent-bot">
                <div>
                    <div class="pinp-cent-top">进装修意识一套</div>
                    <div class="kip">5.000.000</div>
                    <div class="pinp-cent-bot"><img src="" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      seller: []
    }
  },
  created () {
    let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
    this.axius({
      methods: 'get',
      url: 'apis/v1/user/seller',
      data: {
        release_type_id: 11111
        //  title: 99,
        //  describe: 555,
        //  mobile: 3333,
        //  code: 4,
        //  address: '长沙',
        //  img: 3,
        //  is_trans: 1,

        // xh: 86,
        // user_address_id: 0
      },
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(p => {
    //    debugger
      this.seller = p.data.data
      // console.log('企业招聘', p.data.data)
    })
  },
  methods: {
    getchanpxq () {

    }

  }
}
</script>

<style>
  .pinp-cent-bot img{
        width:8.75rem /* 140/16 */;
        height: 6.5rem /* 104/16 */;
        background-color: aqua;
    }
    .kip{
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(235,94,94,1);
    }
    .pinp-cent-top{
        font-size:.75rem /* 12/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .pinpai-cent{
        display:flex;
        align-items: center;
        border-bottom: 1px solid #F1F1F1;
        padding-bottom: .9375rem /* 15/16 */;
    }
    .gon-yuan{
        font-size:.6875rem /* 11/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .gongsi{
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
    .fang-icon{
        width:3.375rem /* 54/16 */;
        height: 3.375rem /* 54/16 */;
        border:1px solid red;
    }
    .pinpai-head{
        position: relative;
    }
    .pinpai-head img{
        width:100%;
        height: 7.75rem /* 124/16 */;
    }
</style>
