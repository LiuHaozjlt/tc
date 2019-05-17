<template>
  <div>
    <div class="lishi-head-warp">
      <div class="xiala-menu">
        <xialaMenu :data="menuData" :dropdownType="'list'"/>
      </div>
      <input type="text" v-model="keyword" @keyup.enter="search" placeholder="请输入关键字">
      <div class="lishi-qux" @click="cancel">取消</div>
    </div>
    <div class="lishilist">
      <div class="lishileibie">
        <span @click="$router.push('/souType')">
          搜索类别：
          <span>{{queryType ? queryType[isLaos ? "name_la" : "name"] : "全部"}}</span>
          <span>></span>
        </span>
        <span v-if="queryType" @click="setQueryType(null)">X</span>
      </div>
      <div class="lishi-sou" v-if="queryHistory.length > 0">
        <p>历史搜索</p>
        <div>
          <p
            class="lishi"
            v-for="(item, index) in queryHistory"
            :key="item.keyword"
            @click="query(item)"
          >{{ item.keyword }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import xialaMenu from '../../components/dropdown-menu'

export default {
  data () {
    return {
      keyword: '',
      dropdownText: '全部'
    }
  },
  computed: {
    ...mapState(['queryParam', 'queryHistory', 'queryType', 'isLaos', 'menuData'])
  },
  mounted () {
    this.menuData.push({
      text: '全部'
    })
  },
  methods: {
    ...mapMutations(['setQueryType', 'resetQueryParam', 'addQueryHistory']),
    search () {
      let query = {
        keyword: this.keyword,
        releaseTypeId: this.queryParam.release_type_id
      }

      this.query(query)
    },
    cancel () {
      this.resetQueryParam()
      this.setQueryType(null)
      this.$router.back()
    },
    query (query) {
      this.$router.push({
        path: '/zhaofangzi',
        query
      })
      this.addQueryHistory(query)
    }
  },
  components: {
    xialaMenu
  }
}
</script>

<style>
.lishileibie{
  padding:4% 0;
}
.lishilist{
  padding:0 5%;
}
.lishi-head-warp input{
  margin-bottom: 0!important;
  height: 1.75rem /* 28/16 */;
}
.lishi {
  font-size: 0.875rem /* 14/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.lishi-sou {
  font-size: 0.6875rem /* 11/16 */;
  padding-bottom: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.lishi-qux {
  width: 16%;
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding-left: 5%;
}
.lishi-head-warp input {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color:#999999;
  border: 0;
}
.lishi-head-warp div {
}
.lishi-head-warp {
  padding:4% 4%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lishi-head input {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

/*搜索类别样式*/
.shouYe-cent-left{
  width:30%;
  overflow: hidden;
}
.van-swipe-item {
  /* border:2px solid yellow; */
  font-size: 0.8125rem /* 13/16 */ /* 26/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  padding: 0;
  line-height:2 /* 2/16 */;
  overflow: hidden;
  text-overflow: ellipsis;

  /* height: 1.25rem 20/16 !important; */
}
.van-swipe {
   text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* height: 2.5rem 40/16; */
  /* border:2px solid red; */
}
.mint-swipe-indicators {
  display: none;
}
.wanxiang {
  padding-top: 0.5rem /* 8/16 */;
  padding-bottom: 0.5rem /* 8/16 */;
}
.tuiJian {
  margin-top: 0.8125rem /* 13/16 */;
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(51, 51, 51, 1);
}
.tong-new-warp {
  display: flex;
  align-items: center;
   background-color: #ffeec9;
}
.tong-new-warp img {
  width: 0.375rem /* 6/16 */;
  height: 0.6875rem /* 11/16 */;
  /* border: 1px solid red; */
}
.tong-new {
  font-size: 1.0625rem /* 17/16 */;
  font-family: FZCTHJW--GB1-0;
  font-weight:800;
  color: rgba(51, 51, 51, 1);
  flex: 0 0 auto;
  padding-right: .75rem /* 12/16 */;
}
.gundong {
  height:3.125rem /* 50/16 */;
  width: 100%;
  overflow: hidden;
  /* border:1px solid red; */
}
.van-swipe__indicators,.van-swipe__indicators--vertical{
  display: none!important;
}
.index-menu-warp {
  display: flex;
  flex-flow: wrap;
}
.index-menu {
  width: 25%;
  margin-top: 2.625rem /* 42/16 */;
  text-align: center;
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.shouYe-head-top {
  position: relative;
}
.shouYe-head-top img {
  height: 7.4375rem /* 119/16 */;
  width: 100%;
}
.shouYe-head img {
  width: 100%;
  height: 7.4375rem /* 119/16 */;
}
.shouYe-head-cent {
  /* position: relative; */
}
.shouYe-head-cent input {
  box-shadow: 0px 0px 12px 0px rgba(132, 132, 132, 0.1);
  top: 100px;
  position: absolute;
  text-align: center;
  /* margin-bottom: 20px; */
  /* left: 5%;
  width: 90% !important; */
}
.shouYe-cent-top-box {
  height: 100%;
  margin-top: 2.5rem /* 40/16 */;
}
.shouYe-cent-top-warp {
  position: fixed;
  bottom: 0;
  width: 100%;
  /* margin-top: 1.5625rem /* 25/16 */ /* 12/16 */
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  justify-content: space-between;
}
.shouYe-cent-top {
  /* width: 25%; */
  /* border: 1px solid red; */
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column wrap;
  flex-flow: column wrap;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.shouYe-cent-top-cont {
  width: 25%;
}
.shouYe-cent-top-warp {
}
.shouYe-cent {
  display: flex;
  border-bottom: 1px solid #ededed;
  /* border: 1px solid red; */
  padding: 1.25rem 1.25rem;
}
.shouYe-cent-left {

}
.shouYe-cent-left div img {
  display: inline-block;
  /* width:100%; */
  height: 4.625rem /* 58/16 */;
}
.shouYe-rigt-top {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 1.8125rem /* 29/16 */;
}
.shouYe-cent-rigt {
  margin-left: 3%;
  width:70%;
  line-height: 0.875rem /* 14/16 */;
}
.shouYe-cent-rigt > span {
  display: inline-block;
}

.shouYe-cent-rigt > span:nth-child(2) {
  width: 100%;
  text-align: right;
}
.shouYe-rigt-bot {
  display: flex;
  justify-content: space-between;
}
.rigt-wenzi {
  font-size: 0.8125rem /* 13/16 */ /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.rigt-wenzi img {
  margin-right: 0.1875rem /* 3/16 */;
}
.shouYe-nav-warp {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: #f8f8f8;
}
.checkRoute {
  color: red !important;
}
</style>
