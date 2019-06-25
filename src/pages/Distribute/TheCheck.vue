<template>
  <HeadFoot class="pg_TheCheck" :Title="title" :backPath="backPath">
    <template #content>
      <ul class="pgtc_ul">
        <li class="pgtc_li" v-for="(v,i) in dataList" :key="i">
          <div class="user_icon" :style="{backgroudImage:'url('+v+')'}"></div>
          <div class="user_name ellipsis-line">18256097403</div>
          <div class="user_agree" @click="yes(v)">同意</div>
          <div class="user_reject" @click="no(v)">拒绝</div>
        </li>
      </ul>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "TheCheck",
  data() {
    return {
      title: "店长审核",
      backPath: "", //返回路由，可删除
      dataList: [1, 2, 3]
    };
  },
  components: { HeadFoot },
  methods: {
    yes(val) {},
    no(val) {}
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_TheCheck {
  padding-top: 50px;
  .pgtc_ul {
    width: 100vw;
    .pgtc_li {
      width: 100%;
      padding: 10px 15px;
      background: #fff;
      margin-bottom: 3px;
      height: 33px;
      line-height: 33px;
      .user_icon {
        width: 33px;
        height: 33px;
        border-radius: 17px;
        @include myBG;
        background-color: #efefef;
        display: inline-block;
      }
      .user_name {
        font-size: 16px;
        font-weight: bold;
        padding-left: 10px;
        width: 50%;
        display: inline-block;
      }
      .user_agree {
        font-size: 14px;
        height: 22px;
        width: 50px;
        color: #fff;
        line-height: 22px;
        text-align: center;
        border-radius: 5px;
        background: $Color;
        display: inline-block;
        margin-right: 5px;
        position: relative;
        top: -12px;
      }
      .user_reject {
        font-size: 14px;
        height: 20px;
        width: 48px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        color: $Color;
        border: 1px solid $Color;
        display: inline-block;
        position: relative;
        top: -12px;
      }
    }
  }
}
</style>