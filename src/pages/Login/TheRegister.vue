<template>
  <div class="pg_register pg_login">
    <img src="@/assets/logo.png" alt class="logo" />
    <div class="pgl_input">
      <div class="num_input van-hairline--bottom">
        <img src="@/assets/img/login/pg_login_phone.png" alt class="num_img" />
        <input
          type="tel"
          placeholder="请输入手机号码"
          class="num"
          @blur="validPhone"
          v-model="phone"
          maxlength="11"
        />
      </div>
      <div class="msn_input van-hairline--bottom">
        <img src="@/assets/img/login/pg_login_safe.png" alt class="msn_img" />
        <input type="text" placeholder="输入短信验证码" class="num" @blur="validMsn" v-model="msn" />
        <p class="msn_tips" @click="getCode">{{msnTxt}}</p>
      </div>
      <!-- <div class="mima_input van-hairline--bottom">
        <img src="@/assets/img/login/pg_login_lock.png" alt class="mima_img">
        <input type="password" placeholder="请设置登录密码" class="mima" v-model="psw">
      </div>-->
      <div class="btn" @click="submit">立即注册</div>
      <router-link to="/login" class="tips">已有账号，去登陆</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";
import { toSendSms, thirdlyRegister } from "@/api/login.js";
import { notNull } from "@/layout/methods.js";
import { setTimeout } from "timers";
export default {
  name: "register",
  data() {
    return {
      phone: null,
      psw: null,
      msn: null,
      msnTxt: "获取验证码",
      isClick: true,
      time: 60,
      inviter: null
    };
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    validNull(val) {
      if (val !== null && val !== undefined && val !== "") {
        return true;
      } else {
        return false;
      }
    },
    validPhone() {
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone === null) {
        Toast("手机号不能为空");
      } else if (!reg.test(this.phone)) {
        Toast("手机号格式不正确");
        this.phone = null;
      }
    },
    validMsn() {},
    getCode() {
      if (this.isClick) {
        if (this.validNull(this.phone)) {
          this.isClick = false;
          this.countDown();
          let _data = {
            phone: this.phone
          };
          toSendSms(_data).then(({ data }) => {
            Toast(data.msg);
          });
        } else {
          Toast("请填写电话号码");
        }
      } else {
        Toast({
          duration: 1000,
          message: `请${this.msnTxt}秒后重试`
        });
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
    submit() {
      let wxData = this.$store.state.wxData;
      if (notNull(wxData)) {
        if (notNull(this.phone)) {
          // if (notNull(this.psw)) {
          if (notNull(this.msn)) {
            let _data = {
              phone: this.phone,
              vcode: this.msn,
              // password: this.psw,
              inviter: this.inviter,
              nickName: wxData.nickname,
              sex: wxData.sex,
              wxId: wxData.unionid,
              imagePath: wxData.headimgurl
            };
            thirdlyRegister(_data).then(({ data }) => {
              if (data.code === 1) {
                this.$notify("注册成功");
                localStorage.setItem("token", data.token);
                this.$store.commit("SET_Token", data.token);
                this.$router.push("/index");
              }
            });
          } else {
            this.$toast.fail("请填写短信验证码");
          }
          // } else {
          //   this.$toast.fail("请填写密码");
          // }
        } else {
          this.$toast.fail("请填写手机号码");
        }
      } else {
        this.$toast("请先进行微信授权");
        let That = this;
        setTimeout(() => {
          sessionStorage.setItem("enterURL", window.location.href);
          That.$store.dispatch("getWX");
        }, 2500);
      }
    }
  },
  mounted() {
    if (notNull(this.$route.query.inviter)) {
      this.inviter = this.$route.query.inviter;
    }
    this.ChangeStatus(false);
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pg_login {
  background: #fff;
  min-height: 100vh;
  width: 100vw;

  .logo {
    display: inline-block;
    width: 90px;
    height: 90px;
    margin: 90px auto 110px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
.pg_login {
  .pgl_input {
    padding: 0 28px;
    .num_input,
    .msn_input {
      margin-bottom: 24px;
    }
    .num_input,
    .mima_input,
    .msn_input {
      padding-bottom: 12px;
      padding-left: 14px;

      img {
        width: 13px;
        height: 20px;
      }
      input {
        margin-left: 13px;
        width: 88%;
      }
      .mima_img {
        width: 15px;
        height: 19px;
      }
      .msn_img {
        width: 16px;
        height: 18px;
      }
    }
    .msn_input {
      .num {
        width: 60%;
      }
    }
    .msn_tips {
      display: inline-block;
      color: $Color;
    }
    .btn {
      background: $Color;
      color: #fff;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      border-radius: 22px;
      margin-top: 57px;
    }
    .tips {
      color: $Color;
      text-align: center;
      font-size: 12px;
      display: inline-block;
      margin-top: 16px;
      width: 100%;
    }
  }
}
</style>