<template>
  <div class="mod_orderlist" ref="mo_list">
    <!-- list -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
        :immediate-check="false"
      >
        <!-- list -->
      </van-list>
    </van-pull-refresh>
    <div v-if="dataList.length === 0" class="noData">
      <img src="@/assets/img/ly_nodata.png" alt>
    </div>
  </div>
</template>

<script>
import { List, PullRefresh } from "vant";
import { findMyOrderPage } from "@/api/order.js";
export default {
  name: "OrderList",
  props: ["status"],
  data() {
    return {
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false
    };
  },
  components: { [List.name]: List, [PullRefresh.name]: PullRefresh },

  methods: {
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
        page: this.curPage,
        pageSize: 10,
        state: this.status
      };
      if (!this.loading) {
        findMyOrderPage(_data).then(({ data }) => {
          let getList = data.data.page.dataList;
          this.loading = false; //list 加载动画
          //赋值
          if (isInit) {
            this.dataList = getList;
          } else {
            [...this.dataList] = [...this.dataList, ...getList];
            this.curPage = this.curPage + 1;
            if (getList.length === 0) {
              this.finished = true;
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

<style lang="scss">
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

