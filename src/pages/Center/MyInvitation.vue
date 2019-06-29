<template>
  <HeadFoot class="pg_MyInvitation" :Title="title" :backPath="backPath">
    <template #content>
      <div class="pgmi_h">
        <div class="pgmi_code">
          <p>您的邀请码</p>
          <p>YQ0000000</p>
        </div>
        <p class="tips01">通过邀请码成功邀请1位好友加入</p>
        <p class="tips02">您将获得积分，优惠劵和现金奖励。</p>
        <p class="tips02">（随机三选一）</p>
        <router-link class="tips03" to="/">邀请规则></router-link>
        <div class="invit_btn" @click="doScan">立即邀请</div>
      </div>
      <div class="pgmi_list">
        <div class="list_h">邀请好友列表</div>
        <div>
          <div class="list_li" v-for="(v,i) in datalist" :key="i">
            <div class="li_img fl" :style="{backgroundImage:'url(' + v.userImage + ')'}"></div>
            <em class="fl name">{{v.nickName}}</em>
            <em class="fr phone">{{v.phone}}</em>
          </div>
        </div>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { findMyInviter } from "@/api/center.js";
import wx from "weixin-js-sdk";
import { WXSign } from "@/api/index.js";
export default {
  name: "MyInvitation",
  data() {
    return {
      title: "好友邀请",
      backPath: "", //返回路由，可删除
      datalist: []
    };
  },
  components: { HeadFoot },
  methods: {
    init() {
      findMyInviter().then(({ data }) => {
        if (data.code === 1) {
          this.datalist = data.data;
        }
      });
    },
    doScan() {
      let Nav = window.navigator.userAgent.toLowerCase();
      // let isAndroid = `${Nav}`.includes("android");
      let isIphone = `${Nav}`.includes("iphone");
      let isURL = window.location.href;
      if (isIphone) {
        isURL = sessionStorage.getItem("firstURL");
      }
      WXSign({ url: isURL }).then(({ data }) => {
        if (data.code === 1) {
          this.WXconfig(data.data);
        }
      });
    },
    WXconfig(val) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: val.appId, // 必填，公众号的唯一标识
        timestamp: val.timestamp, // 必填，生成签名的时间戳
        nonceStr: val.noncestr, // 必填，生成签名的随机串
        signature: val.signature, // 必填，签名
        jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
      });
      wx.ready(function() {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          }
        });
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_MyInvitation {
  padding-top: 46px;
  .pgmi_h {
    width: 100vw;
    text-align: center;
    .pgmi_code {
      width: 211px;
      height: 109px;
      margin: 30px auto 50px;
      background: url("~@/assets/img/center/pg_invitation_card.png");
      @include myBG;
      text-align: center;
      color: #fff;
      box-sizing: border-box;
      p:first-child {
        font-size: 12px;
        padding-top: 45px;
        padding-bottom: 10px;
      }
      p:last-child {
        font-size: 21px;
      }
    }
    .tips01 {
      font-size: 15px;
    }
    .tips02 {
      font-size: 12px;
      color: #666;
      margin: 10px 0;
    }
    .tips03 {
      color: $Color;
      font-size: 12px;
    }
    .invit_btn {
      @include btn(90%, 38px);
      margin: 20px 0;
    }
  }
  .pgmi_list {
    background: #fff;
    width: 100vw;

    .list_h {
      padding: 15px;
      font-size: 16px;
      color: #000;
      border-bottom: 1px solid #efefef;
    }
    .list_li {
      padding: 12px 24px;
      width: 100vw;
      box-sizing: border-box;
      border-bottom: 1px solid #efefef;
      overflow: hidden;
      .li_img {
        background: #efefef;
        width: 30px;
        height: 30px;
        @include myBG;
        border-radius: 15px;
      }
      em {
        display: inline-block;
        height: 30px;
        line-height: 30px;
      }
      .name {
        margin-left: 15px;
      }
      .phone {
        margin-right: 15px;
      }
    }
  }
}
</style>