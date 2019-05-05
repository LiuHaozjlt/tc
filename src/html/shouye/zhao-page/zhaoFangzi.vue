<template>
  <div>
    <div class="zhao-left">
      <img src="../../../image/dajiantou.png" alt @click="back">

    </div>
    <div class="shouye-souc-head">
      <img src="@/image/zufangzi.png" alt>
    </div>
    <!--地址二级联动-->
    <zhaoipt
      @search="onChangeKeyword"
      :value="queryParam.search"
    ></zhaoipt>
    <div class="shouye-sec-guj" v-show="queryList.length > 0">
      <div>
        <div v-show="queryParam.search !== '' || queryType">
          "{{queryParam.search}}
          <span v-if="queryType">{{queryType.name}}</span>"下
        </div>共有
        <div>{{queryTotal}}</div>条搜索信息
      </div>
    </div>
    <fubuType @select-type="onTypeChange" :list="queryList"></fubuType>
    <kongtishi v-show="queryList.length === 0"></kongtishi>
    <!--右边的我要求职-->
    <div class="woqiuzhi" v-if="queryParam.release_type_id == 1">
      我要求职
    </div>
  </div>
</template>

<script>

import fubuType from '../../../components/fubuType'
import kongtishi from '../../../components/kongtishi'
import zhaoipt from '@/components/zhao-ipt.vue'
import RegionPicker from '../../../components/RegionPicker'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Toast } from 'vant'
export default {
  components: {
    zhaoipt,
    kongtishi,
    fubuType,

    RegionPicker
  },
  data () {
    return {
      releaseTypes: [] // 类型的一些参数。如背景图片
    }
  },
  computed: {
    ...mapState([
      'queryParam',
      'menuData',
      'queryList',
      'queryTotal',
      'queryType'
    ])
  },
  created () {
    if (this.queryList.length === 0) {
      let { keyword, releaseTypeId } = this.$route.query

      this.updateQueryParam({
        search: keyword,
        release_type_id: releaseTypeId
      })

      this.search()
    }
  },
  methods: {
    ...mapMutations([
      'updateQueryParam',
      'addQueryHistory',
      'addQueryList',
      'setQueryTotal'
    ]),
    ...mapActions(['getReleases']),
    search () {
      this.getReleases(this.queryParam).then(({ data }) => {
        if (data.error_code === 0) {
          this.addQueryList(data.data || [])
          this.setQueryTotal(data.total || this.queryList.length)
        } else {
          Toast('请求出错了')
        }
      })
    },
    onChangeKeyword (search) {
      this.updateQueryParam({ search })
      this.search()
    },
    back () {
      this.$router.back()
      this.updateQueryParam({
        region_lv2: undefined,
        region_lv3: undefined,
        page: 1
      })
      this.addQueryList(-1)
      this.setQueryTotal(0)
    },
    onTypeChange (type) {
      // console.log(type)
    }
  }
}
</script>

<style>
.woqiuzhi{
  width:40%;
  height:1.75rem /* 28/16 */;
  background-color: #B2B2B2;
  color:white;
  font-size:.875rem /* 14/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(255,255,255,1);
position: absolute;
    right: 0;
    bottom: 9%;
    color:white;
    border-radius: .875rem /* 14/16 */ 0 0 .875rem /* 14/16 */;
    text-align: center;
    line-height: 1.75rem /* 28/16 */
}
.shouye-sec-guj{
  /* margin-top:30%; */
      margin-top: 15%;
}
.zhao-left {
  position: absolute;
  top: 3%;
  z-index: 8888;
}
.zhao-left img {
  margin: 0 0 0 56%;
  width:1.375rem /* 22/16 */;
  height: .9375rem /* 15/16 */;
  z-index: 99999;
}
.shouye-cent-girl {
  text-align: center;
  padding-top: 10%;
}
.shouye-kong-con {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.shouye-no {
  padding-top: 5%;
}
.shouye-no img {
  height: 5.8125rem /* 93/16 */;
}
.shouye-sec-guj div {
  display: flex;
  font-size: 0.6875rem /* 11/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.shouYe-head-cent {
}
.shouye-souc-head {
  position: relative;
}
.shouye-souc-head img {
  height: 7.4375rem /* 119/16 */;
  width:100%;
}
</style>
