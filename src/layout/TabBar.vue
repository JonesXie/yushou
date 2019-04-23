<template>
  <van-tabbar v-model="active" active-color="#ea047b" :z-index="99" v-if="showBar">
    <van-tabbar-item to="/index">
      <span>主页</span>
      <img slot="icon" slot-scope="props" :src="props.active ? zhuye.active : zhuye.normal">
    </van-tabbar-item>
    <van-tabbar-item>
      <span>严选</span>
      <img slot="icon" slot-scope="props" :src="props.active ? yanxuan.active : yanxuan.normal">
    </van-tabbar-item>
    <van-tabbar-item to="/thetype">
      <span>分类</span>
      <img slot="icon" slot-scope="props" :src="props.active ? fenlei.active : fenlei.normal">
    </van-tabbar-item>
    <van-tabbar-item>
      <span>我的</span>
      <img slot="icon" slot-scope="props" :src="props.active ? my.active : my.normal">
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "TabBar",
  data() {
    return {
      zhuye: {
        normal: require("@/assets/img/ly_tabbar_zy.png"),
        active: require("@/assets/img/ly_tabbar_zy2.png")
      },
      yanxuan: {
        normal: require("@/assets/img/ly_tabbar_yx.png"),
        active: require("@/assets/img/ly_tabbar_yx2.png")
      },
      fenlei: {
        normal: require("@/assets/img/ly_tabbar_fl.png"),
        active: require("@/assets/img/ly_tabbar_fl2.png")
      },
      my: {
        normal: require("@/assets/img/ly_tabbar_my.png"),
        active: require("@/assets/img/ly_tabbar_my2.png")
      }
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  methods: {},
  computed: {
    showBar: function() {
      return this.$store.state.isBar.showBar;
    },
    active: {
      get: function() {
        return this.$store.state.isBar.barActive;
      },
      set: function() {}
    }
  },
  mounted() {}
};
</script>

<style scoped>
/* @import url(); */
</style>