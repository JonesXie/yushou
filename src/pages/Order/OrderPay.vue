<template>
  <HeadFoot class="pg_orderpay" :Title="title" :backPath="backPath">
    <template #content>
      <div class="pgo_head">支付方式</div>
      <van-radio-group v-model="selected" class="pgo_content">
        <!-- 支付宝 -->
        <!-- <van-radio class="pgo_li" :name="1">
          <div
            slot="icon"
            slot-scope="props"
            :class="['pgo_li_item',props.checked ? 'active' : '']"
          >
            <div class="pgo_li_img">
              <img src="@/assets/img/order/pg_pay_alipay.png" alt>
            </div>
            <p class="pgo_li_type">支付宝</p>
            <p class="pgo_li_info">推荐有支付宝用户</p>
          </div>
        </van-radio>-->
        <!-- 微信 -->
        <van-radio class="pgo_li" :name="2">
          <div
            slot="icon"
            slot-scope="props"
            :class="['pgo_li_item',props.checked ? 'active' : '']"
          >
            <div class="pgo_li_img">
              <img src="@/assets/img/order/pg_pay_wechat.png" alt>
            </div>
            <p class="pgo_li_type">微信支付</p>
            <p class="pgo_li_info">微信快捷支付</p>
          </div>
        </van-radio>
        <!-- 余额 -->
        <van-radio class="pgo_li" :name="0">
          <div
            slot="icon"
            slot-scope="props"
            :class="['pgo_li_item',props.checked ? 'active' : '']"
          >
            <div class="pgo_li_img">
              <img src="@/assets/img/order/pg_pay_yue.png" alt>
            </div>
            <p class="pgo_li_type">余额支付</p>
            <p class="pgo_li_info">使用余额支付</p>
          </div>
        </van-radio>
      </van-radio-group>
      <div class="pay_info">
        <span>共：{{goodsBuyNum}}件</span>
        <em>总金额：￥{{orderPayPrice}}.00</em>
      </div>
      <div class="pay_submit" @click="submit">支付</div>

      <!-- 键盘输入密码 -->
      <van-popup v-model="balanceShow" class="balanceWrap" :lock-scroll="true" position="bottom">
        <!-- 密码输入框 -->
        <div class="balanceInput">
          <van-password-input :value="psw"/>
        </div>
        <router-link to="/setpay/1" class="bakanceForget">忘记密码?</router-link>
        <!-- 数字键盘 -->
        <van-number-keyboard @input="onInput" @delete="onDelete" :show="showKeyboard"/>
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Radio, RadioGroup, PasswordInput, NumberKeyboard, Popup } from "vant";
import { toPayOrder, balancePay } from "@/api/order.js";
import { notNull } from "@/layout/methods.js";

export default {
  name: "OrderPay",
  data() {
    return {
      title: "支付订单",
      selected: null,
      backPath: "/",
      orderId: null,
      goodsBuyNum: null,
      orderPayPrice: null,
      orderNo: null,
      allInfo: null,
      psw: "",
      balanceShow: false,
      showKeyboard: false
    };
  },
  components: {
    HeadFoot,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Popup.name]: Popup
  },
  watch: {
    psw: {
      handler: function() {
        if (this.psw.length === 6) {
          this.yuPay();
        }
      }
    }
  },
  methods: {
    onInput(key) {
      this.psw = (this.psw + key).slice(0, 6);
    },
    onDelete() {
      this.psw = this.psw.slice(0, this.psw.length - 1);
    },
    submit() {
      if (notNull(this.selected)) {
        if (this.selected == "0") {
          this.balanceShow = true;
          this.showKeyboard = true;
        } else {
          this.doPay();
        }
      } else {
        this.$notify("请选择支付方式");
      }
    },
    //余额支付
    yuPay() {
      let _data = {
        orderId: this.orderId,
        password: this.psw
      };
      balancePay(_data).then(({ data }) => {
        if (data.code === 1) {
          this.$router.replace(
            `/paysuccess/${this.selected}/${this.orderPayPrice}`
          );
        } else {
          this.psw = "";
        }
      });
    },
    doPay() {
      this.$notify("该功能正在实现");
    },
    getPayinfo() {
      toPayOrder({ orderId: this.orderId }).then(({ data }) => {
        this.goodsBuyNum = data.data.goodsBuyNum;
        this.orderPayPrice = data.data.orderPayPrice;
        this.orderNo = data.data.orderNo;
        this.allInfo = data.data;
      });
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getPayinfo();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_orderpay {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 46px 15px;
  background: #fff;
  .pgo_head {
    font-size: 13px;
    margin-top: 25px;
  }
  .pgo_content {
    margin-top: 12px;
  }
  .pgo_li {
    & /deep/ .van-radio__icon {
      height: auto;
      width: 100%;
    }
  }
  .pgo_li_item {
    padding: 12px 13px;
    border: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 10px;
    .pgo_li_img {
      flex: my-percent(27, 319);
      text-align: left;
      img {
        width: 27px;
        height: 27px;
      }
    }
    .pgo_li_type {
      flex: my-percent(100, 319);
      text-align: center;
      font-size: 14px;
      color: #000;
      padding-top: 6px;
    }
    .pgo_li_info {
      flex: my-percent(192, 319);
      text-align: center;
      font-size: 14px;
      padding-top: 6px;
      color: #999;
      border-left: 1px solid #ddd;
    }
    &.active {
      border: 1px solid $Color;
    }
  }
  .pay_info {
    font-size: 14px;
    color: #000;
    text-align: center;
    margin: 15px 0;
    em {
      margin-left: 10px;
    }
  }
  .pay_submit {
    @include btn(100%, 40px);
  }
}
.balanceWrap {
  width: 100vw;
  height: 46vh;
  overflow: hidden;
  box-sizing: border-box;
  .balanceInput {
    & /deep/ .van-password-input {
      margin: 0;
    }
  }
  .bakanceForget {
    width: 100%;
    color: $Color;
    text-align: center;
    font-size: 14px;
    margin: 2vh 0;
    display: inline-block;
  }
}
</style>