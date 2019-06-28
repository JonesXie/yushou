<template>
  <HeadFoot class="pg_logistics" :Title="title">
    <template #content v-if="logisticsInfo!==null">
      <div class="pgl_h" v-if="orderInfo!==null">
        <div class="pgl_h_l">
          <img :src="orderInfo.goodsImages" alt>
        </div>
        <div class="pgl_h_r">
          <p class="van-ellipsis">{{orderInfo.goodsName}}</p>
          <p class="van-ellipsis">{{logisticsInfo.expTextName}}：{{orderInfo.expressNo}}</p>
        </div>
      </div>
      <div class="pgl_status">
        <van-steps :active="logisticsInfo.status" active-color="#ea047b">
          <van-step>已发货</van-step>
          <van-step>运输中</van-step>
          <van-step>派件中</van-step>
          <van-step>已签收</van-step>
        </van-steps>
      </div>
      <div class="pgl_site">
        <van-steps
          direction="vertical"
          :active="0"
          active-color="#ea047b"
          v-if="logisticsInfo.data.length >0"
        >
          <van-step v-for="(v,i) in logisticsInfo.data" :key="i">
            <h3>{{v.context}}</h3>
            <p>{{v.time}}</p>
          </van-step>
        </van-steps>
        <van-steps direction="vertical" v-else class="none">
          <van-step>暂无物流信息</van-step>
        </van-steps>
      </div>
      <!-- <div class="pgl_f">
        <span>申请换货</span>
      </div>-->
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Step, Steps } from "vant";
import { selectOrderLogistics } from "@/api/order.js";
export default {
  name: "TheLogistics",
  data() {
    return {
      title: "物流信息",
      orderId: null,
      logisticsInfo: null,
      orderInfo: null
    };
  },
  components: { HeadFoot, [Step.name]: Step, [Steps.name]: Steps },
  methods: {
    getInit() {
      selectOrderLogistics({ orderId: this.orderId }).then(({ data }) => {
        if (data.code === 1) {
          this.logisticsInfo = data.data.logistics;
          this.orderInfo = data.data.order;
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_logistics {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  box-sizing: border-box;
  padding-top: 46px;
  & /deep/ .van-nav-bar {
    z-index: 9 !important;
  }
  .pgl_h {
    width: 100vw;
    box-sizing: border-box;
    background: $Color;
    padding: 15px;
    overflow: hidden;
    .pgl_h_l {
      width: 58px;
      height: 58px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pgl_h_r {
      float: left;
      height: 58px;
      margin-left: 18px;
      font-size: 14px;
      color: #fff;
      box-sizing: border-box;
      padding-top: 3px;
      p:last-child {
        margin-top: 18px;
      }
    }
  }
  .pgl_status {
    height: 82px;
    width: 100vw;
    padding: 14px 15px;
    box-sizing: border-box;
  }
  .pgl_site {
    // height: 395px;
    width: 100vw;
    box-sizing: border-box;
    border-top: 1px dashed #ddd;
    border-bottom: 1px dashed #ddd;
    overflow-y: auto;
    padding: 0 15px;
    p {
      margin-top: 5px;
    }
  }
  .pgl_f {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 56px;
    line-height: 56px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 15px;
    span {
      display: inline-block;
      width: 73px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: #fff;
      border-radius: 5px;
      font-size: 12px;
      color: $Color;
      border: 1px solid $Color;
    }
  }
}
</style>