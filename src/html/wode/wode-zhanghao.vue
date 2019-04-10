<template>
  <div class="wode-zhanghao-warp">
    <div class="wode-zhanghao-head">账号信息</div>
    <!-- <template> -->
    <div class="wode-zhanghao" v-for="(item,index) in four" :key="index">
      <div class="zhanghao">
        <div class="zhanghao-shouji">{{item.text}}</div>
        <div class="zhanghao-haoma">{{item.phone}}</div>
      </div>
      <div class="huanb" @click="gohuanbang">
        {{huanbang   }}
        <img src='../../image/jiantoutou.png'>
      </div>
    </div>
    <!-- </template> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      four: [
        { text: '手机  :', phone: '111111111111111' },
        { text: '微信' },
        { text: 'facebook' },
        { text: '修改密码', url: '/wodexiugai'}
      ],
      huanbang: '换绑',
      jiebang: '解绑'
    }
  },
  methods: {
    gohuanbang (url) {
      this.huanbang = this.jiebang
    }
  }
}
</script>

<style>
.zhanghao-shouji{
  /* color:#333333; */
}
.wode-zhanghao div:nth-child(1) .zhanghao-haoma{
  padding-left: 5%;
}
.wode-zhanghao-head{
  height: 2.75rem /* 44/16 */;
  line-height: 2.75rem /* 44/16 */;
}
.wode-zhanghao div:nth-child(1) {
  display: flex;
}
.wode-zhanghao-warp {
  background-color: #f5f5f5;
  height: 100%;
}
.wode-zhanghao-warp div:nth-child(2){
  border-top-left-radius: 1.125rem /* 18/16 */;
  border-top-right-radius: 1.125rem /* 18/16 */;
}
.wode-zhanghao-warp div:nth-child(5){
  border-bottom-left-radius: 1.125rem /* 18/16 */;
  border-bottom-right-radius: 1.125rem /* 18/16 */;
}
.huanb img {
  width: 0.5625rem /* 9/16 */;
  height: 1rem /* 16/16 */;
  /* border: 1px solid red; */
  margin-left: 1.375rem /* 22/16 */;
}
.wode-zhanghao {
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem /* 20/16 */ 0 1.25rem /* 20/16 */ 0;
  border-bottom: 1px solid #E7E7E7;
}
.huanb {
  align-items: center;
  display: flex;
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.zhanghao {
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.wode-zhanghao-head {
  text-align: center;
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
</style>
