<template>
  <div class="pg_CustomerManage pg_SalerManege">
    <div class="pg_h_nav">
      <van-icon name="arrow-left" @click="GoBack()" />
      <span>{{title}}</span>
      <!-- 添加店长图片 -->
      <!-- <img class="fr" src="@/assets/img/distribution/pg_customermanage_add.png" alt /> -->
    </div>
    <div class="head_bg"></div>
    <!-- content -->
    <div class="pg_model_content">
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" class="isFresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :finished-text="dataList.length===0?'':'没有更多了'"
          :immediate-check="false"
        >
          <div
            class="list_li"
            v-for="(v,i) in dataList"
            :key="i"
            @click="turnPage(v.id,v.distributorType,v.orderQuantity,v.rental)"
          >
            <div class="list_li_l">
              <div class="user_icon" :style="{backgroundImage:'url('+v.userImages+')'}">
                <div
                  class="user_icon_dailog"
                  v-if="v.distributorTypeLabel!==undefined"
                >{{v.distributorTypeLabel}}</div>
              </div>
              <p class="user_name ellipsis-line">{{v.nickName}}</p>
              <p class="user_time ellipsis-line">创建时间:{{v.createDateLabel}}</p>
            </div>
            <div class="list_li_r">
              <div class="saler_title">累计销售额</div>
              <div class="saler_money">
                {{v.rental}}
                <em>元</em>
              </div>
              <div class="oder_title">累计订单</div>
              <div class="oder_num">
                {{v.orderQuantity}}
                <em>笔</em>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Icon, List, PullRefresh } from "vant";
import { notNull } from "@/layout/methods.js";
import { selectDistributorBindUser } from "@/api/distribute.js";
export default {
  name: "CustomerManage",
  data() {
    return {
      title: "客户管理",
      distributorId: null,
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  components: {
    [Icon.name]: Icon,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  methods: {
    ...mapActions(["ChangeStatus"]),
    turnPage(val, type, num, money) {
      this.$router.push({
        path: `/distributeorderdetail/${val}`,
        query: { type: type, num: num, money: money }
      });
    },
    GoBack() {
      this.$router.back(-1);
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
        distributorId: this.distributorId
      };
      if (this.noLimit) {
        this.noLimit = false;
        selectDistributorBindUser(_data).then(({ data }) => {
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
    this.ChangeStatus(false);
    if (notNull(this.$route.query.distributorId)) {
      this.distributorId = this.$route.query.distributorId;
    }
    this.onInit();
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_SalerManege {
  position: relative;
  width: 100vw;
  .head_bg {
    width: 100vw;
    height: 125px;
    background: url("~@/assets/img/distribution/ly_distribute_bg.png");
    @include myBG;
    position: fixed;
    top: 0;
    left: 0;
  }
}
.pg_h_nav {
  position: fixed;
  height: 46px;
  line-height: 46px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  font-size: 16px;
  color: #f4f4f4;
  background: url("~@/assets/img/distribution/ly_distribute_bg.png");
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 999;
  img {
    width: 20px;
    height: 17px;
    top: 16px;
    right: 15px;
    position: relative;
  }
  & /deep/ .van-icon {
    float: left;
    top: 16px;
    left: 15px;
  }
}
.pg_model_content {
  width: 100vw;
  position: absolute;
  height: 100vh;
  box-sizing: border-box;
  .isFresh {
    min-height: 100%;
    overflow-y: scroll;
  }
}
.pg_SalerManege {
  .pg_model_content {
    padding-top: 56px;
  }
  .list_li {
    width: 99%;
    height: 163px;
    margin: 0 auto;
    background: url("~@/assets/img/distribution/mod_manage_panel.png");
    @include myBG;
    display: flex;
    .list_li_l {
      // flex: 1;
      width: 50%;
      display: inline-block;
      text-align: center;
      .user_icon {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: #efefef;
        margin-top: 23px;
        display: inline-block;
        position: relative;
        @include myBG;
        .user_icon_dailog {
          font-size: 9px;
          height: 15px;
          line-height: 15px;
          width: 52px;
          color: #fff;
          background: url("~@/assets/img/distribution/mod_mange_dailog.png");
          @include myBG;
          position: absolute;
          right: -58px;
          padding-left: 2px;
          box-sizing: border-box;
        }
      }
      .user_name {
        margin: 18px 16px;
        font-size: 12px;
      }
      .user_time {
        font-size: 11px;
        width: 100%;
      }
    }
    .list_li_r {
      flex: 1;
      padding-left: 35px;
      box-sizing: border-box;
      font-size: 12px;
      .saler_title {
        margin-top: 23px;
      }
      .saler_money {
        font-size: 16px;
        font-weight: bold;
        margin: 15px 0 28px;
        em {
          font-size: 12px;
        }
      }
      .oder_num {
        font-size: 16px;
        font-weight: bold;
        margin-top: 15px;
        em {
          font-size: 12px;
        }
      }
    }
  }
}
</style>