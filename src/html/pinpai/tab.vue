<template>
  <div class="tab-warp">
    <div class="tab">
      <router-link tag="div" class="tab_nav" :class="{'active': active == item.code}"
        v-for="(item,index ) in tabs" :key="index"  :to="'#'+item.code">
          <div class="tab-back"></div>
          <div class="tab-head">{{item.name}}</div>
      </router-link>
    </div>

  </div>
</template>
<script>

export default {
  props: {
    tabs: Array,
    active: String
  },
  data () {
    return {
    }
  }
}
</script>

<style>

.tab-head{
  margin-bottom: 15%;
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
