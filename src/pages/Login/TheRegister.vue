<template>
  <div class="pg_register pg_login">
    <img src="@/assets/logo.png" alt class="logo">
    <div class="pgl_input">
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
      <div class="msn_input van-hairline--bottom">
        <img src="@/assets/img/login/pg_login_safe.png" alt class="msn_img">
        <input type="text" placeholder="输入短信验证码" class="num" @blur="validMsn" v-model="msn">
        <p class="msn_tips" @click="getCode">{{msnTxt}}</p>
      </div>
      <div class="mima_input van-hairline--bottom">
        <img src="@/assets/img/login/pg_login_lock.png" alt class="mima_img">
        <input type="text" placeholder="请设置登录密码" class="mima" v-model="psw">
      </div>
      <div class="btn">登录</div>
      <router-link to="/login" class="tips">已有账号，去登陆</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Toast } from "vant";

export default {
  name: "register",
  data() {
    return {
      phone: null,
      psw: null,
      msn: null,
      msnTxt: "获取验证码",
      isClick: true,
      time: 5
    };
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
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
        this.isClick = false;
        this.countDown();
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