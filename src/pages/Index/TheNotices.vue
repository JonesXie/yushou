<template>
  <HeadFoot class="pg_notice" :Title="title">
    <template #content>
      <ul class="pgn_ul">
        <li class="pgn_li" v-for="i in 10" :key="i">
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
      </ul>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "TheNotices",
  data() {
    return {
      title: "消息中心"
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>


<style lang="scss" scoped>
.pg_notice {
  padding-top: 46px;
  .pgn_ul {
    margin-top: 10px;
    background: #fff;
    margin-bottom: 10px;
    .pgn_li {
      display: flex;
      height: 71px;
      box-sizing: border-box;
      width: 100%;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
      .pgn_li_l {
        margin: 15px 12px 0 15px;
      }
      .pgn_li_r {
        width: 80%;
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

