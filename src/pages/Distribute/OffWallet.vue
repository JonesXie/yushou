<template>
  <div class="pg_OnlineWallet pg_SalerManege">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()" />
      <span>{{title}}</span>
    </div>
    <div class="head_bg"></div>
    <!-- content -->
    <div class="pg_model_content">
      <ul class="pgow_hlist">
        <li :class="['pgow_hlist_li',actived===0?'active':'']" @click="actived=0">我的收益</li>
        <!-- <li :class="['pgow_hlist_li',actived===1?'active':'']" @click="actived=1">线上店长收益</li> -->
        <li :class="['pgow_hlist_li',actived===2?'active':'']" @click="actived=2">提现记录</li>
      </ul>
      <div class="list_wrap">
        <real-profit v-if="actived===0" />
        <saler-profit v-if="actived===1" />
        <withdraw-record v-if="actived===2" />
      </div>
    </div>
  </div>
</template>

<script>
import RealProfit from "@/pages/Components/distribute/RealProfit.vue";
import SalerProfit from "@/pages/Components/distribute/SalerProfit.vue";
import WithdrawRecord from "@/pages/Components/distribute/WithdrawRecord.vue";
import { mapActions } from "vuex";
import { Icon } from "vant";
export default {
  name: "OffWallet",
  data() {
    return {
      title: "店长钱包",
      actived: 0
    };
  },
  components: {
    [Icon.name]: Icon,
    SalerProfit,
    RealProfit,
    WithdrawRecord
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    }
  },
  mounted() {
    this.ChangeStatus(false);
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_SalerManege {
  position: relative;
  width: 100vw;
  .head_bg {
    width: 100vw;
    height: 125px;
    background: url("~@/assets/img/distribution/ly_distribute_bg.png");
    @include myBG;
    position: fixed;
    top: 0;
    left: 0;
  }
}
.pg_h_nav {
  position: fixed;
  height: 46px;
  line-height: 46px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  color: #f4f4f4;
  background: url("~@/assets/img/distribution/ly_distribute_bg.png");
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 999;
  & /deep/ .van-icon {
    float: left;
    top: 16px;
    left: 15px;
  }
}
.pg_model_content {
  width: 100vw;
  position: absolute;
  top: 30px;
  .pgow_hlist {
    width: 100vw;
    display: flex;
    text-align: center;
    margin-top: 28px;

    .pgow_hlist_li {
      flex: 1;
      position: relative;
      font-size: 13px;
      color: #f4f4f4;
      padding-bottom: 7px;
      &.active::after {
        content: "";
        position: absolute;
        width: 35%;
        height: 1px;
        background: #fff;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .list_wrap {
    padding-top: 16px;
    width: 100vw;
    height: calc(100vh - 88px);
    overflow-y: scroll;
    box-sizing: border-box;
  }
}
</style>