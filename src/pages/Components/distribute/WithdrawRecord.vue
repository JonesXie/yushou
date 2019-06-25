//提现记录
<template>
  <div class="pg_WithdrawRecord">
    <div class="list_li" v-for="(v,i) in dataList" :key="i">
      <p class="li_title van-hairline--bottom">
        2019-4-4 14:20:09
        <em class="fr">支付提现成功</em>
      </p>
      <div class="li_info">
        <p class="li_info_l">提现总金额</p>
        <p class="li_info_l">手续费金额（手续费比例）</p>
      </div>
      <div class="li_money">
        <p class="li_info_l">￥4288.0</p>
        <p class="li_info_l">￥4.0（0.75%）</p>
      </div>
      <div class="li_info">
        <p class="li_info_l">实际到账金额</p>
        <p class="li_info_l">平台股份分红</p>
      </div>
      <div class="li_money">
        <p class="li_info_l">￥4288.0</p>
        <p class="li_info_l">￥2144.0（50%）</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WithdrawRecord",
  data() {
    return {
      dataList: [1, 3, 5, 6, 7]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_WithdrawRecord {
  .list_li {
    background: #fff;
    width: 345px;
    height: 175px;
    margin: 0 auto 10px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 0px #999;
    padding: 0 26px;
    .li_title {
      overflow: hidden;
      padding: 16px 0 14px;
      em {
        color: $Color;
      }
    }
    .li_info {
      width: 100%;
      display: flex;
      font-size: 12px;
      color: #999;
      margin: 17px 0 11px;
    }
    .li_money {
      width: 100%;
      display: flex;
      font-size: 13px;
      color: #666;
      font-weight: bold;
    }
    .li_info_l {
      flex: 1;
    }
    .li_info_r {
      flex: 1;
    }
  }
}
</style>