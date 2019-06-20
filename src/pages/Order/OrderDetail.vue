<template>
  <HeadFoot class="pg_orderdetail" :Title="title">
    <template #content>
      <div class="pgod_h">
        <p class="pgod_h_p1">
          <img
            v-if="detailData.orderState === '99'"
            src="@/assets/img/components/pg_orderdetail_pass.png"
            alt
          >
          <img v-else src="@/assets/img/components/pg_orderdetail_wait.png" alt>
          <span>{{orderStatus[detailData.orderState]}}</span>
        </p>
        <p class="pgod_h_p2" v-if="detailData.orderState === '99'">您的包裹已到达,祝您购物愉快</p>
        <p class="pgod_h_p2" v-else-if="detailData.orderState === '00'">您的订单已取消</p>
        <p class="pgod_h_p2" v-else-if="detailData.orderState === '01'">等待支付中</p>
        <p class="pgod_h_p2" v-else>您的包裹已经在路上啦，请您耐心等待哦</p>
      </div>
      <van-cell-group>
        <van-cell :center="true">
          <div slot="title" class="site">
            <p class="site_owner">
              <img src="@/assets/img/components/pg_orderdetail_car.png" alt>
              {{detailData.receivingPeople}}
              <span>{{detailData.receivingPhone}}</span>
            </p>
            <p class="site_info">{{detailData.receivingAddress}}</p>
          </div>
        </van-cell>
        <van-cell is-link :to="{path:'/logistics',query:{id:123}}">
          <div slot="title" class="logistics">
            <p class="logistics_p">
              <img src="@/assets/img/components/pg_orderdetail_site.png" alt>
              物流信息
            </p>
            <div class="logistics_info">
              <img src="@/assets/img/components/pg_orderdetail_circle.png" alt>
              <p class="site" v-if="detailData.exchangeExpressName === null">暂无物流信息</p>
              <p class="site">{{detailData.exchangeExpressName}}</p>
              <p class="time">{{nowTime}}</p>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="order">
        <van-cell :title="`订单编号:${detailData.orderNo}`"></van-cell>
        <router-link
          :to="{path:`/goods/${detailData.goodsId}`,query:{actived:false}}"
          class="detail"
        >
          <img :src="detailData.goodsImages" alt>
          <div class="wrap">
            <p>{{detailData.goodsName}}</p>
            <p class="guige">
              规格：{{detailData.goodsModel}}
              <span>{{detailData.goodsBuyNum}}件</span>
            </p>
          </div>
        </router-link>
        <van-cell title="今日价格">
          <span class="cell-right">￥{{detailData.newDatePrice}}</span>
        </van-cell>
        <van-cell title="剩余调货周期">
          <span class="cell-right">{{detailData.inWaitDay}}天</span>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="info">
        <van-cell title="邮费">
          <span>免邮</span>
        </van-cell>
        <van-cell title="配送方式">
          <span>快递配送</span>
        </van-cell>
        <van-cell title="留言">
          <span slot="label" v-if="detailData.orderRemarks === null">暂无备注</span>
          <span slot="label">{{detailData.orderRemarks}}</span>
        </van-cell>
        <van-cell title="支付方式">
          <span>{{orderPayType[detailData.orderPayType]}}</span>
        </van-cell>
        <van-cell title="实付金额">
          <span class="cell-right">{{detailData.orderPayPrice}}</span>
        </van-cell>
        <van-cell title="下单时间">
          <span>{{detailData.createtime}}</span>
        </van-cell>
      </van-cell-group>
    </template>
  </HeadFoot>
</template>

<script>
import { toOrderDetail } from "@/api/order.js";
import { getTime } from "@/layout/methods.js";
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Icon, Cell, CellGroup } from "vant";
export default {
  name: "OrderDetail",
  data() {
    return {
      title: "订单详情",
      orderId: null,
      detailData: "",
      // 1支付宝 2微信 3余额
      orderPayType: {
        1: "支付宝",
        2: "微信",
        3: "余额"
      },
      // 全部：不传 已取消：00 待支付：01 调货中：02 待发货 03 待收货 04 交易成功：100
      orderStatus: {
        "00": "已取消",
        "01": "待支付",
        "02": "调货中",
        "03": "待发货",
        "04": "待收货",
        "99": "交易成功"
      }
    };
  },
  components: {
    HeadFoot,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  computed: {
    nowTime: function() {
      let timer = getTime();
      return timer;
    }
  },
  methods: {
    onInit() {
      let _data = {
        orderId: this.orderId
      };
      toOrderDetail(_data).then(({ data }) => {
        this.detailData = data.data;
      });
    }
  },
  mounted() {
    this.orderId = this.$route.params.id;
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_orderdetail {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 46px;
}
.pgod_h {
  width: 100vw;
  height: 80px;
  background-image: url("~@/assets/img/components/pg_orderdetail_head.png");
  background-position: right top;
  background-repeat: no-repeat;
  background-size: auto 100%;
  padding: 20px 15px;
  box-sizing: border-box;
  .pgod_h_p1 {
    font-size: 16px;
    color: #fff;
    span {
      margin-left: 10px;
    }
    img {
      width: 16px;
      height: 16px;
      position: relative;
      top: -1px;
    }
  }
  .pgod_h_p2 {
    font-size: 12px;
    margin-top: 12px;
    padding-left: 26px;
    color: #fff;
  }
}
.pg_orderdetail {
  .site {
    width: 100%;
    .site_owner {
      font-size: 15px;

      img {
        width: 22px;
        height: 15px;
        margin-right: 5px;
        position: relative;
        top: -1px;
      }
      span {
        color: #666;
        font-size: 12px;
        margin-left: 25px;
      }
    }
    .site_info {
      font-size: 12px;
      margin-top: 8px;
      padding-left: 32px;
      line-height: 20px;
    }
  }
  .logistics {
    width: 100%;
    .logistics_p {
      font-size: 15px;

      img {
        width: 14px;
        height: 19px;
        margin-right: 5px;
        position: relative;
        top: -1px;
        left: -6px;
      }
    }
    .logistics_info {
      border-left: 1px solid #ddd;
      position: relative;
      padding-left: 22px;
      margin-top: 8px;
      .site {
        font-size: 12px;
        line-height: 20px;
      }
      .time {
        color: #999;
        font-size: 11px;
      }
      img {
        width: 11px;
        height: 11px;
        position: absolute;
        top: 0;
        left: -6px;
      }
    }
  }
}
.pg_orderdetail {
  .order {
    margin-top: 10px;
    .detail {
      width: 100vw;
      padding: 15px;
      box-sizing: border-box;
      background: #f4f4f4;
      display: table-cell;
      img {
        width: 80px;
        height: 80px;
      }
      .wrap {
        overflow: hidden;
        display: inline-block;
        width: 70%;
        margin-left: 4%;
        vertical-align: middle;
        p {
          line-height: 19px;
        }
        .guige {
          font-size: 12px;
          color: #999;
          overflow: hidden;
          margin-top: 12px;
          span {
            float: right;
          }
        }
      }
    }
    .cell-right {
      color: $Color;
    }
  }
}
</style>