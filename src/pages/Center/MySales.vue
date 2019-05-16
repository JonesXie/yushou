<template>
  <HeadFoot class="pg_mysales" :Title="title">
    <template #content>
      <ul class="pgs_ul">
        <li class="pgs_li">
          <div class="li_head">
            <div class="li_tag">231.4元/日</div>
            <div class="li_id van-ellipsis">订单编号 17102316279122</div>
          </div>
          <div class="li_content">
            <div class="li_content_L">
              <img src="@/assets/logo.png" alt>
            </div>
            <div class="li_content_R">
              <p class="title">匡威男鞋女鞋三星黑标街拍潮流低帮休闲舒适耐磨运动帆布鞋</p>
              <p class="type">
                规格：黑色；37码
                <span>x2</span>
              </p>
              <p class="price">今日价：￥410.1</p>
            </div>
          </div>
          <div class="li_foot">
            <span class="riqi">7天后发货</span>
            <span class="shezhi" @click="setValue">设置折扣</span>
            <span class="quxiao">取消挂卖</span>
          </div>
        </li>
      </ul>
      <!-- 设置折扣 -->
      <van-popup v-model="tips" class="tips_wrap">
        <div class="tips_h">折扣比例</div>
        <div class="tips_c">
          <p class="tips_c_h">当前收益：</p>
          <div class="tips_c_in">
            <span>240.0元/天</span>*
            <span>4天</span>=
            <span>960.0元</span>
          </div>
          <p class="tips_c_setting">设置折扣：</p>
          <van-field
            v-model="value"
            type="number"
            placeholder="折扣比例不能大于总收益"
            class="tips_c_input"
          >
          <span slot="right-icon" style="color:#000">%</span>
          </van-field>
          <p class="tips_c_computer">1000元 * 0% = 0元</p>
          <p class="tips_c_tips">*折扣比例的设置，是您出让总收益的多少给购买方，长时间没人购买，你可修改更高比例。（默认折扣为0）</p>
        </div>
        <div class="tips_btn" @click="tips=false">
          <div class="tips_btn1">确认</div>
          <div class="tips_btn2">取消</div>
        </div>
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Popup, Field } from "vant";
export default {
  name: "MySales",
  data() {
    return {
      title: "我的挂卖",
      tips: false,
      value: null
    };
  },
  components: {
    HeadFoot,
    [Popup.name]: Popup,
    [Field.name]: Field
  },
  methods: {
    setValue() {
      this.tips = true;
    }
  },
  mounted() {}
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
    .tips_c_computer{
      font-size: 16px;
      padding:  20px 0 15px;
      text-align: center;
    }
    .tips_c_tips{
      font-size: 10px;
      color:#bebdbd;
      line-height: 15px;
    }
    .tips_btn{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 35px;
      line-height: 35px;
      display: flex;
    }
    .tips_btn1{
      flex: 1;
      background: $Color;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
        .tips_btn2{
      flex: 1;
      background: #e5e5e5;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>