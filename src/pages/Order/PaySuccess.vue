<template>
  <HeadFoot class="pg_paysuccess" :Title="title">
    <template #content>
      <div class="pgp_content">
        <div class="pgpc_title">
          <img v-if="payType ===1" src="@/assets/img/order/pg_pay_alipay.png" alt />
          <img v-else-if="payType ===2" src="@/assets/img/order/pg_pay_wechat.png" alt />
          <img v-else src="@/assets/img/order/pg_pay_yue.png" alt />
          <span>支付成功</span>
        </div>
        <div class="pgpc_money">
          <span>￥</span>
          {{price}}
        </div>
        <div class="pgpc_btn">
          <div class="pgpc_btn1" @click="$router.replace('/myorder/0')">查看详情</div>
          <div class="pgpc_btn2" @click="$router.push('/index')">回到首页</div>
        </div>
        <div class="pgpc_tips">温馨提示：一切冒充我平台工作人员的第三方皆为诈骗，如遇到问题，请致电0551-65156891。</div>
      </div>
      <!-- 弹窗 01-->
      <van-actionsheet v-model="showId" :close-on-click-overlay="false" class="params_pop">
        <div class="id_h">
          身份信息
          <router-link :to="{path:`/editorconfig`}">添加</router-link>
        </div>
        <ul>
          <li></li>
        </ul>
        <van-radio-group v-model="radio" class="id_ul">
          <van-cell-group class="id_li" v-for="(v,i) in idList" :key="i">
            <van-cell :title="`姓名:${v.cardName}`" clickable @click="chooseId(v.id)">
              <van-radio :name="v.id" />
            </van-cell>
            <van-cell title="身份证号码:" :value="v.cardId"></van-cell>
          </van-cell-group>
          <div class="getMore" @click="getUserCardPage" v-if="getMore">点击加载更多</div>
          <div class="getMore" v-else>已加载全部</div>
        </van-radio-group>
        <div class="params_comfirm" @click="paramsComfirm">确认</div>
      </van-actionsheet>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Actionsheet, Cell, CellGroup, RadioGroup, Radio } from "vant";
import { selectUserCardPage, fillUpOrderIdentity } from "@/api/order.js";
export default {
  name: "PaySuccess",
  data() {
    return {
      title: "支付成功",
      price: 0,
      payType: 0,
      needID: 0,
      showId: false,
      radio: null,
      curPage: 1,
      idList: [],
      getMore: true,
      orderId: null,
      addressId: null
    };
  },
  components: {
    HeadFoot,
    [Actionsheet.name]: Actionsheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  watch: {
    needID: {
      handler: function(nv) {
        if (Number(nv) === 2) {
          this.showPop();
        }
      },
      immediate: true
    },
    idList(nv) {
      if (nv.length > 0) {
        this.radio = nv[0].id;
      }
    }
  },
  methods: {
    showPop() {
      this.showId = true;
      this.getUserCardPage();
    },
    //确定
    paramsComfirm() {
      this.showId = false;
      let _data = {
        addressId: this.addressId,
        cardId: this.radio,
        orderId: this.orderId
      };
      fillUpOrderIdentity(_data).then(({ data }) => {
        this.$toast(data.msg);
      });
    },
    //选定
    chooseId(val) {
      this.radio = val;
    },
    //
    getUserCardPage() {
      this.getMore = false;
      selectUserCardPage({ page: this.curPage }).then(({ data }) => {
        let list = data.data.page.dataList;
        [...this.idList] = [...this.idList, ...data.data.page.dataList];
        if (list.length !== 10) {
          this.getMore = false;
        } else {
          this.getMore = true;
          this.curPage = this.curPage + 1;
        }
      });
    }
  },
  mounted() {
    this.price = this.$route.params.price;
    this.payType = this.$route.params.payType;
    this.needID = this.$route.params.needID;
    this.orderId = this.$route.query.orderId;
    this.addressId = this.$route.query.addressId;
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_paysuccess {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 46px;
  .pgp_content {
    margin-top: 7px;
    padding: 17px 20px;
    width: 100vw;
    box-sizing: border-box;
    background: #fff;
    .pgpc_title {
      text-align: center;
      font-size: 19px;
      color: #000;
      margin-top: 10px;
      img {
        width: 25px;
        height: 25px;
      }
      span {
        position: relative;
        top: 3px;
        margin-left: 16px;
      }
    }
    .pgpc_money {
      padding: 20px 0 39px 0;
      font-size: 21px;
      color: #000;
      text-align: center;
      font-weight: bold;
      span {
        font-size: 14px;
      }
    }
    .pgpc_btn {
      text-align: center;
      .pgpc_btn1 {
        display: inline-block;
        width: 90px;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        text-align: center;
        line-height: 30px;
        color: #999;
        border-radius: 15px;
        margin-right: 40px;
      }
      .pgpc_btn2 {
        @include btn(90px, 30px);
      }
    }
    .pgpc_tips {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
      line-height: 16px;
    }
  }
}
.params_pop {
  background: #f4f4f4;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.id_h {
  text-align: center;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: 10px;
  a {
    float: right;
    color: $Color;
    padding-right: 10px;
  }
}
.id_ul {
  width: 100%;
  max-height: 50vh;
  overflow-y: scroll;
  box-sizing: border-box;
  .id_li {
    width: 90%;
    margin-left: 5%;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
.getMore {
  text-align: center;
  color: $Color;
  padding: 5px 0;
}
.params_comfirm {
  @include btn(100%, 40px);
  margin: 10px 0;
}
</style>