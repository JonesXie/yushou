<template>
  <HeadFoot class="pg_noticedetail" :Title="title">
    <template #content>
      <ul class="pgnd_ul">
        <li class="pgnd_li">
          <p class="title">订单付款成功</p>
          <p
            class="content"
          >亲爱的兽友，感谢您成功预定Lanvin浪凡marry me我愿意女士香水 嫁给我 ，小兽这边会尽快安排发货，亲也可以把订单转卖进行收益，感谢对小兽的信任，更多优惠请关注预兽APP。</p>
          <p class="footer">2019-01-24&nbsp;&nbsp;17:32:41</p>
        </li>
        <li class="pgnd_li">
          <p class="title">订单付款成功</p>
          <p
            class="content"
          >亲爱的兽友，感谢您成功预定Lanvin浪凡marry me我愿意女士香水 嫁给我 ，小兽这边会尽快安排发货，亲也可以把订单转卖进行收益，感谢对小兽的信任，更多优惠请关注预兽APP。</p>
          <p class="footer">2019-01-24&nbsp;&nbsp;17:32:41</p>
        </li>
      </ul>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "NoticeDetail",
  data() {
    return {
      title: "消息中心"
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang='scss'>
.pg_noticedetail {
  padding-top: 46px;
  .pgnd_ul {
    .pgnd_li {
      width: 100vw;
      background: #fff;
      padding: 12px 15px;
      margin: 5px 0;
      box-sizing: border-box;
    }
    .content {
      font-size: 12px;
      color: #999;
      line-height: 19px;
      margin: 12px 0;
    }
    .footer {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
