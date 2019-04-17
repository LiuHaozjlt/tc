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
      <div>
        <div class="wode-fabu-box" v-for="(item, index) in releases" :key="item.id">
          <div class="chanpinlist">
            <img :src="item.img" alt="">
            <div class="chanpinlisttitle">{{isLaos ? item.title_la : item.title}}</div>
          </div>
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
      this.$store.dispatch('topUserRelease', item.id).then(({data}) => {
        if (data.error_code === 0) {
          Toast('置顶成功')
          this.getReleases()
        } else {
          Toast(data.message)
        }
      })
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
.chanpinlisttitle{
  margin-left: 5%;
}
.chanpinlist{
  display:flex;

}
.chanpinlist img{

  height: 10%;
}
.wode-fabu-head img {
  width: 0.625rem /* 10/16 */;
  height: 1.0625rem /* 17/16 */;
}
.wode-fabu-head {
  display: flex;
  justify-content: space-between;
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
  justify-content: space-around;
}
.xiu-chu-in {
  height: 1.4375rem /* 23/16 */;
  line-height: 1.4375rem /* 7/16 */;
  text-align: center;
  padding: 0 0.5rem; /*我随便设置的  OK  */
}
.wode-fabu-head {
  font-size: 1.125rem /* 18/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(33, 33, 33, 1);
}
.shouYe-cent-left div img {
  height: 1.875rem /* 30/16 */;
}
.wode-fabu-box {

}
.xiu-chu div {
  background-color: #ffc74d;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
</style>
