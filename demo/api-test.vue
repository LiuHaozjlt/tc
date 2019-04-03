<template>
    <div>
      <div @click="event">切換vant的國際化</div>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
      />
      <van-tabs v-model="active">
        <van-tab >
          <div slot="title">
            {{tab.area.default}}&nbsp;<van-icon :name="active==0?'arrow-up':'arrow-down'" />
          </div>
          <van-tree-select
            :items="items"
            :main-active-index="mainActiveIndex"
            :active-id="activeId"
            @navclick="onNavClick"
            @itemclick="onItemClick"
          />
        </van-tab>
        <van-tab   >
          <div slot="title">
            {{tab.money.default}}&nbsp;<van-icon :name="active==1?'arrow-up':'arrow-down'"  />
          </div>
          <van-picker :default-index="0" :columns="tab.money.list" @change="onChangeMoney" />
        </van-tab>
        <van-tab    >
          <div slot="title">
            {{tab.shape.default}}&nbsp;<van-icon :name="active==2?'arrow-up':'arrow-down'"  />
          </div>
          <van-picker :default-index="0" :columns="tab.shape.list" @change="onChangeShape" />
        </van-tab>
      </van-tabs>

    </div>
</template>

<style>

</style>

<script>
import { Uploader } from 'vant'
import Vue from 'vue'

Vue.use(Uploader)


import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';


export default {
  mounted(){
    console.log(this)
  },
  data () {
    return {
      currentDate: new Date(),
      /******start******/
      items:[
        {
          // 导航名称
          text: '全长沙',
          // 该导航下所有的可选项
          children: [
            {
              text: '岳麓区',
              id: 1,

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
              id: 3,

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
      /****end*********/
      active: 0,
      abc:'',
      tab:{
        area:{
          default:'长沙'
        },
        money:{
          default:'租金',
          list:[
            '租金',
            '不限',
            '1k',
            '2k',
            '20111645.0kip以上'
          ]
        },
        shape:{
          default:'户型',
          list:[
            '户型',
            '不限',
            '一室',
            '两室',
            '三室'
          ]
        }

      }
    }
  },
  methods: {
    onChangeShape(picker, value, index) {
       console.log(picker, value, index)
      this.tab.shape.default=value
    },
    onChangeMoney(picker, value, index) {
      console.log(picker, value, index)
      this.tab.money.default=value
    },
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    },
event(){
  Locale.use('en-US', enUS);
}
  }

}
</script>
