<template>
    <div>
     <template  v-for="(item, index) in indexData">
            <div class="shouYe-cent" :key="index" v-if="showNum == 0  || (showNum > index)" @click="goshouyexiangq">
                <div class="shouYe-cent-left">
                    <div>
                        <img :src="item.img">
                    </div>
                </div>
                <div class="shouYe-cent-rigt">
                    <div class="rigt-wenzi shouYe-rigt-top">{{item.title}}</div>
                    <div class="rigt-wenzi wanxiang" style="text-align:right">{{item.address}}</div>
                    <div class="shouYe-rigt-bot">
                        <div
                        class="rigt-ft"
                        style="display:inline;background-color:#FFC74D;text-align:center"
                        >{{item.type.name}}</div>
                        <div class="rigt-wenzi dianzan" style="display:inline">
                            <!-- <img :src="item.imgi" alt> -->
                            {{item.num}}
                        </div>
                        <div class="rigt-wenzi" style="display:inline" :class="[typeId==1?'red':'']">{{item.created_time}}</div>
                    </div>
                </div>
            </div>
    </template>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    typeId: {
      type: Number,
      default: 0
    },
    showNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // indexData: []
    }
  },
  computed: {
    ...mapState(['indexData']) // indexData的数据哪里来的请求的地方
  },
  methods: {
    goshouyexiangq () {
      this.$router.push({path: '/shouyexq'})
    }
    // init () {
    //   let self = this
    //   var data = this.mock.mock({
    //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    //     'list|10': [
    //       {
    //         // 属性 id 是一个自增数，起始值为 1，每次增 1
    //         'id|+1': 1,
    //         'content|6': ' 办理',
    //         'type|1': '租房',
    //         'from|1': '万象',
    //         img: this.mock.Random.image('110x72', '#000000', 'png'),
    //         imgi: this.mock.Random.image('16x11', 'yellow', 'png'),
    //         'num|1-1000': 1,
    //         // 'datetime': '@datetime("yyyy-MM-dd A HH:mm:ss")'
    //         datetime: '@datetime("yyyy-MM-dd")'
    //       }
    //     ]
    //   })
    //   // // 输出结果
    //   // // console.log(data)
    //   this.mock.mock('/test', data)
    //   this.axius.get('/test').then(p => {
    //     // console.log(p)

    //     self.$store.commit('saveIndexData', p.data.list)
    //   })
    // }
  },
  // mounted(){

  //     this.indexdata = this.$store.state.getters.indexdata
  // }
  created () {
    this.$store.dispatch('getRecommendList')
  }
}
</script>
<style>
    .dianzan img{
      width:10%;
      height: .75rem /* 12/16 */;
      border:1px solid red;

    }
    .rigt-wenzi{
      color:#333333;
    }
    .red{
        color: red;
    }
    .rigt-ft{
      font-size: .6875rem /* 11/16 */;
      color:#B16800;
    }
</style>
