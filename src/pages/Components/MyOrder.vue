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
          sticky
          :offset-top="stickTop"
          :ellipsis="false"
        >
          <van-tab title="全部订单">内容1</van-tab>
          <van-tab title="待付款">内容2</van-tab>
          <van-tab title="调货中">内容 3</van-tab>
          <van-tab title="待发货">内容 4</van-tab>
          <van-tab title="待收货">内容 4</van-tab>
          <van-tab title="交易成功">内容 4</van-tab>
        </van-tabs>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Tab, Tabs } from "vant";
export default {
  name: "MyOrder",
  data() {
    return {
      title: "我的订单",
      actived: 0,
      stickTop:0,
      lineWidth:60
    };
  },
  components: { HeadFoot, [Tab.name]: Tab, [Tabs.name]: Tabs },
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
  }
}
</style>