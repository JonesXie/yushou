<template>
  <div class="mod_list" ref="mod_list">
    <img :src="istype.codeImg" alt class="mdl_title">
    <ul class="mdl_ul">
      <li v-for="(v,i) in istype.codeList" :key="i">
        <router-link :to="`/goodstype/${v.id}`">
          <img :src="v.codeImg" alt>
          <p>{{v.codeName}}</p>
        </router-link>
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
  watch: {
    istype: {
      handler: function() {
        // console.log(this.istype);
      },
      immediate: true
    }
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