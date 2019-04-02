<template>
    <div>
        <div style="position: relative;">
            <mt-swipe :auto="4000" @change="handleChange">
                <mt-swipe-item v-for="item in list" :key="item">
                  <img :src="item" alt="">
                </mt-swipe-item>
            </mt-swipe>
            <div v-show="list.length > 0" style="position: absolute;right: 10px;bottom: 10px;border-radius: 10rem;background: rgba(0,0,0,.5);">
                {{curSwiper}}/{{list.length}}
            </div>
        </div>
    </div>
</template>

<script>

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      curSwiper: 1
    }
  },
  methods: {
    handleChange (index) {
      console.log(index)
      this.curSwiper = index + 1
      if (this.curSwiper > this.list.length) this.curSwiper = 1
    }
  }
  // created () {
  //   console.log('slide', this.list)
  // }

}
</script>
