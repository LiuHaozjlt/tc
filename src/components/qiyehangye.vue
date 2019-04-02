<template>
    <div>
        <div>
            <div>
                <div>企业资料</div>
            </div>
            <div v-for='(item,index) in gongye' :key="index">
                <div class="gongsi-yjt">
                    <div>{{item.text}}</div>
                    <div class="qinze">
                        <div>{{item.qinze}}</div>
                        <div>></div>
                    </div>
                </div>
            </div>

             <!-- <div>
                <div class="gongsi-yjt">
                    <div>公司规模</div>
                    <div class="qinze">
                        <div>请选择</div>
                        <div>></div>
                    </div>
                </div>
            </div> -->

        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      gongye: [{text: '公司规模', qinze: '请选择'}, {text: '企业性质', qinze: '请选择'}, {text: '所在行业', qinze: '请选择'}]
    }
  }

}
</script>

<style>
.gongsi-yjt{
    display:flex;
    justify-content: space-between;
}
.qinze{
    display:flex;

}
</style>
