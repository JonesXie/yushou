<template>
  <HeadFoot class="pg_site" :Title="title">
    <template #content>
      <div class="pgs_ul">
        <van-swipe-cell
          :right-width="52"
          :class="['pgs_li' ,'default']"
          @click="delData"
          v-for="(i,key) in 8"
          :key="key"
        >
          <div class="li_content">
            <p class="li_content_info">
              <span>小桂子</span>
              <em>18726391500</em>
            </p>
            <p class="li_content_site">江苏省 南京市 鼓楼市 华强路街道 管家桥 85号华荣大厦D座1704室</p>
          </div>
          <p slot="right" @click="delIndex(i)">
            <span>删除</span>
          </p>
        </van-swipe-cell>
      </div>
      <div class="pgs_add">新增地址</div>
    </template>
  </HeadFoot>
</template>

<script>
import { NavBar, SwipeCell } from "vant";
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "MySite",
  data() {
    return {
      out: true,
      delSite: 0,
      title:'我的地址'
    };
  },
  components: { [NavBar.name]: NavBar, [SwipeCell.name]: SwipeCell, HeadFoot },
  methods: {
    delData(clickPosition) {
      if (clickPosition === "right") {
        this.$toast("删除成功");
      }
    },
    delIndex(index) {
      this.delSite = index;
    }
  },
  mounted() {
    
  },
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pg_site {
  .pgs_ul {
    width: 100vw;
    overflow: hidden;
    padding-top: 46px;
    box-sizing: border-box;
    padding-bottom: 80px;
    .pgs_li {
      background: #fff;
      width: 345px;
      box-sizing: border-box;
      margin: 7px auto;
      border-radius: 5px;
      position: relative;
      &.default::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 34px;
        background: url("~@/assets/img/components/pg_mysite_default.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: top top;
      }
    }
    .li_content {
      padding: 15px;
      color: #666;
      .li_content_info {
        font-size: 14px;
        overflow: hidden;
        em {
          float: right;
        }
      }
      .li_content_site {
        font-size: 13px;
        line-height: 19px;
        margin-top: 14px;
      }
    }
    & /deep/ .van-swipe-cell__right {
      background: #d8404f;
      width: 52px;
      font-size: 14px;
      color: #fff;
      p {
        height: 100%;
        width: 100%;
        display: inline-block;
        overflow: hidden;
      }
      span {
        display: inline-block;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .pgs_add {
    width: 345px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    background: $Color;
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin-left: 14px;
    position: fixed;
    bottom: 38px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>