<template>
  <div class="dizhierjian">
    <van-picker ref="region"  :columns="columns" @change="onChange" v-if="columns[0].values.length > 0" />
  </div>
</template>

<script>
import {wls} from '@/store/index'
export default {
  data () {
    this.address = wls.get('region', [])
    return {
      pickerValue: [],
      columns: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ]
    }
  },
  created () {
    if (this.address.length === 0) {
      this.getRegion()
    } else {
      this.setColumnValues(0, this.address)
      this.setColumnValues(1, this.address[0])
    }
  },
  methods: {
    setColumnValues (index, address) {
      this.$refs.region.setColumnValues(index, this.mapRegion(address))
    },
    getRegion () {
      let vm = this
      this.axius.get('/apis/v1/user-address/get-format-region').then(({data}) => {
        if (data.error_code === 0) {
          this.address = data.data
          wls.set('region', this.address)
          setTimeout(() => {
            vm.setColumnValues(0, vm.address)
            vm.setColumnValues(1, vm.address[0].children || [])
          }, 0)
        }
      })
    },
    onAddressChange (picker, values) {
      this.pickerValue = values
      let thirdChildren = null
      let secondObj = this.address.find(p => p.label == values[0])
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
      picker.setColumnValues(1, secondValue)
      picker.setColumnValues(2, thirdChildren)
    },
    onChange (picker, values) {
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
      picker.setColumnValues(1, this.mapRegion(secondValue))
      picker.setColumnValues(2, this.mapRegion(thirdChildren))
      // this.pickerValue.splice(1, 1, secondObj.id)
      this.$emit('change', this.pickerValue)
    },
    mapRegion (arr) {
      return arr.map(({id, name, name_la}) => ({id, name, nameLa: name_la}))
    }
  }

}
</script>

<style>

</style>
