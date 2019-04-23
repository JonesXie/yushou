<template>
  <div class="pg_search">
    <van-nav-bar left-arrow :fixed="true" @click-left="$router.back(-1)">
      <!-- <van-search placeholder="请输入要搜索的商品" background="#f4f4f4" slot="title" v-focus/> -->
      <div class="pgs_wrap_input" slot="title">
        <van-icon name="search" class="search_icon" />
        <input type="text" placeholder="请输入要搜索的商品" v-focus>
      </div>
      <span slot="right" @click="turnPage">搜索</span>
    </van-nav-bar>
    <div class="search_history">
      <div class="sh_title">
        <span>历史记录</span>
        <img src="@/assets/del.png" alt>
      </div>
      <div class="sh_li">
        <span v-for="i in 8" :key="i">面膜</span>
      </div>
    </div>
    <div class="search_hot">
      <div class="sh_title">
        <span>热门搜索</span>
      </div>
      <div class="sh_li">
        <span v-for="i in 8" :key="i">面膜</span>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon } from "vant";
import { mapActions } from "vuex";
export default {
  name: "TheSearch",
  data() {
    return {};
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  components: { [NavBar.name]: NavBar, [Icon.name]: Icon  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    turnPage() {
      this.$router.push("/");
    }
  },
  created() {
    this.ChangeStatus(false);
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
};
</script>

<style lang="scss" scoped>
/* @import url(); */
.pg_search {
  background: #fff;
  min-height: 100vh;
  padding-top: 46px;
  box-sizing: border-box;

  .van-nav-bar__title {
    max-width: 70%;
    padding-top: 10px;
  }
  .van-nav-bar__right {
    color: #e8047b;
    font-size: 14px;
  }
  .pgs_wrap_input {
    width: 100%;
    height: 28px;
    background-color: #f4f4f4;
    border-radius: 5px;
    overflow: hidden;
    line-height: 0;
    text-align: left;
    padding-top: 5px;
    box-sizing: border-box;
    input {
      display: inline-block;
      background-color: #f4f4f4;
      font-size: 12px;
      color: #9e9e9e;
      width: 80%;
    }
    .search_icon {
      font-size: 15px;
      color:#999;
      margin:  0 6px 0 12px;
    }
  }
}
.pg_search {
  .search_history {
    background: #fff;
    padding: 20px 14px 10px;
    width: 100vw;
    box-sizing: border-box;
    .sh_title {
      width: 100%;
      font-size: 14px;
      color: #343334;
      overflow: hidden;
      font-weight: bold;
      img {
        float: right;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
      }
    }
    .sh_li {
      margin-top: 16px;
      span {
        display: inline-block;
        border-radius: 5px;
        border: solid 1px #cccccc;
        padding: 5px 8px;
        font-size: 12px;
        color: #666;
        margin-right: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
.pg_search {
  .search_hot {
    width: 100vw;
    padding: 20px 14px 10px;
    border-top: 8px solid #f4f4f4;
    box-sizing: border-box;
    .sh_title {
      width: 100%;
      font-size: 14px;
      color: #343334;
      overflow: hidden;
      font-weight: bold;
      img {
        float: right;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
      }
    }
    .sh_li {
      margin-top: 16px;
      span {
        display: inline-block;
        border-radius: 5px;
        border: solid 1px #cccccc;
        padding: 5px 8px;
        font-size: 12px;
        color: #666;
        margin-right: 14px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>