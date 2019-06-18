<template>
  <div class="mod_paramschoose">
    <div class="params_info">
      <van-icon name="close" class="params_close" @click="closePop"/>
      <div class="img_wrap" :style="{backgroundImage:'url('+paramsImg+')'}"></div>
      <div class="pi_right">
        <p class="pir_price">
          ￥
          <span>{{currentPrice}}</span>
        </p>
        <span class="pir_remain">库存{{currentRemain}}件</span>
        <p>{{chooseParams.join(";")}}</p>
      </div>
    </div>
    <!-- 参数 -->
    <div class="params_type" v-for="(v,i) in paramsList" :key="i">
      <div class="pt_head">{{v.name}}</div>
      <van-radio-group v-model="chooseParams[i]" class="pt_content" @change="radioChange(i)">
        <van-radio
          class="ptc_li"
          v-for="(val,ind) in v.ymParameterVOS"
          :key="ind"
          @click="radioClick(i,ind)"
          :name="val.name"
        >
          <div
            slot="icon"
            slot-scope="props"
            :class="['ptc_li_item',props.checked ? 'active' : 'normal']"
          >{{val.name}}</div>
        </van-radio>
      </van-radio-group>
    </div>

    <div class="params_number">
      <span>数量</span>
      <van-stepper v-model="number" :integer="true" class="pn_input" :min="1" :max="currentRemain"/>
    </div>
    <div class="params_comfirm" @click="paramsComfirm">确认</div>
  </div>
</template>

<script>
import { Icon, Radio, RadioGroup, Stepper } from "vant";
import { toComfirmOrder } from "@/api/goods.js";
import { mapActions } from "vuex";
export default {
  name: "ParamsChoose",
  props: ["paramsList", "paramsLimit", "isType"],
  data() {
    return {
      chooseParams: [],
      skuId: null,
      number: 1,
      currentPrice: 0,
      currentRemain: 0,
      paramsImg: require("@/assets/img/goods/pg_goodstype_goods.png")
    };
  },
  components: {
    [Icon.name]: Icon,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Stepper.name]: Stepper
  },
  methods: {
    ...mapActions(["setInfo"]),
    //选择
    radioChange(val) {
      if (val == 0) {
        if (this.isType === "yu") {
          this.currentPrice = this.paramsLimit[0].skuBasicPrice;
        } else {
          this.currentPrice = this.paramsLimit[0].skuPeakPrice;
        }
        this.currentRemain = this.paramsLimit[0].skuInventory;
        this.paramsImg = this.paramsList[0].ymParameterVOS[0].img;
        this.skuId = this.paramsLimit[0].id;
      }
    },
    //选择
    radioClick(i, ind) {
      if (i == 0) {
        if (this.isType === "yu") {
          this.currentPrice = this.paramsLimit[ind].skuBasicPrice;
        } else {
          this.currentPrice = this.paramsLimit[ind].skuPeakPrice;
        }
        this.currentRemain = this.paramsLimit[ind].skuInventory;
        this.paramsImg = this.paramsList[i].ymParameterVOS[ind].img;
        this.skuId = this.paramsLimit[ind].id;
      }
    },
    //关闭弹窗
    closePop() {
      this.$emit("closeBtn");
    },
    //确认
    paramsComfirm() {
      let _data = {
        goodsId: this.paramsLimit[0].goodsId,
        goodsParam: this.chooseParams[0],
        goodsModel: this.chooseParams[1],
        skuId: this.skuId,
        buyType: this.isType === "yu" ? 0 : 1
      };
      toComfirmOrder(_data).then(({ data }) => {
        if (data.code === 1) {
          data.data.buyCount = this.number;
          this.setInfo(data.data);
          this.$router.push({ path: "/orderconfirm" });
        }
      });
    }
  },
  mounted() {
    this.paramsList.forEach(v => {
      this.chooseParams.splice(
        this.chooseParams.length,
        0,
        v.ymParameterVOS[0].name
      );
    });
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.mod_paramschoose {
  padding: 15px 12px 0;
}
.params_pop {
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 15px 15px 0 15px;
  box-sizing: border-box;
  .params_info {
    display: table;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
    .img_wrap {
      display: inline-block;
      width: 90px;
      height: 90px;
      background-color: #f4f4f4;
      border-radius: 5px;
      box-sizing: border-box;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      margin-right: 18px;
    }
    .pi_right {
      display: table-cell;
      vertical-align: middle;
      width: 69%;
      font-size: 12px;
      .pir_price {
        color: $Color;
        font-size: 12px;
        span {
          font-size: 16px;
        }
      }
      .pir_remain {
        display: inline-block;
        margin: 10px 0;
        font-size: 11px;
        color: #999;
      }
    }
    .params_close {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 19px;
      color: #ccc;
    }
  }
  .pt_content {
    margin-top: 10px;
  }
  .params_type {
    // margin-top: 30px;
    width: 100%;
    .pt_head {
      font-size: 14px;
      color: #333;
    }
    .ptc_li {
      display: inline-block;
      margin-bottom: 15px;
      margin-right: 15px;
      & /deep/ .van-radio__icon {
        height: auto;
      }
    }
    .ptc_li_item {
      border-radius: 3px;
      box-sizing: border-box;
      padding: 7px 16px;
      font-size: 12px;
      box-sizing: border-box;
      &.active {
        color: #fff;
        background-color: $Color;
      }
      &.normal {
        color: #333;
        background-color: #f5f5f5;
      }
    }
  }
  .params_number {
    padding: 10px 0;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    position: relative;
    &::before {
      content: ".";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #ddd;
    }
    &::after {
      content: ".";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #ddd;
    }
    .pn_input {
      float: right;
    }
  }
  .params_comfirm {
    @include btn(100%, 40px);
    margin: 10px 0;
  }
}
</style>