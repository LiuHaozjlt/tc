<template>
  <div>
    <!-- {{addressList}} -->
    <div class="xuanzeren">
      <img src="../../image/zuojiantou.png" alt @click="back">
      {{title}}
      <div></div>
    </div>
    <div>
      <div v-for="(item,index) in addressList" :key="item.user_address_id">
        <div @click="select(item)">
            <div class="xuanze-top xuanze-top-ft">
            <div>{{item.consignee}}</div>
            <div>{{item.mobile}}</div>
            </div>
        </div>
        <div class="xuanze-top-ft">{{item.country + item.province + item.city + item.district + item.address}}</div>
        <div class="xuanze-bot">
          <div class="xuanze-top-bot" :class="{active: item.is_default}" @click="setDefault(item)">
            <img src="../../image/choose_N.png" alt>
            <div class="xuanze-top-ft" v-if="item.is_default">默认地址</div>
            <div class="xuanze-top-ft" v-else>设置默认</div>
          </div>
          <div class="bj-sc">
            <div class="xuanze-bot-rit">
              <img src="../../image/bj.png" alt>
              <span class="bianji-shanchu" @click="edit(item)">编辑</span>
            </div>
            <div class="xuanze-bot-rit" @click="deleteAddress(item, index)">
              <img src="../../image/ssscc.png" alt>
              <!--接口传数据可以通过index拿得到，先请求后台，在做前端删除操作-->
              <div class="bianji-shanchu">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link tag="div" class="tianjia" to="/address/detail">添加新地址</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    title () {
      return this.$route.query.title || "地址列表"
    },
    addressList () {
      return this.$store.state.userAddressList
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    setDefault (item) {
      if (item.is_default) return
      this.$store
        .dispatch("setDefaultUserAddress", item.user_address_id)
        .then(({ data }) => {
          if (data.error_code === 0) {
            this.addressList.forEach(item => (item.is_default = 0))
            item.is_default = 1
            Toast("设置成功")
          } else {
            Toast(data.message)
          }
        })
    },
    duigou (index) {
      this.shewei = index
    },
    deleteAddress (item, index) {
      this.$store
        .dispatch("deleteUserAddress", item.user_address_id)
        .then(({ data }) => {
          if (data.error_code === 0) {
            this.addressList.splice(index, 1)
          } else {
            Toast(data.message)
          }
        })
    },
    edit (address) {
      this.$store.commit("setActiveAddress", address)
      this.$router.push("/address/detail/" + address.user_address_id)
    },
    select (address) {
      if (this.$route.query.from === "publish") {
        this.$store.commit("updatePublish", {
          user_address_id: address.user_address_id
        })
        this.$store.commit("setActiveAddress", address)
      }
      // 物流
      if (this.$route.query.from === "logistic") {
        this.$store.commit("setActiveAddress", address)
      }
      this.$router.back()
    }
  },
  created () {
    this.$store.dispatch("getUserAddressList")
  }
}
</script>

<style>
.tianjia {
  width: 100%;
  bottom: 0.4375rem /* 7/16 */;
  position: fixed;
  text-align: center;
  line-height: 2.25rem /* 36/16 */;
  border-radius: 1.125rem /* 18/16 */;
  background-color: #ffb31e;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.xuanzeren {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xuanzeren img {
  width: 0.6875rem /* 11/16 */;
  height: 1.25rem /* 20/16 */;
}
.xuanzeren {
  line-height: 2.75rem /* 44/16 */;
  height: 2.75rem /* 44/16 */;
  text-align: center;
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.bianji-shanchu {
  padding-left: 0.4375rem /* 7/16 */;
}
.xuanze-bot {
  margin-top: 1.5625rem /* 25/16 */;
  border-top: 1px solid #e1e1e1;
  justify-content: space-between;
  display: flex;
  height: 2.5rem /* 40/16 */;
  /* border:1px solid red; */
  align-items: center;
}
.bj-sc {
  display: flex;
}
.bj-sc div:nth-child(1) {
  margin-right: 1.4375rem /* 23/16 */;
}
.bianji-shanchu {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.xuanze-bot-rit {
  display: flex;
  align-items: center;
}
.xuanze-bot-rit img {
  width: 1.0625rem /* 17/16 */;
  height: 1.0625rem /* 17/16 */;
}
.xuanze-top-bot div {
  padding-left: 0.625rem /* 10/16 */;
}
.xuanze-top-bot {
  display: flex;
}
.xuanze-top-bot.active {
  color: #ffc74d;
}
.xuanze-top-bot img {
  width: 1.1875rem /* 19/16 */;
  height: 1.1875rem /* 19/16 */;
}
.xuanze-top-ft {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.xuanze-top {
  display: flex;
  justify-content: space-between;
  /* border:1px solid red; */
  padding-top: 1rem /* 16/16 */;
  padding-bottom: 1rem /* 16/16 */;
}
</style>
