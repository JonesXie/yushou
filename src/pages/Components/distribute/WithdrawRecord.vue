//提现记录
<template>
  <div class="pg_WithdrawRecord">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="isfresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
        :immediate-check="false"
      >
        <div class="list_li" v-for="(v,i) in dataList" :key="i">
          <p class="li_title van-hairline--bottom">
            {{v.createDateLabel}}
            <em class="fr">{{v.statusLabel}}</em>
          </p>
          <div class="li_info">
            <p class="li_info_l">提现总金额</p>
            <p class="li_info_l">手续费金额（手续费比例）</p>
          </div>
          <div class="li_money">
            <p class="li_info_l">￥{{v.amount}}</p>
            <p class="li_info_l">￥{{v.serviceCharge}}（{{v.serviceChargeScale}}%）</p>
          </div>
          <div class="li_info">
            <p class="li_info_l">实际到账金额</p>
            <p class="li_info_l">平台股份分红</p>
          </div>
          <div class="li_money">
            <p class="li_info_l">￥{{v.actualAmount}}</p>
            <p class="li_info_l">￥{{v.platformAmount}}（{{100 - Number(v.depositScale)}}%）</p>
          </div>
          <div class="li_tips" v-if="v.status ===4">失败原因:{{v.remake}}</div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div v-if="dataList.length === 0" class="noData">
      <img src="@/assets/img/ly_nodata.png" alt />
    </div>
  </div>
</template>

<script>
import { selectUserDistributorBill } from "@/api/distribute.js";
import { List, PullRefresh } from "vant";
export default {
  name: "WithdrawRecord",
  data() {
    return {
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  components: { [List.name]: List, [PullRefresh.name]: PullRefresh },
  methods: {
    onRefresh() {
      this.onInit(true);
    },
    onLoad() {
      this.onInit(false, false);
    },
    onInit(reFresh = false, isInit = true) {
      if (isInit) {
        this.curPage = 1;
        this.finished = false;
      }
      let _data = {
        page: this.curPage,
        type: 3 //	1 自己 2 线上 3 提现
      };
      if (this.noLimit) {
        this.noLimit = false;
        selectUserDistributorBill(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data.page.dataList;
          //赋值
          if (isInit) {
            this.dataList = getList;
            if (getList.length < 10) {
              this.finished = true;
            } else {
              this.curPage = this.curPage + 1;
            }
          } else {
            [...this.dataList] = [...this.dataList, ...getList];
            if (getList.length < 10) {
              this.finished = true;
            } else {
              this.curPage = this.curPage + 1;
            }
          }
          if (reFresh) {
            this.$toast("刷新成功");
            this.isRefresh = false;
          }
        });
      }
    }
  },
  mounted() {
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_WithdrawRecord {
  position: relative;
  width: 100%;
  height: 100%;
  .list_li {
    background: #fff;
    width: 345px;
    margin: 0 auto 10px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 0px #999;
    padding: 0 26px 20px;
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
  .li_tips {
    padding-top: 20px;
    font-size: 12px;
  }
  .isfresh {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
.noData {
  width: 100%;
  // height: calc(100vh - 120px);
  padding-top: 40px;
  text-align: center;
  position: absolute;
  top: 120px;
  img {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: inline-block;
    width: 150px;
  }
}
</style>