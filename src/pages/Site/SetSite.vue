<template>
  <HeadFoot class="pg_setsite" :Title="title">
    <template #content>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        @save="onSave"
        :address-info="addressInit"
        class="address"
      ></van-address-edit>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import AreaList from "@/layout/area.js";
import { notNull } from "@/layout/methods.js";
import { doAddAddress, doUpdateAddress, getAddress } from "@/api/center.js";
import { AddressEdit } from "vant";
export default {
  name: "SetSite",
  data() {
    return {
      title: "添加地址",
      areaList: AreaList,
      id: null,
      addressInit: {}
    };
  },
  components: { HeadFoot, [AddressEdit.name]: AddressEdit },
  methods: {
    onSave(val) {
      let _data = {
        name: val.name,
        phone: val.tel,
        area: `${val.province}-${val.city}-${val.county}`,
        address: val.addressDetail,
        isDefault: Number(val.isDefault)
      };
      if (notNull(this.id)) {
        Object.assign(_data, { addressId: this.id });
        doUpdateAddress(_data).then(({ data }) => {
          this.$toast(data.msg);
          if (data.msg === "修改成功") {
            this.$router.push("/mysite");
          }
        });
      } else {
        doAddAddress(_data).then(({ data }) => {
          this.$toast(data.msg);
          if (data.msg === "保存成功") {
            this.$router.push("/mysite");
          }
        });
      }
    },
    onInit() {
      let _data = {
        addressId: this.id
      };
      getAddress(_data).then(({ data }) => {
        this.addressInit = {
          name: data.data.name,
          tel: data.data.phone,
          province: data.data.area.split("-")[0],
          city: data.data.area.split("-")[1],
          county: data.data.area.split("-")[2],
          addressDetail: data.data.address,
          areaCode: null,
          isDefault: data.data.isDefault === 0 ? false : true
        };
        for (let key in this.areaList.county_list) {
          if (this.areaList.county_list[key] === this.addressInit.county) {
            this.addressInit.areaCode = key;
            break;
          }
        }
      });
    }
  },
  mounted() {
    if (notNull(this.$route.query.id)) {
      this.id = this.$route.query.id;
      this.onInit();
    }
  }
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