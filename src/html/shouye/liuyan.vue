<template>
  <div>
    <mt-button size="large" @click="popup4">下侧弹出Popup</mt-button>
    <mt-popup
      v-model="popupVisible4"
      position="bottom"
      class="mint-popup-4">
       <div class="header" @click="popupVisible4=false">
         <img src="" alt="">
       </div>
       <!-- <div class="liangju">说两局在走</div>
       <div class="body liuyan-cent">
         <br>
         <br>
         <br>
         <img src="" alt="">
        </div> -->
        <div class="liuyan-item">
          <liuyanlist :list="list"></liuyanlist>
        </div>
       <mt-button class="bottom" @click="sendEvent" size="large" type="primary">
         <div class="kan-liu">
           <!-- <input type="text" placeholder="看对眼就留言，问问更多细节~"> -->
           <div style="color:black;">发送</div>
         </div>
       </mt-button>
    </mt-popup>
  </div>
</template>
<script>
import liuyanlist from '../../components/liuyan-list'
export default {
  name: 'Picker',
  data () {
    return {
      popupVisible4: false,
      list: []
    }
  },
  mounted () {

  },
  components: {
    liuyanlist
  },
  methods: {
    sendEvent () {
      // this.popupVisible4 = false
      this.false = true
      console.log('发送')
      this.list.push({id: this.list.length + 1, content: new Date().toLocaleString()})
    },
    popup4 () {
      this.popupVisible4 = true
    }
  }
}
</script>

<style scoped>
  .kan-liu input{
    border-radius: 1rem /* 16/16 */;
    height: 2.0625rem /* 33/16 */;
    font-size:.875rem /* 14/16 */;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .mint-button--primary{
    background-color:#F4F4F4!important;
  }
  .kan-liu{
    height: 3.0625rem /* 49/16 */;
    background-color:#F4F4F4;
  }
  .liuyan-cent{
    padding-bottom: 9.75rem /* 156/16 */;
  }
  .liuyan-cent img{
    height: 7.25rem /* 116/16 */;
    background-color: aqua;
  }
  .liangju{
    padding-top:7.375rem /* 118/16 */;
    text-align: center;
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
  }
  .header{
    text-align: center;
  }
  .header img{
    width:1.0625rem /* 17/16 */;
    height: .625rem /* 10/16 */;
    background-color: aqua;
  }
  .body{
    text-align: center;
  }
  .mint-popup-4{
    border-radius:15px 15px 0px 0px;
    width:100%;
    height:60%;
  }
  .bottom{
    position: fixed;
    bottom: 0;
  }
</style>
