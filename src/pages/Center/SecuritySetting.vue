<template>
  <HeadFoot class="pg_setting" :Title="title">
    <template #content>
      <van-cell-group class="pgs_link">
        <van-cell title="设置支付密码" is-link to="/setpay/0"/>
        <van-cell title="修改支付密码" is-link to="/setpay/1"/>
      </van-cell-group>
    </template>
  </HeadFoot>
</template>

<script>
import { Cell, CellGroup } from "vant";
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "SecuritySetting",
  data() {
    return {
      title: "安全设置",
    };
  },
  components: { HeadFoot, [Cell.name]: Cell, [CellGroup.name]: CellGroup },
  methods: {
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_setting {
  padding-top: 50px;
  width: 100vw;
  .pps_out {
    font-size: 12px;
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: $Color;
    border-radius: 15px;
    width: 80%;
    margin: 20px auto;
  }
}
</style>