<template>
  <div class="pg_type">
    <van-nav-bar title="全部分类" class="pgt_title"></van-nav-bar>
    <div class="search">
      <router-link to="/thesearch" class="input">请输入商品名称</router-link>
      <span>搜索</span>
    </div>
    <div class="pgt_list">
      <van-badge-group :active-key="activeKey" @change="onChange" class="pgt_L">
        <van-badge v-for="(v,i) in barList" :key="i" :title="v.codeName" />
      </van-badge-group>
      <div class="pgt_R">
        <type-right :istype="getType"></type-right>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar, BadgeGroup, Badge } from "vant";
import TypeRight from "./TypeRight.vue";
import { findGoodsCode } from "@/api/index.js";
import { notNull } from "@/layout/methods.js";
export default {
  name: "TheType",
  data() {
    return {
      activeKey: 0,
      getType: [],
      barList: []
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [BadgeGroup.name]: BadgeGroup,
    [Badge.name]: Badge,
    TypeRight
  },
  methods: {
    ...mapActions(["ChangeActive"]),
    onChange(key) {
      sessionStorage.setItem("typeActived", key);
      this.activeKey = key;
      this.getType = this.barList[key];
    }
  },
  mounted() {
    this.ChangeActive(1); //激活当前tabbar
    if (notNull(sessionStorage.getItem("typeActived"))) {
      this.activeKey = Number(sessionStorage.getItem("typeActived"));
    }
    findGoodsCode().then(({ data }) => {
      this.barList = data.data;
      this.getType = this.barList[this.activeKey];
    });
  }
};
</script>

<style scoped lang="scss">
.pg_type {
  background: #fff;
  min-height: calc(100vh - 50px);
  width: 100vw;
  .pgt_title {
    &::after {
      border: none;
    }
  }
  .search {
    height: 28px;
    .input {
      display: inline-block;
      margin: 0 15px 0 19px;
      background: #f2f2f2;
      color: #999;
      font-size: 13px;
      box-sizing: border-box;
      padding-top: 7px;
      padding-left: 11px;
      height: 28px;
      border-radius: 5px;
      width: 300px;
    }
    span {
      color: #666;
      font-size: 13px;
    }
  }
  .pgt_list {
    position: relative;
    margin-top: 10px;
    overflow: hidden;
    &/deep/ .van-badge--select {
      border-color: #ea047b;
    }
    &/deep/ .van-badge {
      padding-top: 16px;
      padding-bottom: 16px;
    }
  }
  .pgt_L {
    width: 24%;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100vh - 134px);
    background: #f8f8f8;
    overflow-y: scroll;
  }
  .pgt_R {
    width: 76%;
    display: inline-block;
    height: calc(100vh - 134px);
    margin-left: 24%;
    overflow-y: scroll;
  }
}
</style>