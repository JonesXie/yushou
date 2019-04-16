<template>
  <div class="wscn-http404">
    <div class="pic-404">
      <img class="pic-404__parent" :src="img_404" alt="404">
      <img class="pic-404__child left" :src="img_404_cloud" alt="404">
      <img class="pic-404__child mid" :src="img_404_cloud" alt="404">
      <img class="pic-404__child right" :src="img_404_cloud" alt="404">
    </div>
    <div class="bullshit">
      <div class="bullshit__headline">{{ message }}</div>
      <div class="bullshit__info">请检查您输入的网址是否正确</div>
    </div>
  </div>
</template>

<script>
import img_404 from "@/assets/404_img/404.png";
import img_404_cloud from "@/assets/404_img/404_cloud.png";

export default {
  data() {
    return {
      img_404,
      img_404_cloud
    };
  },
  computed: {
    message() {
      return "访问失败";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404 {
  position: relative;
  width: 100vw;
  overflow: hidden;
  .pic-404 {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 2rem;
    &__parent {
      width: 80%;
      display: inline-block;
      margin-left: 17%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 60px;
        top: 17PX;
        left: 140PX;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-iteration-count: 2;
        animation-delay: 1s;
      }
      &.mid {
        width: 26px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-iteration-count: 2;
        animation-delay: 1.2s;
      }
      &.right {
        width: 42px;
        top: 100px;
        left: 446px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-iteration-count: 2;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 140px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 108px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 42px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 20px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 446px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 406px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 286px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 246px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 100%;
    text-align: center;
    overflow: hidden;
    padding-top: 20px;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
