<template>
  <div class="mod_list" ref="mod_list">
    <img :src="istype.codeImg" alt class="mdl_title" />
    <ul class="mdl_ul">
      <li v-for="(v,i) in istype.codeList" :key="i">
        <router-link :to="{path:`/goodstype/${v.id}`,query:{codeName:v.codeName}}">
          <div class="img_wrap">
            <img :src="v.codeImg" alt />
          </div>
          <p class="ellipsis-line">{{v.codeName}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TypeRight",
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
@import "~@/layout/public.scss";
.mod_list {
  width: 100%;
  height: 100%;
  .mdl_title {
    width: 100%;
    height: 120px;
  }
  .mdl_ul {
    margin-top: 13px;
    overflow-y: scroll;
    height: 400px;
    box-sizing: border-box;
    width: 100%;
    li {
      float: left;
      width: 95px;
      text-align: center;
      margin-bottom: 15px;
      .img_wrap {
        width: 55px;
        height: 55px;
        line-height: 55px;
        text-align: center;
        margin: 0 auto;
        img {
          max-width: 100%;
          max-height: 100%;
        }
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