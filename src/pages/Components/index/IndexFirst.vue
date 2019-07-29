<template>
  <div class="index_first" ref="first_pg">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="if_banner">
        <van-swipe :autoplay="5000" indicator-color="#fa399d" v-if="BannerImg !==null">
          <van-swipe-item v-for="(v,i) in BannerImg" :key="i" @click="turnGoods(v.picLink)">
            <img :src="v.picUrl" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="if_active">
        <a href="https://www.fishmaimai.com/zpbz.html" class="if_active_h van-hairline--bottom"></a>
        <ul class="if_active_f">
          <li>
            <router-link to="/limitrelease" class="iaf_wrap">
              <img src="@/assets/img/index/pg_index_first_sf.png" alt />
              <p>限时首发</p>
            </router-link>
          </li>
          <li>
            <router-link to="/getcoupon" class="iaf_wrap">
              <img src="@/assets/img/index/pg_index_first_lq.png" alt />
              <p>领券优惠</p>
            </router-link>
          </li>
          <li v-for="(v,i) in activeList" :key="i">
            <router-link
              :to="{path:`/earnmoney/${v.id}`,query:{url:v.activityImage,name:v.activityName}}"
              class="iaf_wrap"
            >
              <img :src="v.activityLogo" alt />
              <p>{{v.activityName}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="if_push">
        <div class="title">
          <img src="@/assets/img/index/pg_index_first_push.png" alt />
          <p>潮流好物&nbsp;&nbsp;&nbsp;低价正品</p>
        </div>
        <div class="swip">
          <swiper :options="swiperOption" ref="mySwiper" v-if="PushImg !==null">
            <!-- slides -->
            <swiper-slide
              v-for="(v,i) in PushImg"
              :key="i"
              class="swipItem"
              @click.native="turnGoods(v.id)"
            >
              <div class="itemH">
                <img :src="v.goodsImages" alt />
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
          <div
            class="fl_li"
            v-for="(v,i) in FLImg.dataList"
            :key="i"
            @click="turnGoodsType(v.codeId,v.codeName)"
          >
            <img :src="v.subjectTitleImage" alt />
            <p :class="['fl_li_p' ,'fl_li_p'+i]">{{v.subjectTitle}}</p>
            <div class="dec">
              <p>{{v.subjectName}}</p>
              <p>{{v.codeName}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="if_brand" v-for="(v,i) in brandList" :key="i">
        <div class="title">
          <img :src="v.subjectTitleImage" alt />
        </div>
        <div class="ifbd_list">
          <div
            class="ifbd_li"
            v-for="(val,ind) in v.ymBrandVOS"
            :key="ind"
            :class="[val.imgOne?'':'van-hairline--bottom',!val.imgOne&&ind%2==0?'van-hairline--right':'']"
            @click="turnGoodsType(val.id,val.brandName)"
          >
            <p class="ifbd_li_h">{{val.brandName}}</p>
            <p class="ifbd_li_title">{{val.sign}}</p>
            <div :class="['img_wrap', val.imgOne ?'img_one':'']">
              <div>
                <img :src="val.brandProductMainImage" alt />
              </div>
              <div v-if="!val.imgOne">
                <img :src="val.brandProductViceImage" alt />
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
import {
  getBanner,
  findGoods,
  selectCodeSubject,
  selectBrandSubject,
  getselectActivity
} from "@/api/index.js";
import { Swipe, SwipeItem, PullRefresh } from "vant";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import FirstList from "./FirstList.vue";
import { notNull } from "@/layout/methods.js";

export default {
  name: "IndexFirst",
  data() {
    return {
      BannerImg: null,
      PushImg: null,
      FLImg: null,
      brandList: [],
      isLoading: false,
      swiperOption: {
        effect: "coverflow",
        initialSlide: 1,
        slidesPerView: 2,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          depth: 80,
          slideShadows: false
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      activeList: []
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
      this.onLoad("fresh");
    },
    //跳转
    turnGoods(val) {
      if (notNull(val)) {
        this.$router.push(`/goods/${val}`);
      } else {
        this.$toast("该选项仅做展示");
      }
    },
    //跳转
    turnGoodsType(id, name) {
      this.$router.push({
        path: `/goodstype/${id}`,
        query: { codeName: name }
      });
    },
    //获取活动图标
    getActive() {
      getselectActivity().then(({ data }) => {
        if (data.code === 1) {
          this.activeList = data.data.page.dataList;
        }
      });
    },
    onLoad(val) {
      getBanner().then(({ data }) => {
        this.BannerImg = data.data;
      });

      findGoods().then(({ data }) => {
        this.PushImg = data.data;
      });

      selectCodeSubject({
        distributorId: sessionStorage.getItem("distributorId")
      }).then(({ data }) => {
        this.FLImg = data.data.page;
      });
      selectBrandSubject().then(({ data }) => {
        this.brandList = data.data.page.dataList.map(v => {
          let _rData = v;
          _rData.ymBrandVOS = v.ymBrandVOS.map(val => {
            let _data = val;
            if (notNull(val.brandProductViceImage)) {
              val.imgOne = false;
            } else {
              val.imgOne = true;
            }
            return _data;
          });
          return _rData;
        });
        if (val === "fresh") {
          this.$toast("刷新成功");
        }
        this.isLoading = false;
      });
    }
  },
  created() {
    this.onLoad();
    this.getActive();
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
      display: block;
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
        width: 71px;
        height: 19px;
        box-sizing: border-box;
      }
      .fl_li_p0 {
        background: url("~@/assets/img/index/pg_index_first_p0.png");
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 100% 100%;
      }
      .fl_li_p1 {
        background: url("~@/assets/img/index/pg_index_first_p1.png");
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 100% 100%;
      }
      .fl_li_p2 {
        background: url("~@/assets/img/index/pg_index_first_p2.png");
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 100% 100%;
      }
      .fl_li_p3 {
        background: url("~@/assets/img/index/pg_index_first_p3.png");
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 100% 100%;
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
//brand
.index_first {
  .if_brand {
    margin-top: 8px;
    background: #fff;
    padding: 15px;
    padding-bottom: 0px;
    width: 100vw;
    box-sizing: border-box;

    .title {
      text-align: center;
      padding-bottom: 10px;
      img {
        height: 16px;
        width: auto;
      }
    }
    .ifbd_list {
      overflow: hidden;
      .ifbd_li {
        float: left;
        width: 49%;
        // box-sizing: border-box;
        padding-bottom: 12px;
        padding-top: 10px;
        .ifbd_li_h {
          font-size: 13px;
        }
        .ifbd_li_title {
          font-size: 10px;
          margin-top: 8px;
          margin-bottom: 14px;
          color: #999;
        }
        .img_wrap {
          width: 100%;
          height: 80px;
          display: flex;
          &.img_one {
            div {
              text-align: left;
            }
          }
          div {
            flex: 1;
            height: 80px;
            line-height: 80px;
            text-align: center;
            img {
              max-height: 100%;
              max-width: 100%;
            }
          }
        }
      }
      .ifbd_li:nth-child(2n) {
        padding-left: 2%;
      }
    }
  }
}
.index_first {
  .ifmz_list {
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
        .img_two_specail {
          height: auto;
          width: 100%;
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