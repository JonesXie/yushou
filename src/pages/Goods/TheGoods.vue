<template>
  <div class="pg_goods">
    <van-nav-bar left-arrow :fixed="true" @click-left="GoBack()">
      <div class="pgg_head" slot="title">
        <span :class="['title', actived?'active':'']" @click="changePage(true)">商品</span>
        <span :class="['title', actived?'':'active']" @click="changePage(false)">挂卖</span>
      </div>
    </van-nav-bar>
    <div class="goods" v-if="actived">
      <goods-detail :goodsId="goodsId"></goods-detail>
    </div>
    <div class="guamai" v-else>
      <gua-mai :goodsId="goodsId"></gua-mai>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GuaMai from "./GuaMai";
import GoodsDetail from "./GoodsDetail";
import { NavBar } from "vant";
export default {
  name: "TheGoods",
  data() {
    return {
      actived: true,
      goodsId: null
    };
  },
  components: {
    GuaMai,
    GoodsDetail,
    [NavBar.name]: NavBar
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.replace("/index");
    },
    changePage(bool) {
      this.actived = bool;
    }
  },
  created() {
    this.goodsId = this.$route.params.id;
    if (this.$route.query.actived !== undefined) {
      this.actived = this.$route.query.actived === "false" ? false : true;
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
</style>