<template>
<div>
    <div class="header">
        <span @click='actions'><img src="../image/Path .png" alt=""></span>
        <div class="head-nicheng">{{pageName}}</div>
        <div class="head-nicheng"></div>
    </div>
</div>
</template>

<script>
export default {
  name: 'headerPage',
  props: {
    pageName: {
      type: String,
      default: ''
    }
  },
  methods: {
    actions () {
      this.$emit('goWherer')
    }
  }
}
</script>

<style>
.header{
  display: flex;
  justify-content: space-between;
  height: 2.75rem /* 44/16 */;
  align-items: center;
  background-color: #FFCF61;
}
.header span img{
  width:.625rem /* 10/16 */;
  height: 1.0625rem /* 17/16 */;
}

</style>
