<template>
    <div>
        <div  v-for="(item,index) in list " :key="index" class="pinpaishop" @click="gopinpaishangjiaxq">
            <div class="pinpai-cent">
                <div class="fang-icon">
                      <img :src="item.img">
                </div>
                <div>
                    <div class="gongsi ershouchetop">{{item.name}}</div>
                    <div class="gon-yuan">共有{{item.SellerReleaseInfo.length}}{{units[releaseTypeId]}}</div>
                </div>
                <div>
                    <div class="vqiye">v企业</div>
                    <div></div>
                </div>
            </div>
            <div class="pinpai-cent-bot" v-if="item.SellerReleaseInfo.length > 0">
                <div v-for="release in item.SellerReleaseInfo" :key="release.seller_release_id">
                    <div class="pinp-cent-top">{{release.title}}</div>
                    <div class="kip">
                      <template v-if="release.prices !== undefined">{{release.prices}}</template>
                      <template v-else>{{release.recruit_prices_start}}-{{release.recruit_prices_end}}</template>
                      {{release.prices_unit}}
                    </div>
                    <div class="pinp-cent-bot" v-if="release.img"><img :src="release.img" alt=""></div>
                </div>
            </div>
        </div>
        <div v-if="list.length === 0">暂无数据</div>
    </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  props: {
    releaseTypeId: [String, Number]
  },
  data () {
    return {
      cache: {},
      units: {
        1: '个热招职位',
        2: '套房源',
        3: '辆车',
        4: '门热门课程',
        5: '块地皮'
      }
    }
  },
  computed: {
    list () {
      console.log(this.releaseTypeId)
      return this.cache[this.releaseTypeId] || []
    }
  },
  watch: {
    releaseTypeId: {
      handler () {
        this.getList()
      },
      immediate: true
    }
  },
  methods: {
    getList () {
      if (this.cache[this.releaseTypeId]) return
      this.$store.dispatch('getSellers', {
        release_type_id: this.releaseTypeId
      }).then(({data}) => {
        if (data.error_code === 0) {
          this.$set(this.cache, this.releaseTypeId, data.data || [])
        } else {
          Toast(data.message)
        }
      })
    }

  }
}
</script>

<style>
.ershouchetop{
  width:100%;
}
.vqiye{
  font-size:.6875rem /* 11/16 */;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(177,104,0,1);
background-color:#FFC74D;

}
.pinpaishop{
  margin-bottom: 5%;
}
 .fang-icon img{
    width:3.375rem /* 54/16 */;
    height: 3.375rem /* 54/16 */;
    border-radius:100%;
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
        margin-right: 3%;

    }
    .pinpai-head{
        position: relative;
    }
    .pinpai-head img{
        width:100%;
        height: 7.75rem /* 124/16 */;
    }
    .pinpai-cent-bot{
      display:flex;
      justify-content: space-between;

    }
</style>
