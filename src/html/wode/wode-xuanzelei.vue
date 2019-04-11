<template>
    <div>
        <div>
            <div class="xuanzeleihead">
                <div class="xuanzeleiicon" @click="towodeele"><img src="../../image/zuojiantou.png" alt=""></div>
                <div class="xuanze-lei">选择商家类别</div>
                <div></div>
            </div>

              <div class="xuanzexiang">
                <div v-for="(item,index) in xuanzelei" :key="index" :class="{selected: index === active}"
                  @click="active = index">
                    <div>{{item.name}}</div>
                </div>
              </div>

            <div class="xuan-bian">*选择之后将不可改变</div>
            <div class="xiayibu" @click="xiayibu">下一步</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      xuanzelei: [],
      active: 0
    }
  },

  methods: {
    towodeele () {
      this.$router.back(-1)
    },
    getxuanzeleib () {
      let token = 'TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113'
      this.axius({
        methods: 'get',
        url: 'apis/v1/seller/get-seller-type',
        data: {
          // upimage:
          // release_type_id: 444444,
          // title: 99,
          // describe: 555,
          // mobile: 3333,
          // code: 4,
          // address: '长沙',
          // img: 3,
          // is_trans: 1,

          // xh: 86,
          // user_address_id: 0
        },
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(p => {
        // debugger
        this.xuanzelei = p.data.data
        // console.log('类别', p)
      })
    },
    xiayibu () {
      // this.$router.push({path: '/pinpaishangjiaxq?type=' + this.xuanzelei[this.active].release_type_id})
    }

  },
  mounted () {
    this.getxuanzeleib()
  }
}
</script>

<style>
.xuanzexiang{
  display: inline-flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 30vh;
}
.xuanzexiang > div{
  width: 50%;
  line-height: 10vh;
}
.xuanzeleiicon img{
  width:.625rem /* 10/16 */;
  height: 1.0625rem /* 17/16 */;
}
.xuanzeleihead{
  height: 2.75rem /* 44/16 */;
  display:flex;
  justify-content: space-between;
  background-color: #FFB31E;
  align-items: center;
}
.xuan-bian{
    font-size:.8125rem /* 13/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(235,94,94,1);

position: fixed;
bottom: 20%;
right: 30%;
}
.xuanze-lei{
   font-size:1.125rem /* 18/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(33,33,33,1);
}
.xiayibu{
    height: 2.25rem /* 36/16 */;
    background-color: #FFB31E;
    border-radius: 1.125rem /* 18/16 */;
    text-align: center;
    line-height: 2.25rem /* 36/16 */;
    position:fixed;
    width:100%;
    bottom: 2%;
    color:#FFFFFF;
}
.selected {
  color: #FFB31E;
}
</style>
