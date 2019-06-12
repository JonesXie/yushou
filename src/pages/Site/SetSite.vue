<template>
  <HeadFoot class="pg_setsite" :Title="title">
    <template #content>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        @save="onSave"
        @delete="onDelete"
        class="address"
      ></van-address-edit>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import AreaList from "@/layout/area.js";
import { doAddAddress, doUpdateAddress } from "@/layout/area.js";
import { AddressEdit } from "vant";
export default {
  name: "SetSite",
  data() {
    return {
      title: "添加地址",
      areaList: AreaList
    };
  },
  components: { HeadFoot, [AddressEdit.name]: AddressEdit },
  methods: {
    onSave(val) {
      console.log(val);
    },
    onDelete() {}
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_setsite {
  .address {
    padding-top: 46px;
  }
}
</style>