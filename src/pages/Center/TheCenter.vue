<template>
  <div class="pg_center">
    <div class="pgc_header">
      <div class="pgch_bkg"></div>
      <div class="pgch_content">
        <p class="title">
          <router-link to="/">
            <img src="@/assets/img/center/pg_center_set.png" alt>
          </router-link>
          <router-link to="/">
            <img src="@/assets/img/center/pg_center_kefu.png" alt>
          </router-link>
        </p>
        <div class="info">
          <div class="tip">购物达人</div>
          <div class="info_cent">
            <div class="ic_tx">
              <img src="@/assets/img/center/pg_center_dec.png" alt>
              <img src="@/assets/logo.png" alt>
            </div>
            <div class="ic_btn">{{userName}}</div>
            <van-row class="ic_row">
              <van-col span="8">
                <router-link to="/wallet">
                  <p class="ic_row_p" style="color:#e50404">
                    <span>{{money}}</span>元
                  </p>
                  <span>余额</span>
                </router-link>
              </van-col>
              <van-col span="8">
                <p class="ic_row_p" style="color:#c40098">
                  <span>{{jifen}}</span>个
                </p>
                <span>积分</span>
              </van-col>
              <van-col span="8">
                <router-link to="/">
                  <p class="ic_row_p" style="color:#c056ed">
                    <span>{{coupon}}</span>张
                  </p>
                  <span>优惠券</span>
                </router-link>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <div class="pgc_order">
      <div class="pgco_h">
        <p class="pgco_h_my">我的订单</p>
        <router-link :to="{path:'/myorder',query:{active:0}}" class="pgco_h_all">
          全部订单
          <van-icon name="arrow"/>
        </router-link>
      </div>
      <ul class="pgco_list">
        <li v-on:click="turnOrder(1)">
          <img src="@/assets/img/center/pg_center_fukuan.png" alt>
          <div class="tip">{{tips}}</div>
          <p>待付款</p>
        </li>
        <li v-on:click="turnOrder(2)">
          <img src="@/assets/img/center/pg_center_wait.png" alt>
          <div class="tip">{{tips}}</div>
          <p>调货中</p>
        </li>
        <li v-on:click="turnOrder(3)">
          <img src="@/assets/img/center/pg_center_fahuo.png" alt>
          <div class="tip">{{tips}}</div>
          <p>待发货</p>
        </li>
        <li v-on:click="turnOrder(4)">
          <img src="@/assets/img/center/pg_center_shouhuo.png" alt>
          <div class="tip">{{tips}}</div>
          <p>待收货</p>
        </li>
        <li v-on:click="turnOrder(5)">
          <img src="@/assets/img/center/pg_center_suc.png" alt>
          <div class="tip" v-if="false">{{tips}}</div>
          <p>交易成功</p>
        </li>
      </ul>
    </div>
    <van-cell-group class="pgc_link">
      <van-cell title="我的挂卖" is-link to="/mysales"/>
      <van-cell title="我的地址" is-link to="/mysite"/>
    </van-cell-group>
    <div class="pgc_utils pgc_order">
      <div class="pgco_h">
        <p class="pgco_h_my">我的工具</p>
      </div>
      <van-row class="pgco_list">
        <van-col span="6" class="utils">
          <router-link to="/">
            <img src="@/assets/img/center/pg_center_collect.png" alt>
            <p>我的收藏</p>
          </router-link>
        </van-col>
        <van-col span="6" class="utils">
          <router-link to="/">
            <img src="@/assets/img/center/pg_center_friends.png" alt>
            <p>邀请好友</p>
          </router-link>
        </van-col>
        <van-col span="6" class="utils">
          <router-link to="/">
            <img src="@/assets/img/center/pg_center_questions.png" alt>
            <p>常见问题</p>
          </router-link>
        </van-col>
        <van-col span="6" class="utils">
          <router-link to="/">
            <img src="@/assets/img/center/pg_center_owner.png" alt>
            <p>关于我们</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Row, Col, Icon, Cell, CellGroup } from "vant";
export default {
  name: "TheCenter",
  data() {
    return {
      userName: "立即登录",
      money: 99999.99,
      jifen: 66,
      coupon: 1,
      tips: 99
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    ...mapActions(["ChangeActive"]),
    turnOrder: function(index = 0) {
      this.$router.push({ path: "/myorder", query: { active: index } });
    }
  },
  mounted() {
    this.ChangeActive(3);
  }
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pg_center {
  .pgc_header {
    width: 100vw;
    height: 232px;
    position: relative;
    top: 0;
    left: 0;
    box-sizing: border-box;
    .pgch_bkg {
      height: 161px;
      background: $Color;
      width: 100%;
    }
    .pgch_content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 13px 15px 15px;
      box-sizing: border-box;
      .title {
        overflow: hidden;
        a {
          float: left;
          img {
            height: 21px;
            width: auto;
          }
        }
        a:last-child {
          float: right;
        }
      }
      .info {
        width: 345px;
        height: 160px;
        background: #fff;
        position: absolute;
        left: 15px;
        bottom: 15px;
        box-shadow: 0px 3px 10px 0px rgba(153, 153, 153, 0.35);
        border-radius: 5px;
        padding: 10px 24px 15px;
        box-sizing: border-box;
      }
      .tip {
        width: 70px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        background: $Color;
        font-size: 12px;
        color: #fff;
        position: absolute;
        top: 16px;
        right: 0;
      }
      .info_cent {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      .ic_tx {
        img:first-child {
          width: 42px;
          height: 20px;
          margin-left: 4px;
        }
        img:last-child {
          width: 50px;
          height: 50px;
          border-radius: 25px;
          position: absolute;
          top: 10px;
          left: 0;
        }
      }
      .ic_btn {
        text-align: center;
        color: #fff;
        background: $Color;
        border-radius: 13px;
        padding: 6px 12px;
        position: absolute;
        top: 24px;
        left: 70px;
      }
      .ic_row {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #666;
        font-size: 12px;
        text-align: center;
        .ic_row_p {
          margin-bottom: 10px;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}
.pg_center {
  .pgc_order {
    background: #fff;
    width: 100vw;
    padding-top: 23px;

    .pgco_h {
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e5e5;
      .pgco_h_my {
        margin-left: 15px;
        border-left: 4px solid $Color;
        padding-left: 10px;
        font-size: 14px;
        display: inline-block;
        height: 17px;
        line-height: 17px;
      }
      .pgco_h_all {
        float: right;
        color: #999;
        font-size: 12px;
        margin-right: 16px;
        height: 17px;
        line-height: 17px;
        & /deep/ .van-icon {
          top: 1px;
        }
      }
    }
    .pgco_list {
      padding: 18px 0;
      overflow: hidden;
      li {
        float: left;
        width: 20%;
        text-align: center;
        position: relative;
        img {
          width: 20px;
          height: 20px;
        }
        .tip {
          position: absolute;
          right: 20px;
          top: -7px;
          height: 15px;
          width: 15px;
          color: #fff;
          font-size: 11px;
          text-align: center;
          line-height: 15px;
          border-radius: 8px;
          background: $Color;
          box-sizing: border-box;
        }
        p {
          margin-top: 10px;
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
.pgc_link {
  margin-top: 13px;
}
.pgc_utils {
  margin-top: 13px;
  .utils {
    text-align: center;
    img {
      height: 24px;
      width: auto;
    }
    p {
      font-size: 12px;
      color: #999;
      margin-top: 15px;
    }
  }
}
</style>