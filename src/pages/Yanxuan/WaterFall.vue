<template>
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
        <slot name="content"></slot>
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
  </div>
</template>

<script>
import { selectRecommendArticlePage, zan } from "@/api/yanxuan.js";
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  name: "WaterFall",
  data() {
    return {
      imgsArr: [],
      curPage: 1
    };
  },
  components: { vueWaterfallEasy },
  methods: {
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
    //eslint-disable-next-line
    clickFn(event, { index, value }) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        // console.log("img clicked", index, value);
      }
    },
    getIMG() {
      let _data = {
        page: this.curPage
      };
      selectRecommendArticlePage(_data).then(({ data }) => {
        if (data.data.page.dataList.length > 0) {
          let myArr = data.data.page.dataList.map(v => {
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
    this.getIMG();
  }
};
</script>

<style scoped lang="scss">
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
  // height: 100vh; 在各个插槽中设置高度，必须
}
</style>