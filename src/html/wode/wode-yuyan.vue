<template>
  <div>
    <div class="wode-yuyan">
      <img src="../../image/zuojiantou.png" alt @click="back">
      选择语言
      <div></div>
    </div>
    <div class="wodeyuyancent-warp">
      <div class="wodeyuyancent">
        <div class="yuyanqiehuan">
          <div class="yuyan-cent-top" @click="setLang('zh')">
            <div class="yuyan-zh">
              <img src="../../image/zgg.png" alt>
              <div>{{$t('中文')}}</div>
            </div>
            <img src="../../image/duide.png" alt v-if="tolang === 'zh'">
          </div>
          <div class="yuyan-cent-cent" @click="setLang('laos')">
            <div class="yuyan-lao">
              <img src="../../image/lww.png" alt>
              <div>{{$t('老挝文')}}</div>
            </div>
            <img src="../../image/duide.png" alt v-if="tolang === 'laos'">
          </div>
        </div>
      </div>
      <div class="yuyan-qued" @click="quedingyuyan">{{$t('确定')}}</div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      tolang: ''
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    }
  },
  mounted () {
    // console.log(this.lang)
    this.tolang = this.lang
  },
  methods: {
    ...mapMutations(['setIsLaos']),
    back () {
      this.$router.back(-1)
    },
    // 选择老挝文
    geticon () {
      this.dui = true
      this.duishang = false
      // this.lang = 'laos'
    },
    // 选择中文
    geticonshang () {
      this.dui = false
      this.duishang = true
      this.lang = 'zh'
    },
    xuanzelaowo (lang) {

    },
    xuanzezhonwen () {

    },

    quedingyuyan () {
      this.$i18n.locale = this.tolang
      // console.log(this.tolang, 234)
      this.setIsLaos(this.tolang)
      this.back()
    },
    setLang (lang) {
      this.tolang = lang
    }
  }
}
</script>

<style>
.wodeyuyancent-warp {
  background-color: #f5f5f5;
  height: 100%;
  padding-top: 5%;
}
.yuyanqiehuan {
  /* margin-top:5%; */
  border-top-left-radius: 0.5rem /* 8/16 */;
  border-top-right-radius: 0.5rem /* 8/16 */;
  border-bottom-left-radius: 0.5rem /* 8/16 */;
  border-bottom-right-radius: 0.5rem /* 8/16 */;
}
.yuyanqiehuan div {
  height: 10%;
  display: flex;
  align-items: center;
}
.wodeyuyancent {
  background-color: #ffffff;
}
.wode-yuyan {
  height: 2.75rem /* 44/16 */;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wode-yuyan img {
  width: 0.6875rem /* 11/16 */;
  height: 1.25rem /* 20/16 */;
}
.yuyan-cent-cent {
  display: flex;
  justify-content: space-between;
}
.yuyan-cent-top {
  display: flex;
  justify-content: space-between;
}
.yuyan-cent-cent img {
  width: 1.0625rem /* 17/16 */;
  height: 1.0625rem /* 17/16 */;
}
.yuyan-cent-top img {
  width: 1.0625rem /* 17/16 */;
  height: 1.0625rem /* 17/16 */;
  /* margin-right: 4%; */
}
.yuyan-qued {
  height: 2.25rem /* 36/16 */;
  color: white;
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  border-radius: 1.125rem /* 18/16 */;
  background-color: #ffb31e;
  line-height: 2.25rem /* 36/16 */;
  margin-top: 3.4375rem /* 55/16 */;
}
.yuyan-zh,
.yuyan-lao {
  width: 100%;
  font-size: 1rem /* 16/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.wode-yuyan {
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
</style>
