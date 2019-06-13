<template>
  <HeadFoot class="pg_fixpassword" :Title="title">
    <template #content>
      <van-cell-group class="pgs_link">
        <van-cell>
          <img slot="icon" src="@/assets/img/login/pg_login_phone.png" alt class="num_img">
          <input
            type="tel"
            placeholder="请输入手机号码"
            class="num"
            @blur="validPhone"
            v-model="phone"
            maxlength="11"
          >
        </van-cell>
        <van-cell>
          <img slot="icon" src="@/assets/img/login/pg_login_safe.png" alt class="msn_img">
          <input type="text" placeholder="输入短信验证码" class="msn" v-model="msn">
          <p class="msn_tips" @click="getCode">{{msnTxt}}</p>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="newData">
        <van-cell>
          <img slot="icon" src="@/assets/img/login/pg_login_phone.png" alt class="num_img">
          <input type="password" placeholder="新密码" class="num" v-model="newPW">
        </van-cell>
        <van-cell>
          <img slot="icon" src="@/assets/img/login/pg_login_phone.png" alt class="num_img">
          <input type="password" placeholder="确认密码" class="num" v-model="confirmPW">
        </van-cell>
      </van-cell-group>
      <div class="pps_out" @click="submit">确认</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Cell, CellGroup } from "vant";
import { toSendSms } from "@/api/login.js";
import { doForgetPassword } from "@/api/center.js";
import { notNull } from "@/layout/methods.js";
export default {
  name: "FixPassword",
  data() {
    return {
      title: "修改密码",
      phone: null,
      msn: null,
      newPW: null,
      confirmPW: null,
      msnTxt: "获取验证码",
      isClick: true,
      time: 60
    };
  },
  components: { HeadFoot, [Cell.name]: Cell, [CellGroup.name]: CellGroup },
  methods: {
    validPhone() {
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone === null) {
        this.$toast("手机号不能为空");
      } else if (!reg.test(this.phone)) {
        this.$toast("手机号格式不正确");
        this.phone = null;
      }
    },
    countDown() {
      if (this.time > 1) {
        this.time--;
        this.msnTxt = `${this.time}秒后重试`;
        setTimeout(this.countDown, 1000);
      } else {
        this.time = 60;
        this.msnTxt = "获取验证码";
        this.isClick = true;
      }
    },
    getCode() {
      if (this.isClick) {
        if (notNull(this.phone)) {
          this.isClick = false;
          this.countDown();
          let _data = {
            phone: this.phone
          };
          toSendSms(_data).then(({ data }) => {
            this.$toast(data.msg);
          });
        } else {
          this.$toast("请填写电话号码");
        }
      } else {
        this.$toast({
          duration: 1000,
          message: `请${this.msnTxt}秒后重试`
        });
      }
    },
    validpw() {
      if (this.newPW !== this.confirmPW) {
        return false;
      } else {
        return true;
      }
    },
    submit() {
      if (notNull(this.phone)) {
        if (notNull(this.msn)) {
          if (this.validpw() && notNull(this.newPW)) {
            let _data = {
              phone: this.phone,
              vcode: this.msn,
              password: this.newPW
            };
            doForgetPassword(_data).then(({ data }) => {
              this.$notify(data.msg);
              this.$router.push("/setting");
            });
          } else {
            this.$toast.fail("两次密码不一致");
          }
        } else {
          this.$toast.fail("请填写短信验证码");
        }
      } else {
        this.$toast.fail("请填写手机号码");
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_fixpassword {
  padding-top: 50px;
  .num_img {
    width: 13px;
    height: 20px;
    position: relative;
    top: 3px;
  }
  .num {
    margin-left: 13px;
    width: 88%;
  }
  .msn_img {
    width: 16px;
    height: 17px;
    position: relative;
    top: 3px;
  }
  .msn {
    margin-left: 13px;
    width: 70%;
  }
  .msn_tips {
    display: inline-block;
    color: $Color;
  }
  .newData {
    margin-top: 10px;
  }
  .pps_out {
    font-size: 12px;
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: $Color;
    border-radius: 15px;
    width: 80%;
    margin: 20px auto;
  }
}
</style>