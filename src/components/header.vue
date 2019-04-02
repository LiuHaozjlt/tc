<template>
<div>
    <div class="header">
        <span @click='actions'><img src="" alt=""></span>
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
}
.header span img{
  width:1.25rem /* 20/16 */;
  height: .9375rem /* 15/16 */;
  background-color: black;
}

</style>
