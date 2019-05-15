<template>
  <div class>ssss</div>
</template>

<script>
export default {
  name: "SaleList",
  props: ["priceData", "dayData", "otherData"],
  data() {
    return {};
  },
  watch: {
    priceData: {
      handler: function() {
        console.log(this.priceData);
      },
      immediate: true
    },
    dayData: {
      handler: function() {
        console.log(this.dayData);
      },
      immediate: true
    },
    otherData: {
      handler: function() {
        console.log(this.otherData);
      },
      immediate: true
    }
  },
  methods: {},
  mounted() {
    // console.log(this.activeData);
    // console.log(this.otherData);
  }
};
</script>

<style scoped lang="scss">
</style>