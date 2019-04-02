<template>
    <div>
        <div class="jifen-warp">
            <div></div>
            <div class="jifmix-head">我的积分</div>
            <div class="jifmix">积分明细</div>
        </div>
        <div class="dangqian-xianz">
            <div class="dangqinjf">
                当前积分
            </div>
            <div class="xianzjif">
                1234积分
            </div>
        </div>
        <div>
            <div class="jif-zuoyon">积分的作用</div>
            <div class="jif-kan">
                积分可用于刷新，置顶发布的信息，让消息展示被更靠前被更多人看到。
            </div>
        </div>
    </div>
</template>

<style>
    .jif-kan{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .jif-zuoyon{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .dangqian-xianz{
        text-align: center;
    }
    .xianzjif{
        padding-top:5%;
        font-size:1.4375rem /* 23/16 */;
        font-family:PingFang-SC-Heavy;
        font-weight:800;
        color:rgba(255,205,97,1);
    }
    .dangqinjf{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .jifen-warp{
        display:flex;
        justify-content: space-between;
    }
    .jifmix-head{
        font-size:1.125rem /* 18/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(33,33,33,1);
    }
    .jifmix{
        font-size:.9375rem /* 15/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
</style>
