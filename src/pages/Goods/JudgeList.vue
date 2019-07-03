<template>
  <HeadFoot class="pg_judgelist" :Title="title">
    <template #content>
      <div class="judge" v-if="commentAllNum>0">
        <div class="head">商品评价（{{commentAllNum}}）</div>
        <van-radio-group v-model="chooseVal" class="judge_ul" @change="changeVal">
          <van-radio class="judge_li" name="xie">
            <div
              slot="icon"
              slot-scope="props"
              :class="['radio',props.checked ? 'active' : 'normal']"
            >{{`${commentNum[0].name}(${commentNum[0].value})`}}</div>
          </van-radio>
          <van-radio class="judge_li" v-for="(v,i) in delCommentNum" :key="i" :name="v.parameter">
            <div
              slot="icon"
              slot-scope="props"
              :class="['radio',props.checked ? 'active' : 'normal']"
            >{{v.name}}{{v.value===""||v.value===null?"":`(${v.value})`}}</div>
          </van-radio>
        </van-radio-group>

        <!-- list -->
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            :finished-text="judgeList.length===0?'':'没有更多了'"
            :immediate-check="false"
          >
            <ul class="judge_list">
              <li
                class="judge_list_li"
                v-for="(v,i) in judgeList"
                :key="i"
                @click="judgeDetail(v.id)"
              >
                <div class="user_info">
                  <img class="user_info_img" :src="v.createUserImage" alt />
                  <span>{{v.createUserName}}</span>
                  <van-rate v-model="v.goodsStar" :size="14" readonly class="myRate" />
                  <p class="fr">{{v.createDateLabel}}</p>
                </div>
                <div class="content">
                  <p>{{v.goodsComment}}</p>
                  <p style="color:#9b9b9b">{{v.skuParameter}}</p>
                  <div class="contentIMG">
                    <img v-for="(val,ind) in v.commentImgList " :key="ind" :src="val" alt />
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
        <div v-if="judgeList.length === 0" class="noData">
          <img src="@/assets/img/ly_nodata.png" alt />
        </div>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import { Rate, Radio, RadioGroup, List, PullRefresh } from "vant";
import { selectCommentNum, selectCommentPage } from "@/api/goods.js";
export default {
  name: "JudgeList",
  data() {
    return {
      title: "商品评价",
      goodsId: null,
      commentAllNum: 0,
      commentNum: [],
      chooseVal: "xie",
      judgeList: [],
      curPage: 1,
      isRefresh: false,
      loading: false,
      finished: false,
      noLimit: true
    };
  },
  components: {
    HeadFoot,
    [Rate.name]: Rate,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  computed: {
    delCommentNum() {
      if (this.commentNum.length > 0) {
        return this.commentNum.filter(v => v.parameter !== null);
      } else {
        return [];
      }
    }
  },
  methods: {
    judgeDetail(val) {
      this.$router.push(`/judgedetail/${val}`);
    },
    changeVal(val) {
      if (val === "xie") {
        this.onInit();
      } else {
        let _data = {};
        _data[`${val}`] = 1;
        this.onInit(false, true, _data);
      }
    },
    //获取参数
    getNum() {
      selectCommentNum({ goodsId: this.goodsId }).then(({ data }) => {
        this.commentNum = data.data.dataList;
        this.commentAllNum = data.data.dataList[0].value;
      });
    },
    //获取评价列表
    onRefresh() {
      this.onInit(true);
    },
    onLoad() {
      this.onInit(false, false);
    },
    onInit(reFresh = false, isInit = true, isData = {}) {
      if (isInit) {
        this.curPage = 1;
        this.finished = false;
      }
      let _data = {
        page: this.curPage,
        goodsId: this.goodsId
      };
      if (this.noLimit) {
        this.noLimit = false;
        Object.assign(_data, isData);
        selectCommentPage(_data).then(({ data }) => {
          this.loading = false; //list 加载动画
          this.noLimit = true;
          let getList = data.data.page.dataList;
          //赋值
          if (isInit) {
            this.judgeList = getList;
            if (getList.length === 0) {
              this.finished = true;
            } else {
              this.curPage = this.curPage + 1;
            }
          } else {
            [...this.judgeList] = [...this.judgeList, ...getList];
            if (getList.length === 0) {
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
    this.goodsId = this.$route.params.goodsId;
    this.getNum();
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_judgelist {
  .judge {
    padding: 56px 15px 15px 15px;
    background: #fff;
    box-sizing: border-box;
    min-height: 100vh;
    .head {
      padding-left: 14px;
      border-left: 2px solid $Color;
    }
    .judge_ul {
      overflow: hidden;
      padding-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
    }
    .judge_li {
      margin-top: 10px;
      margin-right: 10px;
      float: left;
      font-size: 11px;
      box-sizing: border-box;

      & /deep/ .van-radio__icon {
        height: auto;
      }
      .radio {
        color: #666;
        background-color: #fff0f5;
        border-radius: 13px;
        padding: 2px 10px;
        border: 1px solid #fff0f5;
        &.active {
          border: 1px solid $Color;
          color: $Color;
        }
      }
    }
    .judge_list_li {
      padding: 12px 0 15px 0;
      border-bottom: 1px solid #eeeeee;
      .user_info {
        overflow: hidden;
        font-size: 12px;
        color: #999;
        height: 25px;
        line-height: 25px;
        .myRate {
          display: inline-block;
          position: relative;
          top: 2px;
        }
      }
      .user_info_img {
        width: 25px;
        height: 25px;
        border-radius: 13px;
      }
      .content {
        margin-top: 12px;
        font-size: 12px;
        line-height: 20px;
        .contentIMG {
          width: 100%;
          img {
            width: 80px;
            height: 80px;
            margin: 5px 10px 5px 0px;
          }
        }
      }
      .img_wrap {
        margin-top: 5px;
        img {
          width: 75px;
          height: 75px;
          margin: 0 5px;
        }
      }
      span {
        font-size: 13px;
        color: #333;
        margin: 0 13px;
        position: relative;
        top: 1px;
      }
    }
    .judge_foot {
      padding-top: 15px;
      text-align: center;
      .judge_btn {
        padding: 8px 12px;
        border-radius: 5px;
        border: solid 1px $Color;
        display: inline-block;
        color: $Color;
        font-size: 12px;
      }
    }
  }
}
</style>