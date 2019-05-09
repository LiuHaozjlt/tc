<template>
  <div>
    <template v-for="(item, index) in indexData">
      <div
        class="shouYe-cent"
        :key="index"
        v-if="showNum == 0  || (showNum > index)"
        @click="goshouyexiangq(item)"
      >
        <div class="shouYe-cent-left">
          <div>
            <img :src="item.img.indexOf('http')>-1?item.img: 'http://info.00856.la'+item.img">
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
            <div
              class="rigt-wenzi"
              style="display:inline"
              :class="[typeId==1?'red':'']"
            >{{item.created_time}}</div>
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

    }
  },
  computed: {
    ...mapState(['indexData'])
  },
  methods: {
    goshouyexiangq ({user_release_id, lang}) {
      this.$router.push({
        path: '/shouyexq',
        query: {
          user_release_id: user_release_id,
          lang: 'zh'
          // title: title
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getRecommendList')
  }
}
</script>
<style scope>
.dianzan img {
  width: 10%;
  height: 0.75rem /* 12/16 */;
  border: 1px solid red;
}
.rigt-wenzi {
  color: #333333;
}
.red {
  color: red;
}
.rigt-ft {
  font-size: 0.6875rem /* 11/16 */;
  color: #b16800;
}
.shouYe-cent-left div img {
  display: inline-block;
  width: 100%;
  height: 4.625rem /* 58/16 */;
}
</style>
