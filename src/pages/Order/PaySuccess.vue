<template>
  <HeadFoot class="pg_paysuccess" :Title="title">
    <template #content>
      <div class="pgp_content">
        <div class="pgpc_title">
          <img v-if="payType ===1" src="@/assets/img/order/pg_pay_alipay.png" alt>
          <img v-else-if="payType ===2" src="@/assets/img/order/pg_pay_wechat.png" alt>
          <img v-else src="@/assets/img/order/pg_pay_yue.png" alt>
          <span>支付成功</span>
        </div>
        <div class="pgpc_money">
          <span>￥</span>
          {{price}}.00
        </div>
        <div class="pgpc_btn">
          <div class="pgpc_btn1" @click="$router.replace('/myorder/0')">查看详情</div>
          <div class="pgpc_btn2" @click="$router.push('/index')">回到首页</div>
        </div>
        <div class="pgpc_tips">温馨提示：一切冒充我平台工作人员的第三方皆为诈骗，如遇到问题，请致电0551-65156891。</div>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "PaySuccess",
  data() {
    return {
      title: "支付成功",
      price: 0,
      payType: 0
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {
    this.price = this.$route.params.price;
    this.payType = this.$route.params.payType;
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_paysuccess {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 46px;
  .pgp_content {
    margin-top: 7px;
    padding: 17px 20px;
    width: 100vw;
    box-sizing: border-box;
    background: #fff;
    .pgpc_title {
      text-align: center;
      font-size: 19px;
      color: #000;
      margin-top: 10px;
      img {
        width: 25px;
        height: 25px;
      }
      span {
        position: relative;
        top: 3px;
        margin-left: 16px;
      }
    }
    .pgpc_money {
      padding: 20px 0 39px 0;
      font-size: 21px;
      color: #000;
      text-align: center;
      font-weight: bold;
      span {
        font-size: 14px;
      }
    }
    .pgpc_btn {
      text-align: center;
      .pgpc_btn1 {
        display: inline-block;
        width: 90px;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        text-align: center;
        line-height: 30px;
        color: #999;
        border-radius: 15px;
        margin-right: 40px;
      }
      .pgpc_btn2 {
        @include btn(90px, 30px);
      }
    }
    .pgpc_tips {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
      line-height: 16px;
    }
  }
}
</style>