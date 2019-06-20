<template>
  <HeadFoot class="pg_editorconfig" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
      <div class="pgec_input">
        <div class="input_wrap">
          <van-field label="姓名" v-model="name" placeholder="请输入姓名"/>
          <van-field label="身份证号码" v-model="isID" @blur="validID" placeholder="请输入身份证号码"/>
        </div>
      </div>
      <div class="btn" @click="submit">确认</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Field } from "vant";
import { notNull } from "@/layout/methods.js";
import { selectOrderAddress, changeOrderIdentity } from "@/api/order.js";
export default {
  name: "EditorConfig",
  data() {
    return {
      title: "添加身份信息",
      backPath: "", //返回路由，可删除
      name: null,
      isID: null,
      orderId: null
    };
  },
  components: { HeadFoot, [Field.name]: Field },
  methods: {
    validID() {
      let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!reg.test(this.isID)) {
        this.$toast("身份证号码不正确");
        this.isID = null;
      }
    },
    submit() {
      if (notNull(this.name)) {
        if (notNull(this.isID)) {
          let _data = {
            orderId: this.orderId,
            userCard: this.isID,
            userName: this.name
          };
          changeOrderIdentity(_data).then(({ data }) => {
            this.$toast(data.msg);
            if (data.code === 1) {
              this.$router.go(-1);
            }
          });
        } else {
          this.$toast("请输入身份证号码");
        }
      } else {
        this.$toast("请输入姓名");
      }
    },
    getInt() {
      selectOrderAddress({ orderId: this.orderId }).then(({ data }) => {
        if (data.code === 1) {
          this.name = data.data.address.userCard.cardName;
          this.isID = data.data.address.userCard.cardId;
        }
      });
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getInt();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pgec_input {
  width: 100vw;
  padding-top: 60px;
  box-sizing: border-box;
  .input_wrap {
    width: 94%;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
  }
}
.btn {
  @include btn(90%, 40px);
  margin: 15px 5%;
}
</style>