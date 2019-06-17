<template>
  <HeadFoot class="pg_judgedetail" :Title="title">
    <template #content>
      <div class="pgjd_main" v-if="mainData">
        <div class="main_h">
          <img class="mh_l" :src="mainData.createUserImage">
          <div class="mh_c">
            <p class="name">{{mainData.createUserName}}</p>
            <p class="time">{{mainData.createDateLabel}}</p>
          </div>
          <div class="mh_r" @click="mainZan">
            <em>{{mainData.zan}}</em>
            <img v-if="mainData.doZan" src="@/assets/img/ly_zaned.png" alt>
            <img v-else src="@/assets/img/ly_zan.png" alt>
          </div>
        </div>
        <div class="main_f">
          <p class="mf_c">{{mainData.goodsComment}}</p>
          <img class="mf_img" v-for="(v,i) in mainData.commentImgList" :key="i" :src="v" alt>
        </div>
        <p class="main_tip">{{mainData.skuParameter}}</p>
        <router-link :to="{path:`/goods/${mainData.goodsId}`}" class="main_goods">
          <img class="mg_img" :src="mainData.briefGoodsAppVO.goodsImages" alt>
          <em class="mg_title">{{mainData.briefGoodsAppVO.goodsName}}</em>
          <em class="mg_price">{{"￥"+mainData.briefGoodsAppVO.goodsSalePrice}}</em>
        </router-link>
      </div>
      <div class="pgjd_list">
        <div class="title">评价</div>
        <ul>
          <li class="list_li" v-for="(v,i) in judgeList" :key="i">
            <div class="list_li_h">
              <img class="mh_l" :src="v.createUserImage">
              <div class="mh_c">
                <p class="name">{{v.createUserName}}</p>
                <p class="time">{{v.createDateLabel}}</p>
              </div>
              <div class="mh_r" @click="judgeZan(v.id,i)">
                <em>{{v.zan}}</em>
                <img v-if="v.doZan" src="@/assets/img/ly_zaned.png" alt>
                <img v-else src="@/assets/img/ly_zan.png" alt>
              </div>
            </div>
            <p class="mf_c">{{v.goodsComment}}</p>
          </li>
          <div class="judge_foot">
            <div class="judge_btn" v-if="judgeMore === 0" @click="getJudgelist">查看更多评论</div>
            <div v-else-if="judgeMore === 1">加载中....</div>
            <div v-else>没有更多了</div>
          </div>
        </ul>
      </div>

      <div class="message">
        <input type="text" v-model="txt" placeholder="说点什么吧~" class="message_input">
        <div class="message_submit" @click="submit">发送</div>
      </div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import {
  selectComment,
  selectCommentPage,
  insertComment
} from "@/api/goods.js";
import { zan } from "@/api/yanxuan.js";
import { notNull } from "@/layout/methods.js";
export default {
  name: "JudgeDetail",
  data() {
    return {
      title: "评价详情",
      id: null,
      mainData: null,
      judgeList: [],
      curPage: 1,
      judgeMore: 0,
      txt: null
    };
  },
  components: { HeadFoot },
  methods: {
    getMain() {
      selectComment({ id: this.id }).then(({ data }) => {
        this.mainData = data.data.comment;
      });
    },
    mainZan() {
      zan({ commentId: this.id }).then(({ data }) => {
        this.$toast(data.msg);
        if (data.msg === "点赞成功") {
          this.mainData.doZan = true;
          this.mainData.zan += 1;
        } else {
          this.mainData.doZan = false;
          this.mainData.zan -= 1;
        }
      });
    },
    judgeZan(id, index) {
      zan({ commentId: id }).then(({ data }) => {
        this.$toast(data.msg);
        if (data.msg === "点赞成功") {
          this.judgeList[index].doZan = true;
          this.judgeList[index].zan += 1;
        } else {
          this.judgeList[index].doZan = false;
          this.judgeList[index].zan -= 1;
        }
      });
    },
    getJudgelist() {
      this.judgeMore = 1;
      let _data = {
        page: this.curPage,
        id: this.id
      };
      selectCommentPage(_data).then(({ data }) => {
        let list = data.data.page.dataList;
        [...this.judgeList] = [...this.judgeList, ...data.data.page.dataList];
        if (list.length !== 10) {
          this.judgeMore = 2;
        } else {
          this.judgeMore = 0;
          this.curPage = this.curPage + 1;
        }
      });
    },
    submit() {
      if (notNull(this.txt)) {
        let _data = {
          sendId: this.id,
          goodsComment: this.txt
        };
        insertComment(_data).then(({ data }) => {
          this.$toast(data.msg);
          if (data.msg === "发送成功") {
            [...this.judgeList] = [data.data.comment, ...this.judgeList];
          }
        });
      } else {
        this.$toast("至少写点什么~~");
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getMain();
    this.getJudgelist();
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_judgedetail {
  padding-top: 50px;
  padding-bottom: 62px;
  .pgjd_main {
    background: #fff;
    padding: 18px 15px;
    .main_h {
      width: 100%;
      display: flex;
      .mh_l {
        width: 25px;
        height: 25px;
        border-radius: 13px;
      }
      .mh_c {
        margin-left: 15px;
        .name {
          font-size: 12px;
          color: #333;
          margin-bottom: 3px;
        }
        .time {
          font-size: 10px;
          color: #999;
        }
      }
      .mh_r {
        flex: 1;
        text-align: right;
        img {
          width: 13px;
          height: 13px;
        }
        em {
          color: #999;
          position: relative;
          right: 3px;
          top: 2px;
        }
      }
    }
    .main_f {
      padding: 10px 5px;
      font-size: 13px;
      color: #333;
      line-height: 21px;
      box-sizing: border-box;
      .mf_img {
        width: 100%;
        height: auto;
        margin-top: 5px;
      }
    }
    .main_tip {
      font-size: 12px;
      color: #999;
    }
    .main_goods {
      margin-top: 10px;
      display: flex;
      width: 100%;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
      }
      .mg_title {
        font-size: 14px;
        color: #333;
      }
      .mg_price {
        font-size: 16px;
        color: $Color;
        flex: 1;
        text-align: right;
        font-weight: bold;
      }
    }
  }
}
.pgjd_list {
  margin-top: 20px;
  width: 100vw;
  background: #fff;
  box-sizing: border-box;
  padding: 18px 15px;
  .title {
    border-left: 2px solid $Color;
    padding-left: 10px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .list_li {
    width: 100%;
    margin: 10px 0;
    border-bottom: 1px solid #f4f4f4;
    .list_li_h {
      width: 100%;
      display: flex;
    }
    .mf_c {
      font-size: 14px;
      margin: 10px 5px;
    }
    .mh_l {
      width: 25px;
      height: 25px;
      border-radius: 13px;
    }
    .mh_c {
      margin-left: 15px;
      .name {
        font-size: 12px;
        color: #333;
        margin-bottom: 3px;
      }
      .time {
        font-size: 10px;
        color: #999;
      }
    }
    .mh_r {
      flex: 1;
      text-align: right;
      img {
        width: 13px;
        height: 13px;
      }
      em {
        color: #999;
        position: relative;
        right: 3px;
        top: 2px;
      }
    }
  }
}
.judge_foot {
  width: 100%;
  padding-top: 15px;
  text-align: center;
  // border-top: 1px dashed #999;
  .judge_btn {
    padding: 8px 12px;
    border-radius: 5px;
    border: solid 1px $Color;
    display: inline-block;
    color: $Color;
    font-size: 12px;
  }
}
.message {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vh;
  background: #fff;
  z-index: 9;
  height: 60px;
  line-height: 60px;
  .message_input {
    width: 280px;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    color: #999;
    background: #f4f4f4;
    border-radius: 14px;
    padding: 0 18px;
    box-sizing: border-box;
    margin: 0 15px;
  }
  .message_submit {
    display: inline-block;
    width: 50px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    color: #fff;
    background: $Color;
    box-sizing: border-box;
    border-radius: 14px;
  }
}
</style>