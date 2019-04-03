<template>
    <div>
      <van-search placeholder="请输入搜索关键词" v-model="value" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        >  {{item+'ai'}}</van-cell>

      </van-list>
    </div>
</template>

<script>
    export default {
        name: "test",
      data(){
          return {
            value:'',
            list: [],
            loading: false,
            finished: false
          }
      },
      methods:{
        onCancel(){
          // van-search 提供了 search 和 cancel 事件。search 事件在用户点击键盘上的 搜索/回车 按钮触发。cancel 事件在用户点击搜索框右侧取消按钮时触发
        },
        onSearch(){
          console.log(this.value)
        },
        onLoad() {
          // 异步更新数据
          setTimeout(() => {
            for (let i = 0; i < 10; i++) {
              this.list.push(this.list.length + 1);
            }
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= 40) {
              this.finished = true;
            }
          }, 500);
        }
      }
    }
</script>

<style >

</style>
