<template>
  <HeadFoot class="pg_orderdetail" :Title="title">
    <template #content>
      <div class="pgod_h">hhhh</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "OrderDetail",
  data() {
    return {
      title: "订单详情"
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