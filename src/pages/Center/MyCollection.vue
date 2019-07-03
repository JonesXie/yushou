<template>
  <HeadFoot class="pg_MyCollection" :Title="title" :backPath="backPath">
    <template #content>
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :finished-text="dataList.length===0?'':'没有更多了'"
          :immediate-check="false"
        >
          <ul class="pgmc_ul">
            <li class="pgmc_li" v-for="(v,i) in dataList" :key="i">
              <img class="pgmc_li_l" :src="v.goodsImages" alt />
              <div class="pgmc_li_c">
                <p class="ellipsis-three">{{v.goodsName}}</p>
                <p class="price">￥{{v.goodsPrice}}.0</p>
                <div class="collection" @click="cancelCellected(v.collectId)">
                  <img src="@/assets/img/goods/pg_goods_collected.png" alt />
                  <p>取消收藏</p>
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
import { findUserCollect } from "@/api/center.js";
import { doDelUserCollect } from "@/api/yanxuan.js";
export default {
  name: "MyCollection",
  data() {
    return {
      title: "我的收藏",
      backPath: "", //返回路由，可删除
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  components: { HeadFoot, [List.name]: List, [PullRefresh.name]: PullRefresh },
  methods: {
    cancelCellected(val) {
      doDelUserCollect({ collectId: val }).then(({ data }) => {
        this.$toast(data.msg);
        if (data.code === 1) {
          this.onInit();
        }
      });
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
      if (this.noLimit) {
        this.noLimit = false;
        findUserCollect().then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data;
          //赋值
          if (isInit) {
            this.dataList = getList;
            this.curPage = this.curPage + 1;
            //没有分页
            this.finished = true;
          } else {
            [...this.dataList] = [...this.dataList, ...getList];
            //没有分页
            this.finished = true;
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
.pg_MyCollection {
  padding-top: 50px;
  .pgmc_ul {
    width: 100vw;
    .pgmc_li {
      margin: 10px 0;
      width: 100%;
      height: 112px;
      box-sizing: border-box;
      padding: 15px;
      background: #fff;
      display: flex;
      position: relative;
      .pgmc_li_l {
        width: 80px;
        height: 80px;
      }
      .price {
        position: absolute;
        bottom: 15px;
        color: $Color;
        font-size: 16px;
        font-weight: bold;
      }
      .collection {
        font-size: 11px;
        color: #999;
        display: inline-block;
        width: 45px;
        text-align: center;
        position: absolute;
        bottom: 15px;
        right: 15px;
        img {
          width: 20px;
          height: 20px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>