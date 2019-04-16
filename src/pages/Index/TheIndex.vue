<template>
  <div v-if="this.$store.state.isBar.showBar">{{hello}}</div>
</template>
<script>
import { getMusic, getNews } from "@/api/index.js";
export default {
  data() {
    return {
      hello: "首页"
    };
  },
  mounted() {
    getMusic().then(response => {
      // console.log(response)
    });

    let _data = { page: 1, count: 5 };
    getNews(_data).then(response => {
      // console.log(response)
    });
  }
};
</script>
<style lang="scss" scoped>
$Color: #f00;

div {
  color: $Color;
  width: percentage( 100 / 120);
}

</style>


