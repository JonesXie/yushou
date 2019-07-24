<template>
  <HeadFoot class="pg_TheQuestion" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
      <div v-if="Qlist.length > 0" class="list_wrap">
        <div class="pgtq_li" v-for="(v,i) in Qlist" :key="i">
          <div class="li_h">Q：{{v.title}}</div>
          <div class="li_c">A：{{v.summary}}</div>
        </div>
      </div>
      <div v-else class="noData">
        <img src="@/assets/img/ly_nodata.png" alt />
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { findCommonProblem } from "@/api/center.js";
export default {
  name: "TheQuestion",
  data() {
    return {
      title: "常见问题",
      backPath: "", //返回路由，可删除
      Qlist: []
    };
  },
  components: { HeadFoot },
  methods: {
    init() {
      findCommonProblem().then(({ data }) => {
        if (data.code === 1) {
          this.Qlist = data.data;
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_TheQuestion {
  padding-top: 50px;
  .pgtq_li {
    background: #fff;
    width: 100vw;
    margin-bottom: 10px;
    .li_h {
      padding: 15px;
      color: #333;
      font-size: 14px;
      border-bottom: 1px dashed #efefef;
      font-weight: bold;
    }
    .li_c {
      padding: 15px;
      color: #999;
      line-height: 18px;
    }
  }
}
</style>