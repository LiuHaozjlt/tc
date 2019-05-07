<template>
    <div>
        <div>
            <div class="xuanzeleihead">
                <div class="xuanzeleiicon" @click="towodeele"><img src="../../image/zuojiantou.png" alt=""></div>
                <div class="xuanze-lei">选择商家类别</div>
                <div></div>
            </div>

              <div class="xuanzexiang">
                <div v-for="(item,index) in sellerTypes" :key="index" :class="{selected: index === active}"
                  @click="active = index">
                    <div class=""><img  class="shangjiaIcon" :src="'http://info.00856.la'+item.icon" alt=""></div>
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
      active: 0

    }
  },
  computed: {
    sellerTypes () {
      return this.$store.state.sellerTypes
    }
  },
  methods: {
    towodeele () {
      this.$router.back(-1)
    },
    xiayibu () {
      this.$store.commit('updateSellerInfo', {
        release_type_id: this.sellerTypes[this.active].release_type_id
      })
      // console.log(this.release_type_id)
      this.$router.push({path: '/wodeshangjia'})
    }
  },
  created () {
    if (this.sellerTypes.length === 0) this.$store.dispatch('getSellerTypes')
  }
}
</script>

<style>
.shangjiaIcon{
  width:4rem /* 64/16 */;
  height: 2.4375rem /* 39/16 */;
}
.xuanzexiang{
  display: inline-flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 10vh;
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
