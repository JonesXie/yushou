<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar v-show="this.$store.state.isBar.showBar"></tab-bar>
  </div>
</template>

<script>
import TabBar from "@/layout/TabBar.vue";
export default {
  name: "app",
  components: { TabBar },
  data() {
    return {};
  },
  watch: {
    "$store.state.isBar.showBar": function() {}
  },
  mounted () {
    document.documentElement.style.background = "#f4f4f4"
  }
};
</script>
<style lang='scss'>
#app {
  width: 100vw;
  min-height: 100vh;
  background: #f4f4f4;
  font-size: 14px;
}
</style>

