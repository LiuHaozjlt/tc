<template>
    <div>
        <!-- {{tongzhi}} -->
         <div class="wode-tongzhi">
            <div class="wode-tongzhi-top">
                <div class="wode-tongzhi-headimg"><img src="../../image/zuojiantou.png" alt="" @click="gotongzhiqian"></div>
                <div class="wode-tongzhi-head">通知</div>
                <div class="wode-tongzhi-head"></div>
            </div>

            <div>
                <div class="ning-ba">
                    <div>
                        <div class="ning-la">您的评论被赞啦！</div>
                        <div><img src="" alt=""></div>
                    </div>
                    <div class="shi-ba">
                        [<div>4</div>个新的赞]有人觉得您的评论非常精彩！快去看看吧！
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tongzhi: ''
    }
  },
  created () {
    this.gettongzhi()
    this.$store
      .dispatch('getNotice')
      .then(({ data }) => {
        console.log('通知', data)
      })
  },
  methods: {
    gotongzhiqian () {
      this.$router.back(-1)
    },
    gettongzhi () {
      let me = this
      // let token = 'jZvklXi8H9bs2bK9tBYYAoI19bjzAwU3_1556267215'
      me.axius({
        methods: 'get',
        url: 'apis/v1/user/notice',
        data: {
        },
        headers: {
          'Authorization': 'Bearer ' + me.token
        }
      }).then(p => {
        this.tongzhi = p.data.data
        // console.log(this.tongzhi)
      })
    }
  }
}
</script>

<style>
    .wode-tongzhi-headimg img{
        width:.625rem /* 10/16 */;
        height: 1.0625rem /* 17/16 */;
    }
    .wode-tongzhi-top{
        height: 2.75rem /* 44/16 */;
        line-height: 2.75rem /* 44/16 */;
        display:flex;
        align-items: center;
    }
    .ning-ba{
        background-color: #FFFFFF;
    }
    .wode-tongzhi{
        background-color: #F5F5F5;
        height: 100%;
    }
    .ning-la{
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .shi-ba{
        display:flex;

        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
    .wode-tongzhi-top{
        display: flex;
        justify-content: space-between;
        background-color: #FFCF61;
    }
    .wode-tongzhi-headimg{
        width:.625rem /* 10/16 */;
        height: 1.0625rem /* 17/16 */;
        /* border:1px solid red; */
    }
    .wode-tongzhi-head{
        font-size:1.125rem /* 18/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(33,33,33,1);
    }
</style>
