<template>
    <div style="" class="new-cont">
        <slide :list="slideList"></slide>
        <!-- {{article}} -->
        <div  v-for="(item,index) in article" :key="index">
            <div  class="new-list" style="background-color:white;margin-bottom:7px" @click="xinxiangqin(item.id)">
                <div>
                    <div class="new-cent" :class="{'new-cent-cent':index!= 0}">
                        {{item.title}}
                    </div>
                    <div class="new-cent-botm">
                            <div class="new-cent-lef new-cent-lef-rit">
                                <img src="../../image/liuyan.png" alt="">
                                <div class="wang" style="">{{item.comment_count}}万</div>
                            </div>
                        <div class="new-cent-rit">
                            官方
                        </div>
                    </div>
                    <div class="new-bot-head" v-if="index > 0">
                      <img :src="'http://info.00856.la'+src" alt="" v-for="src in item.front_img.split(',')">
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
    this.$store.dispatch('getNews').then(p => {
      this.article = p.data.data
      this.slideList = this.article.filter(item => item.is_recommend == 1).map(item => item.front_img)
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
  }
}
</script>

<style>
  .new-list{
    padding:0 1rem;
  }
  .new-cont{
    background-color:#F5F5F5;
  }
  .wang{
    display:inline-block;
    padding-left: 2%;
    width:100%;

  }
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
        width:100%;
    }
     .new-bot-head{
        display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-bottom: .9375rem /* 15/16 */;
    justify-content: space-between;

     }
    .new-bot-head img{
      width: 30%;
    height: 5.375rem /* 86/16 */;
    display: inline-block;
    /* -webkit-box-flex: 1; */
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
