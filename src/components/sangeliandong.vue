<template>
  <!--三个二级联动-->
  <div>
    <div>
      <div>
        <div>
          <div class="vant-tab">
            <!-- <div @click="event">切換vant的國際化</div> -->
            <!-- <van-datetime-picker v-model="currentDate" type="date"/> -->
            <van-tabs v-model="active" :swipe-threshold="5">
              <!-- 地区 -->
              <van-tab>
                <div slot="title"  @click="changeTab(0)" class="tab-unselected">
                  {{tab.area.default}}&nbsp;
                  <img src='../../src/image/jtt@2x.png' :class="['arrowImg',isShow && active==='area' ? 'arrowUp' : '']"/>
                  <!-- <van-icon :name="active==0?'arrow-up':'arrow-down'"/> -->
                </div>
                <van-tree-select
                  v-show="isShow && active == 'area'"
                  :items="items"
                  :main-active-index="mainActiveIndex"
                  :active-id="activeId"
                  @navclick="onNavClick"
                  @itemclick="onItemClick"
                />
              </van-tab>

              <van-tab v-for="(item, index) in searchOptions" :key="item.name">
                <div slot="title" @click="changeTab(index+1)"
                    :class="active === index+1 ? 'tab-seleted' : 'tab-unselected'">
                  {{item.selected ? (isLaos ? item.selected.name_la : item.selected.name) : $t(item.name)}}&nbsp;
                  <img src='../../src/image/jtt@2x.png' :class="['arrowImg',isShow && active === index+1 ? 'arrowUp' : '']"/>
                </div>
                <van-picker class="goHead" v-show="isShow && active === index+1" :default-index="0"
                    :columns="item.options"  :value-key="isLaos ? 'name_la' : 'name'" @change="onChange"/>
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
  props: {
    searchOptions: {
      type: Array,
      default: () => [
        // {
        //   name: 'prices',
        //   options: [{
        //     id: 1,
        //     name: '1k',
        //     name_la: '1k'
        //   }]
        // }
      ]
    }
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
      active: '',
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
      },
      priceUnit: []
    }
  },
  computed: {
    isLaos () {
      return this.$i18n.locale === 'laos'
    }
  },
  methods: {
    changeTab (index) {
      if (index === this.active && this.isShow) {
        this.isShow = false
      } else {
        this.active = index
        this.isShow = true
      }
    },
    onChange (picker, value, index) {
      if (this.active == 0) {
        this.area = value
      } else {
        this.searchOptions[this.active - 1].selected = value
      }
      this.emitUpdate()
    },
    onChangeMoney (picker, value, index) {
      // console.log(picker, value, index)
      this.tab.money.default = value.name
      this.params.prices = value.id
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
      let params = {}

      this.searchOptions.forEach(item => {
        if (item.selected) {
          params[item.name] = item.selected.id
        }
      })
      this.timer = setTimeout(() => {
        this.$emit('update', params)
      }, 1000) // 1秒后触发更新
    },
    event () {
      Locale.use('en-US', enUS)
    }
  }
}
</script>
<style>
.van-picker{
  height: 100%;
}
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
