<template>
  <div class="pg_ReportForm pg_OnlineWallet">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()"/>
      <span>{{title}}</span>
    </div>
    <div class="head_bg"></div>
    <!-- content -->
    <div class="pg_model_content">
      <ul class="pgow_hlist">
        <li :class="['pgow_hlist_li',actived===0?'active':'']" @click="actived=0">每日</li>
        <li :class="['pgow_hlist_li',actived===1?'active':'']" @click="actived=1">每周</li>
        <li :class="['pgow_hlist_li',actived===2?'active':'']" @click="actived=2">每月</li>
        <li :class="['pgow_hlist_li',actived===3?'active':'']" @click="actived=3">每年</li>
      </ul>
      <div class="list_wrap">
        <div class="list_date">
          <p class="fl">2019.5.18</p>
          <img
            class="fr"
            @click="showDatepicker"
            src="@/assets/img/distribution/pg_reportform_calendar.png"
            alt
          >
        </div>
        <div class="list_li">
          <div class="title">
            <em></em>
            营业额
          </div>
          <div class="type">
            <div class="type0">总营业额</div>
            <div class="type1">门店营业额</div>
            <div class="type2">线上营业额</div>
          </div>
          <div class="type money">
            <div class="type0">￥4989.0</div>
            <div class="type1">￥4989.0</div>
            <div class="type2">￥4989.0</div>
          </div>
        </div>
        <div class="list_li profit">
          <div class="title">
            <em></em>
            利润
          </div>
          <div class="type">
            <div class="type0">总利润</div>
            <div class="type1">门店利润</div>
            <div class="type2">线上利润</div>
          </div>
          <div class="type money">
            <div class="type0">￥4989.0</div>
            <div class="type1">￥4989.0</div>
            <div class="type2">￥4989.0</div>
          </div>
        </div>
        <div class="list_li team">
          <div class="title">
            <em></em>
            团队人数
          </div>
          <div class="type">
            <div class="type0">总人数</div>
            <div class="type1">线上店长数</div>
            <div class="type2">普通用户数</div>
          </div>
          <div class="type money">
            <div class="type0">23人</div>
            <div class="type1">23人</div>
            <div class="type2">23人</div>
          </div>
        </div>
      </div>
    </div>
    <!-- datepicker -->
    <van-popup v-model="dateShow" :close-on-click-overlay="false" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :type="dateType"
        @confirm="chooseDate"
        @cancel="dateShow=false"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon, DatetimePicker, Popup } from "vant";
import { getTime } from "@/layout/methods.js";
export default {
  name: "ReportForm",
  data() {
    return {
      title: "报表",
      actived: 0,
      dateShow: false,
      dateType: "date", //date 日，year-month 年月
      // currentDate: new Date()
      currentDate: new Date()
    };
  },
  components: {
    [Icon.name]: Icon,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    },
    showDatepicker() {
      this.dateShow = true;
    },
    chooseDate() {
      this.dateShow = false;
      console.log(getTime(this.currentDate));
    }
    // dateFilter(type, value) {
    //   if (type === "day") {
    //     return options.filter(option => option % 5 === 0);
    //   }
    //   return options;
    // }
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
.pg_ReportForm {
  position: relative;
  width: 100vw;
  .head_bg {
    width: 100vw;
    height: 90px;
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
  top: 30px;
  .pgow_hlist {
    width: 100vw;
    display: flex;
    text-align: center;
    margin-top: 28px;

    .pgow_hlist_li {
      flex: 1;
      position: relative;
      font-size: 13px;
      color: #f4f4f4;
      padding-bottom: 7px;
      &.active::after {
        content: "";
        position: absolute;
        width: 30%;
        height: 1px;
        background: #fff;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .list_wrap {
    padding: 13px 15px 0 15px;
    width: 100vw;
    box-sizing: border-box;
    // height: calc(100vh - 88px);
    // overflow-y: scroll;
    .list_date {
      padding: 15px 0;
      width: 100%;
      overflow: hidden;
      img {
        width: 22px;
        height: 20px;
      }
    }
    .list_li {
      width: 345px;
      height: 125px;
      background: #fff;
      box-sizing: border-box;
      border-bottom: 1px dashed #efefef;
      border-radius: 10px;
      padding: 19px 16px 0 16px;
      .title {
        font-size: 14px;
        color: #000;
        em {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #f19149;
          margin-right: 12px;
        }
      }
      &.profit {
        .title {
          em {
            background: #aa89bd;
          }
        }
      }
      &.team {
        .title {
          em {
            background: #eb6877;
          }
        }
      }
      .type {
        margin: 24px 0 20px;
        font-size: 12px;
        color: #999;
        display: flex;
        .type0,
        .type1,
        .type2 {
          flex: 1;
          text-align: center;
        }
      }
      .money {
        font-size: 12px;
        font-weight: bold;
        color: #666;
      }
    }
  }
}
</style>