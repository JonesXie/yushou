<template>
  <div class="pg_guamai">
    <van-tabs
      v-model="active"
      :line-height="0"
      title-active-color="#ea041f"
      color="#ea041f"
      title-inactive-color="#666"
      :ellipsis="false"
      class="pggm_head"
      @change="indexChange"
    >
      <van-tab>
        <div slot="title" @click="priceRange" class="price">
          价格
          <img v-if="priceActive === 1" src="@/assets/img/goods/pg_guamai_up.png" alt>
          <img v-else-if="priceActive === 2" src="@/assets/img/goods/pg_guamai_down.png" alt>
          <img v-else src="@/assets/img/goods/pg_guamai_default.png" alt>
        </div>
        <sale-list :priceData="priceActive" :selected="active"></sale-list>
      </van-tab>
      <van-tab>
        <div slot="title" @click="dayRange" class="days price">
          天数
          <img v-if="dayActive === 1" src="@/assets/img/goods/pg_guamai_up.png" alt>
          <img v-else-if="dayActive === 2" src="@/assets/img/goods/pg_guamai_down.png" alt>
          <img v-else src="@/assets/img/goods/pg_guamai_default.png" alt>
        </div>
        <sale-list :dayData="dayActive" :selected="active"></sale-list>
      </van-tab>
      <van-tab>
        <div slot="title" class="others" @click="show=true">
          筛选
          <img src="@/assets/img/goods/pg_guamai_add.png" alt>
        </div>
        <sale-list :otherData="otherData" :selected="active"></sale-list>
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" position="right">内容</van-popup>
  </div>
</template>

<script>
import { Tab, Tabs, Popup } from "vant";
import SaleList from "@/pages/Components/goods/SaleList.vue";
export default {
  name: "GuaMai",
  data() {
    return {
      active: 0,
      priceActive: 0,
      dayActive: 0,
      otherData: {},
      img: require("@/assets/img/goods/pg_goodstype_goods.png"),
      show: false
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    SaleList
  },
  computed: {
    stickTop: function() {
      return this.$store.state.stickTop;
    }
  },
  methods: {
    indexChange() {
      this.priceActive = 0;
      this.dayActive = 0;
    },
    priceRange() {
      if (this.active === 0) {
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
    },
    dayRange() {
      if (this.active === 1) {
        switch (this.dayActive) {
          case 0:
            this.dayActive = 1;
            break;
          case 1:
            this.dayActive = 2;
            break;
          default:
            this.dayActive = 0;
        }
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_guamai {
  .pggm_head {
    & /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
    }
    .price {
      img {
        width: 7px;
        height: 11px;
      }
    }
    .others {
      img {
        width: 9px;
        height: 10px;
      }
    }
  }
  .pggm_content {
    height: 100vh;
  }
}
</style>