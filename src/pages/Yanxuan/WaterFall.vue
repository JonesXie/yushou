<template>
  <div class="mod_waterfall" :style="{'min-height':parentHeight +'rem'}">
    <div
      class="fall_item"
      v-for="(item, index) in list"
      :key="item.id"
      :style="{ left: item.left, top: item.top +'rem','margin-bottom':(index +1)===list.length?item.mBottom:'0' }"
      ref="col"
    >
      <img :src="item.image" alt>
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
      },
      {
        image:
          "http://www.fishmaimai.com/imgServer/upload/20181219/94e5b9cb-dcea-4720-9c3d-6ded2f2697cf.png",
        top: 0,
        left: 0,
      },
      {
        image:
          "http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180",
        top: 0,
        left: 0,
      },
      {
        image:
          "http://www.fishmaimai.com/imgServer/upload/20181219/4dfc8231-35eb-48d4-bca6-e2a3b6f63b4f.png",
        top: 0,
        left: 0,
      },
      {
        image:
          "http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180",
        top: 0,
        left: 0,
      },
      {
        image:
          "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        top: 0,
        left: 0,
        mBottom:'60px'
      }
    ];
    return {
      list,
      initLeft: "",
      waterfallW: "",
      screenWidth: document.body.clientWidth,// 屏幕宽度
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
      if(leftH > rightH){
        this.parentHeight = ((leftH + 50) / 37.5).toFixed(5);
      }else{
this.parentHeight = ((rightH + 50) / 37.5).toFixed(5);
      }

    }

  }
};
</script>

<style scoped lang="scss">
.mod_waterfall {
  width: 100%;
  position: relative;
  display:inline-block;
  // min-height:100vh;

  .fall_item {
    position: absolute;
    width: 175px;
    height:auto;
    box-sizing: border-box;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>