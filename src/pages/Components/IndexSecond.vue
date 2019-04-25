<template>
  <div class="index_second fisrt_list" ref="second_pg">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <nav class="is_ul">
        <span>推荐</span>
        <span>上衣</span>
      </nav>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <ul class="fl_ul">
          <li class="van-hairline--bottom fl_li" v-for="(v,i) in listData" :key="i">
            <img :src="v.goodsImages" alt>
            <div class="fl_li_r">
              <p class="fl_li_rP1">{{v.goodsName}}</p>
              <p class="fl_li_rP2">
                <span>正品</span>
                <span>包邮</span>
              </p>
              <p class="fl_li_rP3">
                ￥
                <span>{{v.goodsSalePrice}}</span>.00
              </p>
              <p class="fl_li_rP4">{{v.goodsWaitDays}}天后发货</p>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { findAllGoods } from "@/api/index.js";
import { List, PullRefresh } from "vant";
export default {
  name: "IndexSecond",
  props: ["isType"],
  data() {
    return {
      listData: [],
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.listData.push(this.listData.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.listData.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    }
  },
  mounted() {
    findAllGoods().then(({ data }) => {
      this.listData = data.data;
    });
    this.$nextTick(() => {
      this.$refs.second_pg.scrollTo(0, 0);
    });
  }
};
</script>

<style scoped lang='scss'>
/* @import url(); */
.fisrt_list {
  .fl_ul {
    background: #fff;
    .fl_li {
      padding: 10px 0px;
      height: 140px;
      box-sizing: border-box;
      display: flex;
      img {
        width: 120px;
        height: 120px;
        margin-left: 10px;
      }
      .fl_li_r {
        display: inline-block;
        width: 224px;
        margin-left: 15px;
        height: 120px;
        box-sizing: border-box;

        .fl_li_rP1 {
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
        .fl_li_rP2 {
          font-size: 9px;
          margin: 11px 0 13px;
          span:first-child {
            display: inline-block;
            padding: 3px 4px;
            text-align: center;
            color: #fff;
            background: #ed78b5;
            margin-right: 5px;
          }
          span:last-child {
            display: inline-block;
            padding: 2px 3px;
            text-align: center;
            color: #ed78b5;
            border: 1px solid #ed78b5;
          }
        }
        .fl_li_rP3 {
          font-size: 12px;
          color: #ea047b;
          span {
            font-weight: bold;
            font-size: 16px;
          }
        }
        .fl_li_rP4 {
          font-size: 10px;
          color: #999;
          margin-top: 12px;
        }
      }
    }
  }
}
.index_second {
  .is_ul {
    span {
      display: inline-block;
      font-size: 12px;
      color: #ea047b;
      border: 1px solid #ea047b;
      width: 48px;
      height: 19px;
      line-height: 19px;
      text-align: center;
      border-radius: (19px/2);
      margin: 9px 0 9px 15px;
    }
    span:first-child {
      background: #ea047b;
      color: #fff;
      border: none;
            width: 50px;
      height: 21px;
      line-height: 21px;
    }
  }
}
</style>