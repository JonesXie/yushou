<template>
  <HeadFoot class="" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "",
  data() {
    return {
      title: "",
      backPath:"",//返回路由，可删除
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
</style>