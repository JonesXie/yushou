<template>
  <HeadFoot class="pg_TheDistribute" :Title="title" :backPath="backPath">
    <template #content v-if="initInfo">
      <div class="pgtd_h">
        <div class="head_info">
          <div class="user_icon" :style="{backgroundImage:'url('+initInfo.userImg+')'}"></div>
          <div class="user_name">{{initInfo.userName}}</div>
          <img
            src="@/assets/img/distribution/pg_distribute_getout.png"
            @click="zhuxiao"
            v-if="status"
          />
        </div>
        <router-link :to="{path:type?'offwallet':'onwallet'}" class="head_panel">
          <div class="panel_l">
            <p>总销售额</p>
            <em>￥{{initInfo.userDistributorAccount.profit}}</em>
          </div>
          <div class="panel_r">
            <p>余额</p>
            <em>￥{{initInfo.userDistributorAccount.balance}}</em>
          </div>
        </router-link>
      </div>
      <van-cell-group class="pgtd_link">
        <van-cell is-link to="/withdraw">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_tixian.png" alt />
          <em class="cell_title">提现</em>
        </van-cell>
        <van-cell is-link to="/reportform">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_baobiao.png" alt />
          <em class="cell_title">报表</em>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="pgtd_link">
        <!-- 线下店长才有 -->
        <van-cell is-link to="/onlineshopowner" v-if="!type">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_dianzhang.png" alt />
          <em class="cell_title">线上店长</em>
        </van-cell>

        <van-cell is-link to="/customermanage">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_kehu.png" alt />
          <em class="cell_title">客户管理</em>
        </van-cell>
        <van-cell is-link :to="{path:type?'/offdistributeorder':'/distributeorder'}">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_order.png" alt />
          <em class="cell_title">订单管理</em>
        </van-cell>

        <!-- 线下店长才有 -->
        <van-cell is-link to="/thecheck" v-if="!type">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_shenhe.png" alt />
          <em class="cell_title">线上店长审核</em>
          <div class="num_icon" slot="right-icon">{{num}}</div>
        </van-cell>
        <!-- 线下店长才有 -->
        <van-cell is-link to="/labeldownload" v-if="!type">
          <img class="cell_icon" src="@/assets/img/distribution/pg_distribute_downlaod.png" alt />
          <em class="cell_title">商品标价签下载</em>
        </van-cell>
      </van-cell-group>
      <div class="apply_wrap" v-if="!status">
        <router-link :to="{path:`/applyinfo/0`}" class="apply_l fl">申请线下店长</router-link>
        <router-link :to="{path:`/applyinfo/1`}" class="apply_r fr">申请线上店长</router-link>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Cell, CellGroup, Dialog } from "vant";
import {
  selectDistributor,
  selectUserDistributorApplyNum,
  cancelUserDistributorCode
} from "@/api/distribute.js";
export default {
  name: "TheDistribute",
  data() {
    return {
      title: "店长中心",
      backPath: "", //返回路由，可删除
      initInfo: null,
      status: true, //	店铺状态  0关闭 false 1 开启  true
      type: false, // 店铺类型 0线下店铺 false 1线上店铺 true
      num: 0
    };
  },
  components: {
    HeadFoot,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog
  },
  watch: {
    type: {
      handler: function(nv) {
        if (!nv) {
          this.getNumber();
        }
      },
      immediate: true
    }
  },
  methods: {
    zhuxiao() {
      Dialog.confirm({
        message: "您正在注销店长身份，是否继续该操作？"
      })
        .then(() => {
          cancelUserDistributorCode().then(({ data }) => {
            if (data.code === 1) {
              this.getInit();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 获取线上店长审核数
    getNumber() {
      selectUserDistributorApplyNum().then(({ data }) => {
        if (data.code === 1) {
          this.num = data.data.userDistributorApplyNum;
        }
      });
    },
    getInit() {
      selectDistributor().then(({ data }) => {
        if (data.code === 0) {
          this.$router.replace("/applydistribution/0");
        } else if (data.code === 1) {
          this.initInfo = data.data.distributor;
          this.status = data.data.distributor.status === 0 ? false : true;
          this.type = data.data.distributor.type === 0 ? false : true;
          sessionStorage.setItem("onOroff", this.type);
        }
      });
    }
  },

  mounted() {},
  created() {
    this.getInit();
  }
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
.num_icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: $Color;
  line-height: 18px;
  text-align: center;
  color: #fff;
  overflow: hidden;
  font-size: 12px;
  position: relative;
  top: 3px;
}
</style>