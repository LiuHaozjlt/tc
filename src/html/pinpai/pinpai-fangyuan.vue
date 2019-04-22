<template>
    <div>
        <div>
            <div class="shangjia">品牌房源</div>
        </div>

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
    return {}
  },
  methods: {

  },
  created () {
    let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
    this.axius({
      methods: 'post',
      url: 'apis/v1/upload/image',
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
        'Authorization': 'Bearer ' + token
      }
    }).then(p => {
      // debugger
      console.log('图片上传', p.data.data)
    })
  }
}
</script>
