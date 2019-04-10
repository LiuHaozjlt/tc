<template>
    <div>
        <div class="wode-xiugai">
            <img src="../../image/zuojiantou.png" alt="">
            修改密码
            <div></div>
        </div>
        <div class="jiu">旧密码</div>
        <div class="xin">新密码</div>

        <div class="quedxiug">
            确定
        </div>
    </div>
</template>

<style>
    .wode-xiugai{
        display:flex;
        height: 2.75rem /* 44/16 */;
        align-items: center;
        justify-content: space-between;
        font-size:1.0625rem /* 17/16 */;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(51,51,51,1);
        text-align: center;
    }
    .jiu,.xin{
        font-size:1rem /* 16/16 */;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        padding:1.25rem /* 20/16 */  0  1.25rem /* 20/16 */ 0;
    }
    .quedxiug{
        background-color: #FFB31E;
        border-radius: 1.125rem /* 18/16 */;
        color:white;
        height: 2.25rem /* 36/16 */;
        text-align: center;
        line-height: 2.25rem /* 36/16 */;
    }
</style>
