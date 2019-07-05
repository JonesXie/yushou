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
              <img src="@/assets/img/order/pg_pay_wechat.png" alt />
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
              <img src="@/assets/img/order/pg_pay_yue.png" alt />
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
          <van-password-input :value="psw" />
        </div>
        <router-link to="/setpay/1" class="bakanceForget">忘记密码?</router-link>
        <!-- 数字键盘 -->
        <van-number-keyboard @input="onInput" @delete="onDelete" :show="showKeyboard" />
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Radio, RadioGroup, PasswordInput, NumberKeyboard, Popup } from "vant";
import { toPayOrder, balancePay, doPayOrder } from "@/api/order.js";
import { notNull } from "@/layout/methods.js";
import { setTimeout } from "timers";

export default {
  name: "OrderPay",
  data() {
    return {
      title: "支付订单",
      selected: null,
      backPath: "/",
      orderId: null,
      addressId: null,
      goodsBuyNum: null,
      orderPayPrice: null,
      orderNo: null,
      allInfo: null,
      psw: "",
      balanceShow: false,
      showKeyboard: false,
      isSetPayPassword: false,
      needIdentityCard: 0 //0不需要，1需要已填写 2需要未填写
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
          if (this.isSetPayPassword) {
            this.balanceShow = true;
            this.showKeyboard = true;
          } else {
            this.$toast("您尚未设置支付密码");
            setTimeout(() => {
              this.$router.push("/setpay/0");
            }, 2000);
          }
        } else {
          this.doPay();
        }
      } else {
        this.$notify("请选择支付方式");
      }
    },
    //支付成功跳转
    paySuccess() {
      this.$toast.success("支付成功");
      this.$router.replace({
        path: `/paysuccess/${this.selected}/${this.orderPayPrice}/${this.needIdentityCard}`,
        query: {
          orderId: this.orderId,
          addressId: this.addressId
        }
      });
    },

    //余额支付
    yuPay() {
      let _data = {
        orderId: this.orderId,
        password: this.psw
      };
      balancePay(_data).then(({ data }) => {
        if (data.code === 1) {
          this.paySuccess();
        } else {
          this.psw = "";
        }
      });
    },
    //微信支付宝支付
    doPay() {
      let _data = {
        orderId: this.orderId,
        openId: localStorage.getItem("openId"),
        payPlatformType: 2,
        orderPayType: 2
      };
      doPayOrder(_data).then(({ data }) => {
        if (data.code === 1) {
          this.validWX(data.orderStr);
        }
      });
    },
    //验证开启微信jssdk
    validWX(val) {
      if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady(val),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady(val));
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.onBridgeReady(val)
          );
        }
      } else {
        this.onBridgeReady(val);
      }
    },
    //调用微信JSSDK
    onBridgeReady(val) {
      let THAT = this;
      // eslint-disable-next-line
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: val.appId, //公众号名称，由商户传入
          timeStamp: val.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: val.nonceStr, //随机串
          package: val.package,
          signType: val.signType, //微信签名方式：
          paySign: val.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // THAT.getPaySuc(); // 获取支付信息
            THAT.paySuccess();
          } else if (
            res.err_msg == "get_brand_wcpay_request:cancel" ||
            res.err_msg == "get_brand_wcpay_request:fail"
          ) {
            THAT.$toast.fail("支付取消");
            // console.log(res);
          }
        }
      );
    },
    //验证支付
    getPaySuc() {
      this.$http
        .get("/order/checkPaySuccess/?reqsn=" + this.orderId, {
          timeout: 15000
        })
        .then(({ data }) => {
          if (data.code == 200) {
            // clearTimeout(timer);
            this.$toast.success("支付成功");
          } else {
            this.getPayError();
          }
        })
        .catch(() => {
          this.getPayError();
        });
    },
    //捕获异常
    getPayError() {
      this.$toast.fail("支付异常");
    },

    getPayinfo() {
      toPayOrder({ orderId: this.orderId }).then(({ data }) => {
        this.goodsBuyNum = data.data.goodsBuyNum;
        this.orderPayPrice = data.data.orderPayPrice;
        this.orderNo = data.data.orderNo;
        this.isSetPayPassword = data.data.isSetPayPassword;
        this.allInfo = data.data;
      });
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.addressId = this.$route.query.addressId;
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