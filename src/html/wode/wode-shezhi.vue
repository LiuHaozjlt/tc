<template>
    <div class="wode-shezhi">
        <div class="wode-shezhi-head" @click="towodeele">
            <img src="../../image/Path .png" alt="">
            设置
            <div></div>
        </div>
        <div  v-for="(item,index) in four" :key="index">
            <div  class="shezhi-cent" @click="gopage(item.url)">
                <div>{{item.text}}</div>
                <img src="../../image/jiantoutou.png" alt="">
            </div>
        </div>

        <div class="tuichudl" @click="tuichudl">
            退出登录
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      four: [{text: '账号信息', url: 'wodezhanghao'}, {text: '切换语言', url: 'wodeyuyan'}, {text: '意见反馈', url: 'wodeyijian'}, {text: '关于我们', url: 'wodeguanyu'}]
    }
  },
  methods: {
    towodeele () {
      this.$router.back(-1)
    },
    tuichudl () {
      this.$store.commit('logout')
      this.$router.push({path: '/dlu'})
    },
    gopage (url) {
      this.$router.push({path: url})
    }
  }
}
</script>

<style>
    .wode-shezhi-head{
        height: 2.75rem /* 44/16 */;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .wode-shezhi-head img{
        width:.625rem /* 10/16 */;
        height: 1.0625rem /* 17/16 */;

    }
    .wode-shezhi div:nth-child(2){
        border-top-left-radius: 1.125rem /* 18/16 */;
        border-top-right-radius: 1.125rem /* 18/16 */;
    }
    .tuichudl{
        height: 2.25rem /* 36/16 */;
        border-radius: 1.125rem /* 18/16 */;
        color:white;
        background-color: #FFCF61;
        line-height: 2.25rem /* 36/16 */;
        text-align: center;
        margin-top: 4.625rem /* 74/16 */;
    }
    .shezhi-cent-top{
        border-top-left-radius: .5rem /* 8/16 */!important;
        border-top-right-radius: .5rem /* 8/16 */!important;
    }

    .wode-shezhi{
        background-color: #F5F5F5;
        height: 100%;
    }
    .shezhi-cent{
        background-color: white;
        display:flex;
        justify-content: space-between;
        padding:1.25rem /* 20/16 */ 0 1.25rem /* 20/16 */ 0;
        /* border:1px solid red; */
        align-items: center;

    }
    .shezhi-cent img{
        width:.5625rem /* 9/16 */;
        height: 1rem /* 16/16 */;
    }
    .wode-shezhi-head{

        font-size:1.125rem /* 18/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(33,33,33,1);

        background-color: #FFCF61;
        margin-bottom:.9375rem /* 15/16 */;
    }
</style>
