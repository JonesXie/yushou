<template>
  <div class="pg_notice">
    <van-nav-bar title="消息中心" left-arrow :fixed="true" @click-left="GoBack()"></van-nav-bar>
    <ul class="pgn_ul">
      <li class="pgn_li">
        <div class="pgn_li_l">
          <img src="@/assets/img/index/pg_notices_notice.png" alt>
        </div>
        <router-link :to="{name:'noticedetail',query:{id:123}}" class="pgn_li_r">
          <p>
            平台通知
            <span>2019-4-20</span>
          </p>
          <p class="li_r_content van-ellipsis">鱼麦麦APP全面升级（2.0）</p>
        </router-link>
      </li>
      <li class="pgn_li">
        <div class="pgn_li_l">
          <img src="@/assets/img/index/pg_notices_notice.png" alt>
        </div>
        <div class="pgn_li_r">
          <p>
            平台通知
            <span>2019-4-20</span>
          </p>
          <p class="li_r_content">鱼麦麦APP全面升级（2.0）</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar } from "vant";
export default {
  name: "TheNotices",
  data() {
    return {};
  },
  components: { [NavBar.name]: NavBar },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack(){
      this.$router.back(-1)
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

<style lang="scss" scoped>
.pg_notice {
  width: 100vw;
  min-width: 100vh;
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
}
.pg_notice {
  padding-top: 46px;
  .pgn_ul {
    margin-top: 10px;
    background: #fff;
    .pgn_li {
      display: flex;
      height: 71px;
      box-sizing: border-box;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
      .pgn_li_l {
        margin: 15px 12px 0 15px;
      }
      .pgn_li_r {
        width: 46%;
        padding-top: 15px;
        font-size: 14px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        span {
          float: right;
          color: #999;
          font-size: 12px;
          margin-right: 15px;
        }
        .li_r_content {
          color: #999;
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

