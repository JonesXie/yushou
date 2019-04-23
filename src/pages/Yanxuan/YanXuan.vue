<template>
  <div class="pg_yanxuan">
    yanxuan
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "YanXuan",
  data() {
    return {

    };
  },
  methods: {
    ...mapActions(["ChangeActive"]),
    onChange(key) {
      this.activeKey = key;
    }
  },
  mounted() {
    this.ChangeActive(1);
  }
};
</script>

<style scoped lang="scss">

</style>