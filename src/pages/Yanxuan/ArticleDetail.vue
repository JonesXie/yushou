<template>
  <HeadFoot class="pg_article" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
      <div class="pga_html">4444</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { selectArticleDetaile } from "@/api/yanxuan.js";
export default {
  name: "ArticleDetail",
  data() {
    return {
      title: "文章详情",
      backPath: "", //返回路由，可删除
      id: null,
      htmlCotent: null
    };
  },
  components: { HeadFoot },
  methods: {
    getHTML() {
      selectArticleDetaile({ id: this.id }).then(response => {
        console.log(response)
        this.htmlCotent = response;
      });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getHTML();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_article {
  padding-top: 46px;
}
</style>