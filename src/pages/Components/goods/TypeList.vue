<template>
  <div class="pg_typlist">
    <van-tabs
      v-model="active"
      animated
      :line-height="0"
      title-active-color="#ea047b"
      color="#ea047b"
      title-inactive-color="#666"
      :ellipsis="false"
      class="pggt_head"
      @change="reGetData"
    >
      <van-tab title="综合"></van-tab>
      <van-tab title="销量"></van-tab>
      <van-tab>
        <div slot="title" class="price" @click="changeRange">
          价格
          <img v-if="priceActive === 1" src="@/assets/img/goods/pg_goodstype_down.png" alt />
          <img v-else-if="priceActive === 2" src="@/assets/img/goods/pg_goodstype_up.png" alt />
          <img v-else src="@/assets/img/goods/pg_goodstype_default.png" alt />
        </div>
      </van-tab>
    </van-tabs>
    <!-- list -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="false"
        :finished-text="dataList.length===0?'':'没有更多了'"
      >
        <ul class="pggt_ul">
          <li
            class="pggt_li"
            v-for="(item,index) in dataList"
            :key="index"
            @click="turnPage(item.goodsId)"
          >
            <div class="imgWrap" :style="{backgroundImage:'url('+ item.goodsImages +')'}"></div>
            <div class="txtWrap">
              <div class="price">
                <!-- <span>立减1000元</span> -->
                <p class="ellipsis-line">
                  ￥
                  <em>{{item.newDatePrice}}</em>
                </p>
              </div>
              <div class="info ellipsis-two">{{item.goodsName}}</div>
              <div class="buyer">{{item.goodsQuantity}}人已付款</div>
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
import { Tab, Tabs, List, PullRefresh } from "vant";
import { findAllGoods } from "@/api/index.js";
export default {
  name: "TypeList",
  props: {
    id: {
      default: null
    },
    goodsName: {
      default: null
    }
  },
  data() {
    return {
      // id: null,
      active: 0,
      priceActive: 0,
      salerSort: 0,
      curPage: 1,
      dataList: [],
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  watch: {
    priceActive(nv) {
      if (nv !== 0) {
        this.onInit();
      }
    },
    goodsName() {
      this.onInit();
    }
  },
  methods: {
    turnPage(val) {
      this.$router.push(`/goods/${val}`);
    },
    changeRange() {
      if (this.active === 2) {
        switch (this.priceActive) {
          case 2:
            this.priceActive = 1;
            break;
          default:
            this.priceActive = 2;
        }
      }
    },
    reGetData(index) {
      if (index === 0) {
        this.salerSort = 0;
        this.priceActive = 0;
        this.onInit();
      } else if (index === 1) {
        this.salerSort = 1;
        this.priceActive = 0;
        this.onInit();
      } else if (index === 2) {
        this.salerSort = 0;
        this.priceActive = 2;
      }
    },
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
        pageSize: 10,
        goodsName: this.goodsName,
        minimumPrice: null,
        createtime: null,
        goodsSaleStarttime: null,
        activityId: null,
        priceSort: this.priceActive,
        goodsQuantitySort: this.salerSort,
        codeId: this.id,
        brandId: null
      };
      if (this.id !== null && this.id.length !== 32) {
        Object.assign(_data, { codeId: null, brandId: this.id });
      }
      if (this.noLimit) {
        this.noLimit = false;
        findAllGoods(_data).then(({ data }) => {
          this.loading = false;
          this.noLimit = true;
          if (isInit) {
            this.dataList = data.data;
          } else {
            [...this.dataList] = [...this.dataList, ...data.data];
            this.curPage = this.curPage + 1;
            if (data.data.length === 0) {
              this.finished = true;
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
.pg_typlist {
  box-sizing: border-box;
  .pggt_head {
    & /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
    }
    .price {
      img {
        width: 9px;
        height: 12px;
      }
    }
  }
}
.pg_typlist {
  .pggt_ul {
    overflow: hidden;
    background: #f4f4f4;
    li {
      float: left;
      background: #fff;
      width: 186px;
      height: 285px;
      margin-top: 3px;
      padding: 25px 15px 13px;
      box-sizing: border-box;
    }
    li:nth-child(even) {
      margin-left: 3px;
    }
    .imgWrap {
      width: 100%;
      height: 150px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
    .txtWrap {
      margin-top: 13px;
      .price {
        color: $Color;
        font-size: 12px;
        span {
          padding: 3px 4px;
          background: #ea637a;
          font-size: 10px;
          color: #fff;
          border-radius: 2px;
        }
        em {
          font-size: 16px;
        }
        p {
          display: inline-block;
          position: relative;
          top: 3px;
        }
      }
      .info {
        font-size: 13px;
        line-height: 19px;
        margin: 9px 0;
      }
      .buyer {
        color: #999;
        font-size: 10px;
      }
    }
  }
}
</style>