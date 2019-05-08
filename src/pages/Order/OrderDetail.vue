<template>
  <HeadFoot class="pg_orderdetail" :Title="title">
    <template #content>
      <div class="pgod_h">
        <p class="pgod_h_p1">
          <!-- <img src="@/assets/img/components/pg_orderdetail_pass.png" alt=""> -->
          <img src="@/assets/img/components/pg_orderdetail_wait.png" alt>
          <span>等待中</span>
        </p>
        <p class="pgod_h_p2">您的包裹已经在路上啦，请您耐心等待哦</p>
      </div>
      <van-cell-group>
        <van-cell is-link :center="true">
          <div slot="title" class="site">
            <p class="site_owner">
              <img src="@/assets/img/components/pg_orderdetail_car.png" alt>
              孙鹏飞
              <span>187****1509</span>
            </p>
            <p class="site_info">安徽省合肥市包河区望湖街道马鞍山路绿地瀛海大厦D座1102</p>
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
              <p class="site">您已签收本次订单包裹，本次配送完成。感谢您在鱼麦麦上的购物，祝您生活愉快！</p>
              <p class="time">2017-10-25 11:35:37</p>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="order">
        <van-cell title="订单编号  17102316279122"></van-cell>
        <div class="detail">
          <img src="@/assets/logo.png" alt>
          <div class="wrap">
            <p>骆驼牌 透气软弹男款同步网鞋低帮套脚棉鞋男式</p>
            <p class="guige">
              规格：白色；42
              <span>1件</span>
            </p>
          </div>
        </div>
        <van-cell title="今日价格">
          <span class="cell-right">￥4137.0</span>
        </van-cell>
        <van-cell title="剩余调货周期">
          <span class="cell-right">4天</span>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="info">
        <van-cell title="邮费">
          <span >免邮</span>
        </van-cell>
        <van-cell title="配送方式">
          <span >快递配送</span>
        </van-cell>
        <van-cell title="留言">
          <span  slot="label">备注</span>
        </van-cell>
        <van-cell title="支付方式">
          <span >支付宝</span>
        </van-cell>
        <van-cell title="下单时间">
          <span >2019-4-20</span>
        </van-cell>
      </van-cell-group>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Icon, Cell, CellGroup } from "vant";
export default {
  name: "OrderDetail",
  data() {
    return {
      title: "订单详情"
    };
  },
  components: {
    HeadFoot,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {},
  mounted() {}
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
      width: 100%;
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