<template>
  <ul class="mod_waterfall">
    <li v-for="(v,i) in img" :key="i">
      <img :src="v" alt="">
    </li>
  </ul>
</template>

<script>
export default {
  name: "WaterFall",
  data() {
    return {
      img: [
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        "http://www.fishmaimai.com/imgServer/upload/20181219/4dfc8231-35eb-48d4-bca6-e2a3b6f63b4f.png",
        "http://img.fishmaimai.com/imgServer/upload/20181214/988f5e82-6237-49c1-9dd4-73ffa11ab0d2.jpg",
        "http://www.fishmaimai.com/imgServer/upload/20181219/4dfc8231-35eb-48d4-bca6-e2a3b6f63b4f.png",
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        "http://img.fishmaimai.com/imgServer/upload/20190308/5261eead7da84024a896002c66280d9c.jpg",
        "http://www.fishmaimai.com/imgServer/upload/20181219/4dfc8231-35eb-48d4-bca6-e2a3b6f63b4f.png",
        "http://www.fishmaimai.com/imgServer/upload/20181219/4dfc8231-35eb-48d4-bca6-e2a3b6f63b4f.png",
      ],
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.mod_waterfall {
  width: 100%;
  overflow: hidden;
  li{
    float: left;
    width: 175px;
    background-color: #ffffff;
    margin: 0 3px 4px 2px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>