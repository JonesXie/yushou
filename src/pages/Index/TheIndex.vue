<template>
  <div class="pg_index">
    <div class="pi_h">
      <img src="@/assets/img/pg_index_scan.png" alt>
      <router-link to="/thesearch" class="pi_h_input">
        <span>搜索商品</span>
      </router-link>
      <router-link to="/thenotices">
        <img src="@/assets/img/pg_index_msg.png" alt>
      </router-link>
    </div>
    <div class="pi_list">
      <van-tabs
        v-model="active"
        animated
        :line-height="0"
        title-active-color="#ea047b"
        color="#ea047b"
        title-inactive-color="#666"
        :ellipsis="false"
        class="pi_list_tab"
      >
        <van-tab title="全部"></van-tab>
        <van-tab v-for="item in tabList" :title="item.codeName" :key="item.id"></van-tab>
      </van-tabs>
      <index-first v-if="active === 0"></index-first>
      <index-second v-else :isType="tabList[active-1].id" :isCode="tabList[active-1].codeList"></index-second>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs } from "vant";
import IndexFirst from "../Components/index/IndexFirst.vue";
import IndexSecond from "../Components/index/IndexSecond.vue";
import { mapActions } from "vuex";
import { findGoodsCode } from "@/api/index.js";
import { getWXAccessToken } from "@/api/login.js";
export default {
  data() {
    return {
      active: 0,
      id: "123",
      tabList: []
    };
  },
  components: {
    IndexFirst,
    IndexSecond,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  computed: {
    stickTop: function() {
      return this.$store.state.stickTop;
    }
  },
  methods: {
    ...mapActions(["ChangeActive"])
  },
  mounted() {
    let getURL = window.location.href;
    if (`${getURL}`.includes("code")) {
      let start = getURL.indexOf("=") + 1;
      let stop = getURL.indexOf("&");
      let isCode = getURL.substring(start, stop);
      let _data = {
        type: 2,
        code: isCode
      };
      getWXAccessToken(_data).then(({ data }) => {
        this.setWxData(data.data.wxUserMsg);
        localStorage.setItem("openId", data.data.openId);
      });
    }
    this.ChangeActive(0);
    findGoodsCode().then(({ data }) => {
      this.tabList = data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
$Color: #fa399d;
.pg_index {
  position: relative;
  .pi_h {
    width: 100vw;
    height: 46px;
    background: $Color;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 10px;
    position: fixed;
    z-index: 99;

    &::after {
      content: "";
      height: 100%;
      vertical-align: middle;
    }
    .pi_h_input {
      width: 270px;
      display: inline-block;
      margin: 0 19px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      color: #999999;
      font-size: 14px;
      height: 28px;
      width: 270px;
      background: #fff;
      border-radius: 5px;
      padding: 7px 12px;
      box-sizing: border-box;
      clear: both;
    }
    img {
      width: 23px;
      height: 23px;
      margin-left: 10px;
    }
    img:last-child {
      margin-left: 0;
    }
  }

  .pi_list {
    padding-top: 46px;
    .pi_list_tab {
      & /deep/ .van-tabs__wrap {
        position: fixed;
        top: 46px;
      }
    }
  }
}
</style>


