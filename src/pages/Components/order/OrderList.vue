<template>
  <div class="mod_orderlist" ref="mo_list">
    <!-- list -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :finished-text="dataList.length===0?'':'没有更多了'"
        :immediate-check="false"
      >
        <ul class="mo_ul">
          <li class="mo_li" v-for="(v,i) in dataList" :key="i">
            <div class="mol_h">
              <p>订单编号:{{v.orderNo}}</p>
              <p>{{setArr[v.orderState]}}</p>
            </div>
            <div class="mol_c">
              <router-link :to="`/orderdetail/${v.id}`">
                <div class="li_content_L">
                  <img :src="v.goodsImages" alt />
                </div>
                <div class="li_content_R">
                  <p class="title">{{v.goodsName}}</p>
                  <p class="type">
                    规格：{{v.goodsParameter}}
                    <span>x{{v.goodsBuyNum}}</span>
                  </p>
                  <p class="price">今日价：￥{{v.newDatePrice}}</p>
                </div>
              </router-link>
              <div class="li_content_f">
                剩余调货周期：
                <em>{{v.inWaitDay}}</em>天
                <span>实付：￥{{v.orderPayPrice}}</span>
              </div>
            </div>
            <list-footer :itemData="v" @reGet="onInit"></list-footer>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
    <div v-if="dataList.length === 0" class="noData">
      <img src="@/assets/img/ly_nodata.png" alt />
    </div>
  </div>
</template>

<script>
import ListFooter from "./ListFooter";
import { List, PullRefresh } from "vant";
import { findMyOrderPage } from "@/api/order.js";
export default {
  name: "OrderList",
  props: ["status"],
  data() {
    return {
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true,
      // 全部：不传 已取消：00 待支付：01 调货中：02 待发货 03 待收货 04 交易成功：100(回显99 ，传参101）
      setArr: {
        "00": "已取消",
        "01": "待付款",
        "02": "调货中",
        "03": "待发货",
        "04": "待收货",
        "99": "交易成功" //回显99 ，传参101
      }
    };
  },
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    ListFooter
  },
  watch: {
    status: {
      handler: function() {
        // this.$refs.mo_list.scrollTo(0, 0);
        this.onInit();
      }
    }
  },
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
        state: this.status
      };
      if (this.status == "101") {
        _data = {
          page: this.curPage,
          states: this.status
        };
      }
      if (this.noLimit) {
        this.noLimit = false;
        findMyOrderPage(_data).then(({ data }) => {
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
  }
  // mounted() {
  //   this.onInit();
  // }
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.mod_orderlist {
  min-height: calc(100vh - 90px);
  .mo_ul {
    width: 100vw;
    // padding-top: 7px;
  }
  .mo_li {
    background: #fff;
    margin-bottom: 7px;
    width: 100%;
  }
  .mol_h {
    padding: 18px 15px;
    display: flex;
    p:first-child {
      flex: 7;
    }
    p:last-child {
      flex: 2;
      text-align: right;
      color: $Color;
    }
  }
  .mol_c {
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding: 15px 10px 0 15px;
    overflow: hidden;
    .li_content_L {
      width: 80px;
      height: 80px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .li_content_R {
      float: left;
      margin-left: 18px;
      width: 225px;
      min-height: 80px;
      margin-bottom: 15px;
      .title {
        line-height: 20px;
        position: relative;
        top: -2px;
      }
      .type {
        color: #999999;
        font-size: 10px;
        margin: 9px 0;
        overflow: hidden;
        span {
          float: right;
        }
      }
      .price {
        display: inline-block;
        padding: 4px 7px;
        background: #fef5fa;
        border-radius: 5px;
        font-size: 11px;
        color: $Color;
      }
    }
    .li_content_f {
      border-top: 1px dashed #ddd;
      padding: 14px 0;
      clear: both;
      overflow: hidden;
      font-size: 12px;
      em {
        color: #db1919;
      }
      span {
        float: right;
        color: #000;
      }
    }
  }
}
</style>