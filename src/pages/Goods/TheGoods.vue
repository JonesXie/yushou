<template>
  <div class="pg_goods">
    <van-nav-bar left-arrow :fixed="true" @click-left="GoBack()">
      <div class="pgg_head" slot="title">
        <span :class="['title', actived?'active':'']" @click="changePage(true)">商品</span>
        <span :class="['title', actived?'':'active']" @click="changePage(false)">挂卖</span>
      </div>
      <img
        slot="right"
        class="shareIcon"
        src="@/assets/img/ly_goods_share.png"
        @click="getGoods"
        alt
      />
    </van-nav-bar>
    <div class="goods" v-if="actived">
      <goods-detail :goodsId="goodsId"></goods-detail>
    </div>
    <div class="guamai" v-else>
      <gua-mai :goodsId="goodsId"></gua-mai>
    </div>
    <van-popup v-model="showPopup" class="share_pop" @click.native="showPopup=false">
      <img src="@/assets/img/ly_WXshareIcon.png" alt />
      <div class="txt">点击右上角，立即分享！</div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GuaMai from "./GuaMai";
import GoodsDetail from "./GoodsDetail";
import wx from "weixin-js-sdk";
import { WXSign } from "@/api/index.js";
import { findGoodsDetail } from "@/api/goods.js";
import { NavBar, Popup } from "vant";
export default {
  name: "TheGoods",
  data() {
    return {
      actived: true,
      goodsId: null,
      showPopup: false,
      goodsInfo: null
    };
  },
  components: {
    GuaMai,
    GoodsDetail,
    [NavBar.name]: NavBar,
    [Popup.name]: Popup
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.replace("/index");
    },
    changePage(bool) {
      this.actived = bool;
    },
    share() {
      let Nav = window.navigator.userAgent.toLowerCase();
      // let isAndroid = `${Nav}`.includes("android");
      let isIphone = `${Nav}`.includes("iphone");
      let isURL = window.location.href;
      if (isIphone) {
        // isURL = sessionStorage.getItem("firstURL");
        isURL = this.$store.state.wxURL;
      }
      WXSign({ url: isURL }).then(({ data }) => {
        if (data.code === 1) {
          this.showPopup = true;
          this.WXconfig(data.data);
        }
      });
    },
    getGoods() {
      findGoodsDetail({
        goodsId: this.goodsId,
        distributorId: sessionStorage.getItem("distributorId")
      }).then(({ data }) => {
        if (data.code === 1) {
          this.goodsInfo = data.data;
          this.share();
        }
      });
    },
    WXconfig(val) {
      let That = this;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: val.appId, // 必填，公众号的唯一标识
        timestamp: val.timestamp, // 必填，生成签名的时间戳
        nonceStr: val.noncestr, // 必填，生成签名的随机串
        signature: val.signature, // 必填，签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
      });
      wx.ready(function() {
        //分享到朋友
        wx.updateAppMessageShareData({
          title: That.goodsInfo.goodsName, // 分享标题
          desc: "低价预售，不怕比价。大牌正品，质量保证。订单挂卖，获取盈利。", // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: That.goodsInfo.goodsImages, // 分享图标
          success: function() {
            That.$toast("分享成功");
            That.showPopup = false;
          }
        });
        //分享到朋友圈
        wx.updateTimelineShareData({
          title: That.goodsInfo.goodsName, // 分享标题
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: That.goodsInfo.goodsImages, // 分享图标
          success: function() {
            That.$toast("分享成功");
            That.showPopup = false;
          }
        });
      });
    }
  },
  created() {
    this.goodsId = this.$route.params.id;
    if (this.$route.query.actived !== undefined) {
      this.actived = this.$route.query.actived === "false" ? false : true;
    }
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
.pg_goods {
  width: 100vw;
  position: relative;
  padding-top: 46px;
  box-sizing: border-box;
  min-height: 100vh;
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
  .pgg_head {
    .title {
      display: inline-block;
      width: 40px;
      font-size: 16px;
      text-align: center;
      margin: 0 17px;
      box-sizing: border-box;
      position: relative;
      &.active {
        color: $Color;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: $Color;
        }
      }
    }
  }
}
.share_pop {
  background: transparent;
  width: 100vw;
  height: 100vh;
  img {
    position: absolute;
    right: 10vw;
    top: 10vw;
    width: 50%;
    height: auto;
  }
  .txt {
    position: absolute;
    top: 300px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    width: 100%;
  }
}
.shareIcon {
  width: 19px;
}
</style>