<template>
    <div>

        <div style="position: relative;">
            <mt-swipe :auto="4000" @change="handleChange">
                <mt-swipe-item v-for="item in list" :key="item">
                  <img :src="'http://info.00856.la'+item" alt="">
                </mt-swipe-item>
            </mt-swipe>
            <div v-show="list.length > 0" class="slidejishu">
                {{curSwiper}} / {{list.length}}
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
      this.curSwiper = index + 1
      if (this.curSwiper > this.list.length) this.curSwiper = 1
    }
  }
}
</script>

<style>
.slidejishu{
  font-size: .625rem /* 10/16 */;
  color:white;
  width:15%;
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-radius: 10rem;
  background: rgba(0,0,0,.5);
  text-align: center;
}
</style>
