<template>
  <HeadFoot class="pg_confirm" :Title="title" :backPath="backPath">
    <template #content v-if="allInfo">
      <!-- do somethings -->
      <!-- 地址 -->
      <van-cell class="site" is-link @click="turnSite" :center="true" v-if="myAddress">
        <div v-if="JSON.stringify(myAddress) !== '{}'">
          <p class="site_user">
            {{myAddress.addressName}}
            <span>{{myAddress.addressPhone}}</span>
          </p>
          <p class="site_info">{{myAddress.addressArea}}&nbsp;{{myAddress.address}}</p>
        </div>
        <div v-else>暂无收货地址，请添加</div>
      </van-cell>
      <div class="site_bootm"></div>

      <van-cell-group class="order">
        <van-cell class="order_head_home">
          <span>订单编号 {{allInfo.orderNo}}</span>
        </van-cell>
        <div class="detail">
          <img :src="allInfo.goodsImages" alt>
          <div class="wrap">
            <p>{{allInfo.goodsName}}</p>
            <p class="guige">
              {{allInfo.goodsParameter}}
              <span>x{{allInfo.goodsBuyNum}}</span>
            </p>
          </div>
        </div>
        <van-cell title="今日价格">
          <span>￥{{allInfo.newDatePrice}}</span>
        </van-cell>
        <van-cell title="剩余调货周期">
          <span>{{allInfo.inWaitDay}}天</span>
        </van-cell>
      </van-cell-group>

      <div class="guamai">
        <span>是否挂卖</span>
        <van-radio-group v-model="isGuamai" class="guamai_radio">
          <van-radio name="01" checked-color="#ea047b">是</van-radio>
          <van-radio name="02" checked-color="#ea047b">否</van-radio>
        </van-radio-group>
        <van-icon name="question-o" class="guamai_tips" @click="tips=true"/>
      </div>

      <van-cell title="折扣">
        <span class="zhekou">-{{allInfo.discountPrice}}</span>
      </van-cell>
      <van-cell-group class="info">
        <van-cell title="邮费">
          <span>免邮</span>
        </van-cell>
        <van-cell title="配送方式">
          <span>快递配送</span>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="message">
        <van-field
          v-model="message"
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          rows="1"
          autosize
        />
      </van-cell-group>
      <div class="confirm_btn">
        <div class="confirm_btn_H">
          <span>共：{{allInfo.goodsBuyNum}}件</span>
          <em>实付金额：￥{{totalMoney}}</em>
        </div>
        <div class="confirm_btn_F" @click="submit">提交订单</div>
      </div>
      <van-popup v-model="tips" class="tips_wrap">
        <div class="tips_h">
          <img class="tips_img" src="@/assets/img/order/pg_orderconfirm_tips.png" alt>
          <span>选择挂卖可以赚钱哦！</span>
        </div>
        <div class="tips_c">通过挂卖功能，在您等待发货的过程中如若有人购买了您的订单，您将获得订单差价的收益。</div>
        <div class="tip_btn" @click="tips=false">好的</div>
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { toComfirmSellOrder, doSubmitSellOrder } from "@/api/order.js";
import { mapActions } from "vuex";
import { Icon, Cell, CellGroup, Field, RadioGroup, Radio, Popup } from "vant";
import { notNull } from "@/layout/methods.js";
export default {
  name: "GuaConfirm",
  data() {
    return {
      title: "购买订单",
      message: null,
      isGuamai: "02",
      orderId: null,
      allInfo: null,
      myAddress: {},
      backPath: "/",
      tips: false
    };
  },
  components: {
    HeadFoot,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup
  },
  computed: {
    totalMoney() {
      return (
        Number(this.allInfo.newDatePrice) * Number(this.allInfo.goodsBuyNum)
      ).toFixed(2);
    }
  },
  methods: {
    ...mapActions(["setTosite", "setToSitePath"]),
    turnSite() {
      this.setTosite(true);
      this.setToSitePath(`/guaconfirm/${this.orderId}`);
      this.$router.push("/mysite");
    },
    submit() {
      if (notNull(this.myAddress)) {
        let _data = {
          orderId: this.orderId,
          isSale: this.isGuamai,
          addressId: this.myAddress.addressId,
          remarks: this.message
        };
        doSubmitSellOrder(_data).then(({ data }) => {
          if (data.code == "1") {
            this.$router.push({
              path: `/orderpay/${data.orderId}`,
              query: { addressId: this.myAddress.addressId }
            });
          }
        });
      } else {
        this.$notify("请填写收货地址");
      }
    },
    onInit() {
      toComfirmSellOrder({ orderId: this.orderId }).then(({ data }) => {
        this.allInfo = data.data;
        if (this.$store.state.isOrder.fromSite) {
          this.myAddress = this.$store.state.isOrder.siteData;
        } else {
          this.myAddress = data.data.address;
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_confirm {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 46px;
  .zhekou {
    color: $Color;
  }
}
.site {
  .site_user {
    font-size: 15px;
    span {
      font-size: 13px;
      margin-left: 18px;
    }
  }
  .site_info {
    font-size: 13px;
    line-height: 20px;
  }
}
.site_bootm {
  width: 100%;
  height: 4px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background: url("~@/assets/img/order/pg_orderconfirm_bottom.png");
}
.pg_confirm {
  .order {
    .detail {
      width: 100vw;
      padding: 15px;
      box-sizing: border-box;
      background: #f4f4f4;
      display: table-cell;
      img {
        width: 80px;
        height: 80px;
      }
      .wrap {
        overflow: hidden;
        display: inline-block;
        width: 70%;
        margin-left: 4%;
        vertical-align: middle;
        p {
          line-height: 19px;
        }
        .guige {
          font-size: 12px;
          color: #999;
          overflow: hidden;
          margin-top: 12px;
          span {
            float: right;
          }
        }
      }
    }
    .cell-right {
      color: $Color;
    }
  }
  .guamai {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: #f4f4f4;
    position: relative;
    .guamai_radio {
      display: inline-block;
      font-size: 13px;
      & /deep/ .van-radio {
        display: inline-block;
        margin-left: 40px;
      }
    }
    .guamai_tips {
      position: absolute;
      right: 15px;
      top: 15px;
      font-size: 18px;
    }
    span {
      position: relative;
      top: -3px;
    }
  }
  .info {
    margin-top: 8px;
  }
  .message {
    margin-bottom: 105px;
  }
  .tips_wrap {
    width: 310px;
    padding: 17px 15px 15px 15px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    .tips_h {
      font-size: 14px;
      color: #333;
      padding-bottom: 12px;
      border-bottom: 1px dotted #ddd;
      img {
        width: 30px;
        height: 32px;
        margin-right: 14px;
      }
    }
    .tips_c {
      padding: 18px 0;
      font-size: 13px;
      line-height: 20px;
      color: #999999;
    }
    .tip_btn {
      @include btn(65px, 25px);
      border-radius: 5px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
.pg_confirm {
  .confirm_btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 105px;
    box-sizing: border-box;
    background: #fff;
    text-align: center;
    .confirm_btn_H {
      font-size: 14px;
      color: #000;
      padding: 20px;
      span {
        margin-right: 10px;
      }
    }
    .confirm_btn_F {
      @include btn(345px, 40px);
    }
    &::before {
      content: "";
      width: 100%;
      height: 1px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #ddd;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
}
</style>