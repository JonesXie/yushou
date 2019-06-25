<template>
  <HeadFoot class="pg_WithDraw pg_walletout" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
      <van-field v-model="alipay" label="提现账户" placeholder="支付宝(15221425895)"/>
      <div class="cut_tip">因股权分配问题，您的实际到账金额为提现金额的50%</div>
      <div class="pgw_money">
        <div class="tips">提现金额</div>
        <div class="input">
          <em>￥</em>
          <input type="number" v-model="outMoney" class="outMoney">
        </div>
      </div>
      <p class="tips">提示：额外扣除￥{{reduceM}}手续费(为微信及支付宝对本平台产生的手续费,费率0.75)</p>
      <div class="submit" @click="submit">提现</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { notNull } from "@/layout/methods.js";
import { doPresent } from "@/api/center.js";
import { Field } from "vant";
export default {
  name: "WithDraw",
  data() {
    return {
      title: "提现",
      backPath: "", //返回路由，可删除
      alipay: null,
      outMoney: null
    };
  },
  components: { HeadFoot, [Field.name]: Field },
  computed: {
    reduceM() {
      if (notNull(this.outMoney)) {
        return (Number(this.outMoney) * 0.0075).toFixed(2);
      } else {
        return 0;
      }
    }
  },
  methods: {
    submit() {
      if (notNull(this.alipay)) {
        if (notNull(this.outMoney)) {
          let _data = {
            presentAccount: this.alipay,
            money: this.outMoney
          };
          doPresent(_data).then(({ data }) => {
            this.$toast.success(data.msg);
            this.$router.back(-1);
          });
        } else {
          this.$toast("填写提现金额");
        }
      } else {
        this.$toast("填写提现账号");
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_walletout {
  padding-top: 50px;
}
.pgw_money {
  background: #fff;
  margin-top: 10px;
  color: #b1b1b1;
  padding: 15px;
  .input {
    margin-top: 20px;
    padding-left: 30px;
    font-size: 30px;
    .outMoney {
      width: 80%;
    }
  }
}
.cut_tip {
  padding: 10px 5px 8px;
  color: #b1b1b1;
  font-size: 14px;
}
.tips {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5px;
  color: #b1b1b1;
  font-size: 10px;
}
.submit {
  @include btn(90%, 30px);
  margin: 10px 5%;
}
</style>