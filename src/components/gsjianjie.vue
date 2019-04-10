<template>
    <div>
        <div>
            <div :class="[showAll ? 'showAllJianJie' : 'gsjianjie']">
                龙湖冠寓，是面向新时代人群，租住生活形
                态及消费升级需求推出-集中式长租公寓“秉承
                我家自在”的品牌主张
                ，全新定义租住生活面向新时代人群，
                租住生活形态及消费升级需求推出-集中式长租公
                寓“秉承我家在在...
                 龙湖冠寓，是面向新时代人群，租住生活形
                态及消费升级需求推出-集中式长租公寓“秉承
                我家自在”的品牌主张
                ，全新定义租住生活面向新时代人群，
                租住生活形态及消费升级需求推出-集中式长租公
                寓“秉承我家在在...
            </div>
            <div class="cha-xj" @click="setZhankai">
                <!-- 收起文字自己想一下 -->
                <div class="cha-bu" >{{showAll ? '收起' : '展开全部'}}</div>
                <img src="../image/xjttt.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      showAll: false // 是否展开全部
    }
  },
  beforeRouterEnter (next) {
    next((vm) => {
      // 设置每次进入都是默认关闭
      vm.showAll = false
    })
  },
  methods: {
    setZhankai () {
      this.showAll = !this.showAll
    }
  }
}
</script>

<style>
.cha-xj img{
    width:.5rem /* 8/16 */;
    height: .4375rem /* 7/16 */;

}
.showAllJianJie{
    padding-top:5%;
    min-height: 21%;
}
.gsjianjie{
    padding-top:5%;
    height: 21%;
    overflow: hidden;
}
.cha-bu{
    font-size:.6875rem /* 11/16 */;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
}
.cha-xj{
    display:flex;
    justify-content: center;
     align-items: center;
     padding-top:2%;
}
</style>
