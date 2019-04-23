<template>
  <div class="mod_list" ref="mod_list">
    <img src="@/assets/404_img/404.png" alt class="mdl_title">
    <ul class="mdl_ul">
      <li>
        <router-link to="/">
          <img src="@/assets/logo.png" alt>
          <p>香水</p>
        </router-link>
      </li>
      <li>
        <img src="@/assets/logo.png" alt>
        <p>香水</p>
      </li>
      <li>
        <img src="@/assets/logo.png" alt>
        <p>香水</p>
      </li>
      <li>
        <img src="@/assets/logo.png" alt>
        <p>香水</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TypeList",
  props: ["istype"],
  data() {
    return {};
  },
  methods: {
    GotoTop() {
      this.$refs.mod_list.scrollTo(0, 0);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.GotoTop();
    });
  },
  beforeUpdate() {
    this.GotoTop();
  }
};
</script>

<style scoped lang="scss">
.mod_list {
  width: 100%;
  .mdl_title {
    width: 100%;
    height: 120px;
  }
  .mdl_ul {
    margin-top: 24px;
    overflow: hidden;
    li {
      float: left;
      margin: 0 20px 16px;
      img {
        width: 55px;
        height: 55px;
      }
      p {
        text-align: center;
        font-size: 12px;
        margin-top: 10px;
        color: #666;
      }
    }
  }
}
</style>