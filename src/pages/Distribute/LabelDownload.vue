<template>
  <HeadFoot class="pg_LabelDownload" :Title="title" :backPath="backPath">
    <template #content>
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="pgld_list">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :finished-text="dataList.length===0?'':finshTxt"
          :immediate-check="false"
        >
          <!-- do somethings -->
          <ul>
            <li class="pgld_item" v-for="(v,i) in dealList" :key="i">
              <div class="item-title van-hairline--bottom">
                <div class="fl">{{v.createDate}}</div>
                <div class="fr" v-if="v.status==1">生成中</div>
                <div class="fr" v-else>已生成</div>
              </div>
              <div class="item-content" v-if="v.status==1">正在生成中，请稍候查看。。。</div>
              <!-- <div class="item-content" v-else>{{v.filePath}}</div> -->
              <input type="text" class="item-content" :value="v.filePath" v-else readonly />
              <div class="item-tips van-hairline--top" v-if="v.status==2">*提示：长按上面链接进行复制。</div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt />
      </div>
      <div class="pgld_add" @click="createLink">生成下载链接</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { List, PullRefresh } from "vant";
import {
  selectYmWaitQRCodeZipFilesPage,
  createProductQRCode
} from "@/api/distribute.js";
import moment from "moment";
export default {
  name: "LabelDownload",
  data() {
    return {
      title: "商品标价签下载",
      backPath: "", //返回路由，可删除
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      finshTxt: "没有更多了",
      noLimit: true
    };
  },
  components: { HeadFoot, [List.name]: List, [PullRefresh.name]: PullRefresh },
  computed: {
    dealList() {
      let dealData = this.dataList.map(v => {
        let _data = v;
        _data.createDate = moment(v.createDate).format("YYYY-MM-DD HH:mm:ss");
        return _data;
      });
      return dealData;
    }
  },
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
        page: this.curPage
      };
      if (this.noLimit) {
        this.noLimit = false;
        selectYmWaitQRCodeZipFilesPage(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data.page.dataList;
          //赋值
          if (isInit) {
            this.dataList = getList;
            if (getList.length < 10) {
              this.finished = true;
            } else {
              this.curPage = this.curPage + 1;
            }
          } else {
            [...this.dataList] = [...this.dataList, ...getList];
            if (getList.length < 10) {
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
    },
    createLink() {
      createProductQRCode().then(({ data }) => {
        this.$toast(data.msg);
        if (data.code === 1) {
          this.onInit();
        }
      });
    }
  },
  mounted() {
    this.onInit();
  }
};
</script>
<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_LabelDownload {
  .pgld_list {
    width: 100vw;
    overflow: hidden;
    padding-top: 46px;
    box-sizing: border-box;
    padding-bottom: 80px;
    min-height: 100vh;
    .pgld_item {
      width: 96%;
      margin: 10px auto;
      // background: url("~@/assets/img/distribution/pg_labeldownload_list.png");
      background-size: 100% 100%;
      background-position: top center;
      background-repeat: no-repeat;
      padding: 0 26px 10px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10px;
    }
    .item-title {
      overflow: hidden;
      max-height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #666;
      .fr {
        color: $Color;
      }
    }
    .item-content {
      padding: 10px 5px;
      width: 100%;
      overflow: hidden;
      font-size: 12px;
      line-height: 15px;
      word-break: break-all;
      box-shadow: 0 0 10px #eee inset;
      box-sizing: border-box;
    }
    .item-tips {
      padding: 10px 0 10px 5px;
      font-size: 12px;
      color: #999;
    }
  }
  .pgld_add {
    width: 345px;
    height: 43px;
    line-height: 43px;
    border-radius: 5px;
    background-image: linear-gradient(
        35deg,
        rgb(238, 41, 143) 1%,
        #ec5488 38%,
        #e87c80 100%
      ),
      linear-gradient(90deg, #f8bdcd 0%, #f8bdcd 100%);
    text-align: center;
    color: #fff;
    font-size: 15px;
    margin-left: 14px;
    position: fixed;
    bottom: 38px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>