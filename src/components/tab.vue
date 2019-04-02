<template>
  <div class="tab-warp">
    <div class="tab">
      <router-link tag="div" class="tab_nav" :class="{'active': active == item.path}"
        v-for="(item,index ) in nav" :key="index"  :to="item.path">
          <div class="tab-back"></div>
          <div class="tab-head">{{item.text}}</div>
      </router-link>
    </div>
    <!-- <div class="box1" v-if="num === 0">1</div>
    <div class="box2" v-if="num === 1">2</div>
    <div class="box3" v-if="num === 2">3</div>
    <div class="box4" v-if="num === 3">4</div>
    <div class="box5" v-if="num === 4">5</div> -->
  </div>
</template>
<script>

export default {
  data () {
    return {
      num: 0,
      nav: [
        { text: '企业招聘', path: './pinpaiqiye' },
        { text: '品牌房源', path: './pinpaifangyuan' },
        { text: '二手车商家', path: './pinpaiershouche' },
        {text: '教育机构', path: './pinpaijiaoyu'},
        {text: '土地交易', path: './pinpaitudi'}]
    }
  },
  computed: {
    active () {
      return './' + this.$route.path.split('/').pop()
    }
  },

  methods: {
    div_chan (val) {
      console.log(val)
      this.num = val
    }
  }
}
</script>
<style>
.tab-head{
  font-size:.8125rem /* 13/16 */;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(255,255,255,1);
}
.tab-back{
  /* height: .75rem /* 12/16 */
}
.tab-warp{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width:100%;
}
.tab {
  display: -webkit-box;
}
.tab_nav {
  flex: 3;
  padding: 0;
  line-height: 16px;
  /* border: 1px solid red; */
  text-align: center;
}
.tab_nav.active{
  border-bottom: 2px solid white;
}
.box1,
.box2,
.box3,
.box4,
.box5{
  margin-top:.75rem /* 12/16 */;
  width: 100%;
  background: red;
  /* height: 300px; */
  line-height: 300px;
  text-align: center;
  position: absolute;
  border-radius: .625rem /* 10/16 */;
}
.box1 {
  z-index: 1;
}
.box2 {
  z-index: 2;
}
.box3 {
  z-index: 3;
}
@media screen and (max-width: 700px) {
  .tab_nav {
    /* border: 2px solid black; */
  }
}
.active{

}
</style>
