<template>
  <div class="pg_yanxuan">
    <water-fall>
      <template #content>
        <swiper :options="swiperOption" ref="mySwiper" class="swiper">
          <swiper-slide v-for="(v,i) in bannerList" :key="i" class="swipItem">
            <router-link :to="{ path: '/yanxuanlist', query: { id: v.id ,name:v.articleClassifyName} }" class="swipe_li">
              <img :src="v.articleClassifyImg" alt class="sl_bg">
              <div class="sl_active">
                <img src="@/assets/img/yanxuan/pg_yanxuan_active.png" alt>
                <p class="name">{{v.articleClassifyName}}</p>
                <p class="title">{{v.articleClassifyTitleName}}</p>
                <p class="slogan">{{v.articleClassifySignature}}</p>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
        <div class="pg_list">
          <p class="pg_list_h">热门推荐</p>
        </div>
      </template>
    </water-fall>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import WaterFall from "./WaterFall.vue";
import { selectArticleClassifyList } from "@/api/yanxuan.js";
export default {
  name: "YanXuan",
  data() {
    return {
      bannerList: [],
      swiperOption: {
        effect: "coverflow",
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: true,
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
    selectArticleClassifyList().then(({ data }) => {
      this.bannerList = data.data.dataList;
    });
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
  & /deep/ .mode_wf {
    height: 100vh;
    padding-bottom: 50px;
  }
}
.pg_yanxuan {
  overflow: hidden;
  .swiper {
    width: 100vw;
    height: 350px;
    background: url("~@/assets/img/yanxuan/pg_yanxuan_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    padding-top: 15px;
    box-sizing: border-box;
    overflow: hidden;
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
        line-height: 24px;
        height: 100px;
        position: absolute;
        top: 27px;
        left: 4px;
        display: flex;
        align-items: center;
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
      width: calc(100vw - 10px);
      margin: 0 auto;
    }
  }
}
</style>