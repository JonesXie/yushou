<template>
  <HeadFoot class="pg_wd" :Title="title">
    <template #content>
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :finished-text="dataList.length===0?'':'没有更多了'"
          :immediate-check="false"
        >
          <ul class="pgwd_ul">
            <li v-for="(v,i) in dataList" :key="i" :class="['pgwd_li', v.state==2?'get':'out']">
              <div class="top">
                <p>订单编号：{{v.recordNo}}</p>
                <span>￥{{v.money}}</span>
              </div>
              <div class="bottom">
                <span>{{v.createtime}}</span>
                <p>[{{fixType[v.type]}}]</p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt />
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { List, PullRefresh } from "vant";
import { findUserAccountRecord } from "@/api/center.js";
export default {
  name: "WalletDetail",
  data() {
    return {
      title: "交易明细",
      // 1收益 2提现 3消费
      fixType: {
        1: "收益",
        2: "提现",
        3: "消费"
      },
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  components: { HeadFoot, [List.name]: List, [PullRefresh.name]: PullRefresh },
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
        page: this.curPage
      };
      if (this.noLimit) {
        this.noLimit = false;
        findUserAccountRecord(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data;
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
$Color: #ea047b;
.pg_wd {
  .pgwd_ul {
    width: 100vw;
    padding-top: 46px;
    box-sizing: border-box;
    .pgwd_li {
      padding: 15px;
      background: #fff;
      width: 345px;
      box-sizing: border-box;
      margin: 7px auto;
      .top {
        overflow: hidden;
        width: 100%;
        display: flex;
        align-items: flex-end;
        p {
          font-size: 13px;
          flex: 1;
        }
        span {
          font-size: 18px;
        }
      }
      .bottom {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        margin-top: 9px;
        p {
          float: right;
          color: #333;
        }
      }
      &.out {
        border-left: 2px solid $Color;
        .top {
          span {
            color: $Color;
          }
        }
      }
      &.get {
        border-left: 2px solid #2c9be9;
        .top {
          span {
            color: #2c9be9;
          }
        }
      }
    }
  }
}
</style>