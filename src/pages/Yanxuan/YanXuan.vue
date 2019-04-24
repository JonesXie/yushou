<template>
  <div class="pg_yanxuan">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper">
      <swiper-slide v-for="(v,i) in img" :key="i" class="swipItem">
        <div class="swipe_li">
          <img :src="v" alt class="sl_bg">
          <div class="sl_active">
            <img src="@/assets/img/yanxuan/pg_yanxuan_active.png" alt>
            <p class="name">科技</p>
            <p class="title">保持敬畏</p>
            <p class="slogan">追求创新，追求自我突破，黑科技</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="pg_list">
      <p class="pg_list_h">热门推荐</p>
      <div class="pg_list_tuijian">
        <water-fall></water-fall>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import WaterFall from "./WaterFall.vue";
export default {
  name: "YanXuan",
  data() {
    return {
      img: [
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg"
      ],
      swiperOption: {
        effect: "coverflow",
        slidesPerView: 1,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          depth: 80,
          slideShadows: false,
          stretch: 100
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    WaterFall
  },
  methods: {
    ...mapActions(["ChangeActive"]),
    onChange(key) {
      this.activeKey = key;
    }
  },
  mounted() {
    this.ChangeActive(1);
    this.$nextTick(() => {
      setTimeout(() => {
        //设置初始位置
        this.$refs.mySwiper.swiper.slideTo(1, 100, false);
      }, 1000);
    });
  }
};
</script>

<style scoped lang="scss">
.pg_yanxuan {
  overflow:hidden;
  .swiper {
    width: 100vw;
    height: 350px;
    background: url("~@/assets/img/yanxuan/pg_yanxuan_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    padding-top: 15px;
    box-sizing: border-box;
    overflow:hidden;
    & /deep/ .swiper-slide-active {
      .swipe_li {
        .sl_active {
          display: block;
        }
      }
    }
  }
  .swipItem {
    overflow: hidden;
    text-align: center;
    .swipe_li {
      display: inline-block;
      width: 222px;
      height: 300px;
      background-repeat: no-repeat;
      background-position: top right;
      position: relative;
      font-size: 15px;
      color: #fff;
      .sl_bg {
        border-radius: 5px;
        width: 210px;
        height: 300px;
        position: absolute;
        top: 0;
        right: 0;
      }
      .sl_active {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 222px;
        height: 300px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        width: 16px;
        line-height: 30px;
        position: absolute;
        top: 46px;
        left: 4px;
      }
      .title {
        text-align: right;
        position: absolute;
        bottom: 49px;
        right: 14px;
      }
      .slogan {
        font-size: 12px;
        position: absolute;
        bottom: 25px;
        right: 14px;
      }
    }
  }
  .pg_list {
    margin-top: 20px;
    .pg_list_h {
      font-size: 16px;
      color: #000;
      padding-left: 17px;
      margin-bottom: 21px;
      width: 100vw;
    }
    .pg_list_tuijian {
      width: calc(100vw - 20px);
      margin: 0 auto;
    }
  }
}
</style>