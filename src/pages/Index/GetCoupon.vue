<template>
  <div class="get_coupon">
    <van-nav-bar title="领取优惠券" left-arrow :fixed="true" @click-left="$router.back(-1)"></van-nav-bar>
    <ul class="gc_ul">
      <li>
        <div class="gc_li_l">
          <div class="gc_li_l_l">￥50</div>
          <div class="gc_li_l_r">
            <p>适用品类：箱包满200可用</p>
            <p>使用时间：自领取日十天内有效</p>
          </div>
        </div>
        <div class="gc_li_r">
          点击领取
        </div>
      </li>
      
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar } from "vant";
export default {
  name: "GetCoupon",
  data() {
    return {};
  },
  components: { [NavBar.name]: NavBar },
  methods: {
    ...mapActions(["ChangeStatus"])
  },
  mounted() {},
  created() {
    this.ChangeStatus(false);
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
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
    li{
      width: 348px;
      height: 82px;
      background: url('~@/assets/img/pg_getcoupon_cp.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
}
</style>