<template>
  <div class="pg_DistributeOrder">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()" />
      <span>{{title}}</span>
    </div>
    <div class="head_bg"></div>
    <!-- content -->
    <div class="pg_model_content">
      <!-- <ul class="pgdo_hlist" v-if="isTab">
        <li :class="['pgdo_hlist_li',actived===0?'active':'']" @click="actived=0">全部</li>
        <li :class="['pgdo_hlist_li',actived===1?'active':'']" @click="actived=1">线上店长订单</li>
        <li :class="['pgdo_hlist_li',actived===2?'active':'']" @click="actived=2">普通用户订单</li>
        <li class="pgdo_hlist_search" @click="isTab=false">
          <van-icon name="search" />
        </li>
      </ul>-->
      <ul class="pgdo_hlist">
        <input type="text" placeholder="请输入收件人手机号、订单编号、商品名称" v-model="isTab" />
        <em @click="isSearch=isTab">搜索</em>
      </ul>
      <dorder-list class="orderList" :isSearch="isSearch" :actived="actived" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon } from "vant";
import DorderList from "@/pages/Components/distribute/DorderList.vue";
export default {
  name: "DistributeOrder",
  data() {
    return {
      title: "订单管理",
      actived: 0,
      isTab: null,
      isSearch: null
    };
  },
  components: {
    [Icon.name]: Icon,
    DorderList
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
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
.pg_DistributeOrder {
  position: relative;
  width: 100vw;
  .head_bg {
    width: 100vw;
    height: 125px;
    background: url("~@/assets/img/distribution/ly_distribute_bg.png");
    @include myBG;
    position: fixed;
    top: 0;
    left: 0;
  }
}
.pg_h_nav {
  position: fixed;
  height: 46px;
  line-height: 46px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  color: #f4f4f4;
  background: url("~@/assets/img/distribution/ly_distribute_bg.png");
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 999;
  & /deep/ .van-icon {
    float: left;
    top: 16px;
    left: 15px;
  }
}
.pg_model_content {
  width: 100vw;
  position: absolute;
  height: 100vh;
  padding-top: 46px;
  box-sizing: border-box;
}
.pg_DistributeOrder {
  .pgdo_hlist {
    width: 100vw;
    display: flex;
    text-align: center;
    margin-top: 25px;

    .pgdo_hlist_li {
      flex: 1;
      position: relative;
      font-size: 13px;
      color: #f4f4f4;
      padding-bottom: 7px;
      &.active::after {
        content: "";
        position: absolute;
        width: 30%;
        height: 1px;
        background: #fff;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .pgdo_hlist_search {
      font-size: 18px;
      color: #fff;
      margin-right: 26px;
      margin-left: 15px;
      position: relative;
      top: -2px;
    }
    input {
      width: 270px;
      height: 28px;
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 8px 11px;
      margin-left: 30px;
      font-size: 12px;
      color: #9e9e9e;
    }
    em {
      display: inline-block;
      color: #fff;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      margin-left: 10px;
    }
  }
}
.orderList {
  margin-top: 14px;
  height: calc(100vh - 114px);
  overflow-y: scroll;
  position: relative;
}
</style>