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
          <van-tab title="全部订单">
            <order-list status="0"></order-list>
          </van-tab>
          <van-tab title="待付款">
            <order-list status="1"></order-list>
          </van-tab>
          <van-tab title="调货中">
            <order-list status="2"></order-list>
          </van-tab>
          <van-tab title="待发货">
            <order-list status="2"></order-list>
          </van-tab>
          <van-tab title="待收货">
            <order-list status="0"></order-list>
          </van-tab>
          <van-tab title="交易成功">
            <order-list status="0"></order-list>
          </van-tab>
        </van-tabs>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import OrderList from "./OrderList";
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Tab, Tabs } from "vant";
export default {
  name: "MyOrder",
  data() {
    return {
      title: "我的订单",
      actived: 0,
      stickTop: 0,
      lineWidth: 60
    };
  },
  components: { HeadFoot, [Tab.name]: Tab, [Tabs.name]: Tabs, OrderList },
  methods: {},
  mounted() {
    if (this.$route.query.active !== undefined) {
      this.actived = this.$route.query.active;
    }
    //顶部菜单固定
    this.$nextTick(() => {
      let rate = document.documentElement.style.fontSize.split("px")[0];
      this.stickTop = Number((rate * 1.22667).toFixed(0));
      this.lineWidth = Number((rate * 1.5).toFixed(0));
    });
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