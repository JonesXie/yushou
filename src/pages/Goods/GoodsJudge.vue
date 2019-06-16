<template>
  <div class="pg_goodsjudge">
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
      <ul class="judge_list">
        <li class="judge_list_li" v-for="(v,i) in judgeList" :key="i" @click="judgeDetail(v.id)">
          <div class="user_info">
            <img class="user_info_img" :src="v.createUserImage" alt>
            <span>{{v.createUserName}}</span>
            <van-rate v-model="v.goodsStar" :size="14" readonly class="myRate"/>
            <p class="fr">{{v.createDateLabel}}</p>
          </div>
          <div class="content">
            <p>{{v.goodsComment}}</p>
            <div class="contentIMG">
              <img v-for="(val,ind) in v.commentImgList " :key="ind" :src="val" alt>
            </div>
          </div>
        </li>
        <div v-if="judgeList.length === 0" class="noData">暂无数据</div>
      </ul>
      <div class="judge_foot">
        <div class="judge_btn" @click="LookAll()">查看全部评论</div>
      </div>
    </div>
    <div class="judge" v-else>
      <div class="head">暂无商品评价</div>
    </div>
  </div>
</template>

<script>
import { Rate, Radio, RadioGroup } from "vant";
import { notNull } from "@/layout/methods.js";
import { selectCommentPage } from "@/api/goods.js";
export default {
  name: "GoodsJudge",
  props: ["commentAllNum", "commentNum", "commentPageInfo", "goodsId"],
  data() {
    return {
      myrate: 4,
      chooseVal: "xie",
      originData: this.commentPageInfo.dataList
    };
  },
  components: {
    [Rate.name]: Rate,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup
  },
  computed: {
    delCommentNum() {
      let delData = this.commentNum.filter(v => v.parameter !== null);
      return delData;
    },
    judgeList() {
      if (notNull(this.originData)) {
        return this.originData;
      } else {
        return [];
      }
    }
  },
  methods: {
    LookAll() {
      this.$router.push(`/judgelist/${this.goodsId}`);
    },
    judgeDetail(val) {
      this.$router.push(`/judgedetail/${val}`);
    },
    changeVal(val) {
      if (val === "xie") {
        this.onInit();
      } else {
        let _data = {};
        _data[`${val}`] = 1;
        this.onInit(true, _data);
      }
    },
    onInit(isInit = true, isData = {}) {
      let _data = {
        goodsId: this.goodsId
      };
      Object.assign(_data, isData);
      selectCommentPage(_data).then(({ data }) => {
        this.loading = false; //list 加载动画
        let getList = data.data.page.dataList;
        //赋值
        if (isInit) {
          this.originData = getList;
          this.curPage = this.curPage + 1;
        } else {
          [...this.originData] = [...this.originData, ...getList];
          if (getList.length === 0) {
            this.finished = true;
          } else {
            this.curPage = this.curPage + 1;
          }
        }
      });
    }
  },
  mounted() {
    this.onInit();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_goodsjudge {
  .judge {
    margin-top: 10px;
    padding: 15px;
    background: #fff;
    box-sizing: border-box;
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
    .judge_list {
      width: 100%;
      box-sizing: border-box;
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
.noData {
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
</style>