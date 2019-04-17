<template>
  <div class="index_first">
    <div class="if_banner">
      <van-swipe :autoplay="5000" indicator-color="#fa399d">
        <van-swipe-item v-for="i in 4" :key="i">
          <img :src="img" alt>
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
  </div>
</template>

<script>
import { getBanner } from "@/api/index.js";
import { Swipe, SwipeItem } from "vant";

export default {
  name: "IndexFirst",
  data() {
    return {
      img:
        "http://img.fishmaimai.com/imgServer/upload/20190129/1394db60cc8d4cffbdeb8f36ece7f66b.jpg"
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  methods: {},
  mounted() {
    // getBanner().then(({ data }) => {
    //   console.log(data);
    // });
  }
};
</script>

<style scoped lang='scss'>
/* @import url(); */
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
      li{
        width: 25%;
        text-align: center;
      }
    }
  }
}
</style>