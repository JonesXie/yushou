<template>
  <HeadFoot class="pg_wd" :Title="title">
    <template #content>
      <ul class="pgwd_ul">
        <li :class="['pgwd_li', out?'out':'get']">
          <div class="top">
            <p>订单编号：657402501244664633</p>
            <span>￥165</span>
          </div>
          <div class="bottom">
            <span>2018-03-31 12:45:36</span>
            <p>[消费]</p>
          </div>
        </li>
        <li :class="['pgwd_li', out?'get':'out']">
          <div class="top">
            <p>订单编号：657402501244664633</p>
            <span>￥165</span>
          </div>
          <div class="bottom">
            <span>2018-03-31 12:45:36</span>
            <p>[收益]</p>
          </div>
        </li>
      </ul>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "WalletDetail",
  data() {
    return {
      title: "交易明细",
      out: true
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pg_wd {
  .pgwd_ul {
    width: 100vw;
    padding-top: 46px;
    box-sizing: border-box;
    .pgwd_li {
      padding: 15px;
      background: #fff;
      width: 345px;
      box-sizing: border-box;
      margin: 7px auto;
      .top {
        overflow: hidden;
        width: 100%;
        display: flex;
        align-items: flex-end;
        p {
          font-size: 13px;
          flex: 1;
        }
        span {
          font-size: 18px;
        }
      }
      .bottom {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        margin-top: 9px;
        p {
          float: right;
          color: #333;
        }
      }
      &.out {
        border-left: 2px solid $Color;
        .top {
          span {
            color: $Color;
          }
        }
      }
      &.get {
        border-left: 2px solid #2c9be9;
        .top {
          span {
            color: #2c9be9;
          }
        }
      }
    }
  }
}
</style>