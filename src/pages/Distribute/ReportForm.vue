<template>
  <div class="pg_ReportForm pg_OnlineWallet">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()" />
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
          <p class="fl">{{timeRange}}</p>
          <img
            class="fr"
            @click="showPicker"
            src="@/assets/img/distribution/pg_reportform_calendar.png"
            alt
          />
        </div>
        <div v-if="allInfo.length >0">
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
              <div class="type0">￥{{allInfo[0].allProfit}}</div>
              <div class="type1">￥{{allInfo[0].directProfit}}</div>
              <div class="type2">￥{{allInfo[0].indirectProfig}}</div>
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
              <div class="type0">￥{{allInfo[0].allRental}}</div>
              <div class="type1">￥{{allInfo[0].directRental}}</div>
              <div class="type2">￥{{allInfo[0].indirectRental}}</div>
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
              <div class="type0">{{allInfo[0].allUserNum}}人</div>
              <div class="type1">{{allInfo[0].directUserNum}}人</div>
              <div class="type2">{{allInfo[0].indirectUserNum}}人</div>
            </div>
          </div>
        </div>
        <div class="noData" v-else>
          <img src="@/assets/img/ly_nodata.png" alt />
        </div>
      </div>
    </div>
    <!-- datepicker 日和月-->
    <van-popup v-model="dateShow" :close-on-click-overlay="false" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :type="dateType"
        @confirm="chooseDate"
        @cancel="dateShow=false"
      />
    </van-popup>
    <!-- datepicker 周和年-->
    <van-popup v-model="dateShow2" :close-on-click-overlay="false" position="bottom">
      <van-picker
        show-toolbar
        :columns="currentWY"
        @cancel="dateShow2=false"
        @confirm="chooseDate2"
        ref="weekYear"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";
import { getLastWeek } from "@/layout/DateTimeUtils.js";
import { Icon, DatetimePicker, Popup, Picker } from "vant";
import { selectUserDistributorReport } from "@/api/distribute.js";
export default {
  name: "ReportForm",
  data() {
    return {
      title: "报表",
      actived: 0,
      dateShow: false,
      dateShow2: false,
      dateType: "date", //date 日，year-month 年月
      currentDate: new Date(), //日月选中
      currentWY: [],
      timeRange: null, //展示数据
      weeksList: [],
      yearsList: [],
      isPicker: false,
      allInfo: []
    };
  },
  components: {
    [Icon.name]: Icon,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  watch: {
    actived: {
      handler: function(nv) {
        if (nv === 0) {
          //日
          this.dateType = "date";
          this.timeRange = moment(this.currentDate).format("YYYY-MM-DD");
          this.isPicker = false;
          this.getInit(1);
        } else if (nv === 1) {
          //周
          this.isPicker = true;
          if (this.weeksList.length === 0) {
            this.getLastWeeks();
          }
          this.timeRange = this.weeksList[0];
          this.currentWY = this.weeksList;
          this.getInit(2);
        } else if (nv === 2) {
          //月
          this.dateType = "year-month";
          this.timeRange = moment(this.currentDate).format("YYYY-MM-DD");
          this.isPicker = false;
          this.getInit(3);
        } else if (nv === 3) {
          //年
          this.isPicker = true;
          this.timeRange = this.yearsList[0];
          this.currentWY = this.yearsList;
          this.getInit(4);
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    },
    showPicker() {
      if (this.isPicker) {
        this.dateShow2 = true;
      } else {
        this.dateShow = true;
      }
    },
    chooseDate() {
      if (this.dateType === "date") {
        this.timeRange = moment(this.currentDate).format("YYYY-MM-DD");
      } else {
        this.timeRange = moment(this.currentDate).format("YYYY-MM");
      }
      this.dateShow = false;
    },
    chooseDate2() {
      // this.timeRange = this.$refs.weekYear.getValues();
      if (this.actived === 1) {
        this.timeRange = this.$refs.weekYear.getValues()[0];
      } else {
        this.timeRange = this.$refs.weekYear.getValues()[0];
      }
      this.dateShow2 = false;
    },
    //获取一年内的周数
    getLastWeeks() {
      for (let i = 0; i < 53; i++) {
        let week = getLastWeek(i);
        this.weeksList.splice(this.weeksList.length, 0, week.join("至"));
      }
    },
    //获取年度
    getLastYears() {
      let cur = new Date();
      let curY = cur.getFullYear();
      for (let i = 0; i < 10; i++) {
        let year = curY - i;
        this.yearsList.splice(this.yearsList.length, 0, year);
      }
    },
    getInit(val) {
      let _data = {
        type: val, //	1 日 2 周 3 月 4年
        time: this.timeRange
      };
      selectUserDistributorReport(_data).then(({ data }) => {
        if (data.code === 1) {
          this.allInfo = data.data.page.dataList;
        }
      });
    }
  },
  mounted() {
    this.ChangeStatus(false);
    //年度list
    this.getLastYears();
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
.noData {
  width: 100%;
  // height: calc(100vh - 120px);
  padding-top: 200px;
  text-align: center;
  position: absolute;
  top: 120px;
  img {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: inline-block;
    width: 227px;
    height: 200px;
  }
}
</style>