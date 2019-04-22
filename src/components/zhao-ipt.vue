<template>
<div class="shouyeinpt">
    <div class="shouYe-head-cent">
        <input type="text" placeholder="找房子,  找工作, 找二手车" @focus="$emit('focus')"
            v-model="inputVal" @keyup.enter="$emit('search', inputVal)">
    </div>
</div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      inputVal: this.value
    }
  },
  watch: {
    value (val) {
      this.inputVal = val
    },
    inputVal () {
      this.$emit('input', this.inputVal)
    }
  }
}
</script>

<style>
    .shouyeinpt{

    }
    .shouYe-head-cent input{
        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(102,102,102,1);
        text-align: center;
    }
</style>
