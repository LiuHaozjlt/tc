<template>
  <!--三个二级联动-->
  <div>
    <div>
      <div>
        <div>
          <div class="vant-tab">
            <!-- <div @click="event">切換vant的國際化</div> -->
            <!-- <van-datetime-picker v-model="currentDate" type="date"/> -->
            <van-tabs v-model="active">
              <van-tab>
                <div slot="title"  @click="changeTab(0)" class="tab-unselected">
                  {{tab.area.default}}&nbsp;
                  <img src='../../src/image/jtt@2x.png' :class="['arrowImg',isShow && active==0 ? 'arrowUp' : '']"/>
                  <!-- <van-icon :name="active==0?'arrow-up':'arrow-down'"/> -->
                </div>
                <van-tree-select
                  v-show="isShow && active == 0"
                  :items="items"
                  :main-active-index="mainActiveIndex"
                  :active-id="activeId"
                  @navclick="onNavClick"
                  @itemclick="onItemClick"
                />
              </van-tab>
              <van-tab>
                <div slot="title"  @click="changeTab(1)"
                    :class="tab.money.default !== '租金' ? 'tab-seleted' : 'tab-unselected'">
                  {{tab.money.default}}&nbsp;
                  <img src='../../src/image/jtt@2x.png' :class="['arrowImg',isShow && active==1 ? 'arrowUp' : '']"/>
                  <!-- <van-icon :name="active==1?'arrow-up':'arrow-down'"/> -->
                </div>
                <van-picker class="goHead" v-show="isShow && active == 1" :default-index="0"
                  :columns="tab.money.list" value-key="name" @change="onChangeMoney"/>
              </van-tab>
              <van-tab>
                <div slot="title" @click="changeTab(2)"
                    :class="tab.shape.default !== '户型' ? 'tab-seleted' : 'tab-unselected'">
                  {{tab.shape.default}}&nbsp;
                  <img src='../../src/image/jtt@2x.png' :class="['arrowImg',isShow && active==2 ? 'arrowUp' : '']"/>
                  <!-- <van-icon :name="active==2?'arrow-up':'arrow-down'"/> -->
                </div>
                <van-picker class="goHead" v-show="isShow && active == 2" :default-index="0" :columns="tab.shape.list" @change="onChangeShape"/>
              </van-tab>
                  <van-tab>
                <div slot="title" @click="changeTab(2)"
                    :class="tab.shape.default !== '户型' ? 'tab-seleted' : 'tab-unselected'">
                  {{tab.shape.default}}&nbsp;
                  <img src='../../src/image/jtt@2x.png' :class="['arrowImg',isShow && active==2 ? 'arrowUp' : '']"/>
                  <!-- <van-icon :name="active==2?'arrow-up':'arrow-down'"/> -->
                </div>
                <van-picker class="goHead" v-show="isShow && active == 2" :default-index="0" :columns="tab.shape.list" @change="onChangeShape"/>
              </van-tab>
              <van-tab>
                <div slot="title" @click="changeTab(2)"
                    :class="tab.shape.default !== '户型' ? 'tab-seleted' : 'tab-unselected'">
                  {{tab.shape.default}}&nbsp;
                  <img src='../../src/image/jtt@2x.png' :class="['arrowImg',isShow && active==2 ? 'arrowUp' : '']"/>
                  <!-- <van-icon :name="active==2?'arrow-up':'arrow-down'"/> -->
                </div>
                <van-picker class="goHead" v-show="isShow && active == 2" :default-index="0" :columns="tab.shape.list" @change="onChangeShape"/>
              </van-tab>
            </van-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Uploader } from 'vant'
import Vue from 'vue'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
Vue.use(Uploader)
export default {
  mounted () {
    // console.log(this)
  },
  data () {
    return {
      currentDate: new Date(),
      /** ****start******/
      items: [
        {
          // 导航名称
          text: '全长沙',
          // 该导航下所有的可选项
          children: [
            {
              text: '岳麓区',
              id: 1
            },
            {
              text: '湘江区',
              id: 2
            }
          ]
        },
        {
          // 导航名称
          text: '湘潭',
          // 该导航下所有的可选项
          children: [
            {
              text: '湘潭1',
              id: 3
            },
            {
              text: '湘潭2',
              id: 4
            }
          ]
        }
      ],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1,
      /** **end*********/
      active: 4,
      abc: '',
      tab: {
        area: {
          default: '长沙'
        },
        money: {
          default: '租金',
          list: [// 这是一个对象数组，包含id
            {id: 0, name: '租金'},
            {id: 1, name: '不限'},
            {id: 2, name: '1k'},
            {id: 3, name: '2k'},
            {id: 4, name: '20111645.0kip以上'}
          ]
        },
        shape: {
          default: '户型',
          list: [ // 这是一个对象数组，包含id
            '户型',
            '不限',
            '一室',
            '两室',
            '三室'
          ]
        }
      },
      isShow: false,
      timer: '',
      params: {
        rent_hall_id: '',
        prices: '',
        region_lv2: '',
        region_lv3: ''
      }
    }
  },
  methods: {
    changeTab (index) {
      if (index === this.active && this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    onChangeShape (picker, value, index) {
      // console.log(picker, value, index)
      this.tab.shape.default = value
      this.params.rent_hall_id = value // id
      this.emitUpdate()
    },
    onChangeMoney (picker, value, index) {
      // console.log(picker, value, index)
      this.tab.money.default = value.name
      this.params.prices = value.id // id
      this.emitUpdate()
    },
    onNavClick (index) {
      this.mainActiveIndex = index
    },
    onItemClick (data) {
      this.activeId = data.id
    },
    emitUpdate () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('update', {...this.params})
      }, 1000) // 1秒后触发更新
    },
    event () {
      Locale.use('en-US', enUS)
    }
  }
}
</script>
<style>
.van-tab{
  flex: none;
  text-align: left;
  padding:0;
}
.van-tabs__nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.arrowImg{
  display: inline-block;
  width: .5625rem /* 9/16 */;
  height: .25rem /* 4/16 */;
}
.arrowUp{
  transform: rotate(180deg)
}
.goHead .van-picker__columns{
  margin-top: -88px;
}
.tab-selected {
  color: #333;
}
.tab-unselected {
  color: #EE5C34;
}
</style>
