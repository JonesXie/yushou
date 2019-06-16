<template>
  <HeadFoot class="pg_goodstype" :Title="title">
    <template #content>
      <type-list :id="id"></type-list>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import TypeList from "@/pages/Components/goods/TypeList.vue";
export default {
  name: "GoodsType",
  data() {
    return {
      title: null,
      id: null
    };
  },
  components: { HeadFoot, TypeList },
  created() {
    this.id = this.$route.params.id;
    this.title = this.$route.params.codeName;
    // this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_goodstype {
  padding-top: 46px;
  box-sizing: border-box;
  .pggt_head {
    & /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
    }
    .price {
      img {
        width: 9px;
        height: 12px;
      }
    }
  }
}
.pg_goodstype {
  .pggt_ul {
    overflow: hidden;
    li {
      float: left;
      background: #fff;
      width: 186px;
      height: 285px;
      margin-top: 3px;
      padding: 25px 15px 13px;
      box-sizing: border-box;
    }
    li:nth-child(even) {
      margin-left: 3px;
    }
    .imgWrap {
      width: 100%;
      height: 150px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
    .txtWrap {
      margin-top: 13px;
      .price {
        color: $Color;
        font-size: 12px;
        span {
          padding: 3px 4px;
          background: #ea637a;
          font-size: 10px;
          color: #fff;
          border-radius: 2px;
        }
        em {
          font-size: 16px;
        }
        p {
          display: inline-block;
          position: relative;
          top: 3px;
        }
      }
      .info {
        font-size: 13px;
        line-height: 19px;
        margin: 9px 0;
      }
      .buyer {
        color: #999;
        font-size: 10px;
      }
    }
  }
  .noData {
    width: 100%;
    height: calc(100vh - 120px);
    text-align: center;
    position: absolute;
    top: 120px;
    img {
      position: absolute;
      top: 40%;
      transform: translate(-50%, -50%);
      left: 50%;
      display: inline-block;
      width: 227px;
      height: 200px;
    }
  }
}
</style>