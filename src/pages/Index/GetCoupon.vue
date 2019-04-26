<template>
  <HeadFoot class="get_coupon" :Title="title">
    <template #content>
      <ul class="gc_ul">
        <li v-for="i in 4" :key="i">
          <div class="gc_li_l">
            <div class="gc_li_l_l">
              ￥
              <span>50</span>
            </div>
            <div class="gc_li_l_r">
              <p>适用品类：箱包满200可用</p>
              <p>使用时间：自领取日十天内有效</p>
            </div>
          </div>
          <div class="gc_li_r">
            <p>点击领取</p>
          </div>
        </li>
      </ul>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "GetCoupon",
  data() {
    return {
      title: "领取优惠券"
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
/* @import url(); */
.get_coupon {
  width: 100vw;
  min-width: 100vh;
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
  .gc_ul {
    width: 100vw;
    // margin-top: 46px;
    padding-top: 46px;
    li {
      width: 348px;
      height: 82px;
      background: url("~@/assets/img/pg_getcoupon_cp.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      margin: 0 auto;
      margin-top: 10px;
    }
    .gc_li_l {
      display: inline-block;
      width: 88%;
      padding: 19px 0;

      .gc_li_l_l {
        display: inline-block;
        color: #ea047b;
        font-size: 14px;
        width: 28%;
        text-align: center;
        span {
          font-size: 36px;
        }
        border-right: 1px solid #ddd;
      }
      .gc_li_l_r {
        display: inline-block;
        font-size: 11px;
        color: #999999;
        padding-left: 14px;
        position: relative;
        top: 3px;
        p:last-child {
          margin-top: 11px;
        }
      }
    }
    .gc_li_r {
      display: inline-block;
      width: 12%;
      font-size: 14px;
      color: #fff;
      height: 74px;
      p {
        width: 50%;
        position: relative;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
      }
    }
  }
}
</style>