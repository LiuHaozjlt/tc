<template>
  <div>
    <!-- <div></div> -->
    <!-- {{menudata}} -->
    <router-link tag='div' to="/fabupeop"  class="fabuyuand">
      <div v-for="(item,index) in menudata" :key="index" class="routerItem">
        <div class="fabu-cent">
            {{item.name}}
        </div>
      </div>
    </router-link>
    <div class="xuan-bie">选择发布类别</div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['menudata'])
  }
}
</script>

<style>
  .fabuyuand{
    /* flex布局 差不多就行吧，有底部还要选择类型完全居中很怪嗯*/
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap:wrap;
    height: 80vh;
  }
  .routerItem{
    width: 50%;
    text-align: center;
  }
  .xuan-bie{
    font-size:.875rem /* 14/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
    position: fixed;
    bottom: 15%;
    right: 35%;
  }
  .fabu-cent{
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
</style>
