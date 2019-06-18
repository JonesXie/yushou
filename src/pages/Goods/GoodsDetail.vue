<template>
  <div class="pg_goodsdetail">
    <div class="goods">
      <!-- 轮播图 -->
      <div class="swipeWrap">
        <van-swipe @change="swipeChange" class="swipe" :autoplay="3000">
          <van-swipe-item v-for="(v,i) in swiperList" :key="i" class="swipeItem">
            <img :src="v" alt>
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{swiperList.length}}</div>
        </van-swipe>
        <div class="tips">
          <p class="Left">{{goodsInfo.goodsWaitDays}}天后发货</p>
          <div class="Right">剩余{{goodsInfo.surplus}}件</div>
        </div>
      </div>

      <div class="title">
        <div class="price">
          ￥
          <span>{{goodsInfo.goodsSalePrice}}</span>
          <em>原价：{{goodsInfo.goodsShowPrice}}</em>
        </div>
        <div class="name">
          <div class="Left fl">【预售】</div>
          <div class="Right fl">{{goodsInfo.goodsName}}</div>
        </div>
      </div>
      <ul class="banner">
        <li v-for="(v,i) in goodsInfo.ymGoodsLabels" :key="i">
          <span></span>
          {{v.name}}
        </li>
      </ul>
      <van-cell-group class="info">
        <van-cell title="物流" :value="logistics"/>
        <van-cell title="服务" is-link @click="showPower=true">
          <ul class="info_ul">
            <li>
              <img src="@/assets/img/goods/pg_goods_pei.png" alt>假一赔十
            </li>
            <li>
              <img src="@/assets/img/goods/pg_goods_pei.png" alt>包含税费
            </li>
            <li>
              <img src="@/assets/img/goods/pg_goods_pei.png" alt>售后无忧
            </li>
          </ul>
        </van-cell>
        <!-- <van-cell title="规格" is-link value="选则规格" @click="showParams=true"/> -->
        <van-cell title="说明" is-link :value="shuoming" @click="showPrice=true"/>
      </van-cell-group>

      <!-- 评论 -->
      <goods-judge
        :commentNum="commentNum"
        :commentPageInfo="commentPageInfo"
        :commentAllNum="commentAllNum"
        :goodsId="goodsId"
      ></goods-judge>

      <div class="detail">
        <div class="head">商品详情</div>
        <div class="content">
          <img v-for="(v,i) in goodsInfo.goodsDesc" :key="i" :src="v" alt>
        </div>
      </div>
      <div class="buy_wrap">
        <div class="buy_L" @click="changeCollect">
          <img v-if="goodsInfo.isCollect ===1" src="@/assets/img/goods/pg_goods_collected.png" alt>
          <img v-else src="@/assets/img/goods/pg_goods_collect.png" alt>
          <p>收藏</p>
        </div>
        <div class="buy_C" v-if="goodsInfo.quickBuy === 1" @click="paramsPop('now')">
          <div class="buy_C_wrap">
            <img src="@/assets/img/goods/pg_goods_flash.png" alt>
            <div class="bcw_right">
              <p>￥{{goodsInfo.goodsPrice}}</p>
              <p>立即发货</p>
            </div>
          </div>
        </div>

        <div class="buy_R" @click="paramsPop('yu')">
          <p>￥{{goodsInfo.goodsSalePrice}}</p>
          <p>预售</p>
        </div>
      </div>
    </div>
    <!-- 参数选择弹窗 01-->
    <van-actionsheet v-model="showParams01" :close-on-click-overlay="false" class="params_pop">
      <params-choose
        :paramsList="paramsList"
        :paramsLimit="paramsLimit"
        :isType="isType"
        @closeBtn="showParams01=false"
      ></params-choose>
    </van-actionsheet>
    <!-- 参数选择弹窗 02-->
    <van-actionsheet v-model="showParams02" :close-on-click-overlay="false" class="params_pop">
      <params-choose
        :paramsList="paramsList"
        :paramsLimit="paramsLimit"
        :isType="isType"
        @closeBtn="showParams02=false"
      ></params-choose>
    </van-actionsheet>

    <!-- 价格说明弹窗 -->
    <van-actionsheet v-model="showPrice" :close-on-click-overlay="false" class="price_pop">
      <div class="price_title">价格说明</div>
      <ul class="price_ul">
        <li>
          <p class="price_p1">
            <span class="price_li_dot"></span>
            <em>首发价格</em>
          </p>
          <p class="price_p2">商品预销售价格，首发价格为最低价，此价格仅限首发商品</p>
        </li>
        <li>
          <p class="price_p1">
            <span class="price_li_dot"></span>
            <em>市场原价</em>
          </p>
          <p class="price_p2">商品市场最低价格，由预兽官方比对价格后确认市场最低价</p>
        </li>
        <li>
          <p class="price_p1">
            <span class="price_li_dot"></span>
            <em>收益</em>
          </p>
          <p class="price_p2">订单挂卖后每日固定增值，商品属性不同，每日固定增值不同，用户可自行设定挂卖折扣，挂卖订单卖出后获得的利润即为收益</p>
        </li>
      </ul>
      <div class="price_close_btn" @click="showPrice=false">完成</div>
    </van-actionsheet>
    <!-- 权益保障弹窗 -->
    <van-actionsheet v-model="showPower" :close-on-click-overlay="false" class="price_pop">
      <div class="price_title">权益保障</div>
      <ul class="price_ul">
        <li>
          <p class="price_p1">
            <span class="price_li_dot"></span>
            <em>假一赔十</em>
          </p>
          <p class="price_p2">预兽优选产品，百分百质量保障，若出现假货，假一赔十</p>
        </li>
        <li>
          <p class="price_p1">
            <span class="price_li_dot"></span>
            <em>全球直采</em>
          </p>
          <p class="price_p2">预售的货源主要来自全球直采、品牌一级经销商等源头渠道</p>
        </li>
        <li>
          <p class="price_p1">
            <span class="price_li_dot"></span>
            <em>售后无忧</em>
          </p>
          <p class="price_p2">全场免邮，质量问题免费退换</p>
        </li>
        <li>
          <p class="price_p1">
            <span class="price_li_dot"></span>
            <em>何为预兽</em>
          </p>
          <p
            class="price_p2"
          >预兽的货源主要来自全球直采、品牌一级经销商等源头渠道。预兽为了让您购买到最具性价比的商品，我们不会预先准备库存，因此有一定的调货周期，请耐心等待。预兽只在商品首发日以极低的价格预售商品，在调货期间内买家订单可自由买卖。</p>
        </li>
      </ul>
      <div class="power_close_btn" @click="showPower=false">完成</div>
    </van-actionsheet>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Cell,
  CellGroup,
  Actionsheet,
  Icon,
  Radio,
  RadioGroup,
  Stepper
} from "vant";
import GoodsJudge from "./GoodsJudge";
import { findGoodsDetail } from "@/api/goods.js";
import { doAddCollect, doDelUserCollect } from "@/api/yanxuan.js";
import ParamsChoose from "./ParamsChoose.vue";
export default {
  name: "GoodsDetail",
  props: ["goodsId"],
  data() {
    return {
      goodsInfo: {
        goodsWaitDays: null,
        surplus: null,
        goodsPrice: null, //急速购买
        goodsSalePrice: null, //预售
        goodsShowPrice: null,
        goodsName: null,
        ymGoodsLabels: null,
        goodsDesc: [],
        isCollect: 0,
        parameterNameVOS: null
      },
      commentAllNum: 0, //评论数
      commentNum: [], //评论参数
      commentPageInfo: [], //评论内容
      swiperList: [],
      current: 0,
      isCollect: false,
      logistics: "卖家包邮",
      isType: null,
      paramsList: [], //参数选择list
      paramsLimit: null, //参数选择限制
      showParams01: false,
      showParams02: false,
      showPrice: false,
      showPower: false
    };
  },
  components: {
    GoodsJudge,
    ParamsChoose,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Actionsheet.name]: Actionsheet,
    [Icon.name]: Icon,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Stepper.name]: Stepper
  },
  computed: {
    shuoming() {
      if (this.goodsInfo.goodsProfits !== null) {
        return `收益：${this.goodsInfo.goodsProfits}元/日`;
      } else {
        return `收益：0.00元/日`;
      }
    }
  },
  methods: {
    swipeChange(index) {
      this.current = index;
    },
    //弹窗
    paramsPop(val) {
      this.isType = val;
      if (val === "now") {
        this.showParams01 = true;
      } else {
        this.showParams02 = true;
      }
    },
    //收藏
    changeCollect() {
      if (this.goodsInfo.isCollect === 0) {
        doAddCollect({ goodsId: this.goodsId }).then(({ data }) => {
          this.$toast(data.msg);
          if (data.msg === "收藏成功") {
            this.goodsInfo.isCollect = 1;
            this.goodsInfo.collectId = data.collectId;
          }
        });
      } else {
        // doDelUserCollect;
        doDelUserCollect({ collectId: this.goodsInfo.collectId }).then(
          ({ data }) => {
            this.$toast(data.msg);
            if (data.msg === "删除成功") {
              this.goodsInfo.isCollect = 0;
            }
          }
        );
      }
    },
  },
  created() {
    findGoodsDetail({ goodsId: this.goodsId }).then(({ data }) => {
      this.goodsInfo = data.data;
      this.commentAllNum = data.data.commentAllNum;
      this.commentNum = data.data.commentNum;
      this.commentPageInfo = data.data.commentPageInfo;
      this.paramsList = data.data.parameterNameVOS;
      this.paramsLimit = data.data.skuVOS;
      this.swiperList = [data.data.goodsImages, ...data.data.goodsPictures];
    });
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_goodsdetail {
  .goods {
    width: 100vw;
    position: relative;
    box-sizing: border-box;
    min-height: calc(100vh - 46px);
    .swipeWrap {
      width: 100vw;
      height: 375px;
      box-sizing: border-box;
      position: relative;
    }
    .swipe {
      position: relative;
      .custom-indicator {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 10px;
        color: #fff;
        padding: 3px 8px;
        background: rgba($color: #000000, $alpha: 0.5);
        border-radius: 9px;
      }
    }
    .swipeItem {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tips {
      width: 100vw;
      height: 40px;
      line-height: 40px;
      color: #fefefe;
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba($color: #000000, $alpha: 0.5);
      display: flex;
      .Left {
        flex: 1;
        padding-left: 20px;
      }
      .Right {
        width: my-percent(120, 375);
        background: $Color;
        text-align: center;
      }
    }
  }
  .goods {
    .title {
      background: #fff;
      padding: 20px 15px;
      width: 100%;
      box-sizing: border-box;
      .price {
        font-size: 13px;
        color: $Color;
        span {
          font-size: 19px;
        }
        em {
          text-decoration: line-through;
          margin-left: 25px;
          font-size: 12px;
          color: #999;
        }
      }
      .name {
        overflow: hidden;
        font-size: 15px;
        margin-top: 12px;
        .Left {
          color: $Color;
          position: relative;
          top: 4px;
          left: -5px;
        }
        .Right {
          color: #000;
          line-height: 23px;
          width: 80%;
        }
      }
    }
    .banner {
      width: 100%;
      height: 36px;
      line-height: 36px;
      background-color: #fff0f5;
      color: #f74681;
      font-size: 12px;
      li {
        float: left;
        margin-left: 16px;
        span {
          display: inline-block;
          width: 3px;
          height: 3px;
          background: $Color;
          position: relative;
          top: -3px;
        }
      }
    }
    .info {
      & /deep/ .van-cell {
        color: #999;
      }
      & /deep/ .van-cell__value {
        color: #000;
        flex: 5;
        text-align: left;
      }
      .info_ul {
        li {
          float: left;
          margin-right: 10px;
          font-size: 12px;
          img {
            width: 15px;
            height: 15px;
            margin-right: 7px;
          }
        }
      }
    }
  }
  .goods {
    .detail {
      margin-top: 10px;
      padding: 18px 15px;
      background: #fff;
      margin-bottom: 60px;
      .head {
        font-size: 15px;
        width: 180px;
        height: 23px;
        line-height: 23px;
        text-align: center;
        margin: 0 auto;
        background: url("~@/assets/img/goods/pg_goods_detailH.png");
        background-size: 100%;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .content {
        margin-top: 13px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
  .buy_wrap {
    position: fixed;
    bottom: -1px;
    left: 0;
    width: 100vw;
    height: 54px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    &::before {
      content: "";
      width: 100%;
      height: 1px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #ddd;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
    .buy_L {
      flex: my-percent(115, 375);
      text-align: center;
      padding-top: 8px;
      box-sizing: border-box;
      font-size: 12px;
      color: #999;
      img {
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
      }
    }
    .buy_C {
      flex: my-percent(130, 375);
      background: #333;
      font-size: 15px;
      color: #fff;
      text-align: center;
      padding-top: 10px;
      box-sizing: border-box;
      .buy_C_wrap {
        display: inline-block;
        box-sizing: border-box;
        img {
          width: 17px;
          height: 31px;
          vertical-align: top;
        }
        .bcw_right {
          display: inline-block;
          margin-left: 3px;
          p:last-child {
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }
    }
    .buy_R {
      flex: my-percent(130, 375);
      font-size: 15px;
      background: $Color;
      color: #fff;
      text-align: center;
      padding-top: 10px;
      box-sizing: border-box;
      p:last-child {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}
.pg_goodsdetail {
  .price_pop {
    background: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 24px 26px 10px 26px;
    box-sizing: border-box;
    .price_title {
      text-align: center;
      font-size: 16px;
      color: #333;
    }
    .price_ul {
      margin-top: 28px;
      li {
        margin-bottom: 10px;
      }
    }
    .price_p1 {
      em {
        font-size: 13px;
        color: #333;
        margin-left: 7px;
      }
    }
    .price_p2 {
      font-size: 11px;
      color: #666;
      margin-left: 14px;
      margin-top: 5px;
      line-height: 18px;
    }
    .price_li_dot {
      display: inline-block;
      @include myDot(7px, $Color);
    }
    .price_close_btn {
      @include btn(100%, 40px);
      box-sizing: border-box;
      margin-top: 100px;
    }
    .power_close_btn {
      @include btn(100%, 40px);
      box-sizing: border-box;
      margin-top: 10px;
    }
  }
}
</style>