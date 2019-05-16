<template>
  <ul class="mod_salelist">
    <li class="mod_li">
      <p class="mod_li_h">订单编号：78958758892146</p>
      <p class="mod_li_info">
        <span>参数规格：</span>
        <em>白色；36码（1件）</em>
      </p>
      <p class="mod_li_info">
        <span>实付金额：</span>
        <em>￥4137</em>
      </p>
      <p class="mod_li_info">
        <span>剩余调货周期：</span>
        <em>29天</em>
      </p>
      <div class="mod_li_btn">
        <div class="mod_li_btn1" @click="detailBtn">详情</div>
        <div class="mod_li_btn2" @click="buyBtn">购买</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SaleList",
  props: ["priceData", "dayData", "otherData"],
  data() {
    return {};
  },
  watch: {
    priceData: {
      handler: function() {
        // console.log(this.priceData);
      },
      immediate: true
    },
    dayData: {
      handler: function() {
        // console.log(this.dayData);
      },
      immediate: true
    },
    otherData: {
      handler: function() {
        // console.log(this.otherData);
      },
      immediate: true
    }
  },
  methods: {
    detailBtn() {
      this.$router.push({ path: "/guadetail", query: { id: "xie" } });
    },
    buyBtn() {
      this.$router.push({ path: "/guaconfirm", query: { id: "xie" } });
    }
  },
  mounted() {
    // console.log(this.activeData);
    // console.log(this.otherData);
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.mod_salelist {
  width: 100%;
}
.mod_li {
  width: 360px;
  height: 160px;
  margin: 0 auto;
  box-sizing: border-box;
  background: url("~@/assets/img/components/mod_salelist_li.png");
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 10px;
  padding: 0 24px 0 21px;
}
.mod_li_h {
  height: 40px;
  line-height: 40px;
}
.mod_li_info {
  color: #999;
  font-size: 12px;
  overflow: hidden;
  margin-top: 12px;
  em {
    float: right;
  }
}
.mod_li_btn {
  text-align: right;
  margin-top: 12px;
  font-size: 12px;
  .mod_li_btn1 {
    display: inline-block;
    width: 60px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid $Color;
    color: $Color;
    border-radius: 13px;
    margin-right: 20px;
  }
  .mod_li_btn2 {
    @include btn(60px, 25px);
  }
}
</style>