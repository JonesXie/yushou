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
        @change="onInit()"
      >
        <van-tab title="未使用"></van-tab>
        <van-tab title="已使用"></van-tab>
      </van-tabs>
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :immediate-check="false"
          finished-text="没有更多了"
        >
          <ul class="pggt_ul">
            <li class="pggt_li" v-for="(item,index) in dataList" :key="index">hhhh</li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Tab, Tabs, List, PullRefresh } from "vant";
import { findUserCoupon } from "@/api/center.js";
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
    // reGetData(index) {},
    onRefresh() {
      this.onInit(true);
    },
    onLoad() {
      this.onInit(false, false);
    },
    onInit(reFresh = false, isInit = true) {
      if (isInit) {
        this.curPage = 1;
        this.finished = false;
      }
      let _data = {
        // page: this.curPage,
        goodsId: '',
        state: this.active
      };
      if (this.noLimit) {
        this.noLimit = false;
        findUserCoupon(_data, true).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data.page.dataList;
          //赋值
          if (isInit) {
            this.dataList = getList;
            this.curPage = this.curPage + 1;
          } else {
            [...this.dataList] = [...this.dataList, ...getList];
            if (getList.length === 0) {
              this.finished = true;
            } else {
              this.curPage = this.curPage + 1;
            }
          }
          if (reFresh) {
            this.$toast("刷新成功");
            this.isRefresh = false;
          }
        });
      }
    }
  },
  mounted() {
    this.onInit();
  }
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