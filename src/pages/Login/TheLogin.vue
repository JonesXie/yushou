<template>
  <div class="pg_login">
    <img src="@/assets/logo.png" alt class="logo">
    <div class="pgl_input" v-if="showPhone">
      <div class="num_input van-hairline--bottom">
        <img src="@/assets/img/login/pg_login_phone.png" alt class="num_img">
        <input
          type="tel"
          placeholder="请输入手机号码"
          class="num"
          @blur="validPhone"
          v-model="phone"
          maxlength="11"
        >
      </div>
      <div class="mima_input van-hairline--bottom">
        <img src="@/assets/img/login/pg_login_lock.png" alt class="mima_img">
        <input type="password" placeholder="请输入登录密码" class="mima" v-model="psw">
      </div>
      <p class="tips">
        <router-link to="/register">立即注册</router-link>
        <router-link to="/fixpassword">忘记密码?</router-link>
      </p>
      <div class="btn" @click="submit">登录</div>
    </div>
    <!-- <div class="wx_login" v-else> -->
    <div class="wx_login">
      <div class="title">第三方登录</div>
      <div class="tx_login">
        <div class="tx_login_w" @click="wxLogin">
          <img src="@/assets/img/login/pg_login_wx.png" alt>
          <p>微信</p>
        </div>
        <!-- qq登录 -->
        <!-- <div class="tx_login_w tx_login_r">
            <img src="@/assets/img/login/pg_login_qq.png" alt>
            <p>QQ</p>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { doLogin, getWXAccessToken } from "@/api/login.js";
import { mapActions } from "vuex";
import { Toast } from "vant";
import { notNull } from "@/layout/methods.js";
export default {
  name: "TheLogin",
  data() {
    return {
      phone: null,
      psw: null,
      showPhone: true,
      unionid: null
    };
  },
  methods: {
    ...mapActions(["ChangeStatus", "getWX", "setWxData"]),
    validPhone() {
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone === null) {
        Toast("手机号不能为空");
      } else if (!reg.test(this.phone)) {
        Toast("手机号格式不正确");
        this.phone = null;
      }
    },
    submit() {
      if (notNull(this.phone)) {
        if (notNull(this.psw)) {
          let _data = {
            userName: this.phone,
            password: this.psw,
            qqId: null,
            wxId: this.unionid,
            platform: "weixin"
          };
          doLogin(_data).then(({ data }) => {
            if (data.code === 1) {
              this.$toast(data.msg);
              localStorage.setItem("token", data.token);
              this.$store.commit("SET_Token", data.token);
              this.$router.push(this.$store.state.fromToLogin);
            }
          });
        } else {
          Toast.fail("请填写密码");
        }
      } else {
        Toast.fail("请填写手机号");
      }
    },
    //微信登录授权
    wxLogin() {
      doLogin({ wxId: this.$store.state.wxData.unionid }).then(({ data }) => {
        this.$toast(data.msg);
        if (data.code === 1) {
          localStorage.setItem("token", data.token);
          this.$store.commit("SET_Token", data.token);
          this.$router.push(this.$store.state.fromToLogin);
        }
      });
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
    .num_input {
      margin-bottom: 24px;
    }
    .num_input,
    .mima_input {
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
    }
    .tips {
      font-size: 12px;
      margin-top: 13px;
      overflow: hidden;
      padding-top: 1px;
      a {
        color: $Color;
      }
      a:last-child {
        float: right;
        color: #666;
      }
    }
    .btn {
      background: $Color;
      color: #fff;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      border-radius: 22px;
      margin-top: 22px;
    }
  }
  .wx_login {
    .title {
      margin: 33px 0 25px;
      text-align: center;
      color: #999;
      font-size: 13px;
    }
    .tx_login {
      text-align: center;

      .tx_login_w {
        width: 40px;
        text-align: center;
        display: inline-block;
        img {
          width: 40px;
          height: 40px;
        }
        p {
          margin-top: 9px;
        }
      }
      .tx_login_r {
        margin-left: 49px;
      }
    }
  }
}
</style>