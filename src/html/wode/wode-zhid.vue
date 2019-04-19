<template>
    <div>
        <div class="wode-zhid-head">
          <img src="../../image/Path .png" alt="" @click="gozhidqian">
          置顶
          <div></div>
        </div>
        <tujian :typeId="type" :showNum='showNum'></tujian>
        <div class="zhid-chang">置顶时长</div>
        <div  @click="change(item)" class="wode-zhid" v-for="(item,index) in five" :key="index">
            <div>{{item.score}}天</div>
            <div>{{item.score}}积分</div>
             <div class="zhid-yuan" >
                <div class="zhid-yuan-in" v-if="item.id !== checkId"></div>
                <img src="../../image/a.png" alt=""  v-else>
            </div>
        </div>
        <div class="dang-fen">当前积分：<div class="dang-cout">50</div></div>
        <div class="zhid-qued" @click="sure">
          确定
        </div>
    </div>
</template>

<script>
import tujian from '../../components/tuijian-cont'
import { Toast } from 'vant'
export default {
  data () {
    return {
      type: 1,
      showNum: 2,
      five: [
        {
          score: 10,
          id: 1
        },
        {
          score: 20,
          id: 2
        }, {
          score: 30,
          id: 3
        }
      ],
      checkId: 0,
      days: null,
      yuan: true,
      circ: false
    }
  },
  methods: {
    sure () {
      let id = this.checkId
      let days = this.days
      this.$store
        .dispatch('setZhiD', {id, days})
        .then(({ data }) => {
          if (data.error_code === 400) {
            Toast(data.message)
          }
        })
    },
    getjifen () {
      // this.$store.
    },
    gozhidqian () {
      this.$router.back(-1)
    },
    yuanin () {
      this.yuan = false
      this.circ = true
    },
    circl () {
      this.circ = false
      this.yuan = true
    },
    change (item) {
      this.checkId = item.id
      this.days = item.score
    }

  },
  components: {
    tujian
  }
}
</script>

<style>
    .wode-zhid-head{
      display:flex;
      align-items: center;
      height: 2.75rem /* 44/16 */;
      background-color: #FFB31E;
      justify-content: space-between;
    }
    .wode-zhid-head img{
      width:.625rem /* 10/16 */;
      height: 1.0625rem /* 17/16 */;
    }
    .zhid-qued{
      font-size:.9375rem /* 15/16 */;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      border-radius: 1.125rem /* 18/16 */;
      background-color: #FFB31E;
      height: 2.25rem /* 36/16 */;
      text-align: center;
      line-height: 2.25rem /* 36/16 */;
      position:fixed;
      bottom: .4375rem /* 7/16 */;
      width:100%;
    }
    .dang-fen{
        display:flex;
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(235,94,94,1);
    }
    .zhid-chang{
      font-size:1rem /* 16/16 */;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(33,33,33,1);
      padding-bottom: 8%;
    }
    .shouYe-cent-rigt div:nth-child(2){

    }
    .wode-zhid-head{
      font-size:1.125rem /* 18/16 */;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(33,33,33,1);
       display:flex;
    }
    .shouYe-rigt-top{
      font-size:.8125rem /* 13/16 */;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .shouYe-cent-left div img{
      height: 3.9375rem /* 63/16 */;
    }
    .shouYe-cent{
      display: flex;
      justify-content: space-between;
    }
    .zhid-yuan-in{

        border-radius: 50%;
        border:1px solid #999999;
        width:1.5rem /* 24/16 */;
        height: 1.5rem /* 24/16 */;
    }
    .zhid-yuan{

    }
    .zhid-yuan img{

       width:1.5rem /* 24/16 */;
       height: 1.5rem /* 24/16 */;
    }
    .wode-zhid{
        justify-content: space-between;
        display:flex;
        height:1.5rem /* 24/16 */;
        margin-bottom: 1rem;
    }
</style>
