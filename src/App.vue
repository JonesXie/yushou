<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar v-show="this.$store.state.isBar.showBar"></tab-bar>
  </div>
</template>

<script>
import TabBar from "@/pages/Public/TabBar.vue";
export default {
  name: "app",
  components: { TabBar },
  data() {
    return {};
  },
  watch: {
    "$store.state.isBar.showBar": function() {}
  },
  mounted() {
    this.$nextTick(() => {
      //全局颜色
      document.documentElement.style.background = "#f4f4f4";
      //顶部菜单固定
      let rate = document.documentElement.style.fontSize.split("px")[0];
      let stickTop = Number((rate * 1.22667).toFixed(0));
      this.$store.dispatch("ChangeStickTop", stickTop);
    });
  }
};
</script>
<style lang='scss'>
$Color: #ea047b;
#app {
  width: 100vw;
  min-height: 100vh;
  background: #f4f4f4;
  font-size: 14px;
}
//无数据
.noData {
  width: 100%;
  height: calc(100vh - 120px);
  text-align: center;
  position: absolute;
  top: 120px;
  img {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: inline-block;
    width: 150px;
  }
}
</style>

