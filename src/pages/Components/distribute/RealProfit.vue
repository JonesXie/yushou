// 直卖收益
<template>
  <div class="mod_realprofit">
    <!-- list -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="isfresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :finished-text="dataList.length===0?'':'没有更多了'"
        :immediate-check="false"
      >
        <div v-for="(v,i) in dataList" :key="i" :class="['list_li', `li_status${v.status}`]">
          <p class="li_title">
            订单编号：{{v.billNo}}
            <em class="fr">+{{v.amount}}元</em>
          </p>
          <p class="li_time">生产时间：{{v.createDateLabel}}</p>
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
  name: "RealProfit",
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
        type: 1
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
.mod_realprofit {
  width: 345px;
  margin: 0 auto 0;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  .list_li {
    padding: 26px 2px 16px 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 10px;
    background-position: 105% 250%;
    background-repeat: no-repeat;
    background-size: 68px 68px;
    .li_title {
      width: 100%;
      font-size: 13px;
      overflow: hidden;
      em {
        color: $Color;
        font-size: 14px;
        margin-right: 5px;
      }
      .fr {
        margin-right: 10px;
      }
    }
    .li_time {
      color: #999;
      font-size: 12px;
      margin-top: 15px;
    }
    &.li_status0 {
      background-image: url("~@/assets/img/distribution/ly_distribut_order_close.png");
      color: #cccccc;
      .li_title {
        em {
          color: #cccccc;
        }
      }
      .li_time {
        color: #ccc;
      }
    }
    &.li_status2 {
      background-image: url("~@/assets/img/distribution/ly_distribut_order_frozen.png");
    }
    &.li_status1 {
      background-image: url("~@/assets/img/distribution/ly_distribut_order_yes.png");
    }
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