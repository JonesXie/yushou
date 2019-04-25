<template>
  <div class="pg_wd">
    <van-nav-bar title="我的地址" left-arrow :fixed="true" @click-left="GoBack()"></van-nav-bar>
    <div class="pgwd_ul">
      <van-swipe-cell :right-width="52" class="pgwd_li" :on-close="delData()">
        <div class="li_content">hhhhh</div>
        <span slot="right">删除</span>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar, SwipeCell } from "vant";
export default {
  name: "MySite",
  data() {
    return {
      out: true
    };
  },
  components: { [NavBar.name]: NavBar, [SwipeCell.name]: SwipeCell },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    },
    delData(clickPosition,instance){
     alert(clickPosition)
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
.pg_wd {
  width: 100vw;
  min-width: 100vh;
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
  .pgwd_ul {
    width: 100vw;
    padding-top: 46px;
    box-sizing: border-box;
    .pgwd_li {
      background: #fff;
      width: 345px;
      box-sizing: border-box;
      margin: 7px auto;
      border-radius: 5px;
    }
    .li_content {
      padding: 15px;
    }
    & /deep/ .van-swipe-cell__right {
      background: #d8404f;
      width: 52PX;
      font-size: 14px;
      color: #fff;
      span {
        position: relative;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: inline-block;
      }
    }
  }
}
</style>