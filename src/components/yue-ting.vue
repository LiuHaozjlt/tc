<template>
    <div>
        <div class="yue">
            <div class="yue-left">
                <div>*</div>
                <div>月租金</div>
            </div>

            <div>
                <div class="yue-rit">
                    <input type="text" placeholder="0">
                    <div class="yue-rit-rit">
                        <div>kip</div>
                        <div>></div>
                    </div>
                </div>
            </div>
        </div>

         <div class="yue">
            <div class="yue-left">
                <div>*</div>
                <div>装修</div>
            </div>

            <div>
                <div class="yue-rit">
                    <input type="text" placeholder="0">
                    <div class="yue-rit-rit">
                        <div class="qinze">请选择</div>
                        <div>></div>
                    </div>
                </div>
            </div>
        </div>

         <div class="yue">
            <div class="yue-left">
                <div>*</div>
                <div>厅金</div>
            </div>

            <div>
                <div class="yue-rit">
                    <input type="text" placeholder="0">
                    <div class="yue-rit-rit">
                        <div class="qinze">请选择</div>
                        <div>></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.qinze{
    font-size:.9375rem /* 15/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(195,195,195,1);
}
.yue-left div:nth-child(2){
    font-size:.9375rem /* 15/16 */;
font-family:PingFang-SC-Medium;
font-weight:500;
color:#333333;
}
.yue{
    display:flex;
}
.yue-left{
    display: flex;
}
.yue-rit{
    display:flex;
}
.yue-rit-rit{
    display:flex;
}
</style>
