<template>
    <div>
        <div>
            <div>首页详情</div>
            <div class="shouxq-top"><img :src="img" alt=""></div>
        </div>
    </div>
</template>
<script>
export default {
  computed: {
    img () {
      return this.$store.state.imgCache
    }
  }
}
</script>

<style>
    .shouxq-top img{
        height: 40%;
        width:100%;
    }
</style>
