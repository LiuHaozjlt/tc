<template>

<div class="dizhi-warp">
  <div class="xinzhen-head">
        <img src="../../image/zuojiantou.png" alt="" @click="back">
          {{id ? "修改地址" : "新增地址"}}
          <div></div>
  </div>
  <div class="dizhi-cent-cont">
      <div class="dizhi-cent">
        <div class="dizhi-ziliao">姓名</div>
        <input  class="dizhi-ipt" type="text" placeholder="请输入真实姓名" v-model="userAddress.consignee">
      </div>
    <div class="dizhi-cent">
        <div class="dizhi-ziliao">联系方式</div>
        <input class="dizhi-ipt" type="text" placeholder="联系方式" v-model="userAddress.mobile">
      </div>
      <div class="suozai dizhi-cent" @click="popup4">
        <div class="dizhi-ziliao">所在地区</div>
        <input class="dizhi-ipt" type="text" placeholder="所在地区" v-model="region">
        <img src="../../image/jiantoutou.png" alt="">
      </div>
      <div class="dizhi-cent">
        <div class="dizhi-ziliao">详细地址</div>
        <input class="dizhi-ipt" type="text" placeholder="详细地址" v-model="userAddress.address">
      </div>
  </div>
  <!-- <mt-button size="large" @click="popup4">下侧弹出Popup</mt-button> -->
  <mt-popup
    v-model="popupVisible4"
    position="bottom"
    class="mint-popup-4">
    <div class="que-qu">
      <div @click="popup4">取消</div>
      <div @click="finish">确定</div>
    </div>

    <!-- <mt-picker  :slots="addressSlots" @change="onAddressChange"
               :visible-item-count="5" class="pik"></mt-picker>
  </mt-popup> -->
    <mt-picker ref="region"  :slots="laosAddressSlots" @change="onLaosAddressChange"
              :value-key="isLaos ? 'nameLa' : 'name'"
               :visible-item-count="3" class="pik"></mt-picker>
  </mt-popup>
  <div class="peisong">*部分地区暂不支持配送</div>
  <div class="save" @click="submit">
    保存
  </div>
</div>

