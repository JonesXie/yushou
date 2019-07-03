<template>
  <HeadFoot class="pg_EarnMoney" :Title="title" :backPath="backPath">
    <template #content>
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :finished-text="dataList.length===0?'':'没有更多了'"
          :immediate-check="false"
          class="refresh"
        >
          <img class="pgc_head" :src="Banner" alt />
          <ul class="pgc_ul">
            <li v-for="(v,i) in dataList" :key="i" class="pgc_li" @click="turnPage(v.goodsId)">
              <img class="imgWrap" :src="v.goodsImages" alt />
              <div class="info">
                <p class="ellipsis-line">{{v.goodsName}}</p>
                <div class="priceWrap">
                  <p>
                    ￥
                    <span>{{v.goodsSalePrice}}.0</span>
                  </p>
                  <div class="fr">限时抢购</div>
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt />
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { List, PullRefresh } from "vant";
import { findAllGoods } from "@/api/index.js";
export default {
  name: "EarnMoney",
  data() {
    return {
      title: "专区",
      backPath: "", //返回路由，可删除
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true,
      activityId: 0,
      Banner: null
    };
  },
  components: { HeadFoot, [List.name]: List, [PullRefresh.name]: PullRefresh },
  methods: {
    turnPage(val) {
      this.$router.push(`/goods/${val}`);
    },
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
        activityId: this.activityId
      };
      if (this.noLimit) {
        this.noLimit = false;
        findAllGoods(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data;
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
    }
  },
  mounted() {
    this.activityId = this.$route.params.id;
    this.Banner = this.$route.query.url;
    this.title = this.$route.query.name;
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_EarnMoney {
  padding-top: 46px;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100vw;
  .pgc_head {
    width: 100%;
    height: 175px;
  }
  .refresh {
    // background: #fe955d;
    min-height: calc(100vh - 46px);
  }
  .pgc_ul {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    li {
      float: left;
      background: #fff;
      width: 175px;
      height: 240px;
      box-sizing: border-box;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    li:nth-child(even) {
      margin-left: 5px;
    }
    .pgc_li {
      .imgWrap {
        width: 100%;
        height: 174px;
      }
      .info {
        padding: 10px 10px 0 10px;
      }
      .priceWrap {
        margin-top: 10px;
        overflow: hidden;
        p {
          display: inline-block;
          color: $Color;
          font-size: 13px;
          span {
            font-size: 19px;
          }
        }
        .fr {
          float: right;
          font-size: 13px;
          color: #999;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>