<template>
  <HeadFoot class="pg_TheCheck" :Title="title" :backPath="backPath">
    <template #content>
      <!-- list -->
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :finished-text="dataList.length===0?'':'没有更多了'"
          :immediate-check="false"
        >
          <ul class="pgtc_ul">
            <li class="pgtc_li" v-for="(v,i) in dataList" :key="i">
              <div class="user_icon" :style="{backgroudImage:'url('+v+')'}"></div>
              <div class="user_name ellipsis-line">18256097403</div>
              <div class="user_agree" @click="yes(v.id)">同意</div>
              <div class="user_reject" @click="no(v.id)">拒绝</div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
      <div v-if="dataList.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt />
      </div>
      <van-popup v-model="ratePop" class="tips_wrap">
        <div class="tips_h">拒绝的理由</div>
        <div class="tips_c">
          <input type="text" v-model="reRate" />
        </div>
        <div class="tips_btn">
          <div class="tips_btn1" @click="confirmRate">确认</div>
        </div>
      </van-popup>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { List, PullRefresh, Popup } from "vant";
import {
  selectUserDistributorApply,
  rejectUserDistributorApply,
  saveDistributor
} from "@/api/distribute.js";
import { notNull } from "@/layout/methods.js";
import { setTimeout } from "timers";
export default {
  name: "TheCheck",
  data() {
    return {
      title: "店长审核",
      backPath: "", //返回路由，可删除
      dataList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true,
      ratePop: false,
      reRate: null,
      id: null
    };
  },
  components: {
    HeadFoot,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Popup.name]: Popup
  },
  methods: {
    yes(val) {
      let _data = {
        applyId: val
      };
      saveDistributor(_data).then(({ data }) => {
        this.$toast(data.msg);
        if (data.code === 1) {
          let That = this;
          setTimeout(() => {
            That.onInit();
          }, 3000);
        }
      });
    },
    no(val) {
      this.ratePop = true;
      this.id = val;
    },
    confirmRate() {
      if (notNull(this.reRate)) {
        this.ratePop = false;
        this.reFuse();
      } else {
        this.$toast("请输入拒绝理由");
      }
    },
    reFuse() {
      let _data = {
        id: this.id,
        remake: this.reRate
      };
      rejectUserDistributorApply(_data).then(({ data }) => {
        this.$toast(data.msg);
        if (data.msg === "拒绝成功") {
          let That = this;
          setTimeout(() => {
            That.onInit();
          }, 3000);
        }
      });
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
        page: this.curPage
      };
      if (this.noLimit) {
        this.noLimit = false;
        selectUserDistributorApply(_data).then(({ data }) => {
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
.tips_wrap {
  width: 310px;
  height: 190px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 38px 35px 0 35px;
  .tips_h {
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .tips_c {
    width: 100%;
    border: 1px solid #999;
    height: 33px;
    box-sizing: border-box;
    margin: 36px 0 24px;
    input {
      width: 90%;
      height: 100%;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }
  .tips_btn {
    width: 100%;
    text-align: center;
    .tips_btn1 {
      display: inline-block;
      width: 70px;
      height: 26px;
      line-height: 26px;
      background: $Color;
      color: #fff;
      font-size: 15px;
      border-radius: 5px;
    }
  }
}
</style>