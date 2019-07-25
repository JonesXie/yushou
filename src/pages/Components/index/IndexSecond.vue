<template>
  <div class="index_second fisrt_list" ref="second_pg">
    <van-radio-group v-model="chooseId" class="is_ul" @change="changeId">
      <van-radio class="is_li" :name="isType">
        <span slot="icon" slot-scope="props" :class="props.checked ? 'active' : ''">推荐</span>
      </van-radio>
      <van-radio class="is_li" v-for="(v,i) in isCode" :key="i" :name="v.id">
        <span slot="icon" slot-scope="props" :class="props.checked ? 'active' : ''">{{v.codeName}}</span>
      </van-radio>
    </van-radio-group>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
        :immediate-check="false"
        class="vantList"
      >
        <ul class="fl_ul">
          <li
            class="van-hairline--bottom fl_li"
            v-for="(v,i) in dataList"
            :key="i"
            @click="turnPage(v.goodsId)"
          >
            <img :src="v.goodsImages" alt />
            <div class="fl_li_r">
              <p class="fl_li_rP1">{{v.goodsName}}</p>
              <p class="fl_li_rP2">
                <span>正品</span>
                <span>包邮</span>
              </p>
              <p class="fl_li_rP3">
                ￥
                <span>{{v.goodsSalePrice}}</span>
              </p>
              <p class="fl_li_rP4">{{v.goodsWaitDays}}天后发货</p>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { findAllGoods } from "@/api/index.js";
import { List, PullRefresh, RadioGroup, Radio } from "vant";
export default {
  name: "IndexSecond",
  props: ["isType", "isCode"],
  data() {
    return {
      radio: "2",
      chooseId: this.isType,
      curPage: 1,
      dataList: [],
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  watch: {
    isType: {
      handler: function(nv) {
        this.chooseId = nv;
        // this.onLoad();
      }
    }
  },
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  methods: {
    turnPage(val) {
      this.$router.push(`/goods/${val}`);
    },
    //二级分类变化
    changeId() {
      this.onInit();
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
        pageSize: 10,
        goodsName: null,
        minimumPrice: null,
        createtime: null,
        goodsSaleStarttime: null,
        activityId: null,
        priceSort: 0,
        goodsQuantitySort: 0,
        codeId: this.chooseId,
        brandId: null
      };
      if (this.noLimit) {
        this.noLimit = false;
        findAllGoods(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data;
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
    this.$nextTick(() => {
      this.$refs.second_pg.scrollTo(0, 0);
    });
  }
};
</script>

<style scoped lang='scss'>
/* @import url(); */
.fisrt_list {
  .fl_ul {
    background: #fff;
    .fl_li {
      padding: 10px 0px;
      height: 140px;
      box-sizing: border-box;
      display: flex;
      img {
        width: 120px;
        height: 120px;
        margin-left: 10px;
      }
      .fl_li_r {
        display: inline-block;
        width: 224px;
        margin-left: 15px;
        height: 120px;
        box-sizing: border-box;

        .fl_li_rP1 {
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
        .fl_li_rP2 {
          font-size: 9px;
          margin: 11px 0 13px;
          span:first-child {
            display: inline-block;
            padding: 3px 4px;
            text-align: center;
            color: #fff;
            background: #ed78b5;
            margin-right: 5px;
          }
          span:last-child {
            display: inline-block;
            padding: 2px 3px;
            text-align: center;
            color: #ed78b5;
            border: 1px solid #ed78b5;
          }
        }
        .fl_li_rP3 {
          font-size: 12px;
          color: #ea047b;
          span {
            font-weight: bold;
            font-size: 16px;
          }
        }
        .fl_li_rP4 {
          font-size: 10px;
          color: #999;
          margin-top: 12px;
        }
      }
    }
  }
  .vantList {
    width: 100vw;
    overflow: hidden;
    padding-bottom: 50px;
  }
}
.index_second {
  .is_ul {
    overflow-x: scroll;
    overflow-y: hidden;
    word-break: keep-all;
    white-space: nowrap;
    .is_li {
      display: inline-block;
      font-size: 12px;
      color: #ea047b;
      height: 21px;
      margin: 9px 0 9px 15px;
    }
    span {
      display: inline-block;
      padding: 0 10px;
      line-height: 19px;
      height: 19px;
      border: 1px solid #ea047b;
      text-align: center;
      border-radius: (19px/2);
    }
    .active {
      background: #ea047b;
      color: #fff;
      // border: none;
    }
  }
}
</style>