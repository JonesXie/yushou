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
          <van-icon name="wap-home"/>
          <span>{{allInfo.storeName}}</span>
        </van-cell>
        <div class="detail">
          <img :src="allInfo.goodsImages" alt>
          <div class="wrap">
            <p>{{allInfo.goodsName}}</p>
            <p class="guige">
              {{allInfo.goodsParams}}
              <span>￥{{allInfo.goodsSalePrice}}.00</span>
            </p>
          </div>
        </div>
        <van-cell title="调货周期">
          <span>{{allInfo.goodsWaitDays}}天</span>
        </van-cell>
        <van-cell title="购买数量">
          <span>{{allInfo.buyCount}}件</span>
        </van-cell>
      </van-cell-group>
      <div class="guamai">
        <span>是否挂卖</span>
        <van-radio-group v-model="isGuamai" class="guamai_radio">
          <van-radio name="1" checked-color="#ea047b">是</van-radio>
          <van-radio name="0" checked-color="#ea047b">否</van-radio>
        </van-radio-group>
        <van-icon name="question-o" class="guamai_tips" @click="tips=true"/>
      </div>
      <van-cell title="发货时间">
        <span>{{allInfo.goodsDeliverytime}}</span>
      </van-cell>
      <van-cell-group class="info">
        <van-cell title="优惠券" is-link value="可优惠"></van-cell>
        <!-- <van-cell title="平台补助" clickable @click="buzhu=!buzhu">
          <van-icon name="checked" v-if="buzhu" class="buzhu passed"/>
          <van-icon name="circle" v-else class="buzhu"/>
        </van-cell>-->
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
        <div class="confirm_btn_L">￥{{totalMoney}}</div>
        <div class="confirm_btn_R" @click="submit">提交订单</div>
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
import { notNull } from "@/layout/methods.js";
import { Icon, Cell, CellGroup, Field, RadioGroup, Radio, Popup } from "vant";
import { mapActions } from "vuex";
export default {
  name: "OrderConfirm",
  data() {
    return {
      title: "确认订单",
      message: null,
      isGuamai: "0",
      // buzhu: false,//平台补助
      tips: false,
      allInfo: null,
      myAddress: null,
      backPath: "/"
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
        Number(this.allInfo.goodsSalePrice) * Number(this.allInfo.buyCount)
      ).toFixed(2);
    }
  },
  methods: {
    ...mapActions(["setTosite"]),
    turnSite() {
      this.setTosite(true);
      this.$router.push("/mysite");
    },
    submit() {
      this.$router.push({ path: "/orderpay", query: { id: "132" } });
    }
  },
  created() {
    let isOrder = this.$store.state.isOrder;
    if (notNull(isOrder.confirmInfo)) {
      this.allInfo = isOrder.confirmInfo;
      this.backPath = `/goods/${isOrder.confirmInfo.id}`;
      if (isOrder.fromSite) {
        this.myAddress = isOrder.siteData;
      } else {
        this.myAddress = isOrder.confirmInfo.address;
      }
    } else {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_confirm {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 46px;
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
    margin-top: 10px;
    .order_head_home {
      font-size: 13px;
      color: #333;
      & /deep/ .van-icon {
        font-size: 18px;
        position: relative;
        top: 3px;
        margin-right: 10px;
      }
    }

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
            color: $Color;
            font-size: 14px;
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
    .buzhu {
      font-size: 17px;
      position: relative;
      top: 3px;
      &.passed {
        color: $Color;
      }
    }
  }
  .message {
    margin-top: 8px;
    margin-bottom: 50px;
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
    height: 48px;
    line-height: 48px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
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
    .confirm_btn_L {
      flex: 3;
      font-size: 17px;
      color: $Color;
      padding-left: 10px;
    }
    .confirm_btn_R {
      flex: 2;
      background: $Color;
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>