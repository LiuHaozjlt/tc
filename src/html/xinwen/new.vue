<template>
    <div>
        <slide :list="slideList"></slide>
        <!-- {{article}} -->
        <div style="background-color:#F5F5F5;" v-for="(item,index) in article" :key="index">
            <div style="background-color:white;margin-bottom:7px" @click="xinxiangqin(item.id)">
                <div>
                    <div class="new-cent" :class="{'new-cent-cent':index!= 0}">
                        {{item.title}}
                    </div>
                    <div class="new-cent-botm">
                            <div class="new-cent-lef new-cent-lef-rit">
                                <img src="" alt="">
                                <div style="display:inline-block">{{item.comment_count}}万</div>
                            </div>
                        <div class="new-cent-rit">
                            官方
                        </div>
                    </div>
                    <div class="new-bot-head" v-if="index > 0">
                        <img :src="item.front_img" alt="">
                        <img :src="item.front_img" alt="">
                        <img :src="item.front_img" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import slide from '../../components/slide'
export default {
  data () {
    return {
    //   curSwiper: 1
      article: [],
      articimg: false,
      slideList: []
    }
  },
  created () {
    let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
    this.axius({
      methods: 'get',
      url: '/apis/v1/article',
      params: {
        // is_recommend: 0
      },
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(p => {
    //   debugger
      this.article = p.data.data
      this.slideList = this.article.filter(item => item.is_recommend == 1).map(item => item.front_img)
      // console.log('new', p.data.data)
    })
  },
  components: {
    slide
  },
  methods: {
    xinxiangqin (id) {
      this.$router.push({
        path: '/newxiangqin?id=' + id
      })
    },
    swipervalue () {
      this.$emit('swiperList')
    }

  },
  mounted () {
    // this.swiperList()
  }
}
</script>

<style>
  .mint-swipe-indicators{
    display:none;
  }
    .mint-swipe-item img{
      width:100%;
    }
    .new-cent{
        padding-top:.8125rem /* 13/16 */;
    }
    .new-cent-cent{
        padding-top:.9375rem /* 15/16 */;
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .new-cent-botm{
        justify-content: space-between;
        display:flex;
        align-items: center;
        padding:.8125rem /* 13/16 */ 0 .8125rem /* 13/16 */ 0;
    }
    .mint-swipe{
        height: 30%;
        text-align: center;
    }
    .new-cent-bot{
        display:flex;
        justify-content: space-between;
        align-items: center;
        line-height: 0px;
        padding-top: .75rem /* 12/16 */;
    }
    .new-cent-lef{
        /* line-height: 0;
        padding-top:.8125rem /* 13/16 */
        display: flex;
        align-items: center;
    }
     .new-bot-head{
        display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: .9375rem /* 15/16 */;
    justify-content: space-between;

     }
    .new-bot-head img{
      width: 30%;
    height: 5.375rem /* 86/16 */;
    display: inline-block;
    -webkit-box-flex: 1;
    /* -ms-flex: 1;
    flex: 1 /* flex:1 1 auto;;; */

    }

    .new-bot-head img:nth-child(3){
        /* margin-right: 0; */
    }
    /* .new-bot-head img:nth-child(2){
        margin:0 .4375rem /* 7/16;
    } */
</style>
