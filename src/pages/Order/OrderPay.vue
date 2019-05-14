<template>
  <HeadFoot class="pg_orderpay" :Title="title">
    <template #content>
      <div class="pgo_head">支付方式</div>
      <van-radio-group v-model="selected" class="pgo_content">
        <van-radio class="pgo_li" :name="0">
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
        </van-radio>
        <van-radio class="pgo_li" :name="1">
          <div
            slot="icon"
            slot-scope="props"
            :class="['pgo_li_item',props.checked ? 'active' : '']"
          >
            <div class="pgo_li_img">
              <img src="@/assets/img/order/pg_pay_wechat.png" alt>
            </div>
            <p class="pgo_li_type">微信支付</p>
            <p class="pgo_li_info">微信快捷支付</p>
          </div>
        </van-radio>
        <van-radio class="pgo_li" :name="2">
          <div
            slot="icon"
            slot-scope="props"
            :class="['pgo_li_item',props.checked ? 'active' : '']"
          >
            <div class="pgo_li_img">
              <img src="@/assets/img/order/pg_pay_yue.png" alt>
            </div>
            <p class="pgo_li_type">余额支付</p>
            <p class="pgo_li_info">使用余额支付</p>
          </div>
        </van-radio>
      </van-radio-group>
      <div class="pay_info">
        <span>共：2件</span>
        <em>总金额：￥4137</em>
      </div>
      <div class="pay_submit" @click="submit">支付</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Radio, RadioGroup } from "vant";
export default {
  name: "OrderPay",
  data() {
    return {
      title: "支付订单",
      selected: null
    };
  },
  components: { HeadFoot, [Radio.name]: Radio, [RadioGroup.name]: RadioGroup },
  methods: {
    submit(){
      this.$router.push({path:'/paysuccess',query:{id:'132'}})
    }
  },
  mounted() {}
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
    &.active{
      border: 1px solid $Color;
    }
  }
  .pay_info{
    font-size: 14px;
    color: #000;
    text-align: center;
    margin: 15px 0 ;
    em{
      margin-left: 10px;
    }
  }
  .pay_submit{
    @include btn(100%,40px);
  }
}
</style>