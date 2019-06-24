<template>
  <HeadFoot class="pg_article" :Title="title" :backPath="backPath">
    <template #content>
      <!-- do somethings -->
      <div class="pga_html" v-html="htmlCotent"></div>
      <!-- <iframe
        height="100%"
        width="100%"
        id="pga_html"
        frameborder="0"
        scrolling="auto"
        allowfullscreen
        name="pga_html"
        :src="getURL"
      ></iframe>-->
      <div class="goods">
        <div class="goodsDetail" v-if="goodDetail">
          <img :src="goodDetail.goodsImages" class="gd_l" @click="trunPage" alt>
          <div class="gd_r">
            <p class="gd_r_h ellipsis-three" @click="trunPage">{{goodDetail.goodsName}}</p>
            <div class="gd_r_money">
              <p class="gd_r_money_l">
                <em>￥</em>
                {{goodDetail.goodsSalePrice}}
              </p>
              <div class="gd_r_money_r" @click="handerCollect">
                <img
                  v-if="goodDetail.isCollect ===0"
                  src="@/assets/img/yanxuan/pg_article_uncollect.png"
                  alt
                >
                <img
                  v-else-if="goodDetail.isCollect ===1"
                  src="@/assets/img/yanxuan/pg_article_collect.png"
                  alt
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="leader" @click="trunPage">查看商品></div>
    </template>
  </HeadFoot>
</template>

<script>
import HeadFoot from "@/pages/Public/HeadFoot.vue";
import {
  selectArticleDetaile,
  selectArticle,
  // selectArticlePage,评论获取
  doAddCollect,
  doDelUserCollect
} from "@/api/yanxuan.js";
export default {
  name: "ArticleDetail",
  data() {
    return {
      title: "文章详情",
      backPath: "", //返回路由，可删除
      id: null,
      htmlCotent: null,
      goodDetail: null,
      goods: null,
      getURL: null
    };
  },
  components: { HeadFoot },
  methods: {
    handerCollect() {
      if (this.goodDetail.isCollect === 0) {
        doAddCollect({ goodsId: this.goodDetail.id }).then(({ data }) => {
          this.$toast(data.msg);
          if (data.msg === "收藏成功") {
            this.goodDetail.isCollect = 1;
            this.goodDetail.collectId = data.collectId;
          }
        });
      } else {
        // doDelUserCollect;
        doDelUserCollect({ collectId: this.goodDetail.collectId }).then(
          ({ data }) => {
            this.$toast(data.msg);
            if (data.msg === "删除成功") {
              this.goodDetail.isCollect = 0;
            }
          }
        );
      }
    },
    getHTML() {
      selectArticleDetaile({ id: this.id }).then(({ data }) => {
        this.htmlCotent = data;
      });
    },
    getGoods() {
      selectArticle({ id: this.id }).then(({ data }) => {
        this.goods = data.data.comment;
        this.goodDetail = data.data.comment.briefGoodsAppVO;
      });
    },
    trunPage() {
      this.$router.push({ path: `/goods/${this.goodDetail.id}` });
    }
    // iFrameLoad() {
    //   try {
    //     let iframe = document.getElementById("pga_html");
    //     iframe.height = "0";
    //     if (iframe.attachEvent) {
    //       iframe.attachEvent("onload", function() {
    //         if (localStorage.getItem("articleR") != 1) {
    //           localStorage.setItem("articleR", 1);
    //           // pga_html.window.location.reload();
    //         }
    //       });
    //       return false;
    //     } else {
    //       iframe.onload = function() {
    //         if (localStorage.getItem("articleR") != 1) {
    //           localStorage.setItem("articleR", 1);
    //           // pga_html.window.location.reload();
    //         }
    //       };
    //       return false;
    //     }
    //   } catch {
    //     this.$toast("出现错误");
    //   }
    // }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getHTML();
    this.getURL = `https://www.fishmaimai.com/admin/article/selectArticleDetaile?id=${
      this.id
    }`;
    this.getGoods();
    // this.iFrameLoad();
  },
  destroyed() {
    localStorage.setItem("articleR", 0);
  }
};
</script>

<style scoped lang="scss">
@import "~@/layout/public.scss";
.pg_article {
  padding-top: 46px;
  .pga_html {
    padding: 10px;
    background: #fff;
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
    & /deep/ img {
      width: 100%;
    }
    & /deep/ base {
      display: none;
    }
    & /deep/ p {
      margin-left: 10px;
      margin-right: 10px;
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
    & /deep/ h2 {
      margin-left: 1rem;
      margin-right: 1rem;
    }
    & /deep/ .txp_player {
      width: 100%;
    }
  }
  #pga_html {
    width: 100vw;
    min-width: 100%;
    *width: 100%;
    height: calc(100vh - 50px);
    & /deep/ img {
      width: 100%;
    }
  }
  .goods {
    background: #fff;
    width: 100vw;
    padding: 10px 0;
    .goodsDetail {
      box-sizing: border-box;
      width: 355px;
      height: 110px;
      background-color: #f4f4f4;
      border-radius: 5px;
      margin: 0 auto;
      padding: 10px;
      position: relative;
      .gd_l {
        height: 90px;
        width: 90px;
      }
      .gd_r {
        height: 82%;
        width: 70%;
        position: absolute;
        top: 10px;
        right: 0;
      }
      .gd_r_h {
        font-size: 14px;
        color: #333;
        line-height: 20px;
        font-weight: bold;
      }
      .gd_r_money {
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 22px;
        line-height: 22px;
      }
      .gd_r_money_l {
        font-size: 18px;
        color: $Color;
        font-weight: bold;
        display: inline-block;
        em {
          font-size: 14px;
        }
      }
      .gd_r_money_r {
        width: 22px;
        height: 22px;
        float: right;
        margin-right: 8px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .leader {
    display: inline-block;
    padding: 5px 12px;
    padding-right: 5px;
    font-size: 16px;
    color: #fff;
    background: $Color;
    position: fixed;
    right: 0;
    top: 100px;
    border-top-left-radius: 13px;
    border-bottom-left-radius: 13px;
  }
}
</style>