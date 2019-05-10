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
        <van-cell title="服务" is-link>
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
        <van-cell title="规格" is-link value="选则规格"/>
        <van-cell title="说明" is-link :value="shuoming"/>
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
      <div class="buy_wrap"></div>
    </div>
    <div class="guamai" v-else>挂卖</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar, Swipe, SwipeItem, Cell, CellGroup, Rate } from "vant";
export default {
  name: "TheGoods",
  data() {
    return {
      actived: true,
      current: 0,
      logistics: "免邮费",
      shuoming: "收益：3.0元/日",
      myrate: 4
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Rate.name]: Rate
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
    min-height: calc( 100vh - 46px);
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
  .buy_wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 53px;
    box-sizing: border-box;
    background: #fff;
  }
}
</style>