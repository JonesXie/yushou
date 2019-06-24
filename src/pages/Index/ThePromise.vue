<template>
  <HeadFoot class="pg_ThePromise" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
      <!-- <div class="pga_html" v-html="HTMLCotent"></div> -->
      <iframe
        height="100vw"
        width="100vh"
        id="pga_html"
        frameborder="0"
        scrolling="auto"
        allowfullscreen
        name="pga_html"
        src="https://www.fishmaimai.com/zpbz.html"
      ></iframe>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
// import { zpbz } from "@/api/index.js";
export default {
  name: "ThePromise",
  data() {
    return {
      title: "正品保证",
      backPath: "", //返回路由，可删除
      HTMLCotent: null
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {
    // zpbz().then(({ data }) => {
    //   this.HTMLCotent = data;
    // });
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_ThePromise {
  padding-top: 46px;
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  min-height: 100vh;

  .pga_html {
    padding: 10px;
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
    & /deep/ img {
      width: 100%;
    }
    & /deep/ base {
      display: none;
    }
    & /deep/ p {
      margin-left: 10px;
      margin-right: 10px;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
    & /deep/ h2 {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    & /deep/ .txp_player {
      width: 100%;
    }
  }
}
</style>