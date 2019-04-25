<template>
  <div class="pg_wallet">
    <div class="pgw_h">
      <div class="pgw_h_nav">
        <van-icon name="arrow-left" @click="GoBack()"/>
        <span>账户余额</span>
      </div>
      <div class="pgw_h_content">
        <div class="left">
          <span>我的余额（元）</span>
          <p>123.888</p>
        </div>
        <div class="right">
          <span>我的收益（元）</span>
          <p>123.888</p>
        </div>
      </div>
    </div>
    <div class="pgw_info">
      <div class="left">
        <p>在途金额(元)</p>
        <span>12223.99</span>
      </div>
      <div class="right">
        <p>可提现金额(元)</p>
        <span>12223.99</span>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="交易明细" :icon="mx" is-link to="/walletdetail">
      </van-cell>
      <van-cell title="我要提现" :icon="tx" is-link to="/">
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon, Cell, CellGroup } from "vant";
export default {
  name: "TheWallet",
  data() {
    return {
      mx:require('@/assets/img/components/pg_wallet_mx.png'),
      tx:require('@/assets/img/components/pg_wallet_tx.png')
    };
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
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
$Color: #ea047b;
.pg_wallet {
  min-height: 100vh;
  .pgw_h {
    width: 100vw;
    height: 185px;
    background: url("~@/assets/img/components/pg_wallet_h_bk.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;

    .pgw_h_nav {
      position: relative;
      height: 46px;
      line-height: 46px;
      width: 100%;
      text-align: center;
      overflow: hidden;
      font-size: 16px;
      color: #f4f4f4;
      & /deep/ .van-icon {
        float: left;
        top: 16px;
        left: 15px;
      }
    }
    .pgw_h_content {
      margin-top: 35px;
      width: 100%;
      .left,
      .right {
        display: inline-block;
        width: 50%;
        text-align: center;
        font-size: 12px;
        color: #eeeeee;
        p {
          margin-top: 22px;
          font-size: 36px;
          color: #fff;
        }
      }
    }
  }
  .pgw_info {
    margin: 18px 0;
    width: 100vw;
    .left,
    .right {
      display: inline-block;
      width: 50%;
      height: 21px;
      line-height: 21px;
      box-sizing: border-box;
      position: relative;
      text-align: center;
      p {
        display: inline-block;
        font-size: 11px;
        color: #fc8f93;
        margin-right: 13px;
        position: relative;
        top: -1px;
      }
      span {
        font-size: 18px;
        color: $Color;
      }
    }
    .left::after {
      content: "";
      background: #bd0262;
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      height: 21px;
      width: 1px;
    }
  }
}
</style>