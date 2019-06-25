<template>
  <HeadFoot class="pg_applydistribute" :Title="title" :backPath="backPath">
    <template #content>
      <div class="pgad_head"></div>
      <div class="pgad_tips">选择开店类型</div>
      <van-radio-group v-model="selected" class="pgad_select">
        <!-- 线下 -->
        <van-radio class="pgo_li" :name="0">
          <div
            slot="icon"
            slot-scope="props"
            :class="['pgo_li_item',props.checked ? 'active' : '']"
          >
            <div class="pgo_li_img" v-if="props.checked"></div>
            <p class="pgo_li_type">成为线下店长</p>
          </div>
        </van-radio>
        <!-- 线上 -->
        <van-radio class="pgo_li" :name="1">
          <div
            slot="icon"
            slot-scope="props"
            :class="['pgo_li_item',props.checked ? 'active' : '']"
          >
            <div class="pgo_li_img" v-if="props.checked"></div>
            <p class="pgo_li_type">成为线上店长</p>
          </div>
        </van-radio>
      </van-radio-group>
      <router-link :to="{path:`/applyinfo/${selected}`}" class="next_btn">下一步</router-link>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Radio, RadioGroup, Icon } from "vant";
export default {
  name: "ApplyDistribute",
  data() {
    return {
      title: "申请开店",
      backPath: "", //返回路由，可删除
      selected: 0
    };
  },
  components: {
    HeadFoot,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Icon.name]: Icon
  },
  methods: {},
  mounted() {
    this.selected = Number(this.$route.params.actived);
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_applydistribute {
  padding-top: 46px;
  .pgad_head {
    width: 100vw;
    height: 160px;
    background: url("~@/assets/img/distribution/pg_applydistribute_header.png");
    @include myBG;
  }
  .pgad_tips {
    margin-top: 37px;
    background: $Color;
    height: 27px;
    line-height: 27px;
    font-size: 13px;
    padding-left: 7px;
    padding-right: 10px;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    width: 95px;
    box-sizing: border-box;
    color: #fff;
  }
  .pgad_select {
    margin-top: 35px;
    width: 100vw;
    .pgo_li {
      & /deep/ .van-radio__icon {
        height: auto;
        width: 100%;
      }
    }
    .pgo_li_item {
      width: 345px;
      height: 42px;
      line-height: 42px;
      box-sizing: border-box;
      margin: 0 auto;
      background: #fff;
      border-radius: 5px;
      margin-bottom: 18px;
      font-size: 14px;
      text-align: center;
      position: relative;
      font-weight: bold;
      .pgo_li_img {
        position: absolute;
        display: inline-block;
        width: 17px;
        height: 17px;
        background: url("~@/assets/img/ly_selected.png");
        @include myBG;
        top: 14px;
        left: 24px;
      }
      &.active {
        color: $Color;
      }
    }
  }
  .next_btn {
    width: 345px;
    height: 42px;
    line-height: 42px;
    color: #fff;
    box-sizing: border-box;
    font-size: 16px;
    background: $Color;
    border-radius: 5px;
    text-align: center;
    position: fixed;
    bottom: 45px;
    left: 15px;
    display: inline-block;
  }
}
</style>