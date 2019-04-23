<template>
  <div class="pg_type">
    <van-nav-bar title="全部分类"></van-nav-bar>
    <div class="search"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar } from "vant";
export default {
  name: "TheType",
  data() {
    return {};
  },
  components: { [NavBar.name]: NavBar },
  methods: {
    ...mapActions(["ChangeActive"])
  },
  mounted() {
    this.ChangeActive(2);
  }
};
</script>

<style scoped lang="scss">
.pg_type {
   background: #fff;
   min-height: calc(100vh - 50px);
  .search {
    height: 28px;

  }
}
</style>