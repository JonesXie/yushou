<template>
  <div class="pg_TheAbout">
    <div class="pgw_h_nav">
      <van-icon name="arrow-left" @click="GoBack()" />
      <span>关于我们</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon } from "vant";
export default {
  name: "TheAbout",
  data() {
    return {};
  },
  components: {
    [Icon.name]: Icon
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
.pg_TheAbout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: url("~@/assets/img/center/pg_about.jpg");
  background-size: 100% 100%;
  background-position: top center;
  background-repeat: no-repeat;
  .pgw_h_nav {
    position: relative;
    height: 46px;
    line-height: 46px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    font-size: 16px;
    color: #f4f4f4;
    & /deep/ .van-icon {
      float: left;
      top: 16px;
      left: 15px;
    }
  }
}
</style>