<template>
  <div class="pg_goods">
    <van-nav-bar left-arrow :fixed="true" @click-left="GoBack()">
      <div class="pgg_head" slot="title">
        <span :class="['title', actived?'active':'']" @click="changePage(true)">商品</span>
        <span :class="['title', actived?'':'active']" @click="changePage(false)">挂卖</span>
      </div>
    </van-nav-bar>
    <div class="goods" v-if="actived">
      <div class="swipeWrap">
        <van-swipe @change="swipeChange" class="swipe" :autoplay="3000">
          <van-swipe-item v-for="i in 4" :key="i" class="swipeItem">
            <img src="@/assets/img/goods/pg_goods_swipe.png" alt>
          </van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
        </van-swipe>
        <div class="tips">
          <p class="Left">调货周期：20天</p>
          <div class="Right">调货周</div>
        </div>
      </div>
      <div class="title">
        <div class="price">
          ￥
          <span>1920.00</span>
          <em>原价：12000.00</em>
        </div>
        <div class="name">
          <div class="Left fl">【预售】</div>
          <div class="Right fl">玛丽黛佳网红眼影盘九色大地色裸色哑光珠光自然懒人初学者少女系</div>
        </div>
      </div>
      <ul class="banner">
        <li>
          <span></span>
          跨境商品
        </li>
        <li>
          <span></span>
          澳洲直邮
        </li>
        <li>
          <span></span>
          手工制作
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
      <div class="judge">
        <div class="head">商品评价（254）</div>
        <ul class="judge_ul">
          <li class="judge_li" v-for="i in 6" :key="i">全部1200</li>
        </ul>
        <ul class="judge_list">
          <li class="judge_list_li">
            <div class="user_info">
              <img class="user_info_img" src="@/assets/img/goods/pg_goods_icon.png" alt>
              <span>187****109</span>
              <van-rate v-model="myrate" :size="14" readonly class="myRate"/>
              <p class="fr">2018-12-24</p>
            </div>
            <div class="content">
              <p>终于收到我需要的宝贝了，东西很好，价美物廉，谢谢掌柜的！再说宝贝，正是我需要的，收到的时候包装完整，打开后让我惊喜的是，宝贝比我想象中的还要好！不得不得竖起大拇指.</p>
            </div>
          </li>
          <li class="judge_list_li">
            <div class="user_info">
              <img class="user_info_img" src="@/assets/img/goods/pg_goods_icon.png" alt>
              <span>187****109</span>
              <van-rate v-model="myrate" :size="14" readonly class="myRate"/>
              <p class="fr">2018-12-24</p>
            </div>
            <div class="content">
              <p>终于收到我需要的宝贝了，东西很好，价美物廉，谢谢掌柜的！再说宝贝，正是我需要的，收到的时候包装完整，打开后让我惊喜的是，宝贝比我想象中的还要好！不得不得竖起大拇指.</p>
              <div class="img_wrap">
                <img src="@/assets/img/goods/pg_goods_judge.png" alt>
                <img src="@/assets/img/goods/pg_goods_judge.png" alt>
              </div>
            </div>
          </li>
        </ul>
        <div class="judge_foot">
          <div class="judge_btn">查看全部评论</div>
        </div>
      </div>
      <div class="detail">
        <div class="head">商品详情</div>
        <div class="content">
          <img src="@/assets/img/goods/pg_goods_detail.png" alt>
        </div>
      </div>
      <div class="buy_wrap">
        <div class="buy_L" @click="changeCollect">
          <img v-if="isCollect" src="@/assets/img/goods/pg_goods_collected.png" alt>
          <img v-else src="@/assets/img/goods/pg_goods_collect.png" alt>
          <p>收藏</p>
        </div>
        <div class="buy_C">
          <div class="buy_C_wrap">
            <img src="@/assets/img/goods/pg_goods_flash.png" alt>
            <div class="bcw_right">
              <p>￥2200.0</p>
              <p>立即发货</p>
            </div>
          </div>
        </div>
        <div class="buy_R" @click="showParams=true">
          <p>￥2200.0</p>
          <p>预售</p>
        </div>
      </div>
    </div>
    <div class="guamai" v-else>
      <gua-mai></gua-mai>
    </div>
    <!-- 参数选择弹窗 -->
    <van-actionsheet v-model="showParams" :close-on-click-overlay="false" class="params_pop">
      <div class="params_info">
        <van-icon name="close" class="params_close" @click="showParams=false"/>
        <div class="img_wrap" :style="{backgroundImage:'url('+paramsImg+')'}"></div>
        <div class="pi_right">
          <p class="pir_price">
            ￥
            <span>{{currentPrice}}</span>
          </p>
          <span class="pir_remain">库存{{currentRemain}}件</span>
          <p>已选：黑色；35</p>
        </div>
      </div>
      <div class="params_type">
        <div class="pt_head">尺码</div>
        <van-radio-group v-model="result" class="pt_content">
          <van-radio class="ptc_li" :name="0">
            <div
              slot="icon"
              slot-scope="props"
              :class="['ptc_li_item',props.checked ? 'active' : 'normal']"
            >133</div>
          </van-radio>
          <van-radio class="ptc_li" :name="1">
            <div
              slot="icon"
              slot-scope="props"
              :class="['ptc_li_item',props.checked ? 'active' : 'normal']"
            >233</div>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="params_number">
        <span>数量</span>
        <van-stepper v-model="number" class="pn_input" :min="1"/>
      </div>
      <div class="params_comfirm" @click="paramsComfirm">
       确认
      </div>
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
import { mapActions } from "vuex";
import GuaMai from "./GuaMai";
import {
  NavBar,
  Swipe,
  SwipeItem,
  Cell,
  CellGroup,
  Rate,
  Actionsheet,
  Icon,
  Radio,
  RadioGroup,
  Stepper
} from "vant";
export default {
  name: "TheGoods",
  data() {
    return {
      actived: true,
      current: 0,
      isCollect: false,
      logistics: "免邮费",
      shuoming: "收益：3.0元/日",
      myrate: 4,
      number: 5,
      currentPrice: 2200,
      currentRemain: 100,
      result: 0,
      showParams: false,
      showPrice: false,
      showPower: false,
      paramsImg: require("@/assets/img/goods/pg_goodstype_goods.png")
    };
  },
  components: {
    GuaMai,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Rate.name]: Rate,
    [Actionsheet.name]: Actionsheet,
    [Icon.name]: Icon,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Stepper.name]: Stepper
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    },
    changePage(bool) {
      this.actived = bool;
    },
    swipeChange(index) {
      this.current = index;
    },
    changeCollect() {
      if (this.isCollect) {
        this.isCollect = false;
      } else {
        this.isCollect = true;
      }
    },
    paramsComfirm(){
      this.showParams = false;
      this.$router.push({path:'/orderconfirm',query:{id:'xie'}})
    }
  },
  mounted() {
    this.ChangeStatus(false);
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_goods {
  width: 100vw;
  position: relative;
  padding-top: 46px;
  box-sizing: border-box;
  min-height: 100vh;
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
  .pgg_head {
    .title {
      display: inline-block;
      width: 40px;
      font-size: 16px;
      text-align: center;
      margin: 0 17px;
      box-sizing: border-box;
      position: relative;
      &.active {
        color: $Color;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: $Color;
        }
      }
    }
  }
}
.pg_goods {
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
        width: my-percent(100, 375);
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
          top: 3px;
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
    .judge {
      margin-top: 10px;
      padding: 15px;
      background: #fff;
      box-sizing: border-box;
      .head {
        padding-left: 14px;
        border-left: 2px solid $Color;
      }
      .judge_ul {
        overflow: hidden;
        padding-bottom: 10px;
        border-bottom: 1px solid #eeeeee;
      }
      .judge_li {
        margin-top: 10px;
        margin-right: 10px;
        float: left;
        font-size: 11px;
        color: #666;
        padding: 7px 17px;
        background-color: #fff0f5;
        border-radius: 13px;
      }
      .judge_list_li {
        padding: 12px 0 15px 0;
        border-bottom: 1px solid #eeeeee;
        .user_info {
          overflow: hidden;
          font-size: 12px;
          color: #999;
          height: 25px;
          line-height: 25px;
          .myRate {
            display: inline-block;
            position: relative;
            top: 2px;
          }
        }
        .user_info_img {
          width: 25px;
          height: 25px;
          border-radius: 13px;
        }
        .content {
          margin-top: 12px;
          font-size: 12px;
          line-height: 20px;
        }
        .img_wrap {
          margin-top: 5px;
          img {
            width: 75px;
            height: 75px;
            margin: 0 5px;
          }
        }
        span {
          font-size: 13px;
          color: #333;
          margin: 0 13px;
          position: relative;
          top: 1px;
        }
      }
      .judge_foot {
        padding-top: 15px;
        text-align: center;
        .judge_btn {
          padding: 8px 12px;
          border-radius: 5px;
          border: solid 1px $Color;
          display: inline-block;
          color: $Color;
          font-size: 12px;
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
.pg_goods {
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
.pg_goods {
  .params_pop {
    background: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    .params_info {
      display: table;
      width: 100%;
      box-sizing: border-box;
      .img_wrap {
        display: inline-block;
        width: 90px;
        height: 90px;
        background-color: #f4f4f4;
        border-radius: 5px;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin-right: 18px;
      }
      .pi_right {
        display: table-cell;
        vertical-align: middle;
        width: 69%;
        font-size: 12px;
        .pir_price {
          color: $Color;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .pir_remain {
          display: inline-block;
          margin: 10px 0;
          font-size: 11px;
          color: #999;
        }
      }
      .params_close {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 19px;
        color: #ccc;
      }
    }
    .pt_content {
      margin-top: 15px;
    }
    .params_type {
      margin-top: 30px;
      width: 100%;
      .pt_head {
        font-size: 14px;
        color: #333;
      }
      .ptc_li {
        display: inline-block;
        margin-bottom: 15px;
        margin-right: 15px;
        & /deep/ .van-radio__icon {
          height: auto;
        }
      }
      .ptc_li_item {
        border-radius: 3px;
        box-sizing: border-box;
        padding: 7px 16px;
        font-size: 12px;
        box-sizing: border-box;
        &.active {
          color: #fff;
          background-color: $Color;
        }
        &.normal {
          color: #333;
          background-color: #f5f5f5;
        }
      }
    }
    .params_number {
      padding: 10px 0;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      position: relative;
      &::before {
        content: ".";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: #ddd;
      }
      &::after {
        content: ".";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #ddd;
      }
      .pn_input {
        float: right;
      }
    }
    .params_comfirm{
      @include btn(100%,40px);
      margin: 10px 0;
    }
  }
}
</style>