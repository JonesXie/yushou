<template>
  <ul class="mod_DorderList">
    <!-- list -->
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="isfresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :finished-text="dataList.length===0?'':finshTxt"
        :immediate-check="false"
      >
        <li class="mdl_li" v-for="(v,i) in dataList" :key="i" @click="turnPage(v.id)">
          <div class="mdl_li_h">
            <p class="fl">订单编号：{{v.orderNo}}</p>
            <p class="fr">{{v.createtime}}</p>
          </div>
          <div class="mdl_l_c van-hairline--bottom">
            <div class="mdl_l_c_img" :style="{backgroundImage:'url('+v.goodsImages+')'}"></div>
            <div class="mdl_l_c_info">
              <div class="title">
                <div class="fl ellipsis-three">{{v.goodsName}}</div>
                <div class="fr">￥{{v.goodsSalePrice}}.0</div>
              </div>
              <div class="type">
                <div class="fl">{{v.skuParameter}}</div>
                <div class="fr">×{{v.goodsBuyNum}}</div>
              </div>
            </div>
          </div>
          <div class="mdl_l_f">
            <div class="money">
              合计：
              <em>{{v.goodsSalePrice}}.0</em>元
            </div>
            <div class="cut">
              <div
                v-if="isOnline"
                class="profit"
              >利润比例：{{100 - Number(v.scale)}}%&nbsp;&nbsp;&nbsp;&nbsp;{{v.mainIncome}}元</div>
              <div class="rental">佣金比例：{{Number(v.scale)}}%&nbsp;&nbsp;&nbsp;&nbsp;{{v.income}}元</div>
            </div>
          </div>
        </li>
      </van-list>
    </van-pull-refresh>
    <div v-if="dataList.length === 0" class="noData">
      <img src="@/assets/img/ly_nodata.png" alt />
    </div>
  </ul>
</template>

<script>
import { List, PullRefresh } from "vant";
import { selectDistributorOrder } from "@/api/distribute.js";
export default {
  name: "DorderList",
  props: {
    actived: {
      default: 0
    },
    isSearch: {
      default: null
    },
    status: {
      default: null
    },
    userId: {
      default: null
    }
  },
  data() {
    return {
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      finshTxt: "没有更多了",
      noLimit: true
    };
  },
  components: { [List.name]: List, [PullRefresh.name]: PullRefresh },
  computed: {
    type() {
      if (this.actived == 0) {
        return null;
      } else if (this.actived == 1) {
        return 2;
      } else {
        return 1;
      }
    },
    isOnline() {
      if (sessionStorage.getItem("onOroff")) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    actived: {
      handler: function() {
        this.onInit();
      },
      immediate: true
    },
    isSearch: {
      handler: function() {
        this.onInit();
      },
      immediate: true
    },
    status: {
      handler: function() {
        this.onInit();
      },
      immediate: true
    }
  },
  methods: {
    turnPage(id) {
      this.$router.push({ path: `/orderdetail/${id}` });
    },
    onRefresh() {
      this.onInit(true);
    },
    onLoad() {
      this.onInit(false, false);
    },
    onInit(reFresh = false, isInit = true) {
      if (isInit) {
        this.curPage = 1;
        this.finished = false;
      }
      let _data = {
        page: this.curPage,
        searchString: this.isSearch,
        type: this.isSearch === null ? this.type : null,
        userId: this.userId,
        status: this.status
      };
      if (this.noLimit) {
        this.noLimit = false;
        selectDistributorOrder(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data.page.dataList;
          //赋值
          if (isInit) {
            this.dataList = getList;
            if (getList.length < 10) {
              this.finished = true;
            } else {
              this.curPage = this.curPage + 1;
            }
          } else {
            [...this.dataList] = [...this.dataList, ...getList];
            if (getList.length < 10) {
              this.finished = true;
            } else {
              this.curPage = this.curPage + 1;
            }
          }
          if (reFresh) {
            this.$toast("刷新成功");
            this.isRefresh = false;
          }
        });
      }
    }
  },
  mounted() {
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.mod_DorderList {
  width: 100vw;
  .isfresh {
    height: 100%;
    overflow-y: scroll;
  }
  .mdl_li {
    width: 99%;
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
        background-color: #f4f4f4;
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
        .profit {
          margin-top: 15px;
          & ~ .rental {
            margin-top: 15px;
          }
        }
        .rental {
          margin-top: 28px;
        }
      }
    }
  }
}

.noData {
  width: 100%;
  // height: calc(100vh - 120px);
  text-align: center;
  position: absolute;
  top: 120px;
  img {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 50%;
    display: inline-block;
    width: 150px;
  }
}
</style>