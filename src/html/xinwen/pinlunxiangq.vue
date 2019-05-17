<template>
    <div class="pinlunxiangq-cont">
        <div class="pinlunxiangq-head">
            <img src="../../image/zuojiantou.png" alt="" @click="gohuifuqian">
            <div class="huifu">
                <div>{{count}}</div>条回复
            </div>

            <div></div>
        </div>
        <div class="pinlunxiangq-cent">

        </div>

        <div class="pinlunxiangq-botm">
            <input type="text" placeholder="请输入你的想法" v-model="commentValue">
            <button @click="submit()" type="button">回复</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      count: this.$route.query.count,
      commentValue: ''
    }
  },
  methods: {
    ...mapActions(['comments']),
    gohuifuqian () {
      this.$router.back(-1)
    },
    submit (id) {
      this.comments(1, {content: this.commentValue})
      console.log(1)
    }
  }
}
</script>

<style>
.pinlunxiangq-cont{
  padding:0 1rem;
}
.huifu{
    display:flex;

}
.pinlunxiangq-head img{
    width:5%;
    height: 1.25rem /* 20/16 */;
}
.pinlunxiangq-head{
    height: 2.75rem /* 44/16 */;
    display: flex;
    align-items: center;
}
.pinlunxiangq-botm input{
    width:90%;
    height: 1.875rem /* 30/16 */;
    /* border:1px solid red; */
    position: fixed;
    bottom: .4375rem /* 7/16 */;
    border-radius: 1rem /* 16/16 */;
}
.pinlunxiangq-head{
    display:flex;
    font-size:1.0625rem /* 17/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    justify-content: space-between
}
/* .pinlunxiangq-head div{
    display:inline
} */
</style>
