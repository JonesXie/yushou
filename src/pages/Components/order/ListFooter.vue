<template>
  <div class="mod_listfooter">
    <div class="mol_f" v-if="isShow ==='00'">
      <p class="tips">订单已失效</p>
    </div>
    <!-- 待支付 -->
    <div class="mol_f" v-else-if="isShow ==='01'">
      <p class="count">订单倒计时:{{itemData.hour}}时{{itemData.min}}分{{itemData.s}}秒</p>
      <span class="wuliu" @click="cancelOrder">取消订单</span>
      <span class="check">
        <router-link
          :to="{path:`/orderpay/${itemData.id}`,query:{addressId:itemData.addressId}}"
        >继续支付</router-link>
      </span>
    </div>
    <!-- 调货中 -->
    <div class="mol_f" v-else-if="isShow ==='02'">
      <span class="check" v-if="itemData.orderSellState === '01'" @click="applayGua">申请挂卖</span>
      <span class="check" v-else>
        <router-link :to="{path:'/mysales'}">挂卖中</router-link>
      </span>
    </div>
    <!-- 待发货 -->
    <div class="mol_f" v-else-if="isShow ==='03'">
      <span class="wuliu" v-if="itemData.needIdentityCard == 0">
        <router-link :to="{path:`/logistics/${itemData.id}`}">查看物流</router-link>
      </span>
      <span class="wuliu" v-else>
        <router-link :to="{path:`/editorconfig/`,query:{orderId:itemData.id}}">修改身份信息</router-link>
      </span>
      <span class="check" @click="letDeliver">提醒发货</span>
    </div>
    <!-- 待收货-->
    <div class="mol_f" v-else-if="isShow ==='04'">
      <span class="wuliu">
         <router-link :to="{path:`/logistics/${itemData.id}`}">查看物流</router-link>
      </span>
      <span class="check">确认收货</span>
    </div>
    <!-- 交易成功-->
    <div class="mol_f" v-else-if="isShow ==='99'">
      <span class="check">
        <router-link :to="{path:`/logistics/${itemData.id}`}">查看物流</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import {
  doCancelOrder,
  toConsignmentReminding,
  doTakeDeliveryr
} from "@/api/order.js";
import { doUpdateOrderSell } from "@/api/center.js";
import { Dialog } from "vant";
export default {
  name: "ListFooter",
  props: ["itemData"],
  data() {
    return {
      // 全部：不传 已取消：00 待支付：01 调货中：02 待发货 03 待收货 04 交易成功：100
      isShow: "00"
    };
  },
  components: { [Dialog.name]: Dialog },
  watch: {
    itemData: {
      handler: function() {
        this.isShow = this.itemData.orderState;
      },
      immediate: true
    }
  },
  methods: {
    //  取消订单
    cancelOrder() {
      Dialog.confirm({
        message: "确认取消订单？"
      })
        .then(() => {
          doCancelOrder({ orderId: this.itemData.id }).then(({ data }) => {
            this.$toast(data.msg);
            if (data.code === 1) {
              setTimeout(() => {
                this.$emit("reGet");
              }, 3000);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 申请挂卖
    applayGua() {
      Dialog.confirm({
        message: "确认将当前商品设置成挂卖？"
      })
        .then(() => {
          doUpdateOrderSell({ orderId: this.itemData.id }).then(({ data }) => {
            this.$toast(data.msg);
            if (data.code === 1) {
              setTimeout(() => {
                this.$emit("reGet");
              }, 3000);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 提醒发货
    letDeliver() {
      toConsignmentReminding({ orderId: this.itemData.id }).then(({ data }) => {
        this.$toast(data.msg);
      });
    },
    //确认收货
    deliverConfrim() {
      Dialog.confirm({
        message: "确认已收货？"
      })
        .then(() => {
          doTakeDeliveryr({ orderId: this.itemData.id }).then(({ data }) => {
            this.$toast(data.msg);
            if (data.code === 1) {
              setTimeout(() => {
                this.$emit("reGet");
              }, 3000);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    // console.log;
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.mol_f {
  padding: 11px 15px;
  text-align: right;
  box-sizing: border-box;
  overflow: hidden;
  .tips {
    color: #666;
    width: 100%;
    text-align: left;
    font-size: 16px;
  }
  .count {
    float: left;
    margin-top: 11px;
    font-size: 12px;
    color: #999;
  }
  .wuliu {
    width: 73px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    font-size: 12px;
    color: $Color;
    display: inline-block;
    border: 1px solid $Color;
  }
  .check {
    width: 75px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: $Color;
    border-radius: 5px;
    font-size: 12px;
    color: #fff;
    display: inline-block;
    margin-left: 10px;
    a {
      color: #fff;
    }
  }
}
</style>