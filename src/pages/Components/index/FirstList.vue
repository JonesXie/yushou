<template>
  <div class="fisrt_list">
    <div class="title">
      <img src="@/assets/img/index/pg_index_first_jx.png" alt />
    </div>

    <van-list
      v-model="loading01"
      :finished="finished01"
      finished-text="没有更多了"
      @load="onLoad01"
      :offset="10"
    >
      <ul class="fl_ul">
        <li
          class="van-hairline--bottom fl_li"
          v-for="(v,i) in listData"
          :key="i"
          @click="turnGoods(v.goodsId)"
        >
          <img :src="v.goodsImages" alt />
          <div class="fl_li_r">
            <p class="fl_li_rP1">{{v.goodsName}}</p>
            <p class="fl_li_rP2">
              <span>正品</span>
              <span>包邮</span>
            </p>
            <p class="fl_li_rP3">
              ￥
              <span>{{v.goodsSalePrice}}</span>
            </p>
            <p class="fl_li_rP4">{{v.goodsWaitDays}}天后发货</p>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { findAllGoods } from "@/api/index.js";
import { List } from "vant";
export default {
  name: "FirstList",
  data() {
    return {
      listData: [],
      loading01: false,
      finished01: false,
      curPage: 1
    };
  },
  components: {
    [List.name]: List
  },
  methods: {
    onLoad01() {
      // 异步更新数据
      let _data = {
        page: this.curPage
      };
      // 异步更新数据
      findAllGoods(_data).then(({ data }) => {
        // 加载状态结束
        this.loading01 = false;
        if (data.data.length > 0) {
          [...this.listData] = [...this.listData, ...data.data];
          this.curPage = this.curPage + 1;
        } else {
          this.finished01 = true;
        }
      });
    },
    turnGoods(val) {
      this.$router.push(`/goods/${val}`);
    }
  },
  mounted() {
    // findAllGoods().then(({ data }) => {
    //   this.listData = data.data;
    // });
  }
};
</script>

<style scoped lang='scss'>
/* @import url(); */
.fisrt_list {
  margin-top: 8px;
  .title {
    background: #fff;
    text-align: center;
    padding: 18px 0 16px 0;
    img {
      height: 16px;
      width: auto;
    }
  }

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
</style>