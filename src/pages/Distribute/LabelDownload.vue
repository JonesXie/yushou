<template>
  <HeadFoot class="pg_LabelDownload" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
      <ul class="pgld_list">
        <li class="pgld_item">
          <div class="item-title">
            <div class="fl">2018-9-30 14:20:7</div>
            <div class="fr">已生成</div>
          </div>
          <div class="item-content">
            <p class="content_txt fl">长按复制链接长按复制链接长按复制链接长按复制链接长按复制链接长按复制链接长按复制链接长按复制链接</p>
            <div class="content_tips fr">长按链接进行复制</div>
          </div>
        </li>
      </ul>
      <div class="pgld_add">生成下载链接</div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "LabelDownload",
  data() {
    return {
      title: "商品标价签下载",
      backPath: "" //返回路由，可删除
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_LabelDownload {
  .pgld_list {
    width: 100vw;
    overflow: hidden;
    padding-top: 46px;
    box-sizing: border-box;
    padding-bottom: 80px;
    min-height: 100vh;
    .pgld_item {
      width: 96%;
      margin: 10px auto;
      min-height: 120px;
      background: url("~@/assets/img/distribution/pg_labeldownload_list.png");
      background-size: 100% 100%;
      background-position: top center;
      background-repeat: no-repeat;
      padding: 0 26px 5px;
      box-sizing: border-box;
    }
    .item-title {
      overflow: hidden;
      max-height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #666;
      .fr {
        color: $Color;
      }
    }
    .item-content {
      min-height: 68px;
      width: 100%;
      overflow: hidden;
      font-size: 12px;
      line-height: 15px;
      .content_txt {
        width: 75%;
      }
      .content_tips {
        width: 19%;
        color: #fff;
        background: #e96f82;
        text-align: center;
        border-radius: 3px;
        padding: 3px 5px;
      }
    }
  }
  .pgld_add {
    width: 345px;
    height: 43px;
    line-height: 43px;
    border-radius: 5px;
    background-image: linear-gradient(
        35deg,
        rgb(238, 41, 143) 1%,
        #ec5488 38%,
        #e87c80 100%
      ),
      linear-gradient(90deg, #f8bdcd 0%, #f8bdcd 100%);
    text-align: center;
    color: #fff;
    font-size: 15px;
    margin-left: 14px;
    position: fixed;
    bottom: 38px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>