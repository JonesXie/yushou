<template>
  <div class="pg_yxlist">
    <div class="mode_wf">
      <vue-waterfall-easy
        :imgsArr="imgsArr"
        linkRange="img"
        @scrollReachBottom="getIMG"
        @click="clickFn"
        :enablePullDownEvent="true"
        ref="waterfall"
      >
        <div slot="waterfall-head">
          <van-nav-bar left-arrow :fixed="true" @click-left="GoBack()" :left-text="Title">
            <div class="navRight" slot="right" @click="showList=!showList">
              <img src="@/assets/img/yanxuan/pg_yanxuan_menu.png" alt>
            </div>
          </van-nav-bar>
          <div class="pg_list">
            <ul class="pg_list_ul" v-if="showList">
              <li v-for="(v,i) in tabList" :key="i" @click="choosId(v)">
                <img :src="v.articleClassifyTitleImg" alt>
              </li>
            </ul>
          </div>
        </div>
        <div class="mw_li_footer" slot-scope="props">
          <p class="mw_li_slogan">{{props.value.commentTitle}}</p>
          <p class="mw_li_like" @click="changeLike(props)">
            <img v-if="props.value.doZan" src="@/assets/img/yanxuan/pg_yanxuan_like.png" alt>
            <img v-else src="@/assets/img/yanxuan/pg_yanxuan_unlike.png" alt>
            <span>{{props.value.zan}}</span>
          </p>
        </div>
      </vue-waterfall-easy>
      <div v-if="imgsArr.length === 0" class="noData">
        <img src="@/assets/img/ly_nodata.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { NavBar } from "vant";
import { notNull } from "@/layout/methods.js";
import {
  selectArticleClassifyList,
  selectArticlePage,
  zan
} from "@/api/yanxuan.js";
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  name: "YanxuanList",
  data() {
    return {
      Title: null,
      showList: false,
      tabList: [],
      imgsArr: [],
      curPage: 1,
      chooseId: null
    };
  },
  components: { vueWaterfallEasy, [NavBar.name]: NavBar },
  methods: {
    ...mapActions(["ChangeStatus"]),
    GoBack() {
      this.$router.back(-1);
    },
    changeLike(props) {
      let _data = {
        commentId: props.value.id
      };
      zan(_data).then(({ data }) => {
        this.$toast(data.msg);
        if (data.msg === "点赞成功") {
          this.imgsArr[props.index].doZan = true;
        } else {
          this.imgsArr[props.index].doZan = false;
        }
      });
    },
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        // console.log("img clicked", index, value);
      }
    },
    choosId(val) {
      this.chooseId = val.id;
      this.Title = val.articleClassifyName;
      this.curPage = 1;
      this.imgsArr = [];
      this.getIMG();
    },
    getIMG() {
      let _data = {
        page: this.curPage,
        articleClassifyId: this.chooseId
      };
      selectArticlePage(_data).then(({ data }) => {
        if (data.data.page.dataList.length > 0) {
          let myArr = data.data.page.dataList.map((v) => {
            let _data = v;
            _data.src = v.commentImgDetails.imgPath;
            return _data;
          });
          [...this.imgsArr] = [...this.imgsArr, ...myArr];
          this.curPage = this.curPage + 1;
        } else {
          this.$refs.waterfall.waterfallOver();
        }
      });
    }
  },
  mounted() {
    if (notNull(this.$route.query.id)) {
      this.ChangeStatus(false);
      this.chooseId = this.$route.query.id;
      this.Title = this.$route.query.name;
      selectArticleClassifyList().then(({ data }) => {
        this.tabList = data.data.dataList;
      });
      this.getIMG();
    } else {
      this.$router.back(-1);
    }
  },
  beforeDestroy() {
    this.ChangeStatus(true);
  }
};
</script>

<style scoped lang="scss">
$Color: #ea047b;
.pg_yxlist {
  overflow: hidden;
  & /deep/ .van-nav-bar .van-icon {
    color: #666;
  }
  & /deep/ .van-nav-bar__text {
    color: $Color;
  }
  .navRight {
    img {
      width: 18px;
      height: 18px;
    }
  }
}
.pg_list {
  margin-top: 46px;
  .pg_list_ul {
    overflow-y: hidden;
    height: 75px;
    padding: 10px 0;
    box-sizing: border-box;
    white-space: nowrap;
    li {
      display: inline-block;
      border-radius: 10px;
      width: 82px;
      height: 55px;
      margin-left: 18px;
      position: relative;
      // box-shadow: 0 5px 5px #999;
      span {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pg_list_h {
    font-size: 16px;
    color: #000;
    padding-left: 17px;
    margin-bottom: 21px;
    width: 100vw;
  }
  .pg_list_tuijian {
    width: calc(100vw - 20px);
    margin: 0 auto;
  }
}
.mode_wf {
  // padding-bottom: 50px;
  & /deep/.img-wraper {
    width: 100% !important;
    height: auto !important;
  }
}
.mode_wf {
  & /deep/.img-inner-box {
    background: #fff;
    border-radius: 5px !important;
    overflow: hidden;
  }
}

.mw_li_footer {
  background: #fff;
  padding: 10px 8px;
}
.mw_li_slogan {
  line-height: 20px;
  font-weight: bold;
}
.mw_li_like {
  margin-top: 5px;
  text-align: right;
  color: #999;
  font-size: 12px;
  padding-right: 8px;
  img {
    width: 13px;
    height: 12px;
  }
  span {
    position: relative;
    top: 1px;
    margin-left: 3px;
  }
}
.mode_wf {
  display: block;
  height: 100vh;
  & /deep/ .over {
    display: none;
  }
  .noData {
    width: 100%;
    height: calc(100vh - 120px);
    text-align: center;
    position: absolute;
    top: 120px;
    img {
      position: absolute;
      top: 40%;
      transform: translate(-50%, -50%);
      left: 50%;
      display: inline-block;
      width: 227px;
      height: 200px;
    }
  }
}
</style>