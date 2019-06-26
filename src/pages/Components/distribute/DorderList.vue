<template>
  <ul class="mod_DorderList">
    <li class="mdl_li" v-for="(v,i) in dataList" :key="i">
      <div class="mdl_li_h">
        <p class="fl">订单编号：456225632415651</p>
        <p class="fr">2019-4-21</p>
      </div>
      <div class="mdl_l_c van-hairline--bottom">
        <div class="mdl_l_c_img" :style="{backgrounImage:'url('+ v+')'}"></div>
        <div class="mdl_l_c_info">
          <div class="title">
            <div class="fl ellipsis-three">雀巢（nestle）超启能恩幼儿配方奶粉 3段</div>
            <div class="fr">￥328.0</div>
          </div>
          <div class="type">
            <div class="fl">规格：3段 800g</div>
            <div class="fr">×3</div>
          </div>
        </div>
      </div>
      <div class="mdl_l_f">
        <div class="money">
          合计：
          <em>984.0</em>元
        </div>
        <div class="cut">
          <div>利润比例：88%&nbsp;&nbsp;&nbsp;&nbsp;88.0元</div>
          <div>利润比例：88%&nbsp;&nbsp;&nbsp;&nbsp;88.0元</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "DorderList",
  data() {
    return {
      dataList: [1, 2, 3]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.mod_DorderList {
  width: 100vw;
  .mdl_li {
    width: 335px;
    height: 233px;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 0 auto 8px;
    padding: 17px;

    .mdl_li_h {
      font-size: 12px;
      color: #999999;
      overflow: hidden;
    }
    .mdl_l_c {
      padding: 39px 0 19px;
      display: flex;
      .mdl_l_c_img {
        width: 80px;
        height: 80px;
        @include myBG;
        background-size: contain;
        background: #f4f4f4;
        border-radius: 5px;
        box-sizing: border-box;
      }
      .mdl_l_c_info {
        flex: 1;
        box-sizing: border-box;
        margin-left: 15px;
        font-size: 12px;
        padding-top: 8px;
        .title {
          overflow: hidden;
          color: #333;
          margin-bottom: 14px;
          .fl {
            width: 70%;
            line-height: 16px;
          }
        }
        .type {
          overflow: hidden;
          color: #999999;
          .fl {
            width: 70%;
          }
        }
      }
    }
    .mdl_l_f {
      height: 66px;
      width: 100%;
      display: flex;
      font-size: 12px;
      color: #000;
      .money {
        flex: 1;
        height: 66px;
        line-height: 66px;
        em {
          font-size: 16px;
        }
      }
      .cut {
        flex: 1;
        height: 66px;
        text-align: right;
        div {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>