<template>
  <HeadFoot class="pg_logistics" :Title="title">
    <template #content>
      <div class="pgl_h">
        <div class="pgl_h_l">
          <img src="@/assets/logo.png" alt>
        </div>
        <div class="pgl_h_r">
          <p class="van-ellipsis">韩国代购美艳产品（相宜本草）</p>
          <p class="van-ellipsis">顺丰快递：756245987601</p>
        </div>
      </div>
      <div class="pgl_status">
        <van-steps :active="1" active-color="#ea047b">
          <van-step>已发货</van-step>
          <van-step>运输中</van-step>
          <van-step>派件中</van-step>
          <van-step>已签收</van-step>
        </van-steps>
      </div>
      <div class="pgl_site">
        <van-steps direction="vertical" :active="0" active-color="#ea047b">
          <van-step v-for="i in 6" :key="i">
            <h3>【城市】物流状态1</h3>
            <p>2016-07-12 12:40</p>
          </van-step>
          <van-step>
            <h3>【城市】物流状态2</h3>
            <p>2016-07-11 10:00</p>
          </van-step>
          <van-step>
            <h3>快件已发货</h3>
            <p>2016-07-10 09:30</p>
          </van-step>
        </van-steps>
      </div>
      <div class="pgl_f">
        <!-- <span>申请换货</span> -->
        <span>购物愉快</span>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Step, Steps } from "vant";
export default {
  name: "TheLogistics",
  data() {
    return {
      title: "物流信息"
    };
  },
  components: { HeadFoot, [Step.name]: Step, [Steps.name]: Steps },
  methods: {},
  mounted() {}
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
    height: 395px;
    width: 100vw;
    box-sizing: border-box;
    border-top: 1px dashed #ddd;
    border-bottom: 1px dashed #ddd;
    overflow-y: auto;
    padding: 0 15px;
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