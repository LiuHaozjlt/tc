<template>
    <div>
        <div class="lishi-head-warp">
            <div class="lishi-head"><input type="text" placeholder="请输入你"></div>
            <div class="lishi-qux">取消</div>
        </div>
        <div class="lishi-sou">
            历史搜索
        </div>

        <div class="lishi">两房一套</div>
        <div class="lishi">泊水街活动</div>
    </div>
</template>

<style>
    .lishi-sou{
        padding-bottom: 1.0625rem /* 17/16 */;
    }
    .lishi{
        font-size:.875rem /* 14/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        padding-bottom: .9375rem /* 15/16 */
    }
    .lishi-sou{
        font-size:.6875rem /* 11/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(153,153,153,1);
    }
    .lishi-qux{
        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
    }
    .lishi-head-warp div{
        line-height: 3.75rem /* 60/16 */;
    }
    .lishi-head-warp{
        height: 3.75rem /* 60/16 */;
        display: flex;
        align-items: center;
        justify-content:space-between;
    }
    .lishi-head input{
        font-size:.8125rem /* 13/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
    }
</style>
