<template>
  <div class="mod_slalist">
    <!-- list -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :finished-text="dataList.length===0?'':'没有更多了'"
        :immediate-check="false"
      >
        <!-- list -->
        <ul class="mod_ul">
          <li class="mod_li" v-for="(v,i) in dataList" :key="i">
            <p class="mod_li_h">卖家:{{v.nickName}}</p>
            <p class="mod_li_info">
              <span>参数规格：</span>
              <em>{{v.goodsParameter}}({{v.goodsBuyNum}}件)</em>
            </p>
            <p class="mod_li_info">
              <span>实付金额：</span>
              <em>￥{{v.actualMoney}}</em>
            </p>
            <p class="mod_li_info">
              <span>发货信息：</span>
              <em>{{v.inWaitDay}}天后发货</em>
            </p>
            <div class="mod_li_btn">
              <div class="mod_li_btn1" @click="detailBtn(v.id)">详情</div>
              <div class="mod_li_btn2" @click="buyBtn(v.id)">购买</div>
            </div>
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
import { List, PullRefresh } from "vant";
import { findGoodsSellOrderPage } from "@/api/order.js";
export default {
  name: "SaleList",
  props: ["goodsId", "getParams"],
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
  watch: {
    getParams: {
      handler: function() {
        this.onInit();
      },
      deep: true
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
        page: this.curPage
      };
      Object.assign(_data, this.getParams);
      if (this.noLimit) {
        this.noLimit = false;
        findGoodsSellOrderPage(_data).then(({ data }) => {
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
    },
    detailBtn(orderId) {
      this.$router.push({ path: `/guadetail/${orderId}` });
    },
    buyBtn(orderId) {
      this.$router.push({ path: `/guaconfirm/${orderId}` });
    }
  },
  mounted() {
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.mod_salelist {
  width: 100%;
}
.mod_li {
  width: 360px;
  height: 160px;
  margin: 0 auto;
  box-sizing: border-box;
  background: url("~@/assets/img/components/mod_salelist_li.png");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 10px;
  padding: 0 24px 0 21px;
}
.mod_li_h {
  height: 40px;
  line-height: 40px;
}
.mod_li_info {
  color: #999;
  font-size: 12px;
  overflow: hidden;
  margin-top: 12px;
  em {
    float: right;
  }
}
.mod_li_btn {
  text-align: right;
  margin-top: 12px;
  font-size: 12px;
  .mod_li_btn1 {
    display: inline-block;
    width: 60px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid $Color;
    color: $Color;
    border-radius: 13px;
    margin-right: 20px;
  }
  .mod_li_btn2 {
    @include btn(60px, 25px);
  }
}
.mod_ul {
  min-height: calc(100vh - 50px);
}
</style>