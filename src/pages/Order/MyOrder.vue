<template>
  <HeadFoot class="pg_myorder" :Title="title">
    <template #content>
      <div class="pgm_content">
        <van-tabs
          v-model="actived"
          animated
          :line-height="2"
          :line-width="lineWidth"
          title-active-color="#ea047b"
          color="#ea047b"
          title-inactive-color="#666"
          swipeable
          :ellipsis="false"
          class="pgmc_tab"
        >
          <van-tab title="全部订单"></van-tab>
          <van-tab title="待付款"></van-tab>
          <van-tab title="调货中"></van-tab>
          <van-tab title="待发货"></van-tab>
          <van-tab title="待收货"></van-tab>
          <van-tab title="交易成功"></van-tab>
        </van-tabs>
        <order-list :status="deliverData"></order-list>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import OrderList from "@/pages/Components/order/OrderList";
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Tab, Tabs } from "vant";
export default {
  name: "MyOrder",
  data() {
    return {
      title: "我的订单",
      actived: null,
      lineWidth: 60,
      setArr: [null, "01", "02", "03", "04", "101"], // 全部：不传 待支付：01 调货中：02 待发货 03 待收货 04 交易成功：100(回显99 ，传参101）
      deliverData: 0
    };
  },
  watch: {
    actived: {
      handler: function(nv) {
        this.deliverData = this.setArr[nv];
      }
    }
  },
  components: { HeadFoot, [Tab.name]: Tab, [Tabs.name]: Tabs, OrderList },
  methods: {},
  mounted() {
    this.actived = Number(this.$route.params.active);
  }
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pg_myorder {
  .pgm_content {
    padding-top: 46px;
    .pgmc_tab {
      & /deep/ .van-tabs__wrap {
        position: fixed;
        top: 46px;
      }
    }
  }
}
</style>