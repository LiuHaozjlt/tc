<template>
    <div>
        <div>
            <div class="tudijiaoyi">土地交易</div>
             <div  v-for="(item,index) in seller " :key="index">
            <!-- {{myrelease}} -->
            <div class="pinpai-cent">
                <div class="fang-icon">
                      <img :src="item.img">
                </div>
                <div>
                    <div class="gongsi">丐萝贸易公司</div>
                    <div class="gon-yuan">共有{{item.seller_release_id}}套房源</div>
                </div>
                <div>
                    <div>v企业</div>
                    <div>ssssfafsf</div>
                </div>
            </div>
            <div class="pinpai-cent-bot">
                <div>
                    <div class="pinp-cent-top">进装修意识一套</div>
                    <div class="kip">5.000.000</div>
                    <div class="pinp-cent-bot"><img src="" alt=""></div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
