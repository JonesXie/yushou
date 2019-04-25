<template>
  <div class="pg_yxlist">
    <van-nav-bar left-arrow :fixed="true" @click-left="GoBack()" :left-text="Title">
      <div class="navRight" slot="right" @click="showList=!showList">
        <img src="@/assets/img/yanxuan/pg_yanxuan_menu.png" alt>
      </div>
    </van-nav-bar>
    <div class="pg_list">
      <ul class="pg_list_ul" v-if="showList">
        <li v-for="i in 6" :key="i">
          <img src="@/assets/logo.png" alt>
          <span>{{Title}}</span>
        </li>
      </ul>
      <div class="pg_list_tuijian">
        <water-fall></water-fall>
      </div>
    </div>
  </div>
</template>

<script>
import WaterFall from "./WaterFall.vue";
import { mapActions } from "vuex";
import { NavBar } from "vant";
export default {
  name: "YanxuanList",
  data() {
    return {
      Title: "生鲜",
      showList:false,
    };
  },
  components: { WaterFall, [NavBar.name]: NavBar },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
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
$Color: #ea047b;
.pg_yxlist {
  overflow: hidden;
  & /deep/ .van-nav-bar .van-icon {
    color: #666;
  }
  & /deep/ .van-nav-bar__text {
    color: $Color;
  }
  .navRight {
    img {
      width: 18px;
      height: 18px;
    }
  }
}
.pg_list {
  margin-top: 46px;
  .pg_list_ul {
    overflow-y: hidden;
    height: 75px;
    padding: 10px 0;
    box-sizing: border-box;
    white-space: nowrap;
    li {
      display: inline-block;
      border-radius: 10px;
      width: 82px;
      height: 55px;
      margin-left: 18px;
      position: relative;
      box-shadow: 0 5px 5px #999;
      span {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pg_list_h {
    font-size: 16px;
    color: #000;
    padding-left: 17px;
    margin-bottom: 21px;
    width: 100vw;
  }
  .pg_list_tuijian {
    width: calc(100vw - 20px);
    margin: 0 auto;
  }
}
</style>