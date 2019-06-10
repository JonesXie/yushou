<template>
  <HeadFoot class="pg_notice" :Title="title">
    <template #content>
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          finished-text="没有更多了"
          class="vantList"
        >
          <ul class="pgn_ul">
            <li class="pgn_li" v-for="(v,i) in noticeList" :key="i">
              <div class="pgn_li_l">
                <img :src="v.msgGroupImage" alt>
              </div>
              <router-link :to="{name:'noticedetail',params:{id:v.lastMsg.msgGroupId}}" class="pgn_li_r">
                <p>
                  {{v.msgGroupName}}
                  <span>{{v.lastMsg.msgCreateTime}}</span>
                </p>
                <p class="li_r_content van-ellipsis">{{v.lastMsg.msgTitle}}</p>
              </router-link>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { selectMsgGroup } from "@/api/index.js";
import { List, PullRefresh } from "vant";
export default {
  name: "TheNotices",
  data() {
    return {
      title: "消息中心",
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
        page: this.curPage
      };
      // 异步更新数据
      selectMsgGroup(_data).then(({ data }) => {
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
  mounted() {
    // this.onLoad();
  }
};
</script>


<style lang="scss" scoped>
.pg_notice {
  padding-top: 46px;
  .pgn_ul {
    margin-top: 10px;
    background: #fff;
    margin-bottom: 10px;
    .pgn_li {
      display: flex;
      height: 71px;
      box-sizing: border-box;
      width: 100%;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
      .pgn_li_l {
        margin: 15px 12px 0 15px;
      }
      .pgn_li_r {
        width: 80%;
        padding-top: 15px;
        font-size: 14px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        span {
          float: right;
          color: #999;
          font-size: 12px;
          margin-right: 15px;
        }
        .li_r_content {
          color: #999;
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

