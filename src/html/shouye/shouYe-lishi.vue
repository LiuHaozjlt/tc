<template>
  <div>
    <div class="lishi-head-warp">
      <input type="text" v-model="keyword" @keyup.enter="search" placeholder="请输入关键字">

      <div class="lishi-qux" @click="cancel">取消</div>
    </div>
    <div>
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapState(['queryParam', 'queryHistory', 'queryType', 'isLaos'])
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
  }
}
</script>

<style>
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
  width: 10%;
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.lishi-head-warp input {
  font-size: 0.8125rem /* 13/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.lishi-head-warp div {
}
.lishi-head-warp {
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
</style>
