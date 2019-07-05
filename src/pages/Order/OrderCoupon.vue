<template>
  <HeadFoot class="pg_conpon" :Title="title" :backPath="backPath">
    <template #content>
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="pggt_ul">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :immediate-check="false"
          :finished-text="dataList.length===0?'':'没有更多了'"
        >
          <van-radio-group v-model="chooseCoupon" class="pt_content">
            <van-radio class="ptc_li" v-for="(item,index) in dataList" :key="index" :name="index">
              <div
                slot="icon"
                slot-scope="props"
                :class="['pggt_li',props.checked ? 'active' : 'normal']"
              >
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
                </div>
                <img class="selected" src="@/assets/img/order/pg_coupon_selected.png" alt />
              </div>
            </van-radio>
          </van-radio-group>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt />
      </div>
      <div class="pgc_bottom">
        <div class="pgcb_l" @click="cancel">不使用优惠券</div>
        <div class="pgcb_r" @click="confirm">确定</div>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { List, Radio, RadioGroup, PullRefresh } from "vant";
import { findUserCoupon } from "@/api/center.js";
import { notNull } from "@/layout/methods.js";
import { mapActions } from "vuex";
export default {
  name: "OrderCoupon",
  data() {
    return {
      goodsId: null,
      chooseCoupon: null,
      title: "优惠券",
      backPath: "", //返回路由，可删除
      curPage: 1,
      dataList: [],
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true,
      phone: null,
      donateId: null
    };
  },
  components: {
    HeadFoot,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup
  },
  methods: {
    ...mapActions(["setCouponData"]),
    confirm() {
      if (notNull(this.chooseCoupon)) {
        this.setCouponData(this.dataList[this.chooseCoupon]);
        this.$router.go(-1);
      } else {
        this.$toast("请选择优惠券");
      }
    },
    cancel() {
      this.setCouponData(null);
      this.$router.go(-1);
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
        goodsId: this.goodsId,
        state: 0
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
    this.goodsId = this.$route.params.goodsId;
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
      padding-top: 26px;
      box-sizing: border-box;
      .li_L_l {
        width: 100%;
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
    .selected {
      display: none;
      position: absolute;
      bottom: 3px;
      right: 3px;
      width: 33px;
      height: auto;
    }
    &.active {
      .selected {
        display: block;
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
.ptc_li {
  display: inline-block;
  width: 100vw;
  box-sizing: border-box;
  & /deep/ .van-radio__icon {
    height: auto;
    width: 100%;
  }
}
.pgc_bottom {
  position: fixed;
  width: 100vw;
  left: 0;
  bottom: 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: flex;
  background: #fff;
  box-sizing: border-box;
  font-size: 14px;
  .pgcb_l {
    flex: 1;
    color: #999;
    border-right: 1px dashed #999;
  }
  .pgcb_r {
    flex: 1;
    color: $Color;
  }
}
</style>