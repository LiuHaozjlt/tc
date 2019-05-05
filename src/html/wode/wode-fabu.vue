<template>
  <div>
    <div class="wode-fabu-head">
      <div>
        <img src="../../image/zuojiantou.png" alt @click="gowodefabuqian">
      </div>
      <div class="wo-bu">我的发布</div>
      <div class="pi-chu">批量删除</div>
    </div>
    <div>
      <div class="wode-fabu-box-warp">
        <div class="wode-fabu-box" v-for="(item, index) in releases" :key="item.id">
           <div class="chanpinlist">
              <div class="chanpinlist-left">
                  <img :src="item.img" alt="">
              </div>
              <div class="chanpinlist-rit">
                  <div class="chanpinlisttitle">{{isLaos ? item.title_la : item.title}}</div>
                  <div class="fabu-rit-cent">
                    <img src="../../image/zuojiantou.png" alt="">
                    <div class="shishan">123</div>
                  </div>
                  <div class="fabu-rit-bot">
                    <div class="fabu-rit-cent">
                      <img src="../../image/zuojiantou.png" alt="">
                      <div class="shishan">123</div>
                    </div>
                    <div class="fabuyu">发布于：{{item.created_time}}</div>
                  </div>
              </div>

           </div>
          <!-- <div class="chanpinlist-rigt">
            <div class="chanpinlisttitle">{{isLaos ? item.title_la : item.title}}</div>
            <div class="fabu-rit-cent">
                <img src="../../image/zuojiantou.png" alt="">
                <div class="shishan">123</div>
            </div>
            <div class="fabu-rit-bot">
              <div class="fabu-rit-cent">
                <img src="../../image/zuojiantou.png" alt="">
                <div class="shishan">123</div>
              </div>
              <div class="fabuyu">发布于：{{item.created_time}}</div>
            </div>
          </div> -->
          <div class="wode-fabu-cent">
            <div class="xiu-chu">
              <!-- 修改要跳到修改页面 -->
              <div @click="modify(item)" class="xiu-chu-in">修改</div>
              <div @click="refresh(item)" class="xiu-chu-in">刷新</div>
              <div @click="top(item)" class="xiu-chu-in" v-if="isPersonal">置顶</div>
              <div @click="shelf(item)" class="xiu-chu-in" v-else>{{item.is_shelf == 0 ? "上架" : "下架"}}</div>
              <div @click="remove(item, index)" class="xiu-chu-in">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Toast} from 'vant'
export default {
  data () {
    return {
      releases: []
    }
  },
  computed: {
    ...mapState(['isPersonal', 'isLaos'])
  },
  methods: {
    getReleases () {
      let isPersonal = this.isPersonal
      this.$store.dispatch(isPersonal ? 'getUserRelease' : 'getSellerRelease').then(({data}) => {
        if (data.error_code === 0) {
          this.releases = data.data.map(item => {
            item.id = isPersonal ? item.user_release_id : item.seller_release_id
            item.visitCount = isPersonal ? item.visit_count : item.visit_num
            return item
          })
        } else {
          Toast(data.message)
        }
      })
    },
    gowodefabuqian () {
      this.$router.back(-1)
    },
    modify (item) {
      this.$store.commit('updatePublish', item)
      if (this.isPersonal) {
        this.$router.push({
          path: '/fabuuser',
          query: {
            releaseId: item.id,
            releaseTypeId: item.release_type_id
          }
        })
      } else {
        this.$router.push({
          path: '/fabupeop',
          query: {
            releaseId: item.id
          }
        })
      }
    },
    refresh (item) {
      this.$store.dispatch(this.isPersonal ? 'refreshUserRelease' : 'refreshSellerRelease', item.id).then(({data}) => {
        if (data.error_code === 0) {
          Toast('刷新成功')
        } else {
          Toast(data.message)
        }
      })
    },
    top (item) {
      // this.$store.dispatch('topUserRelease', item.id).then(({data}) => {
      //   if (data.error_code === 0) {
      //     Toast('置顶成功')
      //     this.getReleases()
      //   } else {
      //     Toast(data.message)
      //   }
      // })
      this.$router.push('wodezhid')
    },
    shelf (item) {
      this.$store.dispatch('shelfhUserRelease', item.id).then(({data}) => {
        if (data.error_code === 0) {
          item.is_shelf = data.data.is_shelf
          Toast(item.is_shelf == 0 ? '已下架' : '已上架')
        } else {
          Toast(data.message)
        }
      })
    },
    remove (item, index) {
      this.$store.dispatch(this.isPersonal ? 'deleteUserRelease' : 'deleteSellerRelease', item.id).then(({data}) => {
        if (data.error_code === 0) {
          Toast('已删除')
          this.releases.splice(index, 1)
        } else {
          Toast(data.message)
        }
      })
    }
  },
  created () {
    this.getReleases()
  }
}
</script>

<style>
.xiu-chu{
  padding-bottom: 4%;
}
.wode-fabu-box{
  background-color: white;
}
.wode-fabu-box-warp{
  background-color: #F5F5F5;
  height: 100%;
}
.wode-fabu-cent{
  margin-top:5%;

}
.fabu-rit-bot{
  width:100%;
  display:flex;
  justify-content: space-between;
}
.fabu-rit-cent,.fabu-rit-bot{
  display:flex;
  align-items: center;
}
.chanpinlist-left{
  width:30%;
  margin-right: 4%;
}
.chanpinlist-rit{
  width:70%;
}
.chanpinlist-left img{

  height: 4.5rem /* 72/16 */;

}
.shishan{
  font-size:.8125rem /* 13/16 */;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
margin-left: 5%;
}
.fabu-rit-bot{
  display: flex;
  justify-content: space-between;
}
.fabu-rit-cent{
  display:flex;
  height: .875rem /* 14/16 */;

}
.fabu-rit-cent img{
  width:.8125rem /* 13/16 */;
  height: .875rem /* 14/16 */;
}
.xin-yan{
  display:flex;
}
.xiaoxin{
  display:flex;
}
.fabuyu{
  font-size:.8125rem /* 13/16 */;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(153,153,153,1);
}
.chanpinlisttitle{

   font-size:.8125rem /* 13/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
 display:-webkit-box;
-webkit-box-orient:vertical;
-webkit-line-clamp:2;
overflow:hidden;
}

.chanpinlist-rit{

}
.chanpinlist{
  display:flex;

  height: 6.375rem /* 102/16 */;
  border-bottom: 1px solid #EDEDED;
  padding-top:4%;

}
.chanpinlist img{

}
.wode-fabu-head img {
  width: 0.625rem /* 10/16 */;
  height: 1.0625rem /* 17/16 */;
}
.wode-fabu-head {
  display: flex;
  justify-content: space-between;
  height: 2.75rem /* 44/16 */;
  align-items: center;
  background-color: #ffc74d;
}
.pi-chu {
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.xiu-chu {
  /* width:70%; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.xiu-chu-in {
  height: 1.4375rem /* 23/16 */;
  line-height: 1.4375rem /* 7/16 */;
  text-align: center;
  padding: 0 0.5rem;
}
.wode-fabu-head {
  font-size: 1.125rem /* 18/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(33, 33, 33, 1);
}

.wode-fabu-box {
  margin-bottom: 2%;

}
.xiu-chu div {
  background-color: #ffc74d;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
