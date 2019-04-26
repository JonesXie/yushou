<template>
  <HeadFoot class="" :Title="title">
    <template #content></template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "",
  data() {
    return {
      title: ""
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
</style>