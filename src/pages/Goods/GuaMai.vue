<template>
  <div class="pg_guamai">
    <van-tabs
      v-model="active"
      :line-height="0"
      title-active-color="#ea041f"
      color="#ea041f"
      title-inactive-color="#666"
      :ellipsis="false"
      class="pggm_head"
      @change="indexChange"
    >
      <van-tab>
        <div slot="title" @click="priceRange" class="price">
          价格
          <img v-if="priceActive === 1" src="@/assets/img/goods/pg_guamai_up.png" alt />
          <img v-else-if="priceActive === 2" src="@/assets/img/goods/pg_guamai_down.png" alt />
          <img v-else src="@/assets/img/goods/pg_guamai_default.png" alt />
        </div>
      </van-tab>
      <van-tab>
        <div slot="title" @click="dayRange" class="days price">
          天数
          <img v-if="dayActive === 1" src="@/assets/img/goods/pg_guamai_up.png" alt />
          <img v-else-if="dayActive === 2" src="@/assets/img/goods/pg_guamai_down.png" alt />
          <img v-else src="@/assets/img/goods/pg_guamai_default.png" alt />
        </div>
      </van-tab>
      <van-tab>
        <div slot="title" class="others" @click="filterShow">
          筛选
          <img src="@/assets/img/goods/pg_guamai_add.png" alt />
        </div>
      </van-tab>
    </van-tabs>
    <sale-list :goodsId="goodsId" :getParams="getParams"></sale-list>
    <van-popup v-model="show" position="right">
      <div class="pop_wrap">
        <!-- 参数 -->
        <div class="params_type" v-for="(v,i) in filterList" :key="i">
          <div class="pt_head">{{v.name}}</div>
          <van-radio-group v-model="chooseParams[i]" class="pt_content">
            <van-radio
              class="ptc_li"
              v-for="(val,ind) in v.ymParameterVOS"
              :key="ind"
              :name="val.name"
            >
              <div
                slot="icon"
                slot-scope="props"
                :class="['ptc_li_item',props.checked ? 'active' : 'normal']"
              >{{val.name}}</div>
            </van-radio>
          </van-radio-group>
          <div class="pop_bottom">
            <div class="pop_bottom_l" @click="paramsReset">重置</div>
            <div class="pop_bottom_r" @click="paramsConfirm">确定</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Tab, Tabs, Popup, Radio, RadioGroup } from "vant";
import SaleList from "@/pages/Components/goods/SaleList.vue";
import { findGoodsDetail } from "@/api/goods.js";
import { notNull } from "@/layout/methods.js";
export default {
  name: "GuaMai",
  props: ["goodsId"],
  data() {
    return {
      active: 0,
      priceActive: 1,
      dayActive: 0,
      otherData: {},
      img: require("@/assets/img/goods/pg_goodstype_goods.png"),
      show: false,
      getParams: {
        goodsId: this.goodsId,
        priceSort: "asc", //价格
        waitDaySort: null, //天数
        parameterStr: null //参数
      },
      filterList: [],
      chooseParams: []
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    SaleList
  },
  computed: {
    stickTop: function() {
      return this.$store.state.stickTop;
    }
  },
  watch: {
    priceActive: {
      handler: function(nv) {
        if (nv !== 0) {
          let _data = {
            priceSort: nv === 1 ? "asc" : "desc",
            waitDaySort: null
          };
          Object.assign(this.getParams, _data);
        }
      }
    },
    dayActive: {
      handler: function(nv) {
        if (nv !== 0) {
          let _data = {
            priceSort: null,
            waitDaySort: nv === 1 ? "asc" : "desc"
          };
          Object.assign(this.getParams, _data);
        }
      }
    }
  },
  methods: {
    indexChange(index) {
      if (index === 0) {
        this.priceActive = 1;
        this.dayActive = 0;
      } else if (index === 1) {
        this.dayActive = 1;
        this.priceActive = 0;
      } else {
        this.dayActive = 0;
        this.priceActive = 0;
      }
    },
    priceRange() {
      if (this.active === 0) {
        switch (this.priceActive) {
          case 1:
            this.priceActive = 2;
            break;
          default:
            this.priceActive = 1;
        }
      }
    },
    dayRange() {
      if (this.active === 1) {
        switch (this.dayActive) {
          case 1:
            this.dayActive = 2;
            break;
          default:
            this.dayActive = 1;
        }
      }
    },
    //筛选
    filterShow() {
      findGoodsDetail({
        goodsId: this.goodsId,
        distributorId: sessionStorage.getItem("distributorId")
      }).then(({ data }) => {
        if (data.code === 1) {
          this.filterList = data.data.parameterNameVOS;
          this.show = true;
        }
      });
    },
    paramsReset() {
      this.chooseParams = [];
    },
    paramsConfirm() {
      if (this.chooseParams.length > 0) {
        let _Arr = this.chooseParams.filter(v => {
          if (notNull(v)) {
            return true;
          }
        });
        let _data = {
          parameterStr: _Arr.join(","),
          priceSort: null, //价格
          waitDaySort: null //天数
        };
        Object.assign(this.getParams, _data);
        this.show = false;
      } else {
        this.$toast("请至少选择一项");
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_guamai {
  .pggm_head {
    & /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
    }
    .price {
      img {
        width: 7px;
        height: 11px;
      }
    }
    .others {
      img {
        width: 9px;
        height: 10px;
      }
    }
  }
  .pggm_content {
    height: 100vh;
  }
}
.pop_wrap {
  width: 60vw;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 30px;
  position: relative;
}
.pop_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  display: flex;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
  .pop_bottom_l {
    flex: 1;
  }
  .pop_bottom_r {
    flex: 1;
    background: $Color;
    color: #fff;
  }
}
.params_type {
  // margin-top: 30px;
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  .pt_head {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
  }
  .ptc_li {
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 10px;
    & /deep/ .van-radio__icon {
      height: auto;
    }
  }
  .ptc_li_item {
    border-radius: 3px;
    box-sizing: border-box;
    padding: 5px 14px;
    font-size: 12px;
    box-sizing: border-box;
    &.active {
      color: #fff;
      background-color: $Color;
    }
    &.normal {
      color: #333;
      background-color: #f5f5f5;
    }
  }
}
</style>