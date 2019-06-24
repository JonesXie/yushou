<template>
  <HeadFoot class="pg_ApplyInfo pg_applydistribute" :Title="title" :backPath="backPath">
    <template #content>
      <div class="pgad_head"></div>
      <div class="pgai_content"></div>
      <div class="pgai_tips" @click="readTips">
        <img v-if="selected" src="@/assets/img/ly_choosed.png" alt>
        <img v-else src="@/assets/img/ly_choose.png" alt>
        我已阅读预兽
        <a style="color:#fa4ba6">母婴门店</a>店长细则
      </div>
      <div class="next_btn">提交</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Radio, RadioGroup, Icon } from "vant";
export default {
  name: "ApplyInfo",
  data() {
    return {
      title: "信息填写",
      backPath: "", //返回路由，可删除
      selected: false
    };
  },
  components: {
    HeadFoot,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Icon.name]: Icon
  },
  methods: {
    readTips() {
      if (this.selected) {
        this.selected = false;
      } else {
        this.selected = true;
      }
    }
  },
  mounted() {}
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
.pg_ApplyInfo {
  .pgai_content {
    width: 345px;
    height: 350px;
    background: #fff;
    left: 15px;
    top: 146px;
    position: absolute;
    border-radius: 5px;
    box-shadow: 0px 4px 6px 1px #cccccc59;
  }
  .pgai_tips {
    font-size: 11px;
    left: 15px;
    top: 520px;
    position: absolute;
    img {
      width: 14px;
      height: 14px;
      position: relative;
      top: -1px;
    }
  }
}
</style>