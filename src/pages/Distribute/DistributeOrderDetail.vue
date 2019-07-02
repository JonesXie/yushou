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
          <div class="set_online">设为线上店长</div>
        </div>
      </div>
      <ul class="list_choose">
        <li :class="[actived===0?'active':'']" @click="actived=0">全部</li>
        <li :class="[actived===1?'active':'']" @click="actived=1">待发货</li>
        <li :class="[actived===2?'active':'']" @click="actived=2">待收货</li>
        <li :class="[actived===3?'active':'']" @click="actived=3">已完成</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon } from "vant";
import { notNull } from "@/layout/methods.js";
export default {
  name: "DistributeOrderDetail",
  data() {
    return {
      title: "订单明细",
      type: 0,
      num: 0,
      money: 0,
      actived: 0
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
  computed: {
    showOnline() {
      if (this.type == 3 || this.type == 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.ChangeStatus(false);
    if (notNull(this.$route.query.type)) {
      this.num = this.$route.query.num;
      this.type = this.$route.query.type;
      this.money = this.$route.query.money;
    }
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
  padding: 0 30px;
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
</style>