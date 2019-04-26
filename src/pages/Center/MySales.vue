<template>
  <HeadFoot class="pg_mysales" :Title="title">
    <template #content>
      <ul class="pgs_ul">
        <li class="pgs_li">
          <div class="li_head">
            <div class="li_tag">231.4元/日</div>
            <div class="li_id van-ellipsis">订单编号 17102316279122</div>
          </div>
          <div class="li_content">
            <div class="li_content_L">
              <img src="@/assets/logo.png" alt>
            </div>
            <div class="li_content_R">
              <p class="title">匡威男鞋女鞋三星黑标街拍潮流低帮休闲舒适耐磨运动帆布鞋</p>
              <p class="type">
                规格：黑色；37码
                <span>x2</span>
              </p>
              <p class="price">今日价：￥410.1</p>
            </div>
          </div>
          <div class="li_foot">
            <span class="riqi">7天后发货</span>
            <span class="shezhi">设置折扣</span>
            <span class="quxiao">取消挂卖</span>
          </div>
        </li>
      </ul>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
export default {
  name: "MySales",
  data() {
    return {
      title: "我的挂卖"
    };
  },
  components: { HeadFoot },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pgs_ul {
  padding-top: 46px;
  width: 100vw;
  .pgs_li {
    background: #fff;
    width: 345px;
    height: 200px;
    box-sizing: border-box;
    margin: 0 auto;
    box-shadow: 0px 2px 5px 0px rgba(128, 128, 128, 0.35);
    border-radius: 5px;
    margin-top: 14px;
    .li_head {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      padding-top: 18px;
      .li_tag {
        position: relative;
        height: 18px;
        line-height: 18px;
        width: auto;
        color: #fff;
        font-size: 10px;
        background: url("~@/assets/img/center/pg_mysales_tag.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center left;
        display: inline-block;
        padding-right: 8px;
      }
      .li_id {
        display: inline-block;
        margin-left: 5px;
        width: 79%;
        position: relative;
        top: 2px;
      }
    }
    .li_content {
      width: 100%;
      height: 106px;
      box-sizing: border-box;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px dashed #ddd;
      padding: 15px 10px;
      overflow: hidden;
      .li_content_L {
        width: 75px;
        height: 75px;
        float: left;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .li_content_R {
        float: left;
        margin-left: 18px;
        width: 225px;
        height: 75px;
        box-sizing: border-box;
        .title {
          line-height: 20px;
          position: relative;
          top: -2px;
        }
        .type {
          color: #999999;
          font-size: 10px;
          margin: 9px 0;
          overflow: hidden;
          span {
            float: right;
          }
        }
        .price {
          font-size: 11px;
          color: #d3b285;
        }
      }
    }
    .li_foot {
      width: 100%;
      height: 44px;
      box-sizing: border-box;
      overflow: hidden;
      padding-top: 10px;
      .riqi {
        font-size: 14px;
        color: #666;
        // padding-top: 5px;
        margin-left: 10px;
      }
      .shezhi {
        width: 70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: $Color;
        border-radius: 12px;
        font-size: 12px;
        color: #fff;
        display: inline-block;
        margin-left: 102px;
        margin-right: 20px;
      }
      .quxiao {
        width: 70px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #f4f4f4;
        border-radius: 12px;
        font-size: 12px;
        color: #666666;
        display: inline-block;
      }
    }
  }
}
</style>