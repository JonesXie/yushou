<template>
  <div class="mod_waterfall" :style="{minHeight:parentHeight+'rem'}">
    <div
      class="fall_item"
      v-for="(item,index) in list"
      :key="item.id"
      :style="{left: item.left,top: item.top +'rem'}"
      ref="col"
    >
      <div class="mw_li">
        <img :src="item.image" alt="加载失败">
        <div class="mw_li_footer">
          <p class="mw_li_slogan">小众而美丽的15个旅游圣地快来GET吧</p>
          <p class="mw_li_like" @click="changeLike(index)">
            <img v-if="item.unlike" src="@/assets/img/yanxuan/pg_yanxuan_unlike.png" alt>
            <img v-else src="@/assets/img/yanxuan/pg_yanxuan_like.png" alt>
            <span>1244</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let leftH = 0;
let rightH = 0;
export default {
  name: "WaterFall",
  data() {
    const list = [
      {
        image:
          "http://www.fishmaimai.com/imgServer/upload/20181219/4dfc8231-35eb-48d4-bca6-e2a3b6f63b4f.png",
        top: 0,
        left: 0,
        unlike: true
      },
      {
        image:
          "http://www.fishmaimai.com/imgServer/upload/20181219/94e5b9cb-dcea-4720-9c3d-6ded2f2697cf.png",
        top: 0,
        left: 0,
        unlike: true
      },
      {
        image:
          "http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180",
        top: 0,
        left: 0,
        unlike: false
      },
      {
        image:
          "http://www.fishmaimai.com/imgServer/upload/20181219/4dfc8231-35eb-48d4-bca6-e2a3b6f63b4f.png",
        top: 0,
        left: 0,
        unlike: true
      },
      {
        image:
          "http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180",
        top: 0,
        left: 0,
        unlike: true
      },
      {
        image:
          "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        top: 0,
        left: 0,
        unlike: true
      },
      {
        image:
          "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        top: 0,
        left: 0,
        unlike: false
      }
    ];
    return {
      list,
      initLeft: "",
      waterfallW: "",
      screenWidth: document.body.clientWidth, // 屏幕宽度
      parentHeight: 0
    };
  },
  mounted() {
    const nodeList = this.$refs.col;
    this.$nextTick(() => {
      setTimeout(() => {
        this.doSort(nodeList);
      }, 500);
    });
  },
  methods: {
    doSort(nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        const domHeight = nodeList[i].clientHeight; //获取当前node的高度
        let top;
        let left;
        if (leftH > rightH) {
          left = "4.8333rem";
          top = ((rightH + 6) / 37.5).toFixed(5);
          rightH += 6 + domHeight;
        } else {
          left = 0;
          top = ((leftH + 6) / 37.5).toFixed(5);
          leftH += 6 + domHeight;
        }
        this.list[i].top = top;
        this.list[i].left = left;
      }
      if (leftH > rightH) {
        this.parentHeight = ((leftH + 50) / 37.5).toFixed(5);
      } else {
        this.parentHeight = ((rightH + 50) / 37.5).toFixed(5);
      }
    },
    changeLike(index) {
      if (this.list[index].unlike) {
        this.list[index].unlike = false;
      } else {
        this.list[index].unlike = true;
      }
    }
  },
  beforeDestroy() {
    leftH = 0;
    rightH = 0;
  }
};
</script>

<style scoped lang="scss">
.mod_waterfall {
  width: 100%;
  position: relative;
  display: inline-block;
  .fall_item {
    position: absolute;
    width: 175px;
    height: auto;
    box-sizing: border-box;
    img {
      width: 100%;
      height: auto;
    }
  }
  .mw_li {
    background: #fff;
    border-radius: 5px;
    .mw_li_footer {
      padding: 10px 8px;
    }
    .mw_li_slogan {
      line-height: 20px;
    }
    .mw_li_like {
      margin-top: 15px;
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
  }
}
</style>