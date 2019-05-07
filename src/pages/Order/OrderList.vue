<template>
  <div class="mod_orderlist">
    <ul class="mo_ul">
      <li class="mo_li">
        <div class="mol_h">订单编号 17102316279122</div>
        <div class="mol_c">
          <router-link :to="{path:'/orderdetail',query:{id:'132'}}">
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
          </router-link>
          <div class="li_content_f">
            剩余调货周期：
            <em>29</em>天
            <span>实付：￥4137</span>
          </div>
        </div>
        <div class="mol_f">
          <span class="wuliu">
            <router-link to="/logistics">查看物流</router-link>
          </span>
          <span class="check">确认收货</span>
        </div>
      </li>
      <li class="mo_li">
        <div class="mol_h">订单编号 17102316279122</div>
        <div class="mol_c">
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
          <div class="li_content_f">
            剩余调货周期：
            <em>29</em>天
            <span>实付：￥4137</span>
          </div>
        </div>
        <div class="mol_f">
          <span class="wuliu">
            <router-link to="/logistics">查看物流</router-link>
          </span>
          <span class="check">确认收货</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  props: ["status"],
  data() {
    return {
      dataList: "11"
    };
  },
  methods: {},
  mounted() {
    switch (this.status) {
      case "0":
        this.dataList = 0;
        break;
      case "1":
        this.dataList = 1;
        break;
      case "2":
        this.dataList = 2;
        break;
      case "3":
        this.dataList = 3;
        break;
      default:
        this.dataList = 0;
        break;
    }
  }
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.mod_orderlist {
  .mo_ul {
    width: 100vw;
    padding-top: 7px;
  }
  .mo_li {
    background: #fff;
    margin-bottom: 7px;
    width: 100%;
  }
  .mol_h {
    padding: 18px 15px;
  }
  .mol_c {
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding: 15px 10px 0 15px;
    overflow: hidden;
    .li_content_L {
      width: 80px;
      height: 80px;
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
      min-height: 80px;
      margin-bottom: 15px;
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
        display: inline-block;
        padding: 4px 7px;
        background: #fef5fa;
        border-radius: 5px;
        font-size: 11px;
        color: $Color;
      }
    }
    .li_content_f {
      border-top: 1px dashed #ddd;
      padding: 14px 0;
      clear: both;
      overflow: hidden;
      font-size: 12px;
      em {
        color: #db1919;
      }
      span {
        float: right;
        color: #000;
      }
    }
  }
  .mol_f {
    padding: 11px 15px;
    text-align: right;
    .wuliu {
      width: 73px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: #fff;
      border-radius: 5px;
      font-size: 12px;
      color: $Color;
      display: inline-block;
      border: 1px solid $Color;
    }
    .check {
      width: 75px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: $Color;
      border-radius: 5px;
      font-size: 12px;
      color: #fff;
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>