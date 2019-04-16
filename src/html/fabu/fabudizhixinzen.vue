 <template>
  <div class="dizhi-warp">
    <div class="xinzhen-head">
      <img src="../../image/zuojiantou.png" alt @click="goxuanzedizhi">
      地址
      <div></div>
    </div>
    <div class="dizhi-cent-cont">
      <!-- <div class="dizhi-cent">
        <div class="dizhi-ziliao">姓名</div>
        <input  class="dizhi-ipt" type="text" placeholder="请输入真实姓名">
      </div>-->
      <!-- <div class="dizhi-cent">
        <div class="dizhi-ziliao">联系方式</div>
        <input class="dizhi-ipt" type="text" placeholder="联系方式">
      </div>-->
      <div class="suozai dizhi-cent" @click="popup4">
        <div class="dizhi-ziliao">所在地区</div>
        <input class="dizhi-ipt" type="text" placeholder="所在地区" v-model="region">
        <img src="../../image/jiantoutou.png" alt>
      </div>
      <div class="dizhi-cent">
        <div class="dizhi-ziliao">详细地址</div>
        <input class="dizhi-ipt" type="text" placeholder="详细地址">
      </div>
    </div>
    <!-- <mt-button size="large" @click="popup4">下侧弹出Popup</mt-button> -->
    <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
      <div class="que-qu">
        <div @click="popup4">取消</div>
        <div @click="finish">确定</div>
      </div>

      <!-- <mt-picker  :slots="addressSlots" @change="onAddressChange"
               :visible-item-count="5" class="pik"></mt-picker>
      </mt-popup>-->
      <mt-picker
        ref="region"
        :slots="laosAddressSlots"
        @change="onLaosAddressChange"
        :value-key="isLaos ? 'nameLa' : 'name'"
        :visible-item-count="3"
        class="pik"
      ></mt-picker>
    </mt-popup>
    <!-- <div class="peisong">*部分地区暂不支持配送</div> -->
    <div class="save" @click="adddizhi">保存</div>
  </div>
</template>
<script>
import address from "../../js/areajson";
// import { constants } from 'http2'
let slot1Values = address.map(p => p.label);
let slot2Values = address[0].children.map(p => p.label);
export default {
  name: "Picker",
  data() {
    return {
      popupVisible4: false,
      address: [],
      piackervalue: [],
      laosAddressSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          // content: '-',
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
        // {
        //   divider: true,
        //   // content: '-',
        //   className: 'slot4'
        // },
        // {
        //   flex: 1,
        //   values: [],
        //   className: 'slot5',
        //   textAlign: 'center'
        // }
      ],
      addressSlots: [
        {
          flex: 1,
          values: slot1Values,
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          // content: '-',
          className: "slot2"
        },
        {
          flex: 1,
          values: slot2Values,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          // content: '-',
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      region: ""
    };
  },
  computed: {
    isLaos() {
      return this.$store.state.isLaos;
    }
  },
  mounted() {
    this.getRegion();
  },
  methods: {
    goxuanzedizhi() {
      this.$router.back(-1);
    },
    adddizhi() {
      let token = "TvLz8IoaEw_jI5hAbnJ2aJBFwGo9WiIN_1552026113";
      this.axius
        .get("/apis/v1/user-address", {
          data: {
            goods_type_id: 444444,
            weight: 99,
            send_address_id: 555,
            receive_address_id: 3333,
            code: 4,
            receive_time: 3
          },
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(p => {
          console.log("新整地址", p.data);
        });
    },
    popup4() {
      this.popupVisible4 = !this.popupVisible4;
    },
    finish() {
      let isLaos = this.isLaos;
      this.region = this.piackervalue
        .map(item => {
          if (item) {
            return isLaos ? item.nameLa : item.name;
          } else {
            return "";
          }
        })
        .join("");
      this.popupVisible4 = false;
    },
    onAddressChange(picker, values) {
      this.piackervalue = values;
      let thirdChildren = null;
      let secondObj = address.find(p => p.label == values[0]);
      let secondValue = secondObj.children.map(p => {
        if (p.label == values[1]) {
          thirdChildren = p.children;
        }
        return p.label;
      });
      if (thirdChildren) {
        thirdChildren = thirdChildren.map(p => p.label);
      } else {
        thirdChildren = [];
      }
      picker.setSlotValues(1, secondValue);
      picker.setSlotValues(2, thirdChildren);
    },
    getRegion() {
      this.axius
        .get("/apis/v1/user-address/get-format-region")
        .then(({ data }) => {
          if (data.error_code === 0) {
            this.address = data.data;
            setTimeout(() => {
              this.$refs.region.setSlotValues(0, this.mapRegion(this.address));
              this.$refs.region.setSlotValues(
                1,
                this.mapRegion(this.address[0].children || [])
              );
            }, 0);
          }
        });
    },
    onLaosAddressChange(picker, values) {
      if (this.address.length === 0) return;
      this.piackervalue = values;
      let thirdChildren = [];
      let secondObj = this.address.find(p => p.id == values[0].id);
      let secondValue = secondObj.children || [];
      values[1] &&
        secondValue.some(p => {
          if (p.id == values[1].id) {
            thirdChildren = p.children || [];
            return true;
          }
        });
      picker.setSlotValues(1, this.mapRegion(secondValue));
      picker.setSlotValues(2, this.mapRegion(thirdChildren));
    },
    mapRegion(arr) {
      return arr.map(({ id, name, name_la }) => ({
        id,
        name,
        nameLa: name_la
      }));
    }
  }
};
</script>

<style>
.dizhi-warp {
  background-color: #f5f5f5;
  height: 100vh;
}
.dizhi-cent-cont {
  margin-top: 5%;
}
.dizhi-cent input {
  border: 0;
}
.xinzhen-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.xinzhen-head img {
  width: 0.6875rem /* 11/16 */;
  height: 1.25rem /* 20/16 */;
}
.que-qu {
  display: flex;
  height: 2.8125rem /* 45/16 */;
  line-height: 2.8125rem /* 45/16 */;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e1;
  padding: 0 10%;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.save {
  text-align: center;
  vertical-align: middle;
  border-radius: 1.125rem /* 18/16 */;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
  background-color: #ffb31e;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0.4375rem /* 7/16 */;
  width: 100%;
}
.peisong {
  margin-top: 0.9375rem /* 15/16 */;
  font-size: 0.75rem /* 12/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(240, 25, 25, 1);
  line-height: 20px;
}
.xinzhen-head {
  height: 2.75rem /* 44/16 */;
  display: flex;
  align-items: center;
}
.dizhi-cent {
  display: flex;
  height: 3.4375rem /* 55/16 */;
  /* border:1px solid red; */
  align-items: center;
  height: 3.4375rem;
  background-color: white;
}
.dizhi-ipt {
  margin-bottom: 0 !important;
  text-align: left;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #c3c3c3;
}
.dizhi-ziliao {
  width: 25%;
  font-size: 0.9375rem /* 15/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.suozai {
  display: flex;
}
.suozai img {
  width: 0.5625rem /* 9/16 */;
  height: 1rem /* 16/16 */;
  /* border:1px solid red; */
}
.xinzhen-head {
  background-color: white;
  text-align: center;
  font-size: 1.0625rem /* 17/16 */;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.mint-popup-4 {
  width: 100%;
}
.slot2 {
  display: none;
}
</style>
