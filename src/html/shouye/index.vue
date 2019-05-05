<template>
  <div class="frame">
    <router-view></router-view>
     <div class="circle"></div>
    <div class="shouYe-nav-warp">
      <div class='shouYe-nav' v-for="(item, index) in tabs" :key="index">
        <router-link  :to="item.to">
          <img :src="item.icon" alt="" style="width:25px;height:25px;">
          <div :class="[pathName==item.to?'checkRoute':'nav-ft']" >{{item.label}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      pathName: ''
    }
  },
  computed: {
    isPersonal () {
      return this.$store.state.isPersonal
    },
    tabs () {
      const navPersoanl = [
        {name: 'home', label: '首页', icon: require('../../image/shouye_s.png'), to: '/index/'},
        {name: 'news', label: '新闻', icon: require('../../image/xinwen_s.png'), to: '/index/xinwen'},
        {name: 'putout', label: '发布', icon: require('../../image/fabu_s.png'), to: '/index/fabuele'},
        {name: 'brand', label: '品牌', icon: require('../../image/pingpai _s.png'), to: '/index/pinpai'},
        {name: 'mine', label: '我的', icon: require('../../image/wode_s.png'), to: '/index/wodeele'}
      ]
      const navCorp = [
        {name: 'home', label: '首页', icon: require('../../image/shouye_s.png'), to: '/index/'},
        {name: 'putout', label: '发布', icon: require('../../image/fabu_s.png'), to: '/index/fabuele'},
        {name: 'mine', label: '我的', icon: require('../../image/wode_s.png'), to: '/index/wodeele'}
      ]

      return this.isPersonal ? navPersoanl : navCorp
    }
  },
  watch: {
    '$route': 'checkRouter'
  },

  methods: {
    checkRouter (val) {
      // debugger
      this.pathName = val.path
    }
  }

}
</script>
<style scoped>
.circle{
    width: 3rem;
    height: 3rem;
    border: 1px solid #ddd;
    border-radius: 50%;
    position: fixed;
    bottom: 0.4rem;
    left: 50%;
    margin-left: -1.5rem;
    z-index: 0;
}
.checkRoute{
  font-size:.625rem /* 10/16 */;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(168,168,168,1);
}
.nav-ft{
  font-size:.625rem /* 10/16 */;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(168,168,168,1);
}
.frame {
  padding-bottom: 60px;
}

.shouYe-head-top{
  position: relative;
}
.shouYe-head-top img{
  height: 7.4375rem /* 119/16 */;
  width:100%;
}
.shouYe-head img{
  width:100%;
  height: 7.4375rem /* 119/16 */;
}
.shouYe-head-cent{
   /* position: relative; */
}
.shouYe-head-cent input{
  top: 100px;
  position: absolute;
  border:1px solid red;
  text-align: center;
  /* margin-bottom: 20px; */
  left:5%;
  width:90%!important;

}
.shouYe-cent-top-box{
  margin-top: 2.5rem /* 40/16 */;
}
.shouYe-cent-top-warp{
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
  /* border: 1px solid red; */
  /* margin-top: 1.25rem; 20/16 */
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
  line-height: 1.125rem /* 18/16 */
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
  font-size: 0.8125rem /* 13/16 */ /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.shouYe-nav-warp{
  width:100%;
  position:fixed;
  bottom:0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: #F8F8F8;
}
.checkRoute{
  color:#333333 !important
}

</style>
