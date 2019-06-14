<template>
  <HeadFoot class="pg_mysales" :Title="title">
    <template #content>
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          finished-text="没有更多了"
          :immediate-check="false"
        >
          <ul class="pgs_ul">
            <li class="pgs_li" v-for="(v,i) in dataList" :key="i">
              <div class="li_head">
                <div class="li_tag">{{v.orderSellProfit}}元/日</div>
                <div class="li_id van-ellipsis">订单编号:{{v.orderNo}}</div>
              </div>
              <div class="li_content">
                <div class="li_content_L">
                  <img :src="v.goodsImages" alt>
                </div>
                <div class="li_content_R">
                  <p class="title">{{v.goodsName}}</p>
                  <p class="type">
                    {{v.goodsParm}}
                    <span>x{{v.goodsBuyNum}}</span>
                  </p>
                  <p class="price">今日价：￥{{v.newDatePrice}}</p>
                </div>
              </div>
              <div class="li_foot">
                <span class="riqi">{{v.inWaitDay}}天后发货</span>
                <span class="shezhi" @click="setValue(v)">设置折扣</span>
                <span class="quxiao" @click="cancelSale(v.id)">取消挂卖</span>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt>
      </div>
      <!-- 弹窗--设置折扣 -->
      <van-popup v-model="tips" class="tips_wrap">
        <div class="tips_h">折扣比例</div>
        <div class="tips_c">
          <p class="tips_c_h">当前收益：</p>
          <div class="tips_c_in">
            <span>{{tipsData.orderSellProfit}}元/天</span>*
            <span>{{tipsData.myWaitDay}}天</span>=
            <span>{{myProfit}}元</span>
          </div>
          <p class="tips_c_setting">设置折扣：</p>
          <van-field
            v-model="setCount"
            type="number"
            @blur="validCount"
            placeholder="折扣比例不能大于总收益"
            class="tips_c_input"
          >
            <span slot="right-icon" style="color:#000">%</span>
          </van-field>
          <p
            class="tips_c_computer"
          >{{myProfit}}元 * {{setCount}}% = {{((myProfit*setCount)/100).toFixed(2)}}元</p>
          <p class="tips_c_tips">*折扣比例的设置，是您出让总收益的多少给购买方，长时间没人购买，你可修改更高比例。（默认折扣为0）</p>
        </div>
        <div class="tips_btn">
          <div class="tips_btn1" @click="confirmCount">确认</div>
          <div class="tips_btn2" @click="tips=false">取消</div>
        </div>
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Popup, Field, List, PullRefresh } from "vant";
import {
  findMySellOrder,
  doUpdateOrderProfitDiscount,
  doUpdateOrderSell
} from "@/api/center.js";
import { notNull } from "@/layout/methods.js";
export default {
  name: "MySales",
  data() {
    return {
      title: "我的挂卖",
      tips: false,
      setCount: 0,
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true,
      tipsData: ""
    };
  },
  computed: {
    myProfit() {
      return (
        Number(this.tipsData.orderSellProfit) * Number(this.tipsData.myWaitDay)
      ).toFixed(2);
    }
  },
  components: {
    HeadFoot,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    setValue(val) {
      this.tipsData = val;
      this.tips = true;
    },
    validCount() {
      if (notNull(this.setCount)) {
        let reg = /^([1-9]\d*|[0]{1,1})$/; //含0正整数正则
        if (reg.test(this.setCount)) {
          if (this.setCount <= 100) {
            return true;
          } else {
            this.$toast("小于等于100的值");
            this.setCount = 0;
          }
        } else {
          this.$toast("请输入整数");
          this.setCount = 0;
        }
      } else {
        this.$toast("请填写折扣");
        this.setCount = 0;
      }
    },
    confirmCount() {
      if (notNull(this.setCount) && this.setCount !== 0) {
        let _data = {
          orderId: this.tipsData.id,
          discount: this.setCount
        };
        doUpdateOrderProfitDiscount(_data).then(({ data }) => {
          this.$toast(data.msg);
          if (data.msg === "设置成功") {
            setTimeout(() => {
              this.onInit();
            }, 3000);
          }
        });
        this.tips = false;
      } else {
        this.$toast("请填写折扣比");
      }
    },
    cancelSale(val) {
      let _data = {
        orderId: val,
        orderSellState: "01" //	订单挂卖状态 01不挂买 02挂卖
      };
      doUpdateOrderSell(_data).then(({ data }) => {
        this.$toast(data.msg);
        if (data.msg === "设置成功") {
          setTimeout(() => {
            this.onInit();
          }, 3000);
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
      let _data = {
        page: this.curPage
      };
      if (this.noLimit) {
        this.noLimit = false;
        findMySellOrder(_data).then(({ data }) => {
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
            [...this.dataList] = [...this.dataList, ...getList];
            //此页面暂无分页，若有删除下面一行
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
$Color: #ea047b;
.pgs_ul {
  padding-top: 46px;
  width: 100vw;
  .pgs_li {
    background: #fff;
    width: 345px;
    height: 200px;
    box-sizing: border-box;
    margin: 0 auto;
    box-shadow: 0px 2px 5px 0px rgba(128, 128, 128, 0.35);
    border-radius: 5px;
    margin-top: 14px;
    .li_head {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding-top: 18px;
      .li_tag {
        position: relative;
        height: 18px;
        line-height: 18px;
        width: auto;
        color: #fff;
        font-size: 10px;
        background: url("~@/assets/img/center/pg_mysales_tag.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center left;
        display: inline-block;
        padding-right: 8px;
      }
      .li_id {
        display: inline-block;
        margin-left: 5px;
        width: 79%;
        position: relative;
        top: 2px;
      }
    }
    .li_content {
      width: 100%;
      height: 106px;
      box-sizing: border-box;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px dashed #ddd;
      padding: 15px 10px;
      overflow: hidden;
      .li_content_L {
        width: 75px;
        height: 75px;
        float: left;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .li_content_R {
        float: left;
        margin-left: 18px;
        width: 225px;
        height: 75px;
        box-sizing: border-box;
        .title {
          line-height: 20px;
          position: relative;
          top: -2px;
        }
        .type {
          color: #999999;
          font-size: 10px;
          margin: 9px 0;
          overflow: hidden;
          span {
            float: right;
          }
        }
        .price {
          font-size: 11px;
          color: #d3b285;
        }
      }
    }
    .li_foot {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      overflow: hidden;
      padding-top: 10px;
      .riqi {
        font-size: 14px;
        color: #666;
        // padding-top: 5px;
        margin-left: 10px;
      }
      .shezhi {
        width: 70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: $Color;
        border-radius: 12px;
        font-size: 12px;
        color: #fff;
        display: inline-block;
        margin-left: 102px;
        margin-right: 20px;
      }
      .quxiao {
        width: 70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #f4f4f4;
        border-radius: 12px;
        font-size: 12px;
        color: #666666;
        display: inline-block;
      }
    }
  }
}
.pg_mysales {
  .tips_wrap {
    width: 280px;
    height: 320px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    .tips_h {
      font-size: 14px;
      color: #333;
      text-align: center;
      padding: 16px 10px 12px;
      border-bottom: 1px dashed #ddd;
    }
    .tips_c {
      padding: 18px;
      padding-bottom: 0;
    }
    .tips_c_h {
      font-size: 12px;
      color: #666;
      margin-bottom: 11px;
    }
    .tips_c_in {
      font-size: 12px;
      color: #000;
      box-sizing: border-box;
      span {
        display: inline-block;
        padding: 5px 6px;
        background: #eeeeee;
        margin: 0 3px;
      }
      span:first-child {
        margin-left: 0;
      }
    }
    .tips_c_setting {
      font-size: 12px;
      color: #666;
      margin-top: 11px;
      margin-bottom: 11px;
    }
    .tips_c_input {
      padding: 9px;
      font-size: 12px;
      border: 1px solid #ddd;
    }
    .tips_c_computer {
      font-size: 16px;
      padding: 20px 0 15px;
      text-align: center;
    }
    .tips_c_tips {
      font-size: 10px;
      color: #bebdbd;
      line-height: 15px;
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