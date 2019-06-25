<template>
  <HeadFoot class="pg_TheDistribute" :Title="title" :backPath="backPath">
    <template #content>
      <div class="pgtd_h">
        <div class="head_info">
          <div class="user_icon" :style="{backgroudImage:'url('+asd+')'}"></div>
          <div class="user_name">18256097403</div>
          <img src="@/assets/img/distribution/pg_distribute_getout.png" @click="zhuxiao">
        </div>
        <div class="head_panel">
          <router-link to="/onlinewallet" class="panel_l">
            <p>总销售额</p>
            <em>￥12.33333</em>
          </router-link>
          <div class="panel_r">
            <p>余额</p>
            <em>￥12.33333</em>
          </div>
        </div>
      </div>
      <van-cell-group class="pgtd_link">
        <van-cell is-link to="/withdraw">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_tixian.png" alt>
          <em class="cell_title">提现</em>
        </van-cell>
        <van-cell is-link to="/reportform">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_baobiao.png" alt>
          <em class="cell_title">报表</em>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="pgtd_link">
        <van-cell is-link to="/salermember">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_dianzhang.png" alt>
          <em class="cell_title">线上店长</em>
        </van-cell>
        <van-cell is-link to="/customermanage">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_kehu.png" alt>
          <em class="cell_title">客户管理</em>
        </van-cell>
        <van-cell is-link to="/">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_order.png" alt>
          <em class="cell_title">订单管理</em>
        </van-cell>
        <van-cell is-link to="/thecheck">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_shenhe.png" alt>
          <em class="cell_title">线上店长审核</em>
        </van-cell>
      </van-cell-group>
      <div class="apply_wrap">
        <router-link :to="{path:`/applydistribution/0`}" class="apply_l fl">申请线下店长</router-link>
        <router-link :to="{path:`/applydistribution/1`}" class="apply_r fr">申请线上店长</router-link>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Cell, CellGroup, Dialog } from "vant";
export default {
  name: "TheDistribute",
  data() {
    return {
      title: "店长中心",
      backPath: "", //返回路由，可删除
      asd: null
    };
  },
  components: {
    HeadFoot,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog
  },
  methods: {
    zhuxiao() {
      Dialog.confirm({
        message: "你正在注销线上店长身份，是否继续该操作？"
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_TheDistribute {
  padding-top: 46px;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  .pgtd_h {
    width: 100vw;
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    .head_info {
      width: 100%;
      display: flex;
      height: 33px;
      line-height: 33px;
      .user_icon {
        width: 33px;
        height: 33px;
        border-radius: 17px;
        @include myBG;
        background-color: #efefef;
      }
      .user_name {
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
      }
      img {
        width: 17px;
        height: 17px;
        position: relative;
        top: 9px;
      }
    }
    .head_panel {
      margin-top: 12px;
      width: 345px;
      height: 120px;
      margin: 12px auto;
      box-sizing: border-box;
      background: url("~@/assets/img/distribution/pg_distribute_panel.png");
      @include myBG;
      background-color: #efefef;
      padding-top: 34px;
      padding-left: 24px;
      color: #fff;
      font-size: 15px;
      display: flex;
      .panel_l,
      .panel_r {
        flex: 1;
        display: inline-block;
        color: #fff;
        em {
          font-size: 21px;
          margin-top: 24px;
          display: inline-block;
        }
      }
    }
  }
  .pgtd_link {
    margin-top: 10px;
  }
  .cell_icon {
    width: 20px;
    height: 20px;
    position: relative;
    top: -2px;
  }
  .cell_title {
    margin-left: 10px;
  }
  .apply_wrap {
    position: absolute;
    bottom: 28px;
    width: 100vw;
    overflow: hidden;
    padding: 0 15px;
    box-sizing: border-box;
    .apply_l,
    .apply_r {
      width: 163px;
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
      font-size: 15px;
      color: #fff;
      text-align: center;
      background-color: #fd8399;
      box-shadow: 0px 4px 5px 1px rgba(252, 145, 164, 0.35);
      border-radius: 3px;
    }
  }
}
</style>