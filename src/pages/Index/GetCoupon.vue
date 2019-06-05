<template>
  <HeadFoot class="get_coupon" :Title="title">
    <template #content>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="vantList"
      >
        <ul class="gc_ul">
          <li v-for="(item,index) in couponList" :key="index">
            <div class="gc_li_l">
              <div class="gc_li_l_l">
                ￥
                <span>{{item.price}}</span>
              </div>
              <div class="gc_li_l_r">
                <p>适用品类：{{item.name}}</p>
                <p>使用时间：自领取日{{item.effectiveDays}}天内有效</p>
              </div>
            </div>
            <div class="gc_li_r" @click="getCoupon(item.id)">
              <p>点击领取</p>
            </div>
          </li>
        </ul>
      </van-list>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { drawCouponPage, drawCoupon } from "@/api/index.js";
import { List, Toast } from "vant";

export default {
  name: "GetCoupon",
  data() {
    return {
      title: "领取优惠券",
      loading: false,
      finished: false,
      curPage: 1,
      couponList: []
    };
  },
  components: { HeadFoot, [List.name]: List },
  methods: {
    onLoad() {
      let _data = {
        page: this.curPage
      };
      // 异步更新数据
      drawCouponPage(_data).then(({ data }) => {
        // 加载状态结束
        this.loading = false;
        if (data.data.page.dataList.length > 0) {
          [...this.couponList] = [
            ...this.couponList,
            ...data.data.page.dataList
          ];
          this.curPage = this.curPage + 1;
        } else {
          this.finished = true;
        }
      });
    },
    getCoupon(val) {
      let _data = {
        couponId: val
      };
      drawCoupon(_data).then((response) => {
        Toast(response.data.msg)
      });
    }
  },
  mounted() {
    // drawCouponPage().then(({ data }) => {
    //   this.couponList = data.data.page.dataList;
    // });
  }
};
</script>

<style scoped lang="scss">
/* @import url(); */
.get_coupon {
  width: 100vw;
  min-width: 100vh;
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
  .vantList {
    width: 100vw;
    overflow: hidden;
  }
  .gc_ul {
    width: 100vw;
    // margin-top: 46px;
    padding-top: 46px;
    li {
      width: 348px;
      height: 82px;
      background: url("~@/assets/img/pg_getcoupon_cp.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      margin: 0 auto;
      margin-top: 10px;
    }
    .gc_li_l {
      display: inline-block;
      width: 88%;
      padding: 19px 0;

      .gc_li_l_l {
        display: inline-block;
        color: #ea047b;
        font-size: 14px;
        width: 28%;
        text-align: center;
        span {
          font-size: 36px;
        }
        border-right: 1px solid #ddd;
      }
      .gc_li_l_r {
        display: inline-block;
        font-size: 11px;
        color: #999999;
        padding-left: 14px;
        position: relative;
        top: 3px;
        p:last-child {
          margin-top: 11px;
        }
      }
    }
    .gc_li_r {
      display: inline-block;
      width: 12%;
      font-size: 14px;
      color: #fff;
      height: 74px;
      p {
        width: 50%;
        position: relative;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
      }
    }
  }
}
</style>