<template>
    <div>
        <div class="nicheng-head-cont">
            <!-- <div class="bianji-head wodeft"  >
                昵称
            </div> -->
            <header-page :pageName="ipttext" @goWherer='back'></header-page>
            <!-- <div class="nicheng-head">{{}}</div> -->
            <input type="text" placeholder="请输入昵称"  v-model.trim="nickname">
        </div>
        <div class="zhichi-cont">
            <div class="zhichi shisan">
                支持<div class="six">6</div>位字符以内的中英文、数字
            </div>
        </div>
        <div class="bianji-save" @click="submit">保存</div>
    </div>
</template>

<script>
import headerPage from '../../components/header'
import {Toast} from 'vant'
export default {

  data () {
    return {
      ipttext: '昵称',
      nickname: ''

    }
  },
  created () {
    this.nickname = this.$store.state.userInfo.nickname
  },
  methods: {
    submit (v) {
      let {nickname, sex = 1, headimgurl = ''} = this.$store.state.userInfo.nickname
      if (this.nickname === nickname) {
        this.back()
        return
      }
      this.$store.dispatch('updateUserInfo', {nickname: this.nickname, sex, headimgurl}).then(({error_code, message}) => {
        if (error_code === 0) {
          this.back()
          Toast('修改成功')
        } else {
          Toast(message)
        }
      })
    },
    back () {
      this.$router.back()
    }
  },
  components: {headerPage}
}
</script>

<style>
    .header{
      height: 2.75rem /* 44/16 */;
      line-height: 2.75rem /* 44/16 */;
      display: flex;
      align-items: center;
    }
    .nicheng-head-cont input{
      text-align: center;
      margin-top:10%;
      border:0;
      border-bottom: 1px solid #FFC74D;
    }
    .zhichi-cont{
        text-align: center;
    }
    .zhichi{

        display: flex;
        justify-content: center;
    }
    .bianji-head{
        text-align: center;
    }
    .bianji-save{
      margin-top:20%;
        line-height: 2.25rem /* 36/16 */;
        height: 2.25rem /* 36/16 */;
        background-color: #FFB31E;
        color:white;
        border-radius: 1.125rem /* 18/16 */;
        text-align: center;
    }
    .six{
        color:#FFC74D;
    }
    .shisan{
        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
</style>
