<template>
  <HeadFoot class="pg_setting" :Title="title" :backPath="backPath">
    <template #content>
      <van-cell-group class="pgs_link">
        <van-cell title="修改密码" is-link to="/fixpassword" />
        <van-cell title="安全设置" is-link to="/security" />
      </van-cell-group>
      <div class="pps_out" @click="getOut">退出登录</div>
    </template>
  </HeadFoot>
</template>

<script>
import { Cell, CellGroup } from "vant";
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "TheSetting",
  data() {
    return {
      title: "设置",
      backPath: "/center"
    };
  },
  components: { HeadFoot, [Cell.name]: Cell, [CellGroup.name]: CellGroup },
  methods: {
    getOut() {
      localStorage.removeItem("token");
      sessionStorage.removeItem("isLogin");
      this.$store.commit("SET_Token", null);
      this.$router.push("/login");
    }
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