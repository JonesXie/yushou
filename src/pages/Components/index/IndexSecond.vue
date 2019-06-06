<template>
  <div class="index_second fisrt_list" ref="second_pg">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-radio-group v-model="chooseId" class="is_ul" @change="changeId">
        <van-radio class="is_li" v-for="(v,i) in isCode" :key="i" :name="v.codeNo">
          <span slot="icon" slot-scope="props" :class="props.checked ? 'active' : ''">{{v.codeName}}</span>
        </van-radio>
      </van-radio-group>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <ul class="fl_ul">
          <li class="van-hairline--bottom fl_li" v-for="(v,i) in listData" :key="i">
            <img :src="v.goodsImages" alt>
            <div class="fl_li_r">
              <p class="fl_li_rP1">{{v.goodsName}}</p>
              <p class="fl_li_rP2">
                <span>正品</span>
                <span>包邮</span>
              </p>
              <p class="fl_li_rP3">
                ￥
                <span>{{v.goodsSalePrice}}</span>.00
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
import { findAllGoods} from "@/api/index.js";
import { List, PullRefresh, RadioGroup, Radio } from "vant";
export default {
  name: "IndexSecond",
  props: ["isType", "isCode"],
  data() {
    return {
      listData: [],
      loading: false,
      finished: false,
      isLoading: false,
      radio: "2",
      chooseId: this.isCode[0].codeNo,
      curPage: 1
    };
  },
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.onInit();
    },
    onRefresh() {
      this.curPage = 1;
      this.onInit(true,true);
    },
    changeId(val) {
      this.curPage = 1;
      this.onInit(false,true);
    },
    onInit(val=false, isInit=false) {
      let _data = {
        codeId: this.isType,
        brandId: this.chooseId,
        page: this.curPage
      };
      console.log(_data)
      findAllGoods(_data).then(({ data }) => {
        if (val) {
          this.$toast("刷新成功");
          this.isLoading = false;
        }
        this.loading = false;
        if (data.data.length > 0) {
          if (isInit) {
            this.listData = data.data
          } else {
            [...this.listData] = [...this.listData, ...data.data];
            this.curPage = this.curPage + 1;
          }
        } else {
          this.finished = true;
        }
      });
    }
  },
  mounted() {
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
}
.index_second {
  .is_ul {
    height: 40px;
    overflow-x: scroll;
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