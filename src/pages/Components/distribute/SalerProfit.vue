// 线上店长收益
<template>
  <div class="mod_realprofit">
    <div class="list_li van-hairline--bottom" v-for="(v,i) in dataList" :key="i">
      <p class="li_title">
        线上店长：18227765609
        <em class="fr">+86.0元</em>
      </p>
      <p class="li_time li_title">
        佣金比例：12%
        <i class="fr">2019-4-9</i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RealProfit",
  data() {
    return {
      dataList: [1, 2, 3]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.mod_realprofit {
  width: 345px;
  margin: 0 auto 0;
  background: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  .list_li {
    padding: 26px 2px 16px 15px;
    box-sizing: border-box;
    .li_title {
      width: 100%;
      font-size: 13px;
      overflow: hidden;
      em {
        color: $Color;
        font-size: 14px;
        margin-right: 5px;
      }
    }
    .li_time {
      color: #999;
      font-size: 12px;
      margin-top: 8px;
      i {
        margin-right: 5px;
      }
    }
  }
}
</style>