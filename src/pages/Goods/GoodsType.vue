<template>
  <HeadFoot class="pg_goodstype" :Title="title">
    <template #content>
      <van-tabs
        v-model="active"
        animated
        :line-height="0"
        title-active-color="#ea047b"
        color="#ea047b"
        title-inactive-color="#666"
        :ellipsis="false"
        class="pggt_head"
      >
        <van-tab title="综合">
          <ul class="pggt_ul">
            <li class="pggt_li" v-for="(item,index) in dataList1" :key="index">
              <div class="imgWrap" :style="{backgroundImage:'url('+ img +')'}"></div>
              <div class="txtWrap">
                <div class="price ellipsis-line">
                  <span>立减1000元</span>
                  <p>
                    ￥
                    <em>2019</em>.00
                  </p>
                </div>
                <div class="info ellipsis-two">美宝莲 MAYBELLINE 美宝纽约时刻迷你眼影盘日落 6.1g</div>
                <div class="buyer">10人已付款</div>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="销量">内容 4</van-tab>
        <van-tab>
          <div slot="title" class="price" @click="changeRange">
            价格
            <img v-if="priceActive === 1" src="@/assets/img/goods/pg_goodstype_up.png" alt>
            <img v-else-if="priceActive === 2" src="@/assets/img/goods/pg_goodstype_down.png" alt>
            <img v-else src="@/assets/img/goods/pg_goodstype_default.png" alt>
          </div>内容 4
        </van-tab>
      </van-tabs>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Tab, Tabs } from "vant";
export default {
  name: "GoodsType",
  data() {
    return {
      title: "商品",
      active: 0,
      priceActive: 0,
      img: require("@/assets/img/goods/pg_goodstype_goods.png"),
      dataList1: ["1", "1", "1", "1", "1", "1"]
    };
  },
  components: { HeadFoot, [Tab.name]: Tab, [Tabs.name]: Tabs },
  computed: {
    stickTop: function() {
      return this.$store.state.stickTop;
    }
  },
  methods: {
    changeRange() {
      if (this.active === 2) {
        switch (this.priceActive) {
          case 0:
            this.priceActive = 1;
            break;
          case 1:
            this.priceActive = 2;
            break;
          default:
            this.priceActive = 0;
        }
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_goodstype {
  padding-top: 46px;
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
.pg_goodstype {
  .pggt_ul {
    overflow: hidden;
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