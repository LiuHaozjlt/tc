<template>
  <div>

    <template v-for="(item, index) in indexData">
        <!--有图片显示的div-->
      <div
        class="shouYe-cent"
        :key="index"
        v-if="showNum == 0  || (showNum > index)"
        @click="goshouyexiangq(item.user_release_id)"
     >
        <div class="shouYe-cent-left" v-if="item.img == '' ? false : true">
          <!-- <slot name="meituxiang"> -->
            <div>
              <img :src="item.img.indexOf('http')>-1?item.img: 'http://info.00856.la'+item.img">
            </div>
          <!-- <slot> -->
        </div>
        <div class="shouYe-cent-rigt">
          <div class="rigt-wenzi shouYe-rigt-top">{{item.title}}</div>
          <!-- <slot name="addresscont"> -->
            <div class="rigt-wenzi wanxiang" style="text-align:right">{{item.address}}</div>
          <!-- <slot> -->
          <div class="shouYe-rigt-bot">
            <div
              class="rigt-ft"
              style="display:inline;background-color:#FFC74D;text-align:center"
            >{{item.type.name}}</div>
            <!-- <slot name="addressel"> -->
              <!-- <div class="rigt-wenzi wanxiang" style="text-align:right" v-if="item.img == '' ? true : false">{{item.address}}</div> -->
            <!-- <slot> -->
            <div class="rigt-wenzi dianzan" style="display:inline">
              <img src="../image/liu.png" alt>
              {{item.num}}
            </div>
            <div
              class="rigt-wenzi"
              style="display:inline"
              :class="[typeId==1?'red':'']"
            >{{item.created_time  | formatDate}}</div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import {formatDate} from '../js/date'

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
    goshouyexiangq (item) {
      this.$router.push({
        path: '/shouyexq?user_release_id=' + item,
        query: {
          user_release_id: item
          // lang: 'zh',
          // title: item.title,
          // imgSrc: item.img,
          // describe: item.describe,
          // address: item.address
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getRecommendList')
    /* 没图片更换地址div */
    console.log(this.$store)
  },
  filters: {
    formatDate (time) {
      var date = new Date(time * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style>
/*
.dianzan img {
  width: 10%;
  height: 0.75rem ;
  border: 1px solid red;
}
.rigt-wenzi {
  color: #333333;
}
.red {
  color: red;
}
.rigt-ft {
  font-size: 0.6875rem ;
  color: #b16800;
}
.shouYe-cent-left div img {
  display: inline-block;
  width: 100%;
  height: 4.625rem ;
}*/
</style>
