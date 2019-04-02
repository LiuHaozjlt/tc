<template>
    <div>
        <div class="jubao-warp">
            <div class="jubao-head-top">
                <img src="" alt="">
                我的举报
                <div></div>
            </div>

            <div class="wode-jubao-head">
                {{}}
            </div>
            <div class="jubao-liyou">
                举报理由
            </div>
            <div class="qin-hecha">
                <input type="text" placeholder="请简要描述举报理由,我们会详细核查">
            </div>
            <div class="lin-bai">
                <div>0</div>/<div>100</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.lin-bai{
    display:flex;
    font-size:.8125rem /* 13/16 */;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:10px;
    justify-content: flex-end;
    background-color: white;
    height: auto;
    padding-top:5.6875rem /* 91/16 */;
    padding-bottom: .8125rem /* 13/16 */;

}
.qin-hecha{
    height: auto;
    background-color: white;
    padding-top: 1.25rem /* 20/16 */;
}
.qin-hecha input{
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
    border:0;
}
.jubao-liyou{
    background-color: white;
    height:auto;
    font-size:.9375rem /* 15/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    padding-top:.625rem /* 10/16 */;
}
.jubao-warp{
    height:100%;
    background-color: #F5F5F5;
}
.jubao-head-top{
    font-size:1.0625rem /* 17/16 */;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
    display:flex;
    justify-content: space-between;
    line-height:2.75rem /* 44/16 */;
    align-items: center;

}
.jubao-head-top img{
    width:.6875rem /* 11/16 */;
    height: 1.25rem /* 20/16 */;
    background-color: aqua
}
</style>
