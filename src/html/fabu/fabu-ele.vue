<template>
  <div>
    <!-- <div></div> -->
    <!-- {{menudata}} -->
      <div class="fabuyuand">
      <router-link tag='div' :to="'/fabuuser?releaseTypeId=' + item.module_id" v-for="(item,index) in menudata" :key="index" class="routerItem">
        <!-- 跳到个人发布的页面 /fabupeop相应调整 -->
         <div class="fabu-cent">
            {{item.name}}
        </div>
        </router-link>
      </div>
    <div class="xuan-bie">选择发布类别</div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['menudata', 'isPersonal'])
  },
  created () {
    if (!this.isPersonal) {
      this.$router.replace('/fabupeop') // 商家发布直接跳过去发布页
    }
  }
}
</script>

<style>
  .fabuyuand{
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
    height: 15%;
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
