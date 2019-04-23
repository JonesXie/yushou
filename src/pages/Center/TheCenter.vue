<template>
  <div class="pg_center">
    TheCenter
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TheCenter",
  data() {
    return {

    };
  },
  methods: {
    ...mapActions(["ChangeActive"]),
  },
  mounted() {
    this.ChangeActive(3);
  }
};
</script>

<style scoped lang="scss">

</style>