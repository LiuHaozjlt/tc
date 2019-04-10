<template>
    <div>
        <div>
             <div class="shouYe-cent" v-for="(item,index) in list" :key="index" @click="select(item)">
                <div class="shouYe-cent-left">
                    <div>
                        <!-- <img :src=" "> -->
                    </div>
                </div>
                <div class="shouYe-cent-rigt">
                    <div class="rigt-wenzi shouYe-rigt-top">{{item.title}}</div>
                    <div class="rigt-wenzi wanxiang" style="text-align:right">{{item.describe}}</div>
                    <div class="shouYe-rigt-bot">
                        <div
                        class="rigt-wenzi "
                        style="display:inline;background-color:#FFC74D;text-align:center"
                        > </div>
                        <div class="rigt-wenzi" style="display:inline">
                            <!-- <img :src=" " alt> -->
                        </div>
                        <div class="rigt-wenzi" style="display:inline">{{item.comment_count}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data () {
    return {
      // fabuTypeData: []
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    select (type) {
      this.$emit('select-type', type)
    }
  }
}
</script>

<style>
.rigt-ft{
  font-size: .6875rem /* 11/16 */;
}
.wanxiang {
  padding-top: 0.5rem /* 8/16 */;
  padding-bottom: 0.5rem /* 8/16 */;
}
.tuiJian {
  margin-top: 0.8125rem /* 13/16 */;
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
}
.tong-new-warp {
  display: flex;
  align-items: center;
  background: rgba(255, 199, 77, 1);
}
.tong-new-warp img {
  width: 0.375rem /* 6/16 */;
  height: 0.6875rem /* 11/16 */;
  border: 1px solid red;
}
.tong-new {
  font-size: 1.0625rem /* 17/16 */;
  font-family: FZCTHJW--GB1-0;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  flex: 0 0 auto;
  padding-right: .75rem /* 12/16 */;
}
.gundong {
  height:3.125rem /* 50/16 */;
  width: 100%;
  overflow: hidden;
  /* border:1px solid red; */
}
.van-swipe__indicators,.van-swipe__indicators--vertical{
  display: none!important;
}
.index-menu-warp {
  display: flex;
  flex-flow: wrap;
}
.index-menu {
  width: 25%;
  margin-top: 2.625rem /* 42/16 */;
  text-align: center;
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.shouYe-head-top {
  position: relative;
}
.shouYe-head-top img {
  height: 7.4375rem /* 119/16 */;
  width: 100%;
}
.shouYe-head img {
  width: 100%;
  height: 7.4375rem /* 119/16 */;
}
.shouYe-head-cent {
  /* position: relative; */
}
.shouYe-head-cent input {
  box-shadow: 0px 0px 12px 0px rgba(132, 132, 132, 0.1);
  top: 100px;
  position: absolute;
  text-align: center;
  /* margin-bottom: 20px; */
  /* left: 5%;
  width: 90% !important; */
}
.shouYe-cent-top-box {
  height: 100%;
  margin-top: 2.5rem /* 40/16 */;
}
.shouYe-cent-top-warp {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* margin-top: 1.5625rem /* 25/16 */ /* 12/16 */
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  justify-content: space-between;
}
.shouYe-cent-top {
  /* width: 25%; */
  /* border: 1px solid red; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column wrap;
  flex-flow: column wrap;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.shouYe-cent-top-cont {
  width: 25%;
}
.shouYe-cent-top-warp {
}
.shouYe-cent {
  display: flex;
  border-bottom: 1px solid #ededed;
  /* border: 1px solid red; */
  padding: 1.25rem 0;
}
.shouYe-cent-left {
  margin-right: 0.625rem; /* 10/16 */
}
.shouYe-cent-left img {
  display: inline-block;
}
.shouYe-rigt-top {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.shouYe-cent-rigt {
  line-height: 0.875rem /* 14/16 */;
}
.shouYe-cent-rigt > span {
  display: inline-block;
}

.shouYe-cent-rigt > span:nth-child(2) {
  width: 100%;
  text-align: right;
}
.shouYe-rigt-bot {
  display: flex;
  justify-content: space-between;
}
.rigt-wenzi {
  font-size: .6875rem /* 11/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.rigt-wenzi img {
  margin-right: 0.1875rem /* 3/16 */;
}
.shouYe-nav-warp {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: #f8f8f8;
}

</style>
