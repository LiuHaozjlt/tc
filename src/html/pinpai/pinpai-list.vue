<template>
  <div class='pinpai-content'>
    <div v-for="(item,index) in list " :key="index" class="pinpaishop">
      <!--跳转到logo详情-->
      <div class="pinpai-cent" @click="gopinpaishangjiaxq(item)">
        <div class="fang-icon">
          <img :src="'http://info.00856.la'+item.img">
        </div>
        <div>
          <div class="gongsi ershouchetop">{{item.name}}</div>
          <div class="gon-yuan">共有{{(item.SellerReleaseInfo || []).length}}{{units[releaseTypeId]}}</div>
        </div>
        <div>
          <div class="vqiye">v企业</div>
          <div></div>
        </div>
      </div>
      <!--跳转到产品详情-->
      <div class="pinpai-cent-bot" v-if="(item.SellerReleaseInfo || []).length > 0">
        <div
          v-for="release in item.SellerReleaseInfo"
          :key="release.seller_release_id"
          @click="gochanpxiangq(release.seller_release_id)"
        >
          <div class="pinp-cent-top">{{release.title}}</div>
          <div class="kip">
            <template v-if="release.prices !== undefined">{{release.prices}}</template>
            <template v-else>{{release.recruit_prices_start}}-{{release.recruit_prices_end}}</template>
            {{release.prices_unit}}
          </div>
          <div class="pinp-cent-bot" v-if="release.img">
            <img :src="release.img" alt>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.length === 0">暂无数据</div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  props: {
    releaseTypeId: [String, Number]
  },
  data () {
    this.units = {
      1: '个热招职位',
      2: '套房源',
      3: '辆车',
      4: '门热门课程',
      5: '块地皮'
    }
    return {
      cache: {}
    }
  },
  computed: {
    list () {
      // console.log(this.releaseTypeId)
      return this.cache[this.releaseTypeId] || []
    }
  },
  watch: {
    releaseTypeId: {
      handler (id) {
        id && this.getList()
      },
      immediate: true
    }
  },
  methods: {
    gopinpaishangjiaxq ({seller_id}) {
      this.$router.push({ path: '/pinpaishangjiaxq', query: {seller_id} })
    },
    gochanpxiangq (seller_release_id) {
      this.$router.push({ path: '/pinpaichanpxq', query: {seller_release_id}})
    },
    getList () {
      if (this.cache[this.releaseTypeId]) return
      this.$store
        .dispatch('getSellers', {
          release_type_id: this.releaseTypeId
        })
        .then(({ data }) => {
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
.ershouchetop {
  width: 100%;
}
.vqiye {
  font-size: 0.6875rem /* 11/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(177, 104, 0, 1);
  background-color: #ffc74d;
  height: 1rem /* 16/16 */;
  line-height: 1rem /* 16/16 */
}
.pinpaishop {

  /* border: 2px solid red; */
    border-radius:.875rem /* 14/16 */;
    background:rgba(255,255,255,1);
    box-shadow: darkgrey 0px 0px 12px 0px;
     margin:0 5% 5% 5%;
}
.fang-icon img {
  width: 3.375rem /* 54/16 */;
  height: 3.375rem /* 54/16 */;
  border-radius: 100%;
}
.pinp-cent-bot img {
  width: 8.75rem /* 140/16 */;
  height: 6.5rem /* 104/16 */;
  background-color: aqua;
}
.kip {
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(235, 94, 94, 1);
}
.pinp-cent-top {
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.pinpai-cent {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 0.9375rem /* 15/16 */;
  padding-top:10px;
  padding-left: 10px;
  padding-right: 10px;
}
.gon-yuan {
  font-size: 0.6875rem /* 11/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.gongsi {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.fang-icon {
  width: 3.375rem /* 54/16 */;
  height: 3.375rem /* 54/16 */;
  margin-right: 3%;
}
.pinpai-head {
  position: relative;
}

.pinpai-cent-bot {
  display: flex;
  justify-content: space-between;
 padding: 10px 10px;
}
.pinpai-content{
    margin-top: -28px;
    position: relative;
    z-index: 1;
}
</style>
