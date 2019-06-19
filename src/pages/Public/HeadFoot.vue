<template>
  <div class="ly_hf">
    <van-nav-bar :title="Title" left-arrow :fixed="true" @click-left="GoBack()"></van-nav-bar>
    <slot name="content"></slot>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar } from "vant";
import { notNull } from "@/layout/methods.js";
export default {
  name: "HeadFoot",
  props: ["Title", "backPath"],
  data() {
    return {};
  },
  components: { [NavBar.name]: NavBar },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      if (notNull(this.backPath)) {
        this.$router.replace(this.backPath)
      } else {
        this.$router.go(-1);
      }
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

<style lang="scss">
.ly_hf {
  width: 100vw;
  position: relative;
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
}
</style>