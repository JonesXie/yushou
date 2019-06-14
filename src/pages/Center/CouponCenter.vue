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
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="pggt_ul">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :immediate-check="false"
          finished-text="没有更多了"
        >
          <ul>
            <li class="pggt_li" v-for="(item,index) in dataList" :key="index">
              <div class="li_R">
                <p class="money">
                  <em>￥</em>
                  {{item.price}}
                </p>
                <p class="limit ellipsis-line">满{{item.fixingAmount}}元可用</p>
              </div>
              <div class="li_L">
                <div class="li_L_l">
                  <p class="money ellipsis-line">{{item.name}}</p>
                  <p class="limit ellipsis-line">有效期至：{{item.endtime}}</p>
                </div>
                <div class="li_L_r">
                  <router-link class="li_L_r_btn" to="/">去使用</router-link>
                  <div class="li_L_r_btn" @click="isDonate(item.donation,item.id)">去转增</div>
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt>
      </div>
      <van-popup v-model="popup" class="tips_wrap">
        <div class="tip_header">请输入转增手机号码</div>
        <input type="number" v-model="phone" class="tips_input" placeholder="手机号码" v-validtel>
        <div class="tips_btn">
          <div class="tips_btn2" @click="popup=false">取消</div>
          <div class="tips_btn1" @click="donate">确认</div>
        </div>
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Tab, Tabs, List, PullRefresh, Popup } from "vant";
import { findUserCoupon, donationCoupon } from "@/api/center.js";
import { notNull } from "@/layout/methods.js";
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
      noLimit: true,
      phone: null,
      popup: false,
      donateId: null
    };
  },
  components: {
    HeadFoot,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Popup.name]: Popup
  },
  methods: {
    isDonate(val, id) {
      if (val === 1) {
        this.popup = true;
        this.donateId = id;
      } else {
        this.$notify("此优惠券不允许转增");
      }
    },
    donate() {
      if (notNull(this.phone)) {
        let _data = {
          couponId: this.donateId,
          userPhone: this.phone
        };
        donationCoupon(_data).then(({ data }) => {
          this.$toast(data.msg);
          if (data.msg === "转赠成功") {
            setTimeout(() => {
              this.onInit();
            }, 3000);
          }
        });
        this.popup = false;
      } else {
        this.$toast("请填写手机号");
      }
    },
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
        page: this.curPage,
        goodsId: "",
        state: this.active
      };
      if (this.noLimit) {
        this.noLimit = false;
        findUserCoupon(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data;
          //赋值
          if (isInit) {
            this.dataList = getList;
            this.curPage = this.curPage + 1;
            //此页面暂无分页，若有删除下面一行
            this.finished = true;
          } else {
            //此页面暂无分页，若有删除下面一行
            this.finished = true;
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
.pggt_ul {
  padding-top: 46px;
  min-height: calc(100vh - 100px);
  .pggt_li {
    width: 348px;
    height: 90px;
    margin: 10px auto;
    background: url("~@/assets/img/center/pg_coupon_list.png");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    .li_R {
      width: percentage(90 / 348);
      display: inline-block;
      height: 100%;
      text-align: center;
      .money {
        color: $Color;
        font-size: 30px;
        margin-top: 20px;
        margin-bottom: 8px;
        em {
          font-size: 12px;
        }
      }
      .limit {
        font-size: 10px;
        color: #999;
      }
    }
    .li_L {
      width: percentage(255 / 348);
      display: inline-block;
      height: 90px;
      position: absolute;
      padding-top: 10px;
      box-sizing: border-box;
      .li_L_l {
        width: percentage(190 / 255);
        display: inline-block;
        text-align: center;
      }
      .money {
        font-size: 13px;
        color: #333;
        margin-bottom: 8px;
      }
      .limit {
        font-size: 11px;
        color: #999;
      }
      .li_L_r {
        width: percentage(60 / 255);
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: #fff;
        .li_L_r_btn {
          width: 50px;
          height: 20px;
          line-height: 20px;
          box-sizing: border-box;
          background: $Color;
          text-align: center;
          display: inline-block;
          border-radius: 5px;
        }
        a {
          color: #fff;
          margin-bottom: 8px;
          margin-top: 8px;
        }
      }
    }
  }
}
.tips_wrap {
  width: 280px;
  height: 140px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 5px;

  .tip_header {
    text-align: center;
    font-size: 16px;
    margin: 20px;
    color: #333;
  }
  .tips_input {
    width: 98%;
    padding: 5px 9px;
    font-size: 14px;
    background: #f4f4f4;
    text-align: center;
    box-sizing: border-box;
    margin-left: 1%;
    border-radius: 5px;
  }
  .tips_btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35px;
    line-height: 35px;
    display: flex;
  }
  .tips_btn1 {
    flex: 1;
    background: $Color;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
  .tips_btn2 {
    flex: 1;
    background: #e5e5e5;
    font-size: 12px;
    text-align: center;
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