</template>
<script>
import {Toast} from 'vant'
import address from '../../js/areajson'
// import { constants } from 'http2'
let slot1Values = address.map(p => p.label)
let slot2Values = address[0].children.map(p => p.label)
export default {
  data () {
    return {
      popupVisible4: false,
      userAddress: {
        consignee: '',
        mobile: '',
        address: '',
        region_lv2: '', // 省
        region_lv3: '' // 市
      },
      address: [],
      pickerValue: [],
      laosAddressSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          // content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
        // {
        //   divider: true,
        //   // content: '-',
        //   className: 'slot4'
        // },
        // {
        //   flex: 1,
        //   values: [],
        //   className: 'slot5',
        //   textAlign: 'center'
        // }
      ],
      addressSlots: [
        {
          flex: 1,
          values: slot1Values,
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          // content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: slot2Values,
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          // content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      region: ''
    }
  },
  computed: {
    isLaos () {
      return this.$store.state.isLaos
    },
    from () {
      return this.$route.query.from
    },
    id () {
      return this.$route.params.id
    }
  },
  created () {
    if (this.id) {
      let activeAddress = this.$store.state.activeAddress
      if (activeAddress) {
        this.userAddress = activeAddress
        this.region = activeAddress.province + activeAddress.city
        // this.pickervalue = [this.userAddress.region_lv2, this.userAddress.region_lv3]
      } else {
        this.back()
      }
    }
  },
  mounted () {
    this.getRegion()
  },
  methods: {
    back () {
      this.$router.back()
    },
    submit () {
      this.$store.dispatch('updateUserAddress', this.userAddress).then(({data}) => {
        if (data.error_code === 0) {
          Toast(this.id ? '修改成功' : '添加成功')
          this.back()
        } else {
          Toast(data.message)
        }
      })
    },
    popup4 () {
      this.popupVisible4 = !this.popupVisible4
    },
    finish () {
      let isLaos = this.isLaos
      this.region = this.pickerValue.map(item => {
        if (item) {
          return isLaos ? item.nameLa : item.name
        } else {
          return ''
        }
      }).join('')
      this.userAddress.region_lv2 = this.pickerValue[0].id
      this.userAddress.region_lv3 = this.pickerValue[1].id
      this.popupVisible4 = false
    },
    onAddressChange (picker, values) {
      this.pickerValue = values
      let thirdChildren = null
      let secondObj = address.find(p => p.label == values[0])
      let secondValue = secondObj.children.map(p => {
        if (p.label == values[1]) {
          thirdChildren = p.children
        }
        return p.label
      })
      if (thirdChildren) {
        thirdChildren = thirdChildren.map(p => p.label)
      } else {
        thirdChildren = []
      }
      picker.setSlotValues(1, secondValue)
      picker.setSlotValues(2, thirdChildren)
    },
    getRegion () {
      let vm = this
      this.axius.get('/apis/v1/user-address/get-format-region').then(({data}) => {
        if (data.error_code === 0) {
          this.address = data.data
          setTimeout(() => {
            vm.$refs.region.setSlotValues(0, vm.mapRegion(vm.address))
            vm.$refs.region.setSlotValues(1, vm.mapRegion(vm.address[0].children || []))
          }, 0)
          // if(this.id) {
          //   let {region_lv2, region_lv3} = this.userAddress
          //   this.address.some(province => {
          //     if(province.id == region_lv2) {
          //       vm.pickerValue.push({id: province.id, name: province.name, name_la: province.name_la})
          //       (province.children || []).some(city => {
          //         if(city.id == region_lv3) {
          //           vm.pickerValue.push({id: city.id, name: city.name, name_la: city.name_la})
          //           return true
          //         }
          //       })
          //       return true
          //     }
          //   })
          // }
        }
      })
    },
    onLaosAddressChange (picker, values) {
      if (this.address.length === 0) return
      this.pickerValue = values
      let thirdChildren = []
      let secondObj = this.address.find(p => p.id == values[0].id)
      let secondValue = secondObj.children || []
      values[1] && secondValue.some(p => {
        if (p.id == values[1].id) {
          thirdChildren = p.children || []
          return true
        }
      })
      picker.setSlotValues(1, this.mapRegion(secondValue))
      picker.setSlotValues(2, this.mapRegion(thirdChildren))
    },
    mapRegion (arr) {
      return arr.map(({id, name, name_la}) => ({id, name, nameLa: name_la}))
    }
  }
}
</script>

<style>

.dizhi-warp{
  background-color: #F5F5F5;
  height: 100vh;
}
.dizhi-cent-cont{
  margin-top: 5%;

}
.dizhi-cent input{
  border:0;
}
.xinzhen-head{
  display:flex;
  justify-content:space-between;
  align-items: center;
}
  .xinzhen-head img{
    width:.6875rem /* 11/16 */;
    height: 1.25rem /* 20/16 */;
  }
  .que-qu{
    display: flex;
    height: 2.8125rem /* 45/16 */;
    line-height: 2.8125rem /* 45/16 */;
    justify-content: space-between;
    border-bottom:1px solid #E1E1E1;
    padding:0 10%;
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(153,153,153,1);
  }
  .save{
    text-align: center;
    vertical-align: middle;
    border-radius: 1.125rem /* 18/16 */;
    height: 2.25rem /* 36/16 */;
    line-height: 2.25rem /* 36/16 */;
    background-color: #FFB31E;
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    position:fixed;
    bottom: .4375rem /* 7/16 */;
    width:100%;
  }
  .peisong{
    margin-top: .9375rem /* 15/16 */;
    font-size:.75rem /* 12/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(240,25,25,1);
    line-height:20px;
  }
  .xinzhen-head{
    height: 2.75rem /* 44/16 */;
    display:flex;
    align-items: center;
  }
  .dizhi-cent{
    display:flex;
    height: 3.4375rem /* 55/16 */;
    /* border:1px solid red; */
    align-items: center;
    height:3.4375rem ;
    background-color: white;
  }
  .dizhi-ipt{
    margin-bottom: 0!important;
    text-align: left;
    font-size:15px;
    font-family:PingFang-SC-Medium;
    font-weight:500;
     color:#C3C3C3;
  }
  .dizhi-ziliao{
    width:25%;
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .suozai{
    display: flex;
  }
  .suozai img{
    width:.5625rem /* 9/16 */;
    height: 1rem /* 16/16 */;
    /* border:1px solid red; */
  }
  .xinzhen-head{
    background-color: white;
    text-align: center;
    font-size:1.0625rem /* 17/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .mint-popup-4{
    width:100%
  }
  .slot2{
    display:none;
  }
</style>
