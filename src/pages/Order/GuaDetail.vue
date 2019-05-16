<template>
  <HeadFoot class="pg_orderdetail" :Title="title">
    <template #content>
      <div class="content_wrap">
      <van-cell-group class="order">
        <van-cell>
          <span>订单编号  17102316279122</span>
        </van-cell>
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
        <van-cell title="支付方式">
          <span >支付宝</span>
        </van-cell>
        <van-cell title="下单时间">
          <span >2019-4-20</span>
        </van-cell>
      </van-cell-group>
      </div>
      <div class="btn" @click="submit">立即购买</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Icon, Cell, CellGroup } from "vant";
export default {
  name: "GuaDetail",
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
  methods: {
    submit(){
      this.$router.push({ path: "/guaconfirm", query: { id: "xie" } });
    }
  },
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
.pg_orderdetail {
  .content_wrap{
    padding-bottom: 52px;
  }
  .order {
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
  .info{
    margin-top: 10px;
  }
  .btn{
    width: 100vw;
    height: 50px;
    background: $Color;
    text-align: center;
    line-height: 50px;
    font-size: 19px;
    color:#fff;
    position: fixed;
    left: 0;
    bottom: 0px;
  }
}
</style>