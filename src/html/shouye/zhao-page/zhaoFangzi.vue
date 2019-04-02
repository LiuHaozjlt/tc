<template>
    <div>
        <div class="shouye-souc-head">
            <img src="@/image/zufangzi.png" alt="">
        </div>
        <zhaoipt  :type="type"></zhaoipt>
        <div>
            <!-- {{indexData}} -->
        </div>
        <div class="shouye-sec-guj">
            <div>
                <div>"两房一厅"</div>下共有<div>{{total}}</div>条搜索信息
            </div>
        </div>
        <fubuType @select-type="onTypeChange"></fubuType>
        <kongtishi v-if='fabuTypeData.length === 0'></kongtishi>
    </div>
</template>

<script>
import fubuType from '../../../components/fubuType'
import kongtishi from '../../../components/kongtishi'
import zhaoipt from '@/components/zhao-ipt.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    zhaoipt,
    kongtishi,
    fubuType
  },
  data () {
    return {
      fabuTypeData: [],
      total: 0
    }
  },
  computed: {
    type () {
      return this.$route.query.type || ''
    },
    releaseTypeId () {
      return this.$route.query.typeId
    },
    ...mapGetters([
      'indexData'
    ])
  },
  methods: {
    onTypeChange (type) {
      // console.log(type)
    },

    fabuType () {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'get',
        url: 'apis/v1/user/releases',
        params: {
          release_type_id: this.releaseTypeId,
          pageSize: 20,
          page: 1
        },
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        this.fabuTypeData = p.data.data || []
        this.total = (p.data.data || []).length
        // console.log('获取商品列表', p.data)
      })
    }
  }
}
</script>

<style>
    .shouye-cent-girl{
        text-align: center;
        padding-top:10%;
    }
    .shouye-kong-con{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .shouye-no{
        padding-top:5%;
    }
    .shouye-no img{
        height: 5.8125rem /* 93/16 */;

    }
    .shouye-sec-guj div{
        display:flex;
        font-size:.6875rem /* 11/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .shouYe-head-cent{

    }
    .shouye-souc-head{
        position: relative;
    }
    .shouye-souc-head img{
        height: 6.25rem /* 100/16 */;
    }
</style>
