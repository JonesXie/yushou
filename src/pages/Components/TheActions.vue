<template>
  <div class="pg_actions">
    <img class="pgc_head" src="@/assets/img/components/pg_actions_head.png" alt>
    <ul class="pgc_ul">
      <li v-for="i in 6" :key="i" class="pgc_li">
        <img class="imgWrap" src="@/assets/img/components/pg_actions_head.png" alt>
        <div class="info">
          <p class="ellipsis-line">冠宇奶油玉米味爆米花冠宇奶油玉米味爆米花</p>
          <div class="priceWrap">
            <p>￥<span>1.00</span></p>
            <div class="fr">限时抢购</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TheActions",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["ChangeStatus"])
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
.pg_actions {
  width: 100vw;
  min-height: 100vh;
  background: #fb3c38;
  .pgc_head {
    width: 100%;
    height: 175px;
  }
  .pgc_ul {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    li{
      float: left;
      background: #fff;
      width: 175px;
      height: 240px;
      box-sizing: border-box;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    li:nth-child(even){
      margin-left: 5px;
    }
    .pgc_li{
      .imgWrap{
        width: 100%;
        height: 174px;
      }
      .info{
        padding: 10px 10px 0 10px;
      }
      .priceWrap{
        margin-top: 10px;
        overflow: hidden;
        p{
          display: inline-block;
          color: $Color;
          font-size: 13px;
          span{
            font-size: 19px;
          }
        }
        .fr{
          float: right;
          font-size: 13px;
          color: #999;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>