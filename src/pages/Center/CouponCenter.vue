<template>
  <HeadFoot class="pg_conpon" :Title="title" :backPath="backPath">
    <template #content>
      <van-tabs
        v-model="active"
        animated
        :line-height="2"
        title-active-color="#ea047b"
        color="#ea047b"
        title-inactive-color="#666"
        :ellipsis="false"
        class="pggt_head"
        @change="reGetData"
      >
        <van-tab title="未使用"></van-tab>
        <van-tab title="已使用"></van-tab>
      </van-tabs>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Tab, Tabs, List, PullRefresh } from "vant";
export default {
  name: "CounponCenter",
  data() {
    return {
      title: "优惠券",
      backPath: "", //返回路由，可删除
      active: 0,
      curPage: 1,
      dataList: [],
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  components: {
    HeadFoot,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    //eslint-disable-next-line
    reGetData(index) {}
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pggt_head {
  & /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
  }
}
.noData {
  width: 100%;
  height: calc(100vh - 120px);
  text-align: center;
  position: absolute;
  top: 120px;
  img {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: inline-block;
    width: 227px;
    height: 200px;
  }
}
</style>