<template>
  <HeadFoot class="pg_noticedetail" :Title="title">
    <template #content>
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          finished-text="没有更多了"
          class="vantList"
        >
          <ul class="pgnd_ul">
            <li class="pgnd_li" v-for="(v,i) in noticeList" :key="i">
              <p class="title">{{v.msgTitle}}</p>
              <p class="content">{{v.msgContent}}</p>
              <p class="footer">{{v.msgCreateTime}}</p>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { selectAllMsg } from "@/api/index.js";
import { List, PullRefresh } from "vant";
export default {
  name: "NoticeDetail",
  data() {
    return {
      title: "消息中心",
      id: null,
      isRefresh: false,
      loading: false,
      finished: false,
      curPage: 1,
      noticeList: []
    };
  },
  components: { HeadFoot, [List.name]: List, [PullRefresh.name]: PullRefresh },
  methods: {
    onRefresh() {
      this.curPage = 1;
      this.onLoad(true);
    },
    onLoad(isInit = false) {
      let _data = {
        page: this.curPage,
        msgGroupId:this.id
      };
      // 异步更新数据
      selectAllMsg(_data).then(({ data }) => {
        // 加载状态结束
        this.loading = false;
        this.finished = true;
        if (data.data.page.dataList.length > 0) {
          if (isInit) {
            this.noticeList = data.data.page.dataList;
            this.$toast("刷新成功");
            this.isRefresh = false;
          } else {
            [...this.noticeList] = [
              ...this.noticeList,
              ...data.data.page.dataList
            ];
          }
          this.curPage = this.curPage + 1;
        } else {
          this.finished = true;
        }
      });
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id === undefined || id === null) {
      this.$router.back(-1);
    } else {
      this.id = this.$route.params.id;
    }
  }
};
</script>

<style scoped lang='scss'>
.pg_noticedetail {
  padding-top: 46px;
  .pgnd_ul {
    .pgnd_li {
      width: 100vw;
      background: #fff;
      padding: 12px 15px;
      margin: 5px 0;
      box-sizing: border-box;
    }
    .content {
      font-size: 12px;
      color: #999;
      line-height: 19px;
      margin: 12px 0;
    }
    .footer {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
