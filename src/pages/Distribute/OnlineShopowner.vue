<template>
  <div class="pg_OnlineShopowner">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()"/>
      <span>{{title}}</span>
    </div>
    <div class="head_bg"></div>
    <!-- content -->
    <div class="pg_model_content">
      <ul class="pgdo_hlist">
        <div class="input_wrap">
          <van-icon name="search" class="search_icon"/>
          <input type="text" placeholder="请输入手机号添加线上店长" v-model="isSearch">
        </div>
        <em>添加</em>
      </ul>
      <ul class="pgdo_list">
        <li class="pgdo_li" v-for="(v, i) in dataList" :key="i">
          <div class="img_icon" :style="{backgroundImage:'url('+v+')'}"></div>
          <div class="li_info">
            <p class="li_info_h">
              18726391509
              <van-icon class="ellipsis fr" name="ellipsis" @click="handlerOpt(i)"></van-icon>
            </p>
            <p class="li_info_c">
              分成比例：12%
              <em>团队人数：20</em>
            </p>
            <p>加入时间：2019-06-28</p>
            <div class="li_opt van-hairline--surround" v-if="v.opt">
              <p @click="fixRate(v,i)">修改分成比例</p>
              <p @click="delCount(v,i)">解除绑定</p>
            </div>
            <div class="tips">23333333</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 设置比例弹窗 -->
    <van-popup v-model="ratePop" class="tips_wrap">
      <div class="tips_h">请重新设置该分销账户的分成比例</div>
      <div class="tips_c">
        <input type="number" v-model="reRate" @blur="validRate">%
      </div>
      <div class="tips_btn">
        <div class="tips_btn1" @click="confirmRate">确认</div>
      </div>
    </van-popup>
    <!-- 设置比例弹窗 -->
    <van-popup v-model="cancelPop" class="cancelPop">
      <div class="tips_h">是否确认解除该分销账户？</div>
      <div class="tips_btn_wrap van-hairline--top">
        <div class="tips_btn1 van-hairline--right" @click="cancelPop=false">取消</div>
        <div class="tips_btn2" @click="confirmCancel">确认</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon, Popup } from "vant";
import { notNull } from "@/layout/methods.js";
export default {
  name: "OnlineShopowner",
  data() {
    return {
      title: "线上店长",
      isSearch: null,
      dataList: [
        { 1: 0, opt: false },
        { 1: 0, opt: false },
        { 1: 0, opt: false }
      ],
      ratePop: false,
      cancelPop: false,
      reRate: null
    };
  },
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    },
    handlerOpt(index) {
      if (this.dataList[index].opt) {
        this.dataList[index].opt = false;
      } else {
        this.dataList[index].opt = true;
      }
    },
    fixRate(v, i) {
      this.ratePop = true;
      this.dataList[i].opt = false;
    },
    delCount(v, i) {
      this.cancelPop = true;
      this.dataList[i].opt = false;
    },
    validRate() {
      let _data = this.reRate;
      if (notNull(_data)) {
        if (`${_data}`.includes(".")) {
          let dotArr = _data.split(".");
          if (dotArr[1].length > 2) {
            let dotTwo = dotArr[1].substring(0, 2);
            this.reRate = Number(`${dotArr[0]}.${dotTwo}`);
            this.$toast("请保留小数点后两位");
          } else {
            this.validMax(_data);
          }
        } else {
          this.validMax(_data);
        }
      } else {
        this.reRate = null;
        this.$toast("请填写折扣");
      }
    },
    validMax(val) {
      if (0 <= val && val <= 100) {
        return true;
      } else {
        this.reRate = null;
        this.$toast("折扣应在0-100间");
      }
    },
    confirmRate() {},
    confirmCancel() {}
  },
  mounted() {
    this.ChangeStatus(false);
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_OnlineShopowner {
  position: relative;
  width: 100vw;
  .head_bg {
    width: 100vw;
    height: 125px;
    background: url("~@/assets/img/distribution/ly_distribute_bg.png");
    @include myBG;
    position: fixed;
    top: 0;
    left: 0;
  }
}
.pg_h_nav {
  position: fixed;
  height: 46px;
  line-height: 46px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  color: #f4f4f4;
  background: url("~@/assets/img/distribution/ly_distribute_bg.png");
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 999;
  & /deep/ .van-icon {
    float: left;
    top: 16px;
    left: 15px;
  }
}
.pg_model_content {
  width: 100vw;
  position: absolute;
  top: 46px;
}
.pg_OnlineShopowner {
  .pgdo_hlist {
    width: 100vw;
    display: flex;
    text-align: center;
    margin-top: 10px;
    .input_wrap {
      width: 270px;
      height: 28px;
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      margin-left: 30px;
      font-size: 12px;
      color: #9e9e9e;
      .search_icon {
        font-size: 15px;
        margin: 0 2%;
        position: relative;
        top: 4px;
      }
      input {
        height: 28px;
        line-height: 28px;
        width: 88%;
        display: inline-block;
      }
    }
    em {
      display: inline-block;
      color: #fff;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      margin-left: 15px;
    }
  }
  .pgdo_list {
    margin-top: 15px;
    width: 100vw;
    .pgdo_li {
      background: #fff;
      width: 345px;
      height: 100px;
      border-radius: 5px;
      margin: 0 auto 9px;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      align-items: center;
      .img_icon {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: #f4f4f4;
        @include myBG;
      }
      .li_info {
        flex: 1;
        box-sizing: border-box;
        margin-left: 20px;
        height: 100%;
        position: relative;

        .li_info_h {
          width: 100%;
          font-size: 14px;
          font-weight: bold;
          overflow: hidden;
          color: #333;
          .ellipsis {
            transform: rotate(90deg);
          }
        }
        .li_opt {
          position: absolute;
          top: -2px;
          right: 10px;
          background: #f4f4f4;
          border-radius: 5px;
          font-size: 13px;
          padding: 15px;
          p {
            color: #333;
          }
          p:last-child {
            margin-top: 15px;
          }
        }
        .tips {
          position: absolute;
          right: -15px;
          bottom: 4px;
          color: #fff;
          font-size: 11px;
          padding: 6px;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
          background: #fc7dbf;
        }
      }
      .li_info_c {
        margin: 15px 0;
        em {
          margin-left: 10px;
        }
      }
      p {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.tips_wrap {
  width: 310px;
  height: 190px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 38px 35px 0 35px;
  .tips_h {
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .tips_c {
    width: 100%;
    border: 1px solid #999;
    height: 33px;
    box-sizing: border-box;
    margin: 36px 0 24px;
    input {
      width: 90%;
      height: 100%;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }
  .tips_btn {
    width: 100%;
    text-align: center;
    .tips_btn1 {
      display: inline-block;
      width: 70px;
      height: 26px;
      line-height: 26px;
      background: $Color;
      color: #fff;
      font-size: 15px;
      border-radius: 5px;
    }
  }
}
.cancelPop {
  width: 310px;
  height: 190px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  .tips_h {
    font-size: 16px;
    color: #333;
    text-align: center;
    margin-top: 60px;
  }
  .tips_btn_wrap {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    display: flex;
    text-align: center;
    // border-top: 1px solid #999;
    .tips_btn1 {
      flex: 1;
    }
    .tips_btn2 {
      flex: 1;
      color: $Color;
    }
  }
}
</style>