<template>
    <div>
        <div class="pinpai-head">
            <img src="../../image/shangdian.png" alt="">
            <div class="fangdajin">
              <img src="../../image/chzhaom.png" alt="">
            </div>
            <pinpaitab :tabs="types" :active="type"></pinpaitab>
        </div>
        <pin-pai-list :release-type-id="active.release_type_id"></pin-pai-list>
    </div>
</template>
<script>
import PinPaiList from './pinpai-list'
import pinpaitab from './tab'

export default {
  components: {
    PinPaiList,
    pinpaitab
  },
  data () {
    return {
    }
  },
  computed: {
    types () {
      return this.$store.state.sellerTypes
    },
    type () {
      return this.$route.hash.substr(1) || (this.types[0] ? this.types[0].code : '')
    },
    active () {
      let type = this.type
      return this.types.find(item => item.code === type) || {}
    }
  },
  created () {
    if (this.types.length === 0) this.$store.dispatch('getSellerTypes')
  }

}
</script>

<style>
    .fangdajin{
     width: 20%;
    height: 25%;
    border-radius: 100%;

    position: absolute;
   top: 27%;
    right: -8%;
    }
    .fangdajin img{
      width:1.25rem /* 20/16 */;
      height: 1.25rem /* 20/16 */;
    }
    .pinp-cent-bot img{
        width:8.75rem /* 140/16 */;
        height: 6.5rem /* 104/16 */;
        background-color: aqua;
    }
    .kip{
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(235,94,94,1);
    }
    .pinp-cent-top{
        font-size:.75rem /* 12/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .pinpai-cent{
        display:flex;
        align-items: center;
        border-bottom: 1px solid #F1F1F1;
        padding-bottom: .9375rem /* 15/16 */;
    }
    .gon-yuan{
        font-size:.6875rem /* 11/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .gongsi{
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
    }
    .fang-icon{
        width:3.375rem /* 54/16 */;
        height: 3.375rem /* 54/16 */;
        /* border:1px solid red; */
    }
    .pinpai-head{
        position: relative;
    }
    .pinpai-head img{
        width:100%;
        height: 7.75rem /* 124/16 */;
    }
</style>
