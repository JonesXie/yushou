<template>
  <div class="pg_DOD">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()" />
      <span>{{title}}</span>
    </div>
    <div class="head_bg"></div>
    <!-- content -->
    <div class="pg_model_content">
      <!-- do something  -->
      <div class="pg_DOD_h">
        <div class="DOD_h_l">
          <p>累计交易额</p>
          <em>
            {{money}}
            <i>元</i>
          </em>
        </div>
        <div class="DOD_h_c">
          <p>累计订单数</p>
          <em>
            {{num}}
            <i>笔</i>
          </em>
        </div>
        <div class="DOD_h_r" v-if="showOnline">
          <div class="set_online" @click="ratePop = true;">设为线上店长</div>
        </div>
      </div>
      <ul class="list_choose">
        <li :class="[actived===0?'active':'']" @click="actived=0">全部</li>
        <li :class="[actived===1?'active':'']" @click="actived=1">待发货</li>
        <li :class="[actived===2?'active':'']" @click="actived=2">待收货</li>
        <!-- <li :class="[actived===3?'active':'']" @click="actived=3">已取消</li> -->
        <li :class="[actived===4?'active':'']" @click="actived=4">已完成</li>
      </ul>
      <dorder-list class="orderList" :userId="userId" :status="status" />
    </div>
    <!-- 设置分成比例弹窗 -->
    <van-popup v-model="ratePop" class="tips_wrap">
      <div class="tips_h">请设置该分销账户的分成比例</div>
      <div class="tips_c">
        <input type="number" v-model="reRate" @blur="validRate" />%
      </div>
      <div class="tips_btn">
        <div class="tips_btn1" @click="confirmRate">确认</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon, Popup } from "vant";
import { notNull } from "@/layout/methods.js";
import DorderList from "@/pages/Components/distribute/DorderList.vue";
import { saveDistributor } from "@/api/distribute.js";
export default {
  name: "DistributeOrderDetail",
  data() {
    return {
      title: "订单明细",
      type: 0,
      num: 0,
      money: 0,
      actived: 0,
      userId: null,
      ratePop: false,
      reRate: null,
      pass: true
    };
  },
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    DorderList
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    },
    validRate() {
      let _data = this.reRate;
      if (`${_data}`.includes(".")) {
        let dotArr = _data.split(".");
        if (dotArr[1].length > 2) {
          let dotTwo = dotArr[1].substring(0, 2);
          this.reRate = Number(`${dotArr[0]}.${dotTwo}`);
          this.$toast("请保留小数点后两位");
          this.pass = false;
        } else {
          this.validMax(_data);
        }
      } else {
        this.validMax(_data);
      }
    },
    validMax(val) {
      if (0 <= val && val <= 100) {
        this.pass = true;
      } else {
        this.reRate = null;
        this.$toast("折扣应在0-100间");
        this.pass = false;
      }
    },
    confirmRate() {
      if (this.pass) {
        saveDistributor({
          addUserId: this.userId,
          scale: this.reRate,
          status: 1
        }).then(({ data }) => {
          this.$toast(data.msg);
        });
      } else {
        this.$toast("填写格式错误");
      }
    }
  },
  computed: {
    showOnline() {
      if (this.type == 3 || this.type == 1) {
        return false;
      } else {
        return true;
      }
    },
    status() {
      switch (this.actived) {
        case 1:
          return "03";
        case 2:
          return "04";
        case 3:
          return "00";
        case 4:
          return "99";
        default:
          return null;
      }
    }
  },
  created() {
    this.userId = this.$route.params.userId;
    if (notNull(this.$route.query.type)) {
      this.num = this.$route.query.num;
      this.type = this.$route.query.type;
      this.money = this.$route.query.money;
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
.pg_DOD {
  position: relative;
  width: 100vw;
  .head_bg {
    width: 100vw;
    height: 150px;
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
.pg_DOD_h {
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  padding: 2px 15px 0;
  p {
    font-size: 12px;
    color: #eee;
    margin-bottom: 15px;
  }
  em {
    color: #fff;
    font-size: 30px;
    i {
      font-size: 13px;
    }
  }
  .DOD_h_l {
    flex: 5;
    text-align: center;
  }
  .DOD_h_c {
    flex: 3;
    text-align: center;
  }
  .DOD_h_r {
    flex: 3;
    width: 89px;
    line-height: 25px;
    height: 25px;
    background-color: #ffffff;
    box-shadow: 0px 1px 4px 1px #ffffff59;
    border-radius: 5px;
    font-size: 13px;
    color: #e97681;
    text-align: center;
    font-weight: bold;
    margin-top: 18px;
  }
}
.list_choose {
  width: 345px;
  height: 39px;
  line-height: 39px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20px;
  margin: 10px auto;
  padding: 0 15px;
  display: flex;
  li {
    flex: 1;
    font-size: 14px;
    color: #000;
    text-align: center;
    position: relative;
    &.active::after {
      content: "";
      width: 50%;
      height: 1px;
      background-color: $Color;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.orderList {
  margin-top: 14px;
  height: calc(100vh - 170px);
  overflow-y: scroll;
  position: relative;
}
.tips_wrap {
  width: 310px;
  height: 190px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 38px 35px 0 35px;
  .tips_h {
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .tips_c {
    width: 100%;
    border: 1px solid #999;
    height: 33px;
    box-sizing: border-box;
    margin: 36px 0 24px;
    input {
      width: 90%;
      height: 100%;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }
  .tips_btn {
    width: 100%;
    text-align: center;
    .tips_btn1 {
      display: inline-block;
      width: 70px;
      height: 26px;
      line-height: 26px;
      background: $Color;
      color: #fff;
      font-size: 15px;
      border-radius: 5px;
    }
  }
}
</style>