<template>
  <div class="pg_SalerManege">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()"/>
      <span>{{title}}</span>
    </div>
    <div class="head_bg"></div>
    <!-- content -->
    <div class="pg_model_content">
      <div class="list_li" v-for="(v,i) in dataList" :key="i">
        <div class="list_li_l">
          <div class="user_icon" :style="{backgroudImage:'url('+v+')'}">
            <!-- <div class="user_icon_dailog">线上店长</div> -->
          </div>
          <p class="user_name ellipsis-line">18265582981</p>
          <p class="user_time ellipsis-line">创建时间：2019-5-28</p>
        </div>
        <div class="list_li_r">
          <div class="saler_title">累计销售额</div>
          <div class="saler_money">
            210.111
            <em>元</em>
          </div>
          <div class="oder_title">累计订单</div>
          <div class="oder_num">
            15
            <em>笔</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon } from "vant";
export default {
  name: "SalerManege",
  data() {
    return {
      title: "团队用户",
      dataList: [1, 2, 3]
    };
  },
  components: {
    [Icon.name]: Icon
  },
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
@import "~@/layout/public.scss";
.pg_SalerManege {
  position: relative;
  width: 100vw;
  .head_bg {
    width: 100vw;
    height: 125px;
    background: url("~@/assets/img/distribution/ly_distribute_bg.png");
    @include myBG;
    position: fixed;
    top: 0;
    left: 0;
  }
}
.pg_h_nav {
  position: fixed;
  height: 46px;
  line-height: 46px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  color: #f4f4f4;
  background: url("~@/assets/img/distribution/ly_distribute_bg.png");
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 999;
  & /deep/ .van-icon {
    float: left;
    top: 16px;
    left: 15px;
  }
}
.pg_model_content {
  width: 100vw;
  position: absolute;
  top: 46px;
}
.pg_SalerManege {
  .pg_model_content {
    padding-top: 10px;
  }
  .list_li {
    width: 350px;
    height: 163px;
    margin: 0 auto;
    background: url("~@/assets/img/distribution/mod_manage_panel.png");
    @include myBG;
    display: flex;
    .list_li_l {
      flex: 1;
      text-align: center;
      .user_icon {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: #efefef;
        margin-top: 23px;
        display: inline-block;
        position: relative;
        .user_icon_dailog {
          font-size: 9px;
          height: 15px;
          line-height: 15px;
          width: 52px;
          color: #fff;
          background: url("~@/assets/img/distribution/mod_mange_dailog.png");
          @include myBG;
          position: absolute;
          right: -58px;
          padding-left: 2px;
          box-sizing: border-box;
        }
      }
      .user_name {
        margin: 18px 16px;
        font-size: 12px;
      }
      .user_time {
        font-size: 11px;
      }
    }
    .list_li_r {
      flex: 1;
      padding-left: 35px;
      box-sizing: border-box;
      font-size: 12px;
      .saler_title {
        margin-top: 23px;
      }
      .saler_money {
        font-size: 16px;
        font-weight: bold;
        margin: 15px 0 28px;
        em {
          font-size: 12px;
        }
      }
      .oder_num {
        font-size: 16px;
        font-weight: bold;
        margin-top: 15px;
        em {
          font-size: 12px;
        }
      }
    }
  }
}
</style>