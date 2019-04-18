<template>
  <div class="index_first" ref="first_pg">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="if_banner">
        <van-swipe :autoplay="5000" indicator-color="#fa399d" v-if="BannerImg !==null">
          <van-swipe-item v-for="(v,i) in BannerImg" :key="i">
            <img :src="v.picUrl" alt>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="if_active">
        <div class="if_active_h van-hairline--bottom"></div>
        <ul class="if_active_f">
          <li>
            <div class="iaf_wrap">
              <img src="@/assets/img/index/pg_index_first_sf.png" alt>
              <p>限时首发</p>
            </div>
          </li>
          <li>
            <div class="iaf_wrap">
              <img src="@/assets/img/index/pg_index_first_lq.png" alt>
              <p>领券优惠</p>
            </div>
          </li>
          <li>
            <div class="iaf_wrap">
              <img src="@/assets/img/index/pg_index_first_hf.png" alt>
              <p>换季护肤</p>
            </div>
          </li>
          <li>
            <div class="iaf_wrap">
              <img src="@/assets/img/index/pg_index_first_zq.png" alt>
              <p>赚钱专区</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="if_push">
        <div class="title">
          <img src="@/assets/img/index/pg_index_first_push.png" alt>
          <p>潮流好物&nbsp;&nbsp;&nbsp;低价正品</p>
        </div>
        <div class="swip">
          <swiper :options="swiperOption" ref="mySwiper" v-if="PushImg !==null">
            <!-- slides -->
            <swiper-slide v-for="(v,i) in PushImg" :key="i" class="swipItem">
              <div class="itemH">
                <img :src="v.goodsImages" alt>
                <p>调货周期：{{v.goodsWaitDays}}天</p>
              </div>
              <div class="itemF">
                <p class="van-ellipsis">{{v.goodsName}}</p>
                <p class="money">
                  预售价:
                  <span>￥{{v.goodsSalePrice}}</span>
                </p>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-pagination"></div>
        </div>
        <div class="ad"></div>
        <div class="fenlei" v-if="FLImg !==null">
          <div class="fl_li" v-for="(v,i) in FLImg.dataList" :key="i">
            <img :src="v.subjectTitleImage" alt>
            <p :class="['fl_li_p' ,`fl_li_p${i}`]">{{v.subjectTitle}}</p>
            <div class="dec">
              <p>{{v.subjectName}}</p>
              <p>{{v.codeName}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="if_meizhuang">
        <div class="title">
          <img src="@/assets/img/index/pg_index_first_mz.png" alt>
        </div>
        <div class="ifmz_list" v-if="HZPData !==null">
          <!-- 1 -->
          <div class="ifmz_li">
            <p class="ifmz_li_h">{{HZPData[0].brandName}}</p>
            <p class="ifmz_li_title">{{HZPData[0].sign}}</p>
            <div class="img_one">
              <img :src="HZPData[0].brandProductMainImage" alt>
            </div>
          </div>
          <div class="ifmz_li">
            <p class="ifmz_li_h">{{HZPData[1].brandName}}</p>
            <p class="ifmz_li_title">{{HZPData[1].sign}}</p>
            <div class="img_one">
              <img :src="HZPData[1].brandProductMainImage" alt>
            </div>
          </div>
          <div class="ifmz_wrap">
            <div class="ifmz_li mode_right">
              <p class="ifmz_li_h">{{HZPData[2].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[2].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[2].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[2].brandProductViceImage" alt>
                </div>
              </div>
            </div>
            <div class="ifmz_li">
              <p class="ifmz_li_h">{{HZPData[3].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[3].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[3].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[3].brandProductViceImage" alt>
                </div>
              </div>
            </div>
          </div>
          <div class="ifmz_wrap">
            <div class="ifmz_li mode_right">
              <p class="ifmz_li_h">{{HZPData[4].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[4].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[4].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[4].brandProductViceImage" alt>
                </div>
              </div>
            </div>
            <div class="ifmz_li">
              <p class="ifmz_li_h">{{HZPData[5].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[5].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[5].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[5].brandProductViceImage" alt>
                </div>
              </div>
            </div>
          </div>
          <!-- 2 -->
          <div class="ifmz_li ifmz-top">
            <p class="ifmz_li_h">{{HZPData[6].brandName}}</p>
            <p class="ifmz_li_title">{{HZPData[6].sign}}</p>
            <div class="img_one">
              <img :src="HZPData[6].brandProductMainImage" alt>
            </div>
          </div>
          <div class="ifmz_li ifmz-top">
            <p class="ifmz_li_h">{{HZPData[7].brandName}}</p>
            <p class="ifmz_li_title">{{HZPData[7].sign}}</p>
            <div class="img_one">
              <img :src="HZPData[7].brandProductMainImage" alt>
            </div>
          </div>
          <div class="ifmz_wrap">
            <div class="ifmz_li mode_right">
              <p class="ifmz_li_h">{{HZPData[8].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[8].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[8].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[8].brandProductViceImage" alt>
                </div>
              </div>
            </div>
            <div class="ifmz_li">
              <p class="ifmz_li_h">{{HZPData[9].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[9].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[9].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[9].brandProductViceImage" alt>
                </div>
              </div>
            </div>
          </div>
          <div class="ifmz_wrap">
            <div class="ifmz_li mode_right">
              <p class="ifmz_li_h">{{HZPData[10].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[10].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[10].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[10].brandProductViceImage" alt>
                </div>
              </div>
            </div>
            <div class="ifmz_li">
              <p class="ifmz_li_h">{{HZPData[11].brandName}}</p>
              <p class="ifmz_li_title">{{HZPData[11].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="HZPData[11].brandProductMainImage" alt>
                </div>
                <div>
                  <img :src="HZPData[5].brandProductViceImage" alt>
                </div>
              </div>
            </div>
          </div>
          <!-- 3 -->
          <div class="ifmz_li ifmz-top">
            <p class="ifmz_li_h">{{HZPData[12].brandName}}</p>
            <p class="ifmz_li_title">{{HZPData[12].sign}}</p>
            <div class="img_one">
              <img :src="HZPData[12].brandProductMainImage" alt>
            </div>
          </div>
          <div class="ifmz_li ifmz-top">
            <p class="ifmz_li_h">{{HZPData[13].brandName}}</p>
            <p class="ifmz_li_title">{{HZPData[13].sign}}</p>
            <div class="img_one">
              <img :src="HZPData[13].brandProductMainImage" alt>
            </div>
          </div>
        </div>
      </div>
      <div class="if_shuma if_meizhuang">
        <div class="title">
          <img src="@/assets/img/index/pg_index_first_sm.png" alt>
        </div>
        <div class="ifmz_list" v-if="SjData !==null">
          <!-- 1-->
          <div class="ifmz_wrap">
            <div class="ifmz_li mode_right">
              <p class="ifmz_li_h">{{SjData[0].brandName}}</p>
              <p class="ifmz_li_title">{{SjData[0].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="SjData[0].brandProductMainImage" alt class="img00">
                </div>
                <div>
                  <img :src="SjData[0].brandProductViceImage" alt class="img01">
                </div>
              </div>
            </div>
            <div class="ifmz_li">
              <p class="ifmz_li_h">{{SjData[1].brandName}}</p>
              <p class="ifmz_li_title">{{SjData[1].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="SjData[1].brandProductMainImage" alt class="img01">
                </div>
                <div>
                  <img :src="SjData[1].brandProductViceImage" alt class="img00">
                </div>
              </div>
            </div>
          </div>
          <!-- 2-->
          <div class="ifmz_wrap">
            <div class="ifmz_li mode_right">
              <p class="ifmz_li_h">{{SjData[2].brandName}}</p>
              <p class="ifmz_li_title">{{SjData[2].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="SjData[2].brandProductMainImage" alt class="img00">
                </div>
                <div>
                  <img :src="SjData[2].brandProductViceImage" alt class="img00">
                </div>
              </div>
            </div>
            <div class="ifmz_li">
              <p class="ifmz_li_h">{{SjData[3].brandName}}</p>
              <p class="ifmz_li_title">{{SjData[3].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="SjData[3].brandProductMainImage" alt class="img00">
                </div>
                <div>
                  <img :src="SjData[3].brandProductViceImage" alt class="img00">
                </div>
              </div>
            </div>
          </div>
          <!-- 3-->
          <div class="ifmz_wrap">
            <div class="ifmz_li mode_right">
              <p class="ifmz_li_h">{{SjData[4].brandName}}</p>
              <p class="ifmz_li_title">{{SjData[4].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="SjData[4].brandProductMainImage" alt class="img00">
                </div>
                <div>
                  <img :src="SjData[4].brandProductViceImage" alt class="img00">
                </div>
              </div>
            </div>
            <div class="ifmz_li">
              <p class="ifmz_li_h">{{SjData[5].brandName}}</p>
              <p class="ifmz_li_title">{{SjData[5].sign}}</p>
              <div class="img_two">
                <div>
                  <img :src="SjData[5].brandProductMainImage" alt class="img00">
                </div>
                <div>
                  <img :src="SjData[5].brandProductViceImage" alt class="img00">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <first-list></first-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {getBanner,findGoods,selectCodeSubject,selectBrandSubject} from "@/api/index.js";
import { Swipe, SwipeItem, PullRefresh } from "vant";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import FirstList from './FirstList'

export default {
  name: "IndexFirst",
  data() {
    return {
      BannerImg: null,
      PushImg: null,
      FLImg: null,
      HZPData: null,
      SjData: null,
      isLoading: false,
      swiperOption: {
        effect: "coverflow",
        initialSlide: 1,
        slidesPerView: 2,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          // stretch: -30,
          depth: 80,
          // // modifier: 1,
          slideShadows: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  computed: {},
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    swiper,
    swiperSlide,
    FirstList
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    }
  },
  created() {
    getBanner().then(({ data }) => {
      this.BannerImg = data.data;
    });
    findGoods().then(({ data }) => {
      this.PushImg = data.data;
    });
    selectCodeSubject().then(({ data }) => {
      this.FLImg = data.data.page;
    });

    selectBrandSubject().then(({ data }) => {
      this.HZPData = data.data.page.dataList[0].ymBrandVOS;
      this.SjData = data.data.page.dataList[1].ymBrandVOS;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.first_pg.scrollTo(0, 0);
      setTimeout(() => {
        //设置初始位置
        this.$refs.mySwiper.swiper.slideTo(1, 100, false);
      }, 1000);
    });
  }
};
</script>

<style  lang='scss' scoped>
/* @import url(); */
.index_first {
  padding-bottom: 50px;
}
.index_first {
  .if_banner {
    width: 100vw;
    height: 160px;
    padding-top: 10px;

    .van-swipe {
      height: 160px;
      width: 355px;
      margin: 0 auto;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.index_first {
  .if_active {
    background: #fff;
    .if_active_h {
      padding: 12px 15px 7px 15px;
      height: 55px;
      box-sizing: border-box;
      background: url("~@/assets/img/index/pg_index_first_promise.png");
      background-size: auto calc(100% - 19px);
      background-position: center;
      background-repeat: no-repeat;
    }

    .if_active_f {
      display: flex;
      padding: 12px 0 14px;

      .iaf_wrap {
        img {
          width: 50px;
          height: 50px;
        }
        p {
          color: #333333;
          font-size: 14px;
          margin-top: 10px;
        }
      }
      li {
        width: 25%;
        text-align: center;
      }
    }
  }
}

.index_first {
  .if_push {
    margin-top: 8px;
    background: #fff;
    padding-top: 15px;
    width: 100vw;

    .title {
      text-align: center;
      img {
        height: 16px;
        width: auto;
      }
      p {
        color: #666666;
        font-size: 11px;
        margin-top: 9px;
      }
    }
    .swip {
      margin-top: 14px;
      position: relative;
      padding-bottom: 10px;
      .swipItem {
        height: 210px;
        overflow: hidden;
        border-radius: 6px;
        margin-bottom: 3px;
        &.swiper-slide-active {
          .itemF {
            background: linear-gradient(to bottom, #fbd8c5, #97461a);
          }
        }
        .itemH {
          margin: 0 auto;
          width: 150px;
          height: 150px;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          img {
            width: 100%;
            height: 100%;
          }
          p {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 25px;
            line-height: 25px;
            color: #f4f4f4;
            font-size: 10px;
            background-color: #000000;
            opacity: 0.4;
            width: 100%;
            text-indent: 8px;
          }
        }
        .itemF {
          margin: 0 auto;
          width: 150px;
          height: 60px;
          box-sizing: border-box;
          padding: 12px 8px 14px;
          background: linear-gradient(to bottom, #9569ef, #5c1ae3);
          color: #f4f4f4;
          font-size: 13px;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
          .money {
            margin-top: 12px;
            font-size: 10px;
            span {
              color: #ffb504;
              font-size: 14px;
              font-style: italic;
            }
          }
        }
      }
      .swiper-pagination {
        bottom: 0;
        width: 100%;
      }
    }
  }
}

.index_first /deep/ .swiper-pagination-bullet-active {
  background: #ea047b;
}
.index_first /deep/ .swiper-pagination-bullet {
  margin: 0 3px;
}

.index_first {
  .ad {
    background: url("~@/assets/img/index/pg_index_first_ad.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    width: 100vw;
    height: 80px;
    margin-top: 5px;
  }
}
.index_first {
  .fenlei {
    background: #fff;
    padding: 10px;
    padding-bottom: 0;

    .fl_li {
      width: 172px;
      height: 113px;
      display: inline-block;
      margin-bottom: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .fl_li_p {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        font-size: 12px;
        padding: 3px 6px;
      }
      .fl_li_p0 {
        background: #fe8c8d;
      }
      .fl_li_p1 {
        background: #acabab;
      }
      .fl_li_p2 {
        background: #87baf4;
      }
      .fl_li_p3 {
        background: #e7a553;
      }

      .dec {
        position: absolute;
        top: 35px;
        left: 4px;
        font-size: 12px;
        color: #333333;
        p:last-child {
          font-size: 10px;
          color: #969595;
          margin-top: 9px;
        }
      }
    }
    .fl_li:nth-child(odd) {
      margin-right: 10px;
    }
  }
}

.index_first {
  .if_meizhuang {
    margin-top: 8px;
    background: #fff;
    padding: 15px;
    padding-bottom: 0px;
    width: 100vw;
    box-sizing: border-box;

    .title {
      text-align: center;
      img {
        height: 16px;
        width: auto;
      }
      p {
        color: #666666;
        font-size: 11px;
        margin-top: 9px;
      }
    }
  }
}
.index_first {
  .ifmz_list {
    margin-top: 22px;

    .ifmz_wrap {
      border-bottom: 1px solid #eee;
      padding-top: 8px;
    }
    .ifmz_li {
      display: inline-block;
      width: 165px;

      margin-bottom: 12px;
      .ifmz_li_h {
        font-size: 13px;
      }
      .ifmz_li_title {
        font-size: 10px;
        margin-top: 8px;
        margin-bottom: 14px;
        color: #999;
      }
      .img_one {
        img {
          width: 165px;
          height: 80px;
        }
      }
      .img_two {
        display: inline-block;
        width: 100%;
        height: 80px;
        div {
          height: 80px;
          display: inline-block;
          width: 50%;
          text-align: center;
          img {
            height: 100%;
            width: auto;
          }
        }
      }
    }
    .ifmz_li:nth-child(odd) {
      padding-right: 7px;
    }
    .ifmz_li:nth-child(even) {
      padding-left: 7px;
    }
  }
}

.mode_right {
  border-right: 1px solid #eee;
}
.ifmz-top {
  padding-top: 10px;
}

.index_first {
  .ifmz_list {
    .ifmz_li {
      .img_two {
        div {
          .img01 {
            width: 62px;
            height: 38px;
          }
          .img00 {
            height: 90%;
          }
        }
      }
    }
  }
}
</style